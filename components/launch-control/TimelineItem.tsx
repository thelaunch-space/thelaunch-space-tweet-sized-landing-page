"use client";

import { Check, Loader2 } from "lucide-react";

interface TimelineItemProps {
  time: string;
  label: string;
  agentId: string;
  accent: string;
  state: "completed" | "active" | "upcoming";
}

export default function TimelineItem({ time, label, agentId, accent, state }: TimelineItemProps) {
  return (
    <div
      className={`relative flex items-center gap-3 py-2 transition-opacity ${
        state === "upcoming" ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Dot on the timeline */}
      <div className="absolute -left-6 flex items-center justify-center w-[15px] h-[15px]">
        {state === "completed" ? (
          <div
            className="w-[15px] h-[15px] rounded-full flex items-center justify-center"
            style={{ background: accent }}
          >
            <Check size={9} className="text-white" strokeWidth={3} />
          </div>
        ) : state === "active" ? (
          <div className="relative">
            <div
              className="w-[15px] h-[15px] rounded-full animate-pulse"
              style={{ background: accent }}
            />
            <Loader2
              size={9}
              className="absolute inset-0 m-auto text-white animate-spin"
              strokeWidth={3}
            />
          </div>
        ) : (
          <div className="w-[11px] h-[11px] rounded-full border-2 border-border-color bg-surface ml-[2px]" />
        )}
      </div>

      {/* Time */}
      <span className={`font-mono text-[11px] sm:text-xs shrink-0 w-[56px] sm:w-[72px] ${
        state === "active" ? "text-text-primary font-semibold" : "text-text-secondary"
      }`}>
        {time}
      </span>

      {/* Label */}
      <span className={`text-xs sm:text-sm min-w-0 ${
        state === "active"
          ? "text-text-primary font-medium"
          : state === "completed"
            ? "text-text-secondary"
            : "text-text-secondary"
      }`}>
        {label}
      </span>

      {/* Agent pill — hidden on very small screens */}
      <span
        className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 rounded-full ml-auto shrink-0 capitalize"
        style={{
          background: `${accent}12`,
          color: accent,
        }}
      >
        {agentId.slice(0, 6)}
      </span>
    </div>
  );
}
