"use client";

import { useState } from "react";
import type { AdminTab } from "@/lib/launch-control-types";
import CommunitiesPanel from "./CommunitiesPanel";
import QuestionsTable from "./QuestionsTable";
import BriefsPanel from "./BriefsPanel";

const TABS: { label: string; value: AdminTab }[] = [
  { label: "Communities", value: "communities" },
  { label: "Questions", value: "questions" },
  { label: "Briefs", value: "briefs" },
];

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState<AdminTab>("communities");

  return (
    <div className="rounded-2xl border border-border-color/40 bg-surface overflow-hidden">
      {/* Tab bar */}
      <div className="px-4 py-2 border-b border-border-color/40 flex items-center gap-1">
        <span className="meta-label text-text-secondary mr-3">Admin</span>
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === tab.value
                ? "bg-surface-alt text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4">
        {activeTab === "communities" && <CommunitiesPanel />}
        {activeTab === "questions" && <QuestionsTable />}
        {activeTab === "briefs" && <BriefsPanel />}
      </div>
    </div>
  );
}
