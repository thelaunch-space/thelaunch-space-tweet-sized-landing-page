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
    briefCreated: v.optional(v.boolean()), // Was a brief created from this question?

    // Agent metadata
    agentName: v.string(),
    batchId: v.optional(v.string()),
  })
    .index("by_scannedAt", ["scannedAt"])
    .index("by_agentName", ["agentName"])
    .index("by_status", ["status"]),

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
    .index("by_createdAt", ["createdAt"]),

  // Vidura's topic clusters — SEO content planning
  topicClusters: defineTable({
    pillarName: v.string(),
    clusterTopic: v.string(),
    status: v.string(),             // "planned" | "brief-ready" | "published"
    blogUrl: v.optional(v.string()),
    targetKeyword: v.string(),
    intentType: v.string(),         // "informational" | "comparison" | "decision"
    agentName: v.string(),          // always "Vidura"
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),
  })
    .index("by_pillarName", ["pillarName"])
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
    status: v.string(),             // "proposed" | "approved" | "rejected" | "built" | "live"
    krishnaNotes: v.optional(v.string()),
    agentName: v.string(),          // always "Vidura"
    createdAt: v.string(),
  })
    .index("by_status", ["status"])
    .index("by_agentName", ["agentName"])
    .index("by_createdAt", ["createdAt"]),

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
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_status", ["status"]),

  // All agents — milestone activity log
  agentActivity: defineTable({
    agentName: v.string(),          // "Parthasarathi" | "Vibhishana" | "Vyasa"
    action: v.string(),             // "health_check" | "scan_complete" | "brief_created" | "blog_published"
    status: v.string(),             // "active" | "completed" | "error"
    message: v.string(),            // One-line description
    timestamp: v.string(),
    metadata: v.optional(v.any()),  // Extra context (flexible)
  })
    .index("by_agentName", ["agentName"])
    .index("by_timestamp", ["timestamp"])
    .index("by_agentName_timestamp", ["agentName", "timestamp"]),
});
