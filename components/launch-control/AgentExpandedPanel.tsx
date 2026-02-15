"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Agent } from "@/lib/agents";
import type { StatusDotColor } from "@/lib/launch-control-types";
import StatusDot from "./StatusDot";
import Link from "next/link";

interface AgentExpandedPanelProps {
  agent: Agent;
  onClose: () => void;
}

function deriveStatus(agentName: string, statuses: { agentName: string; lastStatus: string; lastTimestamp: string | null }[] | undefined): { color: StatusDotColor; label: string } {
  if (!statuses) return { color: "gray", label: "Loading" };
  const match = statuses.find(
    (s) => s.agentName.toLowerCase() === agentName.toLowerCase()
  );
  if (!match || !match.lastTimestamp) return { color: "gray", label: "Offline" };
  const elapsed = Date.now() - new Date(match.lastTimestamp).getTime();
  if (match.lastStatus === "error" || elapsed > 24 * 60 * 60 * 1000) return { color: "red", label: "Error" };
  if (match.lastStatus === "active" && elapsed < 30 * 60 * 1000) return { color: "green", label: "Working" };
  if (match.lastStatus === "completed" && elapsed < 2 * 60 * 60 * 1000) return { color: "orange", label: "Idle" };
  return { color: "red", label: "Offline" };
}

export default function AgentExpandedPanel({ agent, onClose }: AgentExpandedPanelProps) {
  const todayActivity = useQuery(api.agentActivity.agentTodayActivity, {
    agentName: agent.name,
  });
  const weeklySummary = useQuery(api.agentActivity.agentWeeklySummary, {
    agentName: agent.name,
  });
  const agentStatuses = useQuery(api.agentActivity.agentStatuses);
  const status = deriveStatus(agent.name, agentStatuses);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const panelContent = (
    <div ref={panelRef}>
      {/* ─── Full-bleed portrait — seamless stage ─── */}
      <div className="relative overflow-hidden max-h-[200px] sm:max-h-[260px] bg-white">
        {/* Character — masked edges so PNG boundary disappears */}
        <img
          src={agent.avatarPath}
          alt={agent.name}
          className="w-full h-[200px] sm:h-[260px] object-contain object-top"
          style={{
            filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.10)) drop-shadow(0 2px 4px rgba(0,0,0,0.06))",
            maskImage: "linear-gradient(to bottom, white 60%, transparent 100%), linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage: "linear-gradient(to bottom, white 60%, transparent 100%), linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%)",
            WebkitMaskComposite: "destination-in",
          }}
        />
        {/* Status badge — top right */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-border-color/20 shadow-sm">
            <StatusDot color={status.color} size="sm" />
            <span className="text-[10px] font-semibold text-text-primary">{status.label}</span>
          </div>
        </div>
      </div>

      {/* ─── Content ─── */}
      <div className="px-4 pb-5 -mt-4 relative">
        {/* Name + Role */}
        <h2 className="font-display text-xl font-semibold text-text-primary leading-tight">
          {agent.name}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: agent.accentHex }}
          />
          <span className="meta-label text-text-secondary">{agent.role}</span>
        </div>
        <div
          className="w-10 h-0.5 rounded-full mt-2.5 mb-4"
          style={{ background: agent.accentHex }}
        />

        {/* Today's Work */}
        <div className="mb-4">
          <p className="meta-label text-text-secondary mb-2">Today</p>
          {todayActivity === undefined ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <div key={i} className="h-3.5 bg-surface-alt rounded animate-pulse" />
              ))}
            </div>
          ) : todayActivity.length === 0 ? (
            <p className="text-xs text-text-secondary italic">
              No activity yet today
            </p>
          ) : (
            <div className="space-y-1.5">
              {todayActivity.slice(0, 5).map((item) => (
                <div key={item._id} className="flex items-start gap-2 text-xs">
                  <div
                    className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                    style={{ background: agent.accentHex }}
                  />
                  <span className="text-text-secondary leading-relaxed">{item.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* This Week */}
        <div className="mb-4">
          <p className="meta-label text-text-secondary mb-2">This Week</p>
          {weeklySummary === undefined ? (
            <div className="h-4 bg-surface-alt rounded animate-pulse w-20" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-text-primary">
                {weeklySummary.total}
              </span>
              <span className="text-xs text-text-secondary">actions</span>
            </div>
          )}
          {weeklySummary && Object.keys(weeklySummary.byAction).length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {Object.entries(weeklySummary.byAction).map(([action, count]) => (
                <span
                  key={action}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-surface-alt text-text-secondary"
                >
                  {action.replace(/_/g, " ")} ({count})
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Schedule */}
        <div className="mb-4">
          <p className="meta-label text-text-secondary mb-2">Schedule</p>
          <div className="space-y-1">
            {agent.dailyRhythm.map((item, i) => (
              <p key={i} className="text-xs text-text-secondary leading-relaxed">{item}</p>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/build-your-ai-team/${agent.workPageSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
          style={{ color: agent.accentHex }}
        >
          View Full Profile
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: inline in sidebar column */}
      <div className="hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-2xl border border-border-color/40 bg-white overflow-hidden shadow-card"
        >
          {panelContent}
        </motion.div>
      </div>

      {/* Mobile/Tablet: sheet overlay below header */}
      <div className="lg:hidden">
        <motion.div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="fixed left-0 top-0 bottom-0 z-50 w-full sm:w-[340px] bg-white overflow-y-auto border-r border-border-color/40 shadow-card-hover"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {panelContent}
        </motion.div>
      </div>
    </>
  );
}
