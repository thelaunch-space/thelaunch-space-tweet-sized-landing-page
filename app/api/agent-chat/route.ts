import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const proxyUrl = process.env.OPENCLAW_PROXY_URL;
  const proxySecret = process.env.OPENCLAW_PROXY_SECRET;

  if (!proxyUrl || !proxySecret) {
    return NextResponse.json(
      { error: "Proxy not configured" },
      { status: 500 }
    );
  }

  let body: { messages: unknown[]; agentId: string; conversationId: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { messages, agentId, conversationId } = body;

  if (!messages || !agentId || !conversationId) {
    return NextResponse.json(
      { error: "Missing required fields: messages, agentId, conversationId" },
      { status: 400 }
    );
  }

  // Fire-and-forget: send to VPS proxy, don't await the response.
  // The proxy will collect the full agent response and push it to Convex directly.
  try {
    fetch(`${proxyUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-proxy-secret": proxySecret,
        "x-openclaw-agent-id": agentId,
        "x-fire-and-forget": "true",
        "x-conversation-id": conversationId,
      },
      body: JSON.stringify({
        model: "openclaw:main",
        messages,
        stream: true,
        user: conversationId,
      }),
    }).catch((err) => {
      // Log but don't throw — the proxy will push an error message to Convex if it fails
      console.error("[agent-chat] Fire-and-forget proxy call failed:", err);
    });
  } catch (err) {
    console.error("[agent-chat] Proxy connection failed:", err);
    return NextResponse.json(
      { error: "Could not reach agent proxy" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
