// Launch Control — TypeScript types and static schedule data

export interface AgentScheduleItem {
  time: string; // "9:00 AM IST"
  label: string;
  agentId: string;
  action: string; // maps to agentActivity.action
}

export interface AgentStatus {
  agentName: string;
  lastAction: string | null;
  lastStatus: string;
  lastMessage: string | null;
  lastTimestamp: string | null;
}

export interface WeeklyStats {
  questions: number;
  briefs: number;
  blogs: number;
  clusters: number;
  tools: number;
}

export interface CommunityBreakdownItem {
  subreddit: string;
  count: number;
  latestScannedAt: string;
}

export type StatusDotColor = "green" | "orange" | "red" | "gray";

export type AdminTab = "overview" | "communities" | "questions" | "briefs" | "strategy";

export type FeedFilter = "all" | "tasks" | "milestones";

// Hardcoded daily schedule (IST times)
export const DAILY_SCHEDULE: AgentScheduleItem[] = [
  // Morning block
  { time: "8:00 AM", label: "Health check & pipeline review", agentId: "parthasarathi", action: "health_check" },
  { time: "9:00 AM", label: "Reddit & community scan", agentId: "vibhishana", action: "scan_complete" },
  { time: "9:30 AM", label: "Morning strategy review", agentId: "vidura", action: "morning_analysis" },
  { time: "10:30 AM", label: "Pre-blog quality check", agentId: "parthasarathi", action: "due_diligence" },
  { time: "10:30 AM", label: "Cluster mapping / Topic gen / Tool scan", agentId: "vidura", action: "cluster_mapping" },
  { time: "11:00 AM", label: "Daily blog writing", agentId: "vyasa", action: "blog_pr_created" },

  // Midday block
  { time: "12:00 PM", label: "Research brief #1", agentId: "vibhishana", action: "brief_created" },
  { time: "1:00 PM", label: "Midday due diligence", agentId: "parthasarathi", action: "due_diligence" },
  { time: "2:30 PM", label: "Midday strategy check", agentId: "vidura", action: "midday_strategy" },
  { time: "3:00 PM", label: "Enrichment run #1", agentId: "vyasa", action: "blog_enriched" },
  { time: "3:00 PM", label: "Research brief #2", agentId: "vibhishana", action: "brief_created" },

  // Afternoon block
  { time: "4:30 PM", label: "Research brief #3", agentId: "vibhishana", action: "brief_created" },
  { time: "5:00 PM", label: "Enrichment run #2", agentId: "vyasa", action: "blog_enriched" },
  { time: "5:30 PM", label: "Evening due diligence", agentId: "parthasarathi", action: "due_diligence" },

  // Evening block
  { time: "6:00 PM", label: "Evening scan & daily report", agentId: "vibhishana", action: "daily_report" },
  { time: "7:00 PM", label: "End-of-day review", agentId: "parthasarathi", action: "health_check" },
  { time: "7:30 PM", label: "Evening review & citation analysis", agentId: "vidura", action: "evening_review" },
  { time: "8:00 PM", label: "Enrichment run #3", agentId: "vyasa", action: "blog_enriched" },
];

// Brief status → display config
export const BRIEF_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending_review: { label: "Pending Review", color: "text-amber-700", bg: "bg-amber-500/10 border-amber-500/20" },
  approved: { label: "Approved", color: "text-emerald-700", bg: "bg-emerald-500/10 border-emerald-500/20" },
  needs_revision: { label: "Needs Revision", color: "text-red-700", bg: "bg-red-500/10 border-red-500/20" },
  brief_ready: { label: "Brief Ready", color: "text-blue-700", bg: "bg-blue-500/10 border-blue-500/20" },
  writing: { label: "Writing", color: "text-purple-700", bg: "bg-purple-500/10 border-purple-500/20" },
  published: { label: "Published", color: "text-emerald-700", bg: "bg-emerald-500/10 border-emerald-500/20" },
};

// ICP relevance → badge config
export const ICP_RELEVANCE_CONFIG: Record<string, { color: string; bg: string }> = {
  HIGH: { color: "text-emerald-700", bg: "bg-emerald-500/10" },
  MEDIUM: { color: "text-amber-700", bg: "bg-amber-500/10" },
  LOW: { color: "text-text-secondary", bg: "bg-surface-alt" },
};

// Strategy types for Vidura
export interface TopicCluster {
  pillarName: string;
  clusterTopic: string;
  status: string;
  blogUrl?: string;
  targetKeyword: string;
  intentType: string;
}

export interface ToolOpportunity {
  sourceQuestion: string;
  whyTool: string;
  toolName: string;
  toolSolution: string;
  targetKeyword: string;
  complexity: string;
  status: string;
  krishnaNotes?: string;
}
