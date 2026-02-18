"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  planned: { label: "Planned", color: "text-amber-700", bg: "bg-amber-500/10 border-amber-500/20" },
  "brief-ready": { label: "Brief Ready", color: "text-blue-700", bg: "bg-blue-500/10 border-blue-500/20" },
  published: { label: "Published", color: "text-emerald-700", bg: "bg-emerald-500/10 border-emerald-500/20" },
};

const INTENT_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  informational: { label: "Informational", color: "text-gray-700", bg: "bg-gray-500/10" },
  comparison: { label: "Comparison", color: "text-amber-700", bg: "bg-amber-500/10" },
  decision: { label: "Decision", color: "text-emerald-700", bg: "bg-emerald-500/10" },
};

const COMPLEXITY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  simple: { label: "Simple", color: "text-emerald-700", bg: "bg-emerald-500/10" },
  medium: { label: "Medium", color: "text-amber-700", bg: "bg-amber-500/10" },
};

const TOOL_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  proposed: { label: "Proposed", color: "text-amber-700", bg: "bg-amber-500/10 border-amber-500/20" },
  approved: { label: "Approved", color: "text-blue-700", bg: "bg-blue-500/10 border-blue-500/20" },
  rejected: { label: "Rejected", color: "text-red-700", bg: "bg-red-500/10 border-red-500/20" },
  built: { label: "Built", color: "text-purple-700", bg: "bg-purple-500/10 border-purple-500/20" },
  live: { label: "Live", color: "text-emerald-700", bg: "bg-emerald-500/10 border-emerald-500/20" },
};

function Badge({ config, value }: { config: Record<string, { label: string; color: string; bg: string }>; value: string }) {
  const c = config[value] ?? { label: value, color: "text-text-secondary", bg: "bg-surface-alt" };
  return (
    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${c.bg} ${c.color}`}>
      {c.label}
    </span>
  );
}

export default function StrategyPanel() {
  const clusters = useQuery(api.topicClusters.listFull, {});
  const tools = useQuery(api.toolOpportunities.listFull, {});

  if (clusters === undefined || tools === undefined) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-border-color/30 p-4">
            <div className="h-4 bg-surface-alt rounded w-3/4 mb-2" />
            <div className="h-3 bg-surface-alt rounded w-1/2" />
          </div>
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

  // Group clusters by pillar
  const grouped: Record<string, typeof clusters> = {};
  for (const c of clusters) {
    if (!grouped[c.pillarName]) grouped[c.pillarName] = [];
    grouped[c.pillarName].push(c);
  }

  return (
    <div className="p-4 space-y-6">
      {/* Topic Clusters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <h3 className="text-sm font-semibold text-text-primary">Topic Clusters</h3>
          <span className="text-[10px] text-text-secondary font-mono">{clusters.length} total</span>
        </div>

        {clusters.length === 0 ? (
          <p className="text-xs text-text-secondary italic">No clusters mapped yet.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).map(([pillar, items]) => (
              <div key={pillar}>
                <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-2">{pillar}</p>
                <div className="space-y-1.5">
                  {items.map((c) => (
                    <div
                      key={c._id}
                      className="flex items-center justify-between gap-2 rounded-lg border border-border-color/30 bg-surface-alt/20 px-3 py-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-text-primary truncate">{c.clusterTopic}</p>
                        <p className="text-[10px] font-mono text-text-secondary/70 mt-0.5">{c.targetKeyword}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Badge config={STATUS_CONFIG} value={c.status} />
                        <Badge config={INTENT_CONFIG} value={c.intentType} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border-color/30" />

      {/* Tool Opportunities */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <h3 className="text-sm font-semibold text-text-primary">Tool Opportunities</h3>
          <span className="text-[10px] text-text-secondary font-mono">{tools.length} total</span>
        </div>

        {tools.length === 0 ? (
          <p className="text-xs text-text-secondary italic">No tool opportunities identified yet.</p>
        ) : (
          <div className="space-y-2">
            {tools.map((t) => (
              <div
                key={t._id}
                className="rounded-lg border border-border-color/30 bg-surface-alt/20 px-3 py-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-text-primary">{t.toolName}</p>
                    <p className="text-[10px] italic text-text-secondary mt-0.5 line-clamp-2">{t.sourceQuestion}</p>
                    <p className="text-[10px] font-mono text-text-secondary/70 mt-1">{t.targetKeyword}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Badge config={COMPLEXITY_CONFIG} value={t.complexity} />
                    <Badge config={TOOL_STATUS_CONFIG} value={t.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
