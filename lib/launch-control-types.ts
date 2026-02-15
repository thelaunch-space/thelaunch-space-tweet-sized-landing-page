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
}

export interface CommunityBreakdownItem {
  subreddit: string;
  count: number;
  latestScannedAt: string;
}

export type StatusDotColor = "green" | "orange" | "red" | "gray";

export type AdminTab = "overview" | "communities" | "questions" | "briefs";

export type FeedFilter = "all" | "tasks" | "milestones";

// Hardcoded daily schedule (IST times)
export const DAILY_SCHEDULE: AgentScheduleItem[] = [
  { time: "8:00 AM", label: "Morning health check", agentId: "parthasarathi", action: "health_check" },
  { time: "9:00 AM", label: "Reddit community scan", agentId: "vibhishana", action: "scan_complete" },
  { time: "11:00 AM", label: "First research brief", agentId: "vibhishana", action: "brief_created" },
  { time: "1:00 PM", label: "Midday check & task routing", agentId: "parthasarathi", action: "health_check" },
  { time: "2:00 PM", label: "Second research brief", agentId: "vibhishana", action: "brief_created" },
  { time: "3:00 PM", label: "Pre-delivery check", agentId: "parthasarathi", action: "health_check" },
  { time: "3:30 PM", label: "Blog writing begins", agentId: "vyasa", action: "blog_writing" },
  { time: "5:00 PM", label: "Third research brief", agentId: "vibhishana", action: "brief_created" },
  { time: "5:30 PM", label: "Blog published via PR", agentId: "vyasa", action: "blog_published" },
  { time: "6:00 PM", label: "Evening pattern report", agentId: "vibhishana", action: "report" },
  { time: "7:00 PM", label: "Due diligence report", agentId: "parthasarathi", action: "report" },
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
