"use client";

import { BRIEF_STATUS_CONFIG } from "@/lib/launch-control-types";
import type { Doc } from "@/convex/_generated/dataModel";

interface BriefCardProps {
  brief: Doc<"briefs">;
  onClick: () => void;
}

export default function BriefCard({ brief, onClick }: BriefCardProps) {
  const statusConfig = BRIEF_STATUS_CONFIG[brief.status] ?? {
    label: brief.status,
    color: "text-text-secondary",
    bg: "bg-surface-alt border-border-color/30",
  };

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border border-border-color/30 bg-surface p-4 hover:border-border-color/60 hover:shadow-card transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-medium text-text-primary line-clamp-2 flex-1">
          {brief.title}
        </h3>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${statusConfig.color} ${statusConfig.bg}`}>
          {statusConfig.label}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-blue/10 text-accent-blue">
          {brief.primaryKeyword}
        </span>
        {brief.category && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-alt text-text-secondary">
            {brief.category}
          </span>
        )}
        <span className="text-[10px] text-text-secondary font-mono ml-auto">
          {new Date(brief.createdAt).toLocaleDateString()}
        </span>
      </div>
    </button>
  );
}
