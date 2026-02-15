"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CommunitiesPanel() {
  const breakdown = useQuery(api.questions.communityBreakdown);

  if (breakdown === undefined) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl border border-border-color/30 p-3 sm:p-4 animate-pulse">
            <div className="h-4 bg-surface-alt rounded w-3/4 mb-2" />
            <div className="h-6 bg-surface-alt rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (breakdown.length === 0) {
    return (
      <p className="text-xs text-text-secondary italic text-center py-8">
        No communities scanned yet — Vibhishana scans 12+ communities daily
      </p>
    );
  }

  const sorted = [...breakdown].sort((a, b) => b.count - a.count);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {sorted.map((item) => (
        <div
          key={item.subreddit}
          className="rounded-xl border border-border-color/30 bg-surface-alt/30 p-3 sm:p-4 hover:border-border-color/60 transition-colors"
        >
          <p className="text-sm font-medium text-text-primary truncate">{item.subreddit}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display text-2xl font-semibold text-text-primary">{item.count}</span>
            <span className="text-[10px] text-text-secondary font-mono">questions</span>
          </div>
          <p className="text-[10px] text-text-secondary font-mono mt-1">
            Last: {new Date(item.latestScannedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
