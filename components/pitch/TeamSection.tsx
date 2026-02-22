"use client";

import { motion } from "framer-motion";
import { PITCH_AGENTS } from "@/lib/pitch-data";
import { getAgent } from "@/lib/agents";
import AgentStatCard from "./AgentStatCard";

interface TeamSectionProps {
  agentStatuses: Array<{ agentName: string; lastStatus: string; lastTimestamp: string | null }> | undefined;
}

export default function TeamSection({ agentStatuses }: TeamSectionProps) {
  return (
    <section id="team" className="scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="font-display tracking-[-0.02em] text-2xl md:text-3xl text-text-primary"
      >
        Meet Your Team
      </motion.h2>

      {/* All agents — 3x2 grid on desktop, 2-col tablet, 1-col mobile */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PITCH_AGENTS.map((pa, i) => {
          const agent = getAgent(pa.agentId);
          if (!agent) return null;

          const status = pa.comingSoon
            ? undefined
            : agentStatuses?.find(
                (s) => s.agentName.toLowerCase() === agent.name.toLowerCase()
              );
          return (
            <motion.div
              key={pa.agentId}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AgentStatCard
                pitchAgent={pa}
                agent={agent}
                agentStatus={status}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="mt-6"
      >
        <a
          href="#real-work"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-accent-blue px-5 py-2.5 text-sm font-semibold text-accent-blue hover:bg-accent-blue hover:text-white transition-all duration-300 hover:-translate-y-0.5"
        >
          See their real output this week
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-px">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
