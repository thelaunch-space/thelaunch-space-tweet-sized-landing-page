const http = require('http');
const https = require('https');

const PORT = 3001;
const OPENCLAW_URL = 'http://localhost:41473/v1/chat/completions';
const OPENCLAW_TOKEN = 'RtEDihUwmxUMBw4shZJB2tfsBom3UAzm';
const PROXY_SECRET = process.env.PROXY_SECRET;
const CONVEX_HTTP_URL = 'https://curious-iguana-738.convex.site';
const AGENT_API_KEY = '472e50faa21deb5abf0aaac15d089ba7e77f36cea0f60a798e4b43c0bd94e892';

if (!PROXY_SECRET) {
  console.error('ERROR: PROXY_SECRET not set. Refusing to start.');
  process.exit(1);
}

function pushToConvex(conversationId, content, isError) {
  const payload = JSON.stringify({ conversationId, content, isError: isError || undefined });
  const url = new URL('/push/agent-message', CONVEX_HTTP_URL);
  const reqOptions = {
    method: 'POST',
    hostname: url.hostname,
    path: url.pathname,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + AGENT_API_KEY,
      'Content-Length': Buffer.byteLength(payload),
    },
  };
  const pushReq = https.request(reqOptions, (pushRes) => {
    let body = '';
    pushRes.on('data', (c) => { body += c; });
    pushRes.on('end', () => {
      if (pushRes.statusCode >= 300) {
        console.error('[fire-and-forget] Convex push failed:', pushRes.statusCode, body);
      } else {
        console.log('[fire-and-forget] Pushed ' + content.length + ' chars to Convex for conv=' + conversationId);
      }
    });
  });
  pushReq.on('error', (err) => {
    console.error('[fire-and-forget] Convex push request error:', err.message);
  });
  pushReq.write(payload);
  pushReq.end();
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/v1/chat/completions') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const authHeader = req.headers['x-proxy-secret'];
  if (authHeader !== PROXY_SECRET) {
    res.writeHead(401);
    res.end('Unauthorized');
    return;
  }

  const isFireAndForget = req.headers['x-fire-and-forget'] === 'true';
  const conversationId = req.headers['x-conversation-id'];

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + OPENCLAW_TOKEN,
        'x-openclaw-agent-id': req.headers['x-openclaw-agent-id'] || 'main',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const proxyReq = http.request(OPENCLAW_URL, options, (proxyRes) => {
      if (isFireAndForget && conversationId) {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end('{"ok":true,"mode":"fire-and-forget"}');

        let fullContent = '';
        proxyRes.on('data', (chunk) => {
          const text = chunk.toString();
          const lines = text.split('\n');
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed && parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content;
              if (delta) fullContent += delta;
            } catch (e) {}
          }
        });
        proxyRes.on('end', () => {
          pushToConvex(conversationId, fullContent || 'The agent completed but returned no text.', !fullContent);
        });
        proxyRes.on('error', (err) => {
          console.error('[fire-and-forget] Stream error:', err.message);
          pushToConvex(conversationId, "Sorry, I couldn't complete that request. Please try again.", true);
        });
      } else {
        res.writeHead(proxyRes.statusCode, {
          'Content-Type': proxyRes.headers['content-type'] || 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        proxyRes.pipe(res);
      }
    });

    proxyReq.on('error', (err) => {
      console.error('Proxy error:', err.message);
      if (isFireAndForget && conversationId) {
        if (!res.headersSent) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('{"ok":true,"mode":"fire-and-forget"}');
        }
        pushToConvex(conversationId, "Sorry, I couldn't complete that request. Please try again.", true);
      } else {
        if (!res.headersSent) {
          res.writeHead(502);
          res.end('Bad gateway');
        }
      }
    });

    proxyReq.write(body);
    proxyReq.end();
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('OpenClaw proxy v2 running on port ' + PORT);
  console.log('Fire-and-forget mode: enabled');
  console.log('Convex push target: ' + CONVEX_HTTP_URL);
});
