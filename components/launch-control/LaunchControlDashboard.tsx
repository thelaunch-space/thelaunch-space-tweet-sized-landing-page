"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import HeaderBar from "./HeaderBar";
import AgentSidebar from "./AgentSidebar";
import AgentAvatarStrip from "./AgentAvatarStrip";
import LiveFeed from "./LiveFeed";
import CenterTabs from "./CenterTabs";
import WorkBoard from "./WorkBoard";
import WaitlistCTA from "./WaitlistCTA";
import GuidedTour from "./GuidedTour";
import type { BlogPost } from "@/lib/blog";
import type { WorkBoardTask } from "@/lib/launch-control-types";

interface LaunchControlDashboardProps {
  blogPosts: BlogPost[];
}

export default function LaunchControlDashboard({ blogPosts }: LaunchControlDashboardProps) {
  const agentStatuses = useQuery(api.agentActivity.agentStatuses);
  const weeklyStats = useQuery(api.agentActivity.weeklyStats);
  const allTimeStats = useQuery(api.agentActivity.allTimeStats);
  const recentFeed = useQuery(api.agentActivity.recentFeed, { limit: 50 });
  const boardTasks = useQuery(api.workboard.getBoard) as WorkBoardTask[] | undefined;

  const [workMode, setWorkMode] = useState(false);

  // Sync from localStorage after hydration to avoid server/client mismatch
  useEffect(() => {
    setWorkMode(localStorage.getItem("lc-work-mode") === "true");
  }, []);

  const workStats = (() => {
    if (!boardTasks) return null;
    const now = new Date();
    const day = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((day + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    const weekStart = monday.getTime();
    return {
      doneThisWeek: boardTasks.filter((t) => t.column === "done" && new Date(t.timestamp).getTime() >= weekStart).length,
      inProgress: boardTasks.filter((t) => t.column === "in_progress").length,
      blocked: boardTasks.filter((t) => t.column === "blocked").length,
      todo: boardTasks.filter((t) => t.column === "todo").length,
    };
  })();

  function toggleWorkMode() {
    setWorkMode((prev) => {
      const next = !prev;
      localStorage.setItem("lc-work-mode", String(next));
      return next;
    });
  }

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-background pwa-bottom-pad">
      <GuidedTour />
      <HeaderBar workMode={workMode} onToggleWorkMode={toggleWorkMode} workStats={workMode ? workStats : null} />

      {/* Mobile agent strip */}
      <div className="lg:hidden px-4 py-3">
        <AgentAvatarStrip agentStatuses={agentStatuses} />
      </div>

      {/* Grid — 2-col in work mode, 3-col in demo mode */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 pb-6">
        <div className={`grid grid-cols-1 gap-4 lg:gap-5 ${workMode ? "lg:grid-cols-1" : "lg:grid-cols-[240px_1fr_320px]"}`}>
          {/* Left — Agent Sidebar (desktop only, hidden in work mode) */}
          {!workMode && (
            <aside className="hidden lg:block">
              <div className="sticky top-[52px] pt-4 max-h-[calc(100vh-52px)] overflow-y-auto scrollbar-hide">
                <AgentSidebar agentStatuses={agentStatuses} />
              </div>
            </aside>
          )}

          {/* Center — Work Board or Tabbed content */}
          <main className="min-w-0 pt-4 lg:max-h-[calc(100vh-52px)] lg:overflow-hidden lg:flex lg:flex-col">
            {workMode ? (
              <WorkBoard />
            ) : (
              <CenterTabs
                weeklyStats={weeklyStats}
                allTimeStats={allTimeStats}
                blogPosts={blogPosts}
              />
            )}
          </main>

          {/* Right — Live Feed + CTA (hidden in work mode) */}
          {!workMode && (
            <aside className="hidden lg:block">
              <div className="sticky top-[52px] pt-4 flex flex-col gap-3 max-h-[calc(100vh-52px)]">
                <div className="flex-1 min-h-0">
                  <p className="text-xs text-text-secondary mb-1">Real-time log of what the agents are doing right now.</p>
                  <LiveFeed feed={recentFeed} />
                </div>
                <WaitlistCTA />
              </div>
            </aside>
          )}
        </div>

        {/* Mobile: Live Feed + CTA (hidden in work mode) */}
        {!workMode && (
          <div className="lg:hidden mt-4 space-y-3">
            <p className="text-xs text-text-secondary mb-1">Real-time log of what the agents are doing right now.</p>
            <LiveFeed feed={recentFeed} />
            <WaitlistCTA />
          </div>
        )}
      </div>
    </div>
  );
}
