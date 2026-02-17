"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import HeaderBar from "./HeaderBar";
import AgentSidebar from "./AgentSidebar";
import AgentAvatarStrip from "./AgentAvatarStrip";
import LiveFeed from "./LiveFeed";
import CenterTabs from "./CenterTabs";
import WaitlistCTA from "./WaitlistCTA";
import GuidedTour from "./GuidedTour";
import type { BlogPost } from "@/lib/blog";

interface LaunchControlDashboardProps {
  blogPosts: BlogPost[];
}

export default function LaunchControlDashboard({ blogPosts }: LaunchControlDashboardProps) {
  const agentStatuses = useQuery(api.agentActivity.agentStatuses);
  const weeklyStats = useQuery(api.agentActivity.weeklyStats);
  const allTimeStats = useQuery(api.agentActivity.allTimeStats);
  const recentFeed = useQuery(api.agentActivity.recentFeed, { limit: 50 });

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-background">
      <GuidedTour />
      <HeaderBar />

      {/* Mobile agent strip */}
      <div className="lg:hidden px-4 py-3">
        <AgentAvatarStrip agentStatuses={agentStatuses} />
      </div>

      {/* 3-column grid */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_320px] gap-4 lg:gap-5">
          {/* Left — Agent Sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-[52px] pt-4 max-h-[calc(100vh-52px)] overflow-y-auto scrollbar-hide">
              <AgentSidebar agentStatuses={agentStatuses} />
            </div>
          </aside>

          {/* Center — Tabbed content */}
          <main className="min-w-0 pt-4 lg:max-h-[calc(100vh-52px)] lg:overflow-hidden lg:flex lg:flex-col">
            <CenterTabs
              weeklyStats={weeklyStats}
              allTimeStats={allTimeStats}
              blogPosts={blogPosts}
            />
          </main>

          {/* Right — Live Feed + CTA (desktop: sticky sidebar, mobile: stacked below center) */}
          <aside className="hidden lg:block">
            <div className="sticky top-[52px] pt-4 flex flex-col gap-3 max-h-[calc(100vh-52px)]">
              <div className="flex-1 min-h-0">
                <p className="text-xs text-text-secondary mb-1">Real-time log of what the agents are doing right now.</p>
                <LiveFeed feed={recentFeed} />
              </div>
              <WaitlistCTA />
            </div>
          </aside>
        </div>

        {/* Mobile: Live Feed + CTA stacked below the grid */}
        <div className="lg:hidden mt-4 space-y-3">
          <p className="text-xs text-text-secondary mb-1">Real-time log of what the agents are doing right now.</p>
          <LiveFeed feed={recentFeed} />
          <WaitlistCTA />
        </div>
      </div>
    </div>
  );
}
