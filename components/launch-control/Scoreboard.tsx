"use client";

import { useRef, useState, useEffect } from "react";
import { useCountUp } from "@/lib/useCountUp";
import type { WeeklyStats } from "@/lib/launch-control-types";

interface ScoreboardProps {
  weeklyStats: WeeklyStats | undefined;
  allTimeStats: WeeklyStats | undefined;
}

function StatCard({
  label,
  value,
  suffix,
  delay,
  enabled,
  accent,
}: {
  label: string;
  value: number;
  suffix?: string;
  delay: number;
  enabled: boolean;
  accent?: string;
}) {
  const display = useCountUp(value, 2000, delay, enabled);

  return (
    <div className="rounded-xl border border-border-color/40 bg-surface p-2.5 sm:p-4 text-center">
      <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-text-primary tracking-tight">
        {enabled ? display.toLocaleString() : "—"}
        {suffix && <span className="text-lg text-text-secondary">{suffix}</span>}
      </div>
      <p className={`meta-label mt-1 ${accent ? accent : "text-text-secondary"}`}>{label}</p>
    </div>
  );
}

export default function Scoreboard({ weeklyStats, allTimeStats }: ScoreboardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const q = weeklyStats?.questions ?? 0;
  const b = weeklyStats?.briefs ?? 0;
  const bl = weeklyStats?.blogs ?? 0;
  const humanHours = Math.round((q / 50) * 2.5 + b * 4 + bl * 4 + 5 * 3);
  const costSaved = Math.round((q / 50) * 112.5 + b * 180 + bl * 300 + 5 * 180);
  const loaded = weeklyStats !== undefined;

  return (
    <div ref={ref}>
      <p className="meta-label text-text-secondary mb-3">This Week&apos;s Impact</p>

      {/* Primary stats */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
        <StatCard label="Questions" value={q} delay={0} enabled={visible && loaded} />
        <StatCard label="Briefs" value={b} delay={150} enabled={visible && loaded} />
        <StatCard label="Blogs" value={bl} delay={300} enabled={visible && loaded} />
        <StatCard
          label="Hours Saved"
          value={humanHours}
          suffix="h"
          delay={450}
          enabled={visible && loaded}
          accent="text-accent-emerald"
        />
        <StatCard
          label="Cost Saved"
          value={costSaved}
          suffix=""
          delay={600}
          enabled={visible && loaded}
          accent="text-accent-blue"
        />
      </div>

      {/* All-time stats */}
      {allTimeStats && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 px-1">
          <span className="meta-label text-text-secondary">All Time</span>
          <span className="font-mono text-xs text-text-secondary">
            {allTimeStats.questions} questions &middot; {allTimeStats.briefs} briefs &middot; {allTimeStats.blogs} blogs
          </span>
        </div>
      )}
    </div>
  );
}
