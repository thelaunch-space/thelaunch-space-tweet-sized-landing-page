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
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  return jsonResponse({ success: false, error: message }, 400);
}

http.route({
  path: "/ingestQuestions",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      // Accept: bare array [{...}], wrapped {"questions": [{...}]}, or single object {...}
      const questions = Array.isArray(body)
        ? body
        : Array.isArray(body.questions)
          ? body.questions
          : [body];
      const result = await ctx.runMutation(internal.questions.ingestBatch, { questions });
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/ingestBrief",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.briefs.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/ingestBlog",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.blogs.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/ingestActivity",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.agentActivity.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/ingestTopicCluster",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.topicClusters.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/ingestToolOpportunity",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.toolOpportunities.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/updateBlogEnrichment",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      await ctx.runMutation(internal.blogs.updateEnrichment, body);
      return jsonResponse({ success: true });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/updateBriefStatus",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.briefs.updateStatus, body);
      return jsonResponse(result);
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

// ---------------------------------------------------------------------------
// Legacy aliases — kept alive permanently so existing agent skill files
// continue working without changes. Do NOT remove these.
// ---------------------------------------------------------------------------

http.route({
  path: "/upsertQuestions",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const questions = Array.isArray(body)
        ? body
        : Array.isArray(body.questions)
          ? body.questions
          : [body];
      const result = await ctx.runMutation(internal.questions.ingestBatch, { questions });
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/upsertBlog",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.blogs.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/upsertBrief",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.briefs.upsert, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/upsertDocument",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.documents.upsert, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

// ---------------------------------------------------------------------------
// Canonical endpoints — the clean, permanent API surface.
// Each route calls the exact same mutation as the legacy alias above.
// Agents should migrate to these paths. Legacy aliases stay alive forever.
// ---------------------------------------------------------------------------

http.route({
  path: "/push/questions",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const questions = Array.isArray(body)
        ? body
        : Array.isArray(body.questions)
          ? body.questions
          : [body];
      const result = await ctx.runMutation(internal.questions.ingestBatch, { questions });
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/briefs",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.briefs.upsert, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/blogs",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.blogs.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/activity",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.agentActivity.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/topic-clusters",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.topicClusters.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/tool-opportunities",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.toolOpportunities.ingest, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/documents",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.documents.upsert, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/update/brief-status",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.briefs.updateStatus, body);
      return jsonResponse(result);
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/update/blog-enrichment",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      await ctx.runMutation(internal.blogs.updateEnrichment, body);
      return jsonResponse({ success: true });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/update/linkedin-post-status",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.linkedinPosts.updateStatus, body);
      return jsonResponse(result);
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

// ---------------------------------------------------------------------------
// GET query endpoints — agent read access (authenticated with AGENT_API_KEY)
// ---------------------------------------------------------------------------

http.route({
  path: "/query/blogs",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const url = new URL(request.url);
      const needsEnrichment = url.searchParams.get("needs_enrichment");
      const status = url.searchParams.get("status");

      if (needsEnrichment === "true") {
        const blog = await ctx.runQuery(internal.agentQueries.getNextBlogForEnrichment, {});
        if (!blog) return jsonResponse(null);
        return jsonResponse({
          _id: blog._id,
          title: blog.title,
          slug: blog.slug,
          url: blog.url ?? null,
          prUrl: blog.prUrl ?? null,
          keyword: blog.keyword,
          status: blog.status,
          wordCount: blog.wordCount,
          publishedAt: blog.publishedAt ?? null,
          createdAt: blog.createdAt,
          briefId: blog.briefId ?? null,
          enrichmentCount: blog.enrichmentCount ?? 0,
          lastEnrichmentDate: blog.lastEnrichmentDate ?? null,
          enrichmentLog: blog.enrichmentLog ?? null,
        });
      }

      const blogs = await ctx.runQuery(internal.agentQueries.getAllBlogs, {
        status: status ?? undefined,
      });
      return jsonResponse(blogs.map((b) => ({
        _id: b._id,
        title: b.title,
        slug: b.slug,
        url: b.url ?? null,
        prUrl: b.prUrl ?? null,
        keyword: b.keyword,
        status: b.status,
        wordCount: b.wordCount,
        publishedAt: b.publishedAt ?? null,
        createdAt: b.createdAt,
        briefId: b.briefId ?? null,
        enrichmentCount: b.enrichmentCount ?? 0,
        lastEnrichmentDate: b.lastEnrichmentDate ?? null,
        enrichmentLog: b.enrichmentLog ?? null,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/query/questions",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const url = new URL(request.url);
      const summary = url.searchParams.get("summary");

      if (summary === "true") {
        const result = await ctx.runQuery(internal.agentQueries.getQuestionsSummary, {});
        return jsonResponse(result);
      }

      const limitParam = url.searchParams.get("limit");
      const limit = limitParam ? parseInt(limitParam, 10) : undefined;
      const questions = await ctx.runQuery(internal.agentQueries.getRecentQuestions, {
        limit: limit && !isNaN(limit) ? limit : undefined,
      });
      return jsonResponse(questions.map((q) => ({
        _id: q._id,
        title: q.title,
        subreddit: q.subreddit,
        url: q.url,
        questionPain: q.questionPain,
        icpRelevance: q.icpRelevance,
        launchSpaceAngle: q.launchSpaceAngle,
        contentPotential: q.contentPotential,
        engagement: q.engagement,
        notes: q.notes ?? null,
        postDate: q.postDate ?? null,
        scannedAt: q.scannedAt,
        status: q.status,
        agentName: q.agentName,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/query/briefs",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const url = new URL(request.url);
      const status = url.searchParams.get("status");
      const summary = url.searchParams.get("summary");

      // Summary mode — counts by status, no filter needed
      if (summary === "true") {
        const result = await ctx.runQuery(internal.agentQueries.getBriefsSummary, {});
        return jsonResponse(result);
      }

      // All briefs (no status filter)
      if (status === "all") {
        const briefs = await ctx.runQuery(internal.agentQueries.getAllBriefs, {});
        return jsonResponse(briefs.map((b) => ({
          _id: b._id,
          title: b.title,
          slug: b.slug,
          primaryKeyword: b.primaryKeyword,
          longTailKeywords: b.longTailKeywords ?? [],
          sourceUrls: b.sourceUrls ?? [],
          icpProblem: b.icpProblem ?? null,
          competitiveGap: b.competitiveGap ?? null,
          launchSpaceAngle: b.launchSpaceAngle ?? null,
          suggestedStructure: b.suggestedStructure ?? null,
          researchNotes: b.researchNotes ?? null,
          contentMarkdown: b.contentMarkdown ?? null,
          category: b.category ?? null,
          status: b.status,
          krishnaFeedback: b.krishnaFeedback ?? null,
          createdAt: b.createdAt,
        })));
      }

      if (!status) {
        return jsonResponse({ error: "Missing ?status or ?summary=true query param" }, 400);
      }

      const allowedStatuses = [
        "brief_ready", "pending_review", "needs_revision",
        "writing", "published", "approved", "dropped",
      ];
      if (!allowedStatuses.includes(status)) {
        return jsonResponse({ error: `Unknown status: ${status}` }, 400);
      }

      const briefs = await ctx.runQuery(internal.agentQueries.getBriefsByStatus, { status });

      if (status === "pending_review") {
        return jsonResponse({
          count: briefs.length,
          slugs: briefs.map((b) => b.slug),
          titles: briefs.map((b) => b.title),
        });
      }

      // All other statuses — return full brief objects including krishnaFeedback
      return jsonResponse(briefs.map((b) => ({
        _id: b._id,
        title: b.title,
        slug: b.slug,
        primaryKeyword: b.primaryKeyword,
        longTailKeywords: b.longTailKeywords ?? [],
        sourceUrls: b.sourceUrls ?? [],
        icpProblem: b.icpProblem ?? null,
        competitiveGap: b.competitiveGap ?? null,
        launchSpaceAngle: b.launchSpaceAngle ?? null,
        suggestedStructure: b.suggestedStructure ?? null,
        researchNotes: b.researchNotes ?? null,
        contentMarkdown: b.contentMarkdown ?? null,
        category: b.category ?? null,
        krishnaFeedback: b.krishnaFeedback ?? null,
        createdAt: b.createdAt,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/query/topic-clusters",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const clusters = await ctx.runQuery(internal.agentQueries.getAllTopicClusters, {});
      return jsonResponse(clusters.map((c) => ({
        _id: c._id,
        pillarName: c.pillarName,
        clusterTopic: c.clusterTopic,
        status: c.status,
        targetKeyword: c.targetKeyword,
        intentType: c.intentType,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/query/tool-opportunities",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const tools = await ctx.runQuery(internal.agentQueries.getAllToolOpportunities, {});
      return jsonResponse(tools.map((t) => ({
        _id: t._id,
        toolName: t.toolName,
        toolSolution: t.toolSolution,
        status: t.status,
        targetKeyword: t.targetKeyword,
        complexity: t.complexity,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/query/linkedin-posts",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const url = new URL(request.url);
      const status = url.searchParams.get("status");

      const posts = status
        ? await ctx.runQuery(internal.agentQueries.getLinkedinPostsByStatus, { status })
        : await ctx.runQuery(internal.agentQueries.getAllLinkedinPosts, {});

      return jsonResponse(posts.map((p) => ({
        _id: p._id,
        insightName: p.insightName,
        sourceBlogSlug: p.sourceBlogSlug,
        insightNumber: p.insightNumber,
        status: p.status,
        insightText: p.insightText ?? null,
        rationale: p.rationale ?? null,
        hookOptions: p.hookOptions ?? null,
        ctaOptions: p.ctaOptions ?? null,
        draftText: p.draftText ?? null,
        selectedHook: p.selectedHook ?? null,
        selectedCta: p.selectedCta ?? null,
        krishnaFeedback: p.krishnaFeedback ?? null,
        impressions: p.impressions ?? null,
        comments: p.comments ?? null,
        likes: p.likes ?? null,
        goLiveDate: p.goLiveDate ?? null,
        goLiveTime: p.goLiveTime ?? null,
        createdAt: p.createdAt,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/linkedin-posts",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.linkedinPosts.upsert, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

// ---------------------------------------------------------------------------
// Shakti PA — client, project, and task endpoints
// ---------------------------------------------------------------------------

http.route({
  path: "/query/clients",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const clients = await ctx.runQuery(internal.agentQueries.getAllClients, {});
      return jsonResponse(clients.map((c) => ({
        _id: c._id,
        name: c.name,
        slug: c.slug,
        type: c.type,
        status: c.status,
        notes: c.notes ?? null,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/query/projects",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const url = new URL(request.url);
      const clientSlug = url.searchParams.get("clientSlug") ?? undefined;
      const projects = await ctx.runQuery(internal.agentQueries.getAllProjects, { clientSlug });
      return jsonResponse(projects.map((p) => ({
        _id: p._id,
        clientSlug: p.clientSlug,
        name: p.name,
        slug: p.slug,
        type: p.type,
        status: p.status,
        notes: p.notes ?? null,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/query/tasks",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const url = new URL(request.url);
      const status = url.searchParams.get("status") ?? undefined;
      const clientSlug = url.searchParams.get("clientSlug") ?? undefined;
      const projectSlug = url.searchParams.get("projectSlug") ?? undefined;
      const tasks = await ctx.runQuery(internal.agentQueries.getTasksByFilters, { status, clientSlug, projectSlug });
      return jsonResponse(tasks.map((t) => ({
        _id: t._id,
        clientSlug: t.clientSlug,
        projectSlug: t.projectSlug,
        title: t.title,
        description: t.description ?? null,
        taskType: t.taskType,
        status: t.status,
        priority: t.priority ?? null,
        estimatedHours: t.estimatedHours ?? null,
        actualHours: t.actualHours ?? null,
        deadline: t.deadline ?? null,
        paceNotes: t.paceNotes ?? null,
        createdBy: t.createdBy,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      })));
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/clients",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.clients.upsert, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/projects",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.projects.upsert, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/push/tasks",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      const result = await ctx.runMutation(internal.shaktiTasks.upsert, body);
      return jsonResponse({ success: true, ...result });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/update/task-status",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      await ctx.runMutation(internal.shaktiTasks.updateStatus, body);
      return jsonResponse({ success: true });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/update/task",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      await ctx.runMutation(internal.shaktiTasks.internalUpdate, body);
      return jsonResponse({ success: true });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

http.route({
  path: "/delete/task",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    if (!validateAuth(request)) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }
    try {
      const body = await request.json();
      await ctx.runMutation(internal.shaktiTasks.internalRemove, body);
      return jsonResponse({ success: true });
    } catch (error: unknown) {
      return errorResponse(error);
    }
  }),
});

// Handle CORS preflight for all routes (legacy aliases + canonical)
for (const path of [
  // Legacy aliases — kept for backward compatibility
  "/ingestQuestions", "/ingestBrief", "/ingestBlog", "/ingestActivity",
  "/ingestTopicCluster", "/ingestToolOpportunity", "/updateBlogEnrichment",
  "/updateBriefStatus", "/upsertQuestions", "/upsertBlog", "/upsertBrief",
  "/upsertDocument",
  // Canonical paths
  "/push/questions", "/push/briefs", "/push/blogs", "/push/activity",
  "/push/topic-clusters", "/push/tool-opportunities", "/push/documents",
  "/push/linkedin-posts",
  "/update/brief-status", "/update/blog-enrichment", "/update/linkedin-post-status",
  // GET query endpoints
  "/query/blogs", "/query/questions",
  "/query/briefs", "/query/topic-clusters", "/query/tool-opportunities", "/query/linkedin-posts",
  // Shakti PA endpoints
  "/query/clients", "/query/projects", "/query/tasks",
  "/push/clients", "/push/projects", "/push/tasks",
  "/update/task-status", "/update/task", "/delete/task",
]) {
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
