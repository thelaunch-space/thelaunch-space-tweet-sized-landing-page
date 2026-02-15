"use client";

import { agents } from "@/lib/agents";
import type { AgentStatus } from "@/lib/launch-control-types";
import StatusDot from "./StatusDot";

interface AgentAvatarStripProps {
  agentStatuses: AgentStatus[] | undefined;
}

function getStatusColor(agentId: string, statuses: AgentStatus[] | undefined): "green" | "orange" | "red" | "gray" {
  const agent = agents.find((a) => a.id === agentId);
  if (agent?.status === "coming-soon") return "gray";
  if (!statuses) return "gray";
  const match = statuses.find(
    (s) => s.agentName.toLowerCase() === agentId.toLowerCase()
  );
  if (!match || !match.lastTimestamp) return "gray";
  const elapsed = Date.now() - new Date(match.lastTimestamp).getTime();
  if (match.lastStatus === "error" || elapsed > 24 * 60 * 60 * 1000) return "red";
  if (match.lastStatus === "active" && elapsed < 30 * 60 * 1000) return "green";
  if (match.lastStatus === "completed" && elapsed < 2 * 60 * 60 * 1000) return "orange";
  return "red";
}

export default function AgentAvatarStrip({ agentStatuses }: AgentAvatarStripProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-1">
      <span className="meta-label text-text-secondary shrink-0">Agents</span>
      {agents.map((agent) => (
        <div key={agent.id} className="relative shrink-0">
          <img
            src={`/agent-avatars/${agent.id}.png`}
            alt={agent.name}
            className={`w-10 h-10 rounded-full object-cover border-2 ${
              agent.status === "coming-soon" ? "opacity-40 border-border-color/40" : "border-border-color/60"
            }`}
          />
          <div className="absolute -bottom-0.5 -right-0.5">
            <StatusDot color={getStatusColor(agent.id, agentStatuses)} size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
