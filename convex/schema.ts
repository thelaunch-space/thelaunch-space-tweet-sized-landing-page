import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Vibhishana's Reddit scans — all 12 scanner output fields
  questions: defineTable({
    // Core identification
    title: v.string(),              // Reddit post title
    subreddit: v.string(),          // e.g., "r/smallbusiness"
    url: v.string(),                // Reddit thread URL

    // Scanner analysis
    questionPain: v.string(),       // The pain point extracted
    icpRelevance: v.string(),       // "HIGH" | "MEDIUM" | "LOW"
    launchSpaceAngle: v.string(),   // How thelaunch.space can address this
    contentPotential: v.string(),   // "Strong blog candidate" | "Blog candidate" | "Watch"
    engagement: v.string(),         // e.g., "15 upvotes, 23 comments"
    notes: v.optional(v.string()),  // Scanner notes

    // Dates
    postDate: v.optional(v.string()),  // When the Reddit post was made
    scannedAt: v.string(),             // When Vibhishana scanned it

    // Status
    status: v.string(),             // "new" | "brief_created" | "skipped"
    briefCreated: v.optional(v.boolean()), // Deprecated — kept for backward compat with existing records

    // Agent metadata
    agentName: v.string(),
    batchId: v.optional(v.string()),
  })
    .index("by_scannedAt", ["scannedAt"])
    .index("by_agentName", ["agentName"])
    .index("by_status", ["status"])
    .index("by_url", ["url"]),

  // Vibhishana's research briefs — all 14 blog-queue sheet columns + full markdown content
  briefs: defineTable({
    // Core identification (blog-queue columns A-C)
    title: v.string(),
    slug: v.string(),
    primaryKeyword: v.string(),

    // SEO data (blog-queue columns D, L)
    longTailKeywords: v.optional(v.array(v.string())),
    finalKeywords: v.optional(v.array(v.string())),

    // Strategic analysis (blog-queue columns F-J)
    icpProblem: v.optional(v.string()),
    competitiveGap: v.optional(v.string()),
    launchSpaceAngle: v.optional(v.string()),
    suggestedStructure: v.optional(v.string()),
    researchNotes: v.optional(v.string()),

    // Ranking (blog-queue column N)
    rankingNotes: v.optional(v.string()),

    // Full brief content — markdown rendered as HTML in admin view
    contentMarkdown: v.optional(v.string()),

    // Relationships
    sourceQuestionId: v.optional(v.string()),
    sourceUrls: v.optional(v.array(v.string())),
    blogUrl: v.optional(v.string()),

    // Categorization & filtering
    category: v.optional(v.string()),
    status: v.string(),            // "pending_review" | "approved" | "needs_revision" | "brief_ready" | "writing" | "published"

    // Timestamps
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),

    // Krishna's review feedback (audit trail — agents still read from Slack)
    krishnaFeedback: v.optional(v.string()),

    // Revision history — snapshots of previous versions on minor revisions
    revisionHistory: v.optional(v.array(v.object({
      version: v.number(),           // version number this entry captures (1 = original)
      title: v.string(),             // title before revision
      primaryKeyword: v.string(),    // keyword before revision
      suggestedStructure: v.optional(v.string()), // structure before revision
      feedback: v.string(),          // krishnaFeedback that triggered this revision
      revisedAt: v.string(),         // ISO timestamp when Vibhishana made the revision
    }))),

    // Agent metadata
    agentName: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_agentName", ["agentName"])
    .index("by_createdAt", ["createdAt"])
    .index("by_category", ["category"]),

  // Vyasa's published blogs
  blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    url: v.optional(v.string()),    // Published URL on thelaunch.space
    prUrl: v.optional(v.string()),  // Netlify deploy preview URL (set when status = pr_created)
    keyword: v.string(),
    status: v.string(),             // "writing" | "pr_created" | "published"
    agentName: v.string(),
    wordCount: v.number(),
    publishedAt: v.optional(v.string()),
    createdAt: v.string(),
    briefId: v.optional(v.string()),
    enrichmentCount: v.optional(v.number()),
    lastEnrichmentDate: v.optional(v.string()),
    enrichmentLog: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_agentName", ["agentName"])
    .index("by_createdAt", ["createdAt"])
    .index("by_slug", ["slug"]),

  // Vidura's topic clusters — SEO content planning
  topicClusters: defineTable({
    pillarName: v.string(),
    clusterTopic: v.string(),
    status: v.string(),             // "planned" | "in_progress" | "complete"
    blogUrl: v.optional(v.string()),
    targetKeyword: v.string(),
    intentType: v.string(),         // "informational" | "comparison" | "decision"
    agentName: v.string(),          // always "Vidura"
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),
  })
    .index("by_pillarName", ["pillarName"])
    .index("by_pillar_cluster", ["pillarName", "clusterTopic"])
    .index("by_status", ["status"])
    .index("by_agentName", ["agentName"])
    .index("by_createdAt", ["createdAt"]),

  // Vidura's tool opportunities — interactive tool proposals
  toolOpportunities: defineTable({
    sourceQuestion: v.string(),
    whyTool: v.string(),
    toolName: v.string(),
    toolSolution: v.string(),
    targetKeyword: v.string(),
    complexity: v.string(),         // "simple" | "medium"
    status: v.string(),             // "proposed" | "approved" | "rejected" | "building" | "built"
    krishnaNotes: v.optional(v.string()),
    agentName: v.string(),          // always "Vidura"
    createdAt: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_agentName", ["agentName"])
    .index("by_createdAt", ["createdAt"])
    .index("by_toolName", ["toolName"]),

  // Pitch page meeting bookings
  pitchBookings: defineTable({
    companyName: v.string(),
    websiteUrl: v.string(),
    email: v.string(),
    contentChallenge: v.optional(v.string()),
    whatsappNumber: v.optional(v.string()),
    whatsappCountryCode: v.optional(v.string()),
    whatsappConsent: v.boolean(),
    selectedDate: v.string(),        // ISO date e.g. "2026-02-17"
    selectedTimeIST: v.string(),     // e.g. "11:00", "15:00"
    isCustomTime: v.boolean(),
    source: v.string(),              // "pitch-page"
    createdAt: v.string(),           // ISO timestamp
    status: v.string(),              // "new" | "contacted" | "scheduled" | "completed"
    googleEventId: v.optional(v.string()),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_status", ["status"]),

  // Agent documents — research reports, strategy docs, briefs, process docs
  documents: defineTable({
    title: v.string(),
    slug: v.string(),                    // Unique identifier for dedup
    content: v.string(),                 // Full markdown content
    summary: v.optional(v.string()),     // Short description
    category: v.string(),               // "research" | "strategy" | "brief" | "process" | "analysis"
    tags: v.optional(v.array(v.string())), // Flexible tagging
    agentName: v.string(),              // Who created it
    filePath: v.optional(v.string()),   // VPS path for reference
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_agentName", ["agentName"])
    .index("by_category", ["category"])
    .index("by_createdAt", ["createdAt"]),

  // Valmiki's LinkedIn post-briefs and drafts (2-phase workflow)
  linkedinPosts: defineTable({
    insightName: v.string(),           // Dedup key (sourceBlogSlug + insightNumber)
    sourceBlogSlug: v.string(),
    sourceBlogTitle: v.optional(v.string()),
    insightNumber: v.number(),
    // Phase 1 fields — post-brief (pending_review)
    insightText: v.optional(v.string()),   // The extracted angle/insight
    rationale: v.optional(v.string()),     // Why this angle resonates with ICP
    hookOptions: v.optional(v.array(v.string())),  // 3-4 hook options
    ctaOptions: v.optional(v.array(v.string())),   // 3-4 CTA options
    // Krishna's selections from hook/CTA options (set on approve)
    selectedHook: v.optional(v.string()),
    selectedCta: v.optional(v.string()),
    // Phase 2 fields — full draft (draft_ready)
    draftText: v.optional(v.string()),
    krishnaFeedback: v.optional(v.string()),
    // Legacy fields — kept optional for backward compat with pre-2026-03 documents
    icpPass: v.optional(v.boolean()),
    source: v.optional(v.string()),
    hookStrategy: v.optional(v.string()),
    ctaType: v.optional(v.string()),
    icpFailReason: v.optional(v.string()),
    postedDate: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    status: v.string(),                // "pending_review" | "needs_revision" | "approved" | "dropped" | "draft_ready" | "posted" | "skipped"
    agentName: v.string(),             // "Valmiki"
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),
    // Performance metrics (populated by Valmiki after posting)
    impressions: v.optional(v.number()),
    comments: v.optional(v.number()),
    likes: v.optional(v.number()),
    goLiveDate: v.optional(v.string()),
    goLiveTime: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_sourceBlogSlug", ["sourceBlogSlug"])
    .index("by_createdAt", ["createdAt"]),

  // Krishna-created manual tasks (no source artifact)
  manualTasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    status: v.string(),                // "todo" | "in_progress" | "blocked" | "done"
    assignee: v.optional(v.string()),  // "Krishna" or agent name
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  // Shakti's client registry
  clients: defineTable({
    name: v.string(),
    slug: v.string(),
    type: v.string(),           // "retainer" | "project" | "internal"
    status: v.string(),         // "active" | "paused" | "completed"
    notes: v.optional(v.string()),
    createdAt: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  // Shakti's project registry
  projects: defineTable({
    clientSlug: v.string(),
    name: v.string(),
    slug: v.string(),
    type: v.string(),           // "feature" | "maintenance" | "internal" | "retainer"
    status: v.string(),         // "active" | "on-hold" | "completed"
    notes: v.optional(v.string()),
    createdAt: v.string(),
  })
    .index("by_clientSlug", ["clientSlug"])
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  // Shakti's task backlog
  tasks: defineTable({
    clientSlug: v.string(),
    projectSlug: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    taskType: v.string(),       // "build"|"review"|"debug"|"strategy"|"client-comms"|"admin"
    status: v.string(),         // "backlog"|"todo"|"in_progress"|"blocked"|"done"
    priority: v.optional(v.number()),       // 1=high, 2=medium, 3=low
    estimatedHours: v.optional(v.number()),
    actualHours: v.optional(v.number()),
    deadline: v.optional(v.string()),       // ISO date string
    paceNotes: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
    createdBy: v.string(),      // "Krishna" | "Shakti"
  })
    .index("by_clientSlug", ["clientSlug"])
    .index("by_projectSlug", ["projectSlug"])
    .index("by_status", ["status"])
    .index("by_taskType", ["taskType"])
    .index("by_deadline", ["deadline"])
    .index("by_createdAt", ["createdAt"]),

  // All agents — milestone activity log
  agentActivity: defineTable({
    agentName: v.string(),          // "Parthasarathi" | "Vibhishana" | "Vyasa"
    action: v.string(),             // "health_check" | "scan_complete" | "brief_created" | "blog_published"
    status: v.string(),             // "active" | "completed" | "error"
    message: v.string(),            // One-line description
    timestamp: v.string(),
    metadata: v.optional(v.any()),  // Extra context (flexible)
    dedupKey: v.optional(v.string()), // Idempotent insert key — prevents duplicate activity entries
  })
    .index("by_agentName", ["agentName"])
    .index("by_timestamp", ["timestamp"])
    .index("by_agentName_timestamp", ["agentName", "timestamp"])
    .index("by_dedupKey", ["dedupKey"]),

  // Agent chat conversations — one per (userId, agentId, session)
  agentConversations: defineTable({
    agentId: v.string(),            // "main" | "vibhishana" | "vyasa" | "vidura" | "valmiki" | "shakti"
    agentName: v.string(),          // Display name: "Parthasarathi" etc.
    title: v.string(),              // Auto-set from first user message (first 60 chars)
    userId: v.string(),             // Clerk userId — for multi-user isolation later
    messageCount: v.number(),
    lastMessageAt: v.string(),      // ISO timestamp
    createdAt: v.string(),
    type: v.optional(v.string()),   // "chat" (default) | "cron_log"
  })
    .index("by_userId_agentId", ["userId", "agentId"])
    .index("by_userId", ["userId"])
    .index("by_lastMessageAt", ["lastMessageAt"]),

  // Individual messages within a conversation
  agentMessages: defineTable({
    conversationId: v.id("agentConversations"),
    role: v.string(),               // "user" | "assistant"
    content: v.string(),
    createdAt: v.string(),
    jobName: v.optional(v.string()),
    messageType: v.optional(v.string()),  // "chat" (default) | "cron_update"
  })
    .index("by_conversationId", ["conversationId"])
    .index("by_conversationId_createdAt", ["conversationId", "createdAt"]),

  // Dynamic cron schedule — Parthasarathi pushes schedule changes
  cronSchedule: defineTable({
    agentName: v.string(),
    agentId: v.string(),
    jobName: v.string(),
    label: v.string(),
    timeIST: v.string(),            // "09:00" (24h, sortable)
    displayTime: v.string(),        // "9:00 AM"
    action: v.string(),             // matches agentActivity action field
    dayOfWeek: v.optional(v.string()), // "daily" | "monday" | "saturday" etc.
    enabled: v.boolean(),
    updatedAt: v.string(),
  })
    .index("by_agentId_jobName", ["agentId", "jobName"])
    .index("by_timeIST", ["timeIST"]),
});
