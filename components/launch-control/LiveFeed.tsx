"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { agents } from "@/lib/agents";
import type { FeedFilter } from "@/lib/launch-control-types";
import type { Doc } from "@/convex/_generated/dataModel";

const MILESTONE_ACTIONS = ["blog_published", "brief_created", "scan_complete", "report"];
const TASK_ACTIONS = ["health_check", "blog_writing", "scan_started"];

const FILTER_TABS: { label: string; value: FeedFilter }[] = [
  { label: "All", value: "all" },
  { label: "Tasks", value: "tasks" },
  { label: "Milestones", value: "milestones" },
];

function getAgentAccent(agentName: string): string {
  const agent = agents.find(
    (a) => a.name.toLowerCase() === agentName.toLowerCase()
  );
  return agent?.accentHex ?? "#6B7280";
}

function getAgentAvatar(agentName: string): string {
  const agent = agents.find(
    (a) => a.name.toLowerCase() === agentName.toLowerCase()
  );
  return agent ? `/agent-avatars/${agent.id}.png` : "/agent-avatars/parthasarathi.png";
}

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface LiveFeedProps {
  feed: Doc<"agentActivity">[] | undefined;
}

export default function LiveFeed({ feed }: LiveFeedProps) {
  const [filter, setFilter] = useState<FeedFilter>("all");

  const filteredFeed = feed?.filter((item) => {
    if (filter === "milestones") return MILESTONE_ACTIONS.includes(item.action);
    if (filter === "tasks") return TASK_ACTIONS.includes(item.action);
    return true;
  });

  return (
    <div className="rounded-2xl border border-border-color/40 bg-surface overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border-color/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="meta-label text-text-secondary">Live Feed</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-4 py-2 border-b border-border-color/20 flex gap-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`text-xs font-medium px-2.5 py-1 rounded-lg transition-colors ${
              filter === tab.value
                ? "bg-surface-alt text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed items */}
      <div className="max-h-[400px] lg:max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
        {filteredFeed === undefined ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-6 h-6 rounded-full bg-surface-alt shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-surface-alt rounded w-3/4" />
                  <div className="h-2.5 bg-surface-alt rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredFeed.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-xs text-text-secondary italic">
              No activity yet — agents run daily starting at 9 AM IST
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredFeed.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 py-3 border-b border-border-color/10 last:border-b-0"
                style={{ borderLeftColor: getAgentAccent(item.agentName) }}
              >
                <div className="flex items-start gap-2.5">
                  <img
                    src={getAgentAvatar(item.agentName)}
                    alt={item.agentName}
                    className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: getAgentAccent(item.agentName) }}
                      >
                        {item.agentName}
                      </span>
                      <span className="text-[11px] text-text-secondary font-mono">
                        {relativeTime(item.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
