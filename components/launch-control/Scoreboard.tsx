"use client";

import { useRef, useState, useEffect } from "react";
import { useCountUp } from "@/lib/useCountUp";
import type { WeeklyStats } from "@/lib/launch-control-types";
import { useGeo } from "@/lib/useGeo";
import {
  calculateCostSaved,
  calculateHoursSaved,
  formatCurrency,
  getGeoConfig,
} from "@/lib/geo-savings";
import SavingsTooltip from "@/components/ui/SavingsTooltip";

type TimeRange = "week" | "allTime";

interface ScoreboardProps {
  weeklyStats: WeeklyStats | undefined;
  allTimeStats: WeeklyStats | undefined;
}

function StatCard({
  label,
  subtitle,
  value,
  suffix,
  delay,
  enabled,
  accent,
  formatFn,
}: {
  label: string;
  subtitle?: string;
  value: number;
  suffix?: string;
  delay: number;
  enabled: boolean;
  accent?: string;
  formatFn?: (n: number) => string;
}) {
  const display = useCountUp(value, 2000, delay, enabled);

  return (
    <div className="rounded-xl border border-border-color/40 bg-surface p-2.5 sm:p-4 text-center">
      <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-text-primary tracking-tight">
        {enabled
          ? formatFn
            ? formatFn(display)
            : display.toLocaleString()
          : "—"}
        {suffix && <span className="text-lg text-text-secondary">{suffix}</span>}
      </div>
      <div className="min-h-[2.5rem]">
        <p className={`meta-label mt-2 ${accent ? accent : "text-text-secondary"}`}>{label}</p>
        {subtitle && (
          <p className="text-[10px] text-text-secondary/70 mt-0.5 leading-tight">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default function Scoreboard({ weeklyStats, allTimeStats }: ScoreboardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [range, setRange] = useState<TimeRange>("week");
  const region = useGeo();
  const config = getGeoConfig(region);

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

  const active = range === "week" ? weeklyStats : allTimeStats;
  const q = active?.questions ?? 0;
  const b = active?.briefs ?? 0;
  const bl = active?.blogs ?? 0;
  const cl = active?.clusters ?? 0;
  const tl = active?.tools ?? 0;
  const stats = { questions: q, briefs: b, blogs: bl };
  const humanHours = calculateHoursSaved(stats);
  const costSaved = calculateCostSaved(stats, region);
  const loaded = active !== undefined;

  const costSubtitle =
    region === "IN"
      ? "based on Indian market rates"
      : "based on US freelancer rates";

  return (
    <div ref={ref} data-tour="scoreboard">
      {/* Toggle header */}
      <div className="flex items-center gap-1 mb-3">
        <button
          onClick={() => setRange("week")}
          className={`meta-label px-2.5 py-1 rounded-md transition-colors ${
            range === "week"
              ? "bg-surface-alt text-text-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => setRange("allTime")}
          className={`meta-label px-2.5 py-1 rounded-md transition-colors ${
            range === "allTime"
              ? "bg-surface-alt text-text-primary"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          All Time
        </button>
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
        <StatCard label="Questions" subtitle="Customer questions found on Reddit" value={q} delay={0} enabled={visible && loaded} />
        <StatCard label="Briefs" subtitle="Research docs → blog topics" value={b} delay={150} enabled={visible && loaded} />
        <StatCard label="Blogs" subtitle="Published SEO posts" value={bl} delay={300} enabled={visible && loaded} />
        <StatCard
          label="Clusters"
          subtitle="Strategic topic pillars mapped"
          value={cl}
          delay={375}
          enabled={visible && loaded}
          accent="text-cyan-500"
        />
        <StatCard
          label="Tools"
          subtitle="Interactive tool ideas identified"
          value={tl}
          delay={425}
          enabled={visible && loaded}
          accent="text-cyan-500"
        />
        <StatCard
          label="Hours Saved"
          subtitle="vs doing this manually"
          value={humanHours}
          suffix="h"
          delay={450}
          enabled={visible && loaded}
          accent="text-accent-emerald"
        />
        <div className="rounded-xl border border-border-color/40 bg-surface p-2.5 sm:p-4 text-center">
          <SavingsTooltip rationale={config.rationale}>
            <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-text-primary tracking-tight">
              <CostDisplay value={costSaved} enabled={visible && loaded} region={region} />
            </div>
          </SavingsTooltip>
          <div className="min-h-[2.5rem]">
            <p className="meta-label mt-2 text-accent-blue">Cost Saved</p>
            <p className="text-[10px] text-text-secondary/70 mt-0.5 leading-tight">{costSubtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CostDisplay({
  value,
  enabled,
  region,
}: {
  value: number;
  enabled: boolean;
  region: "IN" | "INTL";
}) {
  const display = useCountUp(value, 2000, 600, enabled);
  return <>{enabled ? formatCurrency(display, region) : "—"}</>;
}
