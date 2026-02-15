"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Scoreboard from "./Scoreboard";
import DailyTimeline from "./DailyTimeline";
import CommunitiesPanel from "./CommunitiesPanel";
import QuestionsTable from "./QuestionsTable";
import BriefsPanel from "./BriefsPanel";
import type { WeeklyStats } from "@/lib/launch-control-types";

type Tab = "overview" | "communities" | "questions" | "briefs";

const PUBLIC_TABS: { label: string; value: Tab }[] = [
  { label: "Overview", value: "overview" },
];

const ADMIN_TABS: { label: string; value: Tab }[] = [
  { label: "Communities", value: "communities" },
  { label: "Questions", value: "questions" },
  { label: "Briefs", value: "briefs" },
];

interface CenterTabsProps {
  weeklyStats: WeeklyStats | undefined;
  allTimeStats: WeeklyStats | undefined;
}

export default function CenterTabs({ weeklyStats, allTimeStats }: CenterTabsProps) {
  const { isSignedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const visibleTabs = isSignedIn
    ? [...PUBLIC_TABS, ...ADMIN_TABS]
    : PUBLIC_TABS;

  // If signed out and on an admin tab, reset to overview
  if (!isSignedIn && activeTab !== "overview") {
    setActiveTab("overview");
  }

  return (
    <div>
      {/* Tab bar — scrollable on mobile */}
      <div className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-hide -mx-1 px-1">
        {visibleTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === tab.value
                ? "bg-surface text-text-primary shadow-sm border border-border-color/40"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-alt/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          <Scoreboard weeklyStats={weeklyStats} allTimeStats={allTimeStats} />
          <DailyTimeline />
        </div>
      )}
      {activeTab === "communities" && (
        <div className="rounded-2xl border border-border-color/40 bg-surface p-4">
          <CommunitiesPanel />
        </div>
      )}
      {activeTab === "questions" && (
        <div className="rounded-2xl border border-border-color/40 bg-surface overflow-hidden">
          <QuestionsTable />
        </div>
      )}
      {activeTab === "briefs" && (
        <div className="rounded-2xl border border-border-color/40 bg-surface p-4">
          <BriefsPanel />
        </div>
      )}
    </div>
  );
}
