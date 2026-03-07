// Launch Control — TypeScript types and static schedule data

export interface AgentScheduleItem {
  time: string; // "9:00 AM IST"
  label: string;
  agentId: string;
  agentName?: string; // display name — from Convex or derived from agents array
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

export type AdminTab = "overview" | "communities" | "questions" | "briefs" | "strategy" | "workspace";

export type FeedFilter = "all" | "tasks" | "milestones";

export interface CronScheduleItem {
  agentName: string;
  agentId: string;
  jobName: string;
  label: string;
  timeIST: string;
  displayTime: string;
  action: string;
  dayOfWeek?: string;
  enabled: boolean;
  updatedAt: string;
}

// Hardcoded daily schedule fallback (IST times)
export const DAILY_SCHEDULE_FALLBACK: AgentScheduleItem[] = [
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

// ---------------------------------------------------------------------------
// Work Mode Kanban types
// ---------------------------------------------------------------------------

export type KanbanColumn = "backlog" | "todo" | "in_progress" | "blocked" | "done";
export type CardType = "brief" | "blog" | "linkedin" | "booking" | "tool" | "cluster" | "manual" | "task";

export interface WorkBoardTask {
  id: string;
  type: CardType;
  title: string;
  status: string;
  column: KanbanColumn;
  owner: string | null;
  timestamp: string;
  meta: Record<string, unknown>;
}

export const KANBAN_COLUMNS: { id: KanbanColumn; label: string }[] = [
  { id: "backlog",     label: "Backlog" },
  { id: "todo",        label: "To Do" },
  { id: "in_progress", label: "In Progress" },
  { id: "blocked",     label: "Blocked" },
  { id: "done",        label: "Done" },
];

export const OWNER_TAG_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  Parthasarathi: { color: "text-blue-800",    bg: "bg-blue-100",    border: "border-blue-200" },
  Vibhishana:    { color: "text-cyan-800",    bg: "bg-cyan-100",    border: "border-cyan-200" },
  Vyasa:         { color: "text-purple-800",  bg: "bg-purple-100",  border: "border-purple-200" },
  Vidura:        { color: "text-amber-800",   bg: "bg-amber-100",   border: "border-amber-200" },
  Valmiki:       { color: "text-emerald-800", bg: "bg-emerald-100", border: "border-emerald-200" },
  Vishwakarma:   { color: "text-slate-700",   bg: "bg-slate-100",   border: "border-slate-200" },
  Shakti:        { color: "text-indigo-800",  bg: "bg-indigo-100",  border: "border-indigo-200" },
  Krishna:       { color: "text-orange-800",  bg: "bg-orange-100",  border: "border-orange-200" },
};

export const CARD_BADGE_CONFIG: Record<CardType, { label: string; color: string; bg: string }> = {
  brief:    { label: "Brief",    color: "text-emerald-700", bg: "bg-emerald-500/10 border-emerald-500/20" },
  blog:     { label: "Blog",     color: "text-purple-700",  bg: "bg-purple-500/10 border-purple-500/20" },
  linkedin: { label: "LinkedIn", color: "text-sky-700",     bg: "bg-sky-500/10 border-sky-500/20" },
  booking:  { label: "Lead",     color: "text-amber-700",   bg: "bg-amber-500/10 border-amber-500/20" },
  tool:     { label: "Tool",     color: "text-cyan-700",    bg: "bg-cyan-500/10 border-cyan-500/20" },
  cluster:  { label: "Cluster",  color: "text-blue-700",    bg: "bg-blue-500/10 border-blue-500/20" },
  manual:   { label: "Task",     color: "text-text-secondary", bg: "bg-surface-alt border-border-color/40" },
  task:     { label: "Task",     color: "text-orange-700",     bg: "bg-orange-500/10 border-orange-500/20" },
};
