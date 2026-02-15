"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { agents } from "@/lib/agents";
import type { AgentStatus } from "@/lib/launch-control-types";
import StatusDot from "./StatusDot";
import AgentExpandedPanel from "./AgentExpandedPanel";

interface AgentSidebarProps {
  agentStatuses: AgentStatus[] | undefined;
}

function getStatusColor(agent: { id: string; name: string; status: string }, statuses: AgentStatus[] | undefined): "green" | "orange" | "red" | "gray" {
  if (agent.status === "coming-soon") return "gray";
  if (!statuses) return "gray";
  const match = statuses.find(
    (s) => s.agentName.toLowerCase() === agent.id.toLowerCase() ||
           s.agentName.toLowerCase() === agent.name.toLowerCase()
  );
  if (!match || !match.lastTimestamp) return "gray";
  const elapsed = Date.now() - new Date(match.lastTimestamp).getTime();
  if (match.lastStatus === "error" || elapsed > 24 * 60 * 60 * 1000) return "red";
  if (match.lastStatus === "active" && elapsed < 30 * 60 * 1000) return "green";
  if (match.lastStatus === "completed" && elapsed < 2 * 60 * 60 * 1000) return "orange";
  return "red";
}

export default function AgentSidebar({ agentStatuses }: AgentSidebarProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const selectedAgent = agents.find((a) => a.id === selectedAgentId);

  return (
    <div className="min-h-0">
      <AnimatePresence mode="wait">
        {selectedAgent ? (
          /* Expanded detail — replaces the list */
          <AgentExpandedPanel
            key="expanded"
            agent={selectedAgent}
            onClose={() => setSelectedAgentId(null)}
          />
        ) : (
          /* Agent roster list */
          <motion.div
            key="roster"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            <p className="meta-label text-text-secondary mb-3 px-2">Agents</p>
            <div className="space-y-0.5">
              {agents.map((agent) => {
                const dotColor = getStatusColor(agent, agentStatuses);

                return (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl transition-all text-left hover:bg-surface-alt/60 ${
                      agent.status === "coming-soon" ? "opacity-50" : ""
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={`/agent-avatars/${agent.id}.png`}
                        alt={agent.name}
                        className="w-9 h-9 rounded-full object-cover border border-border-color/40"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <StatusDot color={dotColor} size="sm" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{agent.name}</p>
                      <p className="text-xs text-text-secondary truncate">{agent.role}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
