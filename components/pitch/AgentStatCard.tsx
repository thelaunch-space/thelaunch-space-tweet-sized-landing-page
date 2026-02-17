"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Agent } from "@/lib/agents";
import type { PitchAgent } from "@/lib/pitch-data";
import StatusDot from "@/components/launch-control/StatusDot";
import type { StatusDotColor } from "@/lib/launch-control-types";
import StatBar from "./StatBar";
import { useGeo } from "@/lib/useGeo";
import { getGeoConfig } from "@/lib/geo-savings";

interface AgentStatCardProps {
  pitchAgent: PitchAgent;
  agent: Agent;
  agentStatus: { agentName: string; lastStatus: string } | undefined;
  weeklySummary: { total: number; byAction: Record<string, number> } | undefined;
}

function statusToColor(status: string | undefined): StatusDotColor {
  if (!status) return "gray";
  if (status === "completed" || status === "success") return "green";
  if (status === "running" || status === "in_progress") return "orange";
  if (status === "error") return "red";
  return "gray";
}

/* ─── Coming Soon Card ──────────────────────────────────────────────── */

function ComingSoonCard({
  pitchAgent,
  agent,
}: {
  pitchAgent: PitchAgent;
  agent: Agent;
}) {
  const region = useGeo();
  const config = getGeoConfig(region);
  const agentSavings = config.agents[pitchAgent.agentId];

  return (
    <div className="h-full flex flex-col rounded-2xl border border-border-color bg-surface shadow-card overflow-hidden relative">
      {/* Greyed-out accent top line */}
      <div
        className="h-1 flex-shrink-0"
        style={{
          background: `linear-gradient(to right, ${agent.accentHex}40, transparent)`,
        }}
      />

      {/* Character portrait — greyed out, same height as active cards */}
      <div className="relative w-full h-48 flex-shrink-0 overflow-hidden bg-surface-alt">
        <Image
          src={agent.avatarPath}
          alt={agent.name}
          fill
          className="object-contain object-center grayscale opacity-40"
          sizes="(max-width: 768px) 100vw, 280px"
        />
        {/* Bottom gradient fade into card bg */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, #FFFFFF 0%, #FFFFFF 15%, transparent 100%)",
          }}
        />
      </div>

      {/* Content — same structure as active cards */}
      <div className="px-5 pb-5 -mt-4 relative flex-1 flex flex-col">
        <h3 className="font-display tracking-[-0.02em] text-xl text-text-secondary">
          {pitchAgent.plainTitle}
        </h3>
        <p className="text-text-secondary/60 text-sm">{agent.name}</p>
        <p className="text-text-secondary/50 text-xs mt-1 italic">{pitchAgent.tagline}</p>

        {/* Greyed stats */}
        <div className="mt-4 space-y-3 opacity-30">
          <StatBar label="Pace" value={pitchAgent.paceScore} max={10} accentColor="#9CA3AF" />
          <StatBar label="Intelligence" value={pitchAgent.intelScore} max={10} accentColor="#9CA3AF" />
        </div>

        {/* Monthly savings — greyed */}
        <div className="mt-4 flex items-center justify-between opacity-30">
          <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-text-secondary">
            MONTHLY SAVINGS
          </span>
          <span className="text-sm font-semibold text-text-secondary">
            {agentSavings?.monthlySavings ?? "—"}
          </span>
        </div>

        {/* Skill tags — greyed */}
        <div className="mt-3 flex flex-wrap gap-1.5 opacity-30">
          {pitchAgent.skillTags.map((tag) => (
            <span
              key={tag}
              className="bg-surface-alt rounded-full px-3 py-1 text-xs font-mono text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cost equivalent — greyed, pushed to bottom */}
        <p className="mt-auto pt-3 text-text-secondary/40 text-xs">
          {agentSavings?.costEquivalent ?? "—"}
        </p>
      </div>

      {/* Joining Soon overlay badge */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-mono tracking-[0.12em] uppercase border"
          style={{
            background: `${agent.accentHex}10`,
            borderColor: `${agent.accentHex}30`,
            color: agent.accentHex,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: agent.accentHex }}
          />
          Joining Soon
        </span>
      </div>
    </div>
  );
}

/* ─── Active Card Front ─────────────────────────────────────────────── */

function CardFront({
  pitchAgent,
  agent,
  agentStatus,
}: {
  pitchAgent: PitchAgent;
  agent: Agent;
  agentStatus: AgentStatCardProps["agentStatus"];
}) {
  const region = useGeo();
  const config = getGeoConfig(region);
  const agentSavings = config.agents[pitchAgent.agentId];

  return (
    <div className="h-full flex flex-col rounded-2xl border border-border-color bg-surface shadow-card overflow-hidden">
      {/* Accent top line */}
      <div className="h-1 flex-shrink-0" style={{ background: `linear-gradient(to right, ${agent.accentHex}, transparent)` }} />

      {/* Character portrait — full, centered, with gradient fade */}
      <div className="relative w-full h-48 flex-shrink-0 overflow-hidden bg-surface-alt">
        <Image
          src={agent.avatarPath}
          alt={agent.name}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 280px"
        />
        {/* Bottom gradient fade into card bg */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, #FFFFFF 0%, #FFFFFF 15%, transparent 100%)",
          }}
        />
      </div>

      <div className="px-5 pb-5 -mt-4 relative flex-1 flex flex-col">
        {/* Title row with status dot */}
        <div className="flex items-center gap-2">
          <h3 className="font-display tracking-[-0.02em] text-xl text-text-primary">
            {pitchAgent.plainTitle}
          </h3>
          <StatusDot color={statusToColor(agentStatus?.lastStatus)} size="sm" />
        </div>
        <p className="text-text-secondary text-sm">{agent.name}</p>
        <p className="text-text-secondary text-xs mt-1 italic">{pitchAgent.tagline}</p>

        {/* Stats */}
        <div className="mt-4 space-y-3">
          <StatBar label="Pace" value={pitchAgent.paceScore} max={10} accentColor={agent.accentHex} />
          <StatBar label="Intelligence" value={pitchAgent.intelScore} max={10} accentColor={agent.accentHex} />
        </div>

        {/* Monthly savings */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-text-secondary">
            MONTHLY SAVINGS
          </span>
          <span className="text-sm font-semibold text-text-primary">
            {agentSavings?.monthlySavings ?? "—"}
          </span>
        </div>

        {/* Skill tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pitchAgent.skillTags.map((tag) => (
            <span
              key={tag}
              className="bg-surface-alt rounded-full px-3 py-1 text-xs font-mono text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cost equivalent — pushed to bottom */}
        <p className="mt-auto pt-3 text-text-secondary text-xs">
          {agentSavings?.costEquivalent ?? "—"}
        </p>
      </div>
    </div>
  );
}

/* ─── Card Back (flip) ──────────────────────────────────────────────── */

function CardBack({
  agent,
  weeklySummary,
}: {
  agent: Agent;
  weeklySummary: AgentStatCardProps["weeklySummary"];
}) {
  return (
    <div className="rounded-2xl border border-border-color bg-surface shadow-card overflow-hidden h-full">
      <div className="h-1" style={{ background: `linear-gradient(to right, ${agent.accentHex}, transparent)` }} />
      <div className="p-5">
        <h4 className="text-[10px] font-mono tracking-[0.12em] uppercase text-text-secondary">
          LAST 7 DAYS
        </h4>

        {weeklySummary ? (
          <>
            <p className="mt-3 text-2xl font-display tracking-[-0.03em] text-text-primary">
              {weeklySummary.total}
              <span className="text-sm font-sans text-text-secondary ml-1.5">actions</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Object.entries(weeklySummary.byAction).map(([action, count]) => (
                <span
                  key={action}
                  className="bg-surface-alt rounded-full px-3 py-1 text-xs font-mono text-text-secondary"
                >
                  {action.replace(/_/g, " ")}{" "}
                  <span className="text-text-primary font-semibold">{count}</span>
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-4 space-y-2">
            <div className="h-4 w-24 bg-surface-alt rounded animate-pulse" />
            <div className="h-4 w-32 bg-surface-alt rounded animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────── */

export default function AgentStatCard({
  pitchAgent,
  agent,
  agentStatus,
  weeklySummary,
}: AgentStatCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Coming soon agents get a different card entirely
  if (pitchAgent.comingSoon) {
    return <ComingSoonCard pitchAgent={pitchAgent} agent={agent} />;
  }

  return (
    <>
      {/* Desktop: 3D flip */}
      <div
        className="hidden md:block h-full"
        style={{ perspective: 1200 }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full"
        >
          {/* Front */}
          <div className="h-full" style={{ backfaceVisibility: "hidden" }}>
            <CardFront pitchAgent={pitchAgent} agent={agent} agentStatus={agentStatus} />
          </div>
          {/* Back */}
          <div
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            className="absolute inset-0"
          >
            <CardBack agent={agent} weeklySummary={weeklySummary} />
          </div>
        </motion.div>
      </div>

      {/* Mobile: inline with accordion */}
      <div className="md:hidden">
        <CardFront pitchAgent={pitchAgent} agent={agent} agentStatus={agentStatus} />

        {/* Accordion trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full mt-2 flex items-center justify-between px-5 py-3 rounded-xl border border-border-color bg-surface text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase">Last 7 days</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-xl border border-border-color bg-surface p-4">
              {weeklySummary ? (
                <>
                  <p className="text-lg font-display tracking-[-0.02em] text-text-primary">
                    {weeklySummary.total}
                    <span className="text-sm font-sans text-text-secondary ml-1.5">actions</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {Object.entries(weeklySummary.byAction).map(([action, count]) => (
                      <span
                        key={action}
                        className="bg-surface-alt rounded-full px-3 py-1 text-xs font-mono text-text-secondary"
                      >
                        {action.replace(/_/g, " ")}{" "}
                        <span className="text-text-primary font-semibold">{count}</span>
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-surface-alt rounded animate-pulse" />
                  <div className="h-4 w-32 bg-surface-alt rounded animate-pulse" />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
