"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@clerk/nextjs";
import Scoreboard from "./Scoreboard";
import DailyTimeline from "./DailyTimeline";
import BlogsPanel from "./BlogsPanel";
import type { WeeklyStats } from "@/lib/launch-control-types";
import type { BlogPost } from "@/lib/blog";

// Lazy-load tab panels to avoid heavy initial bundle
const CommunitiesPanel = dynamic(() => import("./CommunitiesPanel"));
const CommunitiesPreview = dynamic(() => import("./CommunitiesPreview"));
const QuestionsTable = dynamic(() => import("./QuestionsTable"));
const QuestionsPreview = dynamic(() => import("./QuestionsPreview"));
const BriefsPanel = dynamic(() => import("./BriefsPanel"));
const BriefsPreview = dynamic(() => import("./BriefsPreview"));
const MeetingsPanel = dynamic(() => import("./MeetingsPanel"));

type Tab = "overview" | "blogs" | "communities" | "questions" | "briefs" | "meetings";

const TAB_DESCRIPTIONS: Record<Tab, string> = {
  overview: "A summary of what your AI team produced",
  blogs: "SEO blogs Vyasa, The Writer published from Vibhishana\u2019s research briefs",
  communities: "The communities Vibhishana, The Scout is monitoring",
  questions: "Customer questions Vibhishana, The Scout found across Reddit and forums",
  briefs: "Research docs Vibhishana, The Scout creates for Vyasa, The Writer to turn into blogs",
  meetings: "",
};

const TABS: { label: string; value: Tab }[] = [
  { label: "Overview", value: "overview" },
  { label: "Blogs", value: "blogs" },
  { label: "Communities", value: "communities" },
  { label: "Questions", value: "questions" },
  { label: "Briefs", value: "briefs" },
  { label: "Meetings", value: "meetings" },
];

interface CenterTabsProps {
  weeklyStats: WeeklyStats | undefined;
  allTimeStats: WeeklyStats | undefined;
  blogPosts: BlogPost[];
}

export default function CenterTabs({ weeklyStats, allTimeStats, blogPosts }: CenterTabsProps) {
  const { isSignedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div>
      {/* Tab bar */}
      <div data-tour="tab-bar" className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-hide -mx-1 px-1">
        {TABS.filter((t) => t.value !== "meetings" || isSignedIn).map((tab) => (
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

      {/* Tab description */}
      {TAB_DESCRIPTIONS[activeTab] && (
        <p className="text-xs text-text-secondary mb-3">{TAB_DESCRIPTIONS[activeTab]}</p>
      )}

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          <Scoreboard weeklyStats={weeklyStats} allTimeStats={allTimeStats} />
          <DailyTimeline />
        </div>
      )}
      {activeTab === "blogs" && (
        <div className="rounded-2xl border border-border-color/40 bg-surface overflow-hidden">
          <BlogsPanel blogPosts={blogPosts} />
        </div>
      )}
      {activeTab === "questions" && (
        <div className="rounded-2xl border border-border-color/40 bg-surface overflow-hidden">
          {isSignedIn ? <QuestionsTable /> : <QuestionsPreview />}
        </div>
      )}
      {activeTab === "briefs" && (
        <div className="rounded-2xl border border-border-color/40 bg-surface overflow-hidden">
          {isSignedIn ? <BriefsPanel /> : <BriefsPreview />}
        </div>
      )}
      {activeTab === "communities" && (
        <div className="rounded-2xl border border-border-color/40 bg-surface overflow-hidden">
          {isSignedIn ? <CommunitiesPanel /> : <CommunitiesPreview />}
        </div>
      )}
      {activeTab === "meetings" && isSignedIn && (
        <div className="rounded-2xl border border-border-color/40 bg-surface overflow-hidden">
          <MeetingsPanel />
        </div>
      )}
    </div>
  );
}
