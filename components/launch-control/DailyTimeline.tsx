"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DAILY_SCHEDULE } from "@/lib/launch-control-types";
import { agents } from "@/lib/agents";
import TimelineItem from "./TimelineItem";

function getAgentAccent(agentId: string): string {
  return agents.find((a) => a.id === agentId)?.accentHex ?? "#6B7280";
}

function getCurrentISTHour(): number {
  const now = new Date();
  // IST is UTC+5:30
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const istMinutes = utcHours * 60 + utcMinutes + 330;
  return istMinutes / 60;
}

function parseScheduleHour(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours + minutes / 60;
}

export default function DailyTimeline() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const parthaToday = useQuery(api.agentActivity.agentTodayActivity, { agentName: "Parthasarathi" });
  const vibhishanaToday = useQuery(api.agentActivity.agentTodayActivity, { agentName: "Vibhishana" });
  const vyasaToday = useQuery(api.agentActivity.agentTodayActivity, { agentName: "Vyasa" });
  const viduraToday = useQuery(api.agentActivity.agentTodayActivity, { agentName: "Vidura" });

  const allTodayActions = [
    ...(parthaToday ?? []),
    ...(vibhishanaToday ?? []),
    ...(vyasaToday ?? []),
    ...(viduraToday ?? []),
  ].map((a) => a.action);

  const currentISTHour = getCurrentISTHour();

  return (
    <div data-tour="pipeline" className="rounded-2xl border border-border-color/40 bg-surface p-3 sm:p-5">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="meta-label text-text-secondary">Today&apos;s Pipeline</p>
          <span className="text-sm text-text-secondary font-mono">{today}</span>
        </div>
        <p className="text-xs text-text-secondary mt-1">The agents run this schedule every day, automatically.</p>
      </div>

      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border-color/60" />

        <div className="space-y-0">
          {DAILY_SCHEDULE.map((item, i) => {
            const scheduleHour = parseScheduleHour(item.time);
            const hasCompleted = allTodayActions.includes(item.action);
            const isActive = !hasCompleted && Math.abs(currentISTHour - scheduleHour) < 0.5;
            const isUpcoming = !hasCompleted && !isActive && scheduleHour > currentISTHour;
            const state: "completed" | "active" | "upcoming" = hasCompleted
              ? "completed"
              : isActive
                ? "active"
                : isUpcoming
                  ? "upcoming"
                  : "completed";

            return (
              <TimelineItem
                key={i}
                time={item.time}
                label={item.label}
                agentId={item.agentId}
                accent={getAgentAccent(item.agentId)}
                state={state}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
