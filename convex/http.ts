import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

function validateAuth(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  return token === process.env.AGENT_API_KEY;
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

http.route({
  path: "/ingestQuestions",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
    const body = await request.json();
    const questions = Array.isArray(body) ? body : [body];
    const result = await ctx.runMutation(internal.questions.ingestBatch, { questions });
    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }),
});

http.route({
  path: "/ingestBrief",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
    const body = await request.json();
    const result = await ctx.runMutation(internal.briefs.ingest, body);
    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }),
});

http.route({
  path: "/ingestBlog",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
    const body = await request.json();
    const result = await ctx.runMutation(internal.blogs.ingest, body);
    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }),
});

http.route({
  path: "/ingestActivity",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
    const body = await request.json();
    const result = await ctx.runMutation(internal.agentActivity.ingest, body);
    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }),
});

http.route({
  path: "/ingestTopicCluster",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
    const body = await request.json();
    const result = await ctx.runMutation(internal.topicClusters.ingest, body);
    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }),
});

http.route({
  path: "/ingestToolOpportunity",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
    const body = await request.json();
    const result = await ctx.runMutation(internal.toolOpportunities.ingest, body);
    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }),
});

http.route({
  path: "/updateBlogEnrichment",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
      });
    }
    const body = await request.json();
    await ctx.runMutation(internal.blogs.updateEnrichment, body);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
    });
  }),
});

// Handle CORS preflight for all ingestion routes
for (const path of ["/ingestQuestions", "/ingestBrief", "/ingestBlog", "/ingestActivity", "/ingestTopicCluster", "/ingestToolOpportunity", "/updateBlogEnrichment"]) {
  http.route({
    path,
    method: "OPTIONS",
    handler: httpAction(async () => {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(),
      });
    }),
  });
}

export default http;
