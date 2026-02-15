"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import BriefCard from "./BriefCard";
import BriefReaderModal from "./BriefReaderModal";

export default function BriefsPanel() {
  const briefs = useQuery(api.briefs.listFull, { limit: 20 });
  const [selectedBriefId, setSelectedBriefId] = useState<Id<"briefs"> | null>(null);

  if (briefs === undefined) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-border-color/30 p-4">
            <div className="h-4 bg-surface-alt rounded w-3/4 mb-2" />
            <div className="h-3 bg-surface-alt rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (briefs.length === 0) {
    return (
      <p className="text-xs text-text-secondary italic text-center py-8">
        No briefs yet — Vibhishana creates 3/day from community research
      </p>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {briefs.map((brief) => (
          <BriefCard
            key={brief._id}
            brief={brief}
            onClick={() => setSelectedBriefId(brief._id)}
          />
        ))}
      </div>

      {selectedBriefId && (
        <BriefReaderModal
          briefId={selectedBriefId}
          onClose={() => setSelectedBriefId(null)}
        />
      )}
    </>
  );
}
