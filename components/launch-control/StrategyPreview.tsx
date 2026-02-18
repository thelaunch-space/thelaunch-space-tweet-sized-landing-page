"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PreviewGate from "./PreviewGate";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  planned: { label: "Planned", color: "text-amber-700", bg: "bg-amber-500/10 border-amber-500/20" },
  "brief-ready": { label: "Brief Ready", color: "text-blue-700", bg: "bg-blue-500/10 border-blue-500/20" },
  published: { label: "Published", color: "text-emerald-700", bg: "bg-emerald-500/10 border-emerald-500/20" },
};

const COMPLEXITY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  simple: { label: "Simple", color: "text-emerald-700", bg: "bg-emerald-500/10" },
  medium: { label: "Medium", color: "text-amber-700", bg: "bg-amber-500/10" },
};

export default function StrategyPreview() {
  const clusters = useQuery(api.topicClusters.listRecent, { limit: 3 });
  const tools = useQuery(api.toolOpportunities.listRecent, { limit: 3 });

  if (clusters === undefined || tools === undefined) {
    return (
      <div className="space-y-3 animate-pulse p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-surface-alt rounded-xl" />
        ))}
      </div>
    );
  }

  if (clusters.length === 0 && tools.length === 0) {
    return (
      <p className="text-xs text-text-secondary italic text-center py-8">
        No data yet — Vidura will populate this after his first analysis runs.
      </p>
    );
  }

  return (
    <PreviewGate>
      <div className="space-y-4 p-4">
        {/* Topic Clusters */}
        {clusters.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-cyan-600 uppercase tracking-wider mb-2">Topic Clusters</p>
            <div className="space-y-1.5">
              {clusters.map((c) => {
                const statusConf = STATUS_CONFIG[c.status] ?? { label: c.status, color: "text-text-secondary", bg: "bg-surface-alt border-border-color/30" };
                return (
                  <div
                    key={c._id}
                    className="rounded-xl border border-border-color/30 bg-surface-alt/30 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-text-primary">{c.clusterTopic}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5">{c.pillarName}</p>
                      </div>
                      <span className={`shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded border ${statusConf.bg} ${statusConf.color}`}>
                        {statusConf.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tool Opportunities */}
        {tools.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-cyan-600 uppercase tracking-wider mb-2">Tool Opportunities</p>
            <div className="space-y-1.5">
              {tools.map((t) => {
                const complexConf = COMPLEXITY_CONFIG[t.complexity] ?? { label: t.complexity, color: "text-text-secondary", bg: "bg-surface-alt" };
                return (
                  <div
                    key={t._id}
                    className="rounded-xl border border-border-color/30 bg-surface-alt/30 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-text-primary">{t.toolName}</p>
                        <p className="text-[10px] font-mono text-text-secondary mt-0.5">{t.targetKeyword}</p>
                      </div>
                      <span className={`shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded ${complexConf.bg} ${complexConf.color}`}>
                        {complexConf.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PreviewGate>
  );
}
