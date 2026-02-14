"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getAgent } from "@/lib/agents";
import FloatingCTA from "@/components/FloatingCTA";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5 },
};

function CharacterArt({
  agent,
  className,
  maxH,
}: {
  agent: { name: string; accentHex: string; avatarPath: string };
  className?: string;
  maxH: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Radial aura behind the character */}
      <div
        className="absolute inset-0 rounded-3xl opacity-30 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center 70%, ${agent.accentHex}25, transparent 70%)`,
        }}
      />
      {!imgError ? (
        <img
          src={agent.avatarPath}
          alt={agent.name}
          className={`relative w-full ${maxH} object-contain object-bottom`}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={`relative w-full ${maxH} flex items-end justify-center rounded-3xl`}
          style={{
            background: `linear-gradient(160deg, ${agent.accentHex}10 0%, ${agent.accentHex}04 100%)`,
          }}
        >
          <span
            className="font-display font-bold opacity-[0.08] select-none pb-4"
            style={{
              fontSize: "clamp(8rem, 20vw, 16rem)",
              color: agent.accentHex,
              lineHeight: 1,
            }}
          >
            {agent.name[0]}
          </span>
        </div>
      )}
    </div>
  );
}

export default function AgentDetailPage({ agentId }: { agentId: string }) {
  const agent = getAgent(agentId);
  if (!agent) return null;

  return (
    <main className="flex-1 px-6 md:px-10 lg:px-16 py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        {/* ─── Breadcrumb ─── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/build-your-ai-team"
            className="text-sm text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to AI Team
          </Link>
        </motion.div>

        {/* ─── Two-column layout (desktop) ─── */}
        <div className="lg:flex lg:gap-12 xl:gap-16">
          {/* ═══ LEFT COLUMN: All content ═══ */}
          <div className="lg:w-[60%]">
            {/* ─── S1: Agent Hero ─── */}
            <motion.section
              className="mb-16 md:mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <span
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: agent.accentHex }}
                >
                  {agent.role}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border bg-opacity-[0.04]"
                  style={{
                    borderColor: `${agent.accentHex}33`,
                    background: `${agent.accentHex}0A`,
                    color: agent.accentHex,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: agent.accentHex }}
                  />
                  Active
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold font-display mb-6">
                {agent.name}
              </h1>

              {/* roleForICP headline */}
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-[1.1]"
                style={{ color: agent.accentHex }}
              >
                {agent.roleForICP}
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mt-4 max-w-2xl">
                {agent.description}
              </p>
            </motion.section>

            {/* ─── Mobile-only character art ─── */}
            <motion.div
              className="lg:hidden mb-16 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CharacterArt
                agent={agent}
                className="max-w-xs"
                maxH="max-h-[50vh]"
              />
            </motion.div>

            {/* ─── S2: KRAs — "What I Do For Your Business" ─── */}
            <motion.section className="mb-16 md:mb-20" {...fadeUp}>
              <h2 className="text-2xl font-bold font-display mb-6">
                What I Do For Your Business
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.kras.map((kra) => (
                  <div
                    key={kra.title}
                    className="rounded-2xl border border-border-color bg-background/60 backdrop-blur-sm p-5 md:p-6"
                    style={{ borderLeftWidth: "3px", borderLeftColor: `${agent.accentHex}40` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-text-primary text-sm md:text-base">
                        {kra.title}
                      </h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0"
                        style={{
                          background: `${agent.accentHex}15`,
                          color: agent.accentHex,
                        }}
                      >
                        {kra.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary/70 leading-relaxed mb-2">
                      {kra.what}
                    </p>
                    <p
                      className="text-sm font-medium leading-relaxed"
                      style={{ color: agent.accentHex }}
                    >
                      {kra.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ─── S3: Daily Rhythm — "How It Works" ─── */}
            <motion.section className="mb-16 md:mb-20" {...fadeUp}>
              <h2 className="text-2xl font-bold font-display mb-6">
                How It Works
              </h2>

              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-[11px] top-3 bottom-3 w-px"
                  style={{ background: `${agent.accentHex}30` }}
                />

                <div className="space-y-4">
                  {agent.dailyRhythm.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-4 relative"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div
                        className="shrink-0 w-[23px] h-[23px] rounded-full flex items-center justify-center text-[10px] font-bold z-10"
                        style={{
                          background: `${agent.accentHex}20`,
                          color: agent.accentHex,
                          border: `2px solid ${agent.accentHex}40`,
                        }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* ─── S4: Light Proof — "In Practice" ─── */}
            <motion.section className="mb-16 md:mb-20" {...fadeUp}>
              <h2 className="text-2xl font-bold font-display mb-6">
                In Practice
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {agent.proofPoints.map((proof, i) => (
                  <motion.div
                    key={i}
                    className="rounded-2xl border border-border-color bg-background/60 backdrop-blur-sm overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {proof.type === "stat" && (
                      <div className="p-5 text-center">
                        <p
                          className="text-3xl md:text-4xl font-bold font-display"
                          style={{ color: agent.accentHex }}
                        >
                          {proof.value}
                        </p>
                        <p className="text-xs text-text-secondary/60 uppercase tracking-wider mt-2">
                          {proof.label}
                        </p>
                      </div>
                    )}

                    {proof.type === "link" && (
                      <Link
                        href={proof.href || "#"}
                        className="block p-5 hover:bg-black/[0.02] transition-colors"
                      >
                        <p className="text-xs text-text-secondary/50 uppercase tracking-wider mb-1">
                          {proof.label}
                        </p>
                        <p
                          className="text-sm font-semibold inline-flex items-center gap-1.5"
                          style={{ color: agent.accentHex }}
                        >
                          {proof.value}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </p>
                      </Link>
                    )}

                    {proof.type === "quote" && (
                      <div
                        className="p-5"
                        style={{ borderLeftWidth: "3px", borderLeftColor: `${agent.accentHex}40` }}
                      >
                        <p className="text-xs text-text-secondary/50 uppercase tracking-wider mb-1">
                          {proof.label}
                        </p>
                        <p className="text-sm text-text-primary/90 italic leading-relaxed">
                          &ldquo;{proof.value}&rdquo;
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ─── S5: Pipeline Context ─── */}
            <motion.section className="mb-16 md:mb-20" {...fadeUp}>
              <div
                className="rounded-2xl border p-5 md:p-6"
                style={{
                  borderColor: `${agent.accentHex}20`,
                  background: `${agent.accentHex}06`,
                }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/50 mb-2">
                  Where I Fit
                </p>
                <p
                  className="text-base md:text-lg font-semibold"
                  style={{ color: agent.accentHex }}
                >
                  {agent.pipelineRole}
                </p>
                <Link
                  href="/build-your-ai-team"
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mt-3 transition-colors"
                >
                  Meet the rest of the team
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.section>

            {/* ─── S6: CTA ─── */}
            <motion.section
              className="text-center py-10 md:py-14 px-6 md:px-10 rounded-2xl border mb-8"
              style={{
                borderColor: `${agent.accentHex}20`,
                background: `${agent.accentHex}08`,
              }}
              {...fadeUp}
            >
              <p
                className="text-lg font-bold font-display mb-6"
                style={{ color: agent.accentHex }}
              >
                Want me on your team?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://x.com/nkgoutham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm hover:brightness-110 text-white"
                  style={{ background: agent.accentHex }}
                >
                  DM Krishna on X
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/krishna-goutham/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border font-semibold text-sm"
                  style={{
                    borderColor: `${agent.accentHex}30`,
                    color: agent.accentHex,
                  }}
                >
                  Connect on LinkedIn
                </a>
              </div>
            </motion.section>
          </div>

          {/* ═══ RIGHT COLUMN: Sticky character companion (desktop only) ═══ */}
          <div className="hidden lg:block lg:w-[40%]">
            <motion.div
              className="sticky top-24"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <CharacterArt
                agent={agent}
                maxH="max-h-[70vh]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <FloatingCTA
        label="Want me on your team?"
        href="https://x.com/nkgoutham"
      />
    </main>
  );
}
