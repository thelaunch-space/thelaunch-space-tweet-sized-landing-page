"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useCountUp } from "@/lib/useCountUp";
import { useGeo } from "@/lib/useGeo";
import {
  calculateCostSaved,
  calculateHoursSaved,
  formatCurrency,
  getGeoConfig,
  getMultiplier,
  getPriceDisplay,
} from "@/lib/geo-savings";
import SavingsTooltip from "@/components/ui/SavingsTooltip";

interface HookSectionProps {
  weeklyStats: { questions: number; briefs: number; blogs: number } | undefined;
  allTimeStats?: { questions: number; briefs: number; blogs: number } | undefined;
}

export default function HookSection({ weeklyStats }: HookSectionProps) {
  const region = useGeo();
  const config = getGeoConfig(region);

  const q = weeklyStats?.questions ?? 0;
  const b = weeklyStats?.briefs ?? 0;
  const bl = weeklyStats?.blogs ?? 0;
  const stats = { questions: q, briefs: b, blogs: bl };
  const hoursSaved = calculateHoursSaved(stats);
  const costSaved = calculateCostSaved(stats, region);

  const ready = weeklyStats !== undefined;

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const enabled = ready && statsInView;

  const blogsCount = useCountUp(bl, 1800, 200, enabled);
  const questionsCount = useCountUp(q, 1800, 400, enabled);
  const hoursCount = useCountUp(hoursSaved, 1800, 600, enabled);
  const costCount = useCountUp(costSaved, 1800, 800, enabled);

  return (
    <section className="pt-4 md:pt-8">
      {/* Desktop: split layout | Mobile: stacked */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10">
        {/* ── Text column ── */}
        <div className="lg:w-[55%] lg:flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-text-secondary">
              YOUR AI CONTENT TEAM
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display tracking-[-0.03em] text-3xl md:text-5xl lg:text-6xl text-text-primary mt-3 leading-tight"
          >
            Your SEO team that never clocks out
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed mt-4 max-w-2xl"
          >
            You know you need organic content. You don&apos;t have the team, the time, or the budget.
            These agents handle it end-to-end while you run your business.
          </motion.p>

          {/* ── Hero image: mobile + tablet (stacked between subtitle and stats) ── */}
          <div className="lg:hidden mt-8 -mx-2">
            <HeroImage />
          </div>

          {/* ── LIVE Stats Strip ── */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-6"
          >
            {/* LIVE indicator */}
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-emerald-500 font-semibold">
                LIVE
              </span>
              <span className="text-xs text-text-secondary">
                For thelaunch.space this week:
              </span>
            </div>

            {/* Stat cards grid */}
            {ready ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="rounded-xl border border-border-color/40 bg-surface p-3 text-center shadow-card">
                  <div className="font-display text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
                    {blogsCount}
                  </div>
                  <p className="meta-label mt-1 text-text-secondary">blogs published</p>
                </div>
                <div className="rounded-xl border border-border-color/40 bg-surface p-3 text-center shadow-card">
                  <div className="font-display text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
                    {questionsCount}
                  </div>
                  <p className="meta-label mt-1 text-text-secondary">questions researched</p>
                </div>
                <div className="rounded-xl border border-border-color/40 bg-surface p-3 text-center shadow-card">
                  <div className="font-display text-2xl sm:text-3xl font-semibold text-accent-emerald tracking-tight">
                    {hoursCount}<span className="text-lg">h</span>
                  </div>
                  <p className="meta-label mt-1 text-text-secondary">hours saved</p>
                </div>
                <div className="rounded-xl border border-border-color/40 bg-surface p-3 text-center shadow-card">
                  <SavingsTooltip rationale={config.rationale}>
                    <div className="font-display text-2xl sm:text-3xl font-semibold text-accent-blue tracking-tight">
                      {formatCurrency(costCount, region)}
                    </div>
                  </SavingsTooltip>
                  <p className="meta-label mt-1 text-text-secondary">saved</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-xl border border-border-color/40 bg-surface p-3">
                    <div className="h-8 w-16 mx-auto bg-surface-alt rounded animate-pulse" />
                    <div className="h-3 w-20 mx-auto mt-2 bg-surface-alt rounded animate-pulse" />
                  </div>
                ))}
              </div>
            )}

            {/* Hybrid framing line */}
            {ready && (
              <p className="mt-3 text-xs text-text-secondary/80">
                This AI team does the work of a {config.totalDisplay} content operation &mdash; that&apos;s{" "}
                <span className="font-semibold text-accent-blue">{getMultiplier(config)}</span> your {getPriceDisplay(config)} investment
              </p>
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <a
              href="#how-it-works"
              className="inline-block rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 text-sm font-semibold text-white shadow-cta hover:-translate-y-0.5 hover:shadow-cta-hover transition-all duration-300"
            >
              See how it works
            </a>
            <a
              href="/launch-control"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-accent-blue px-6 py-3 text-sm font-semibold text-accent-blue hover:bg-accent-blue hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              Watch them work live
            </a>
          </motion.div>

          {/* Proof nudge — points to the "Watch them work live" CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-3 text-xs text-text-secondary/60 italic"
          >
            Real numbers, updated live &mdash; check the agents&apos; progress live &uarr;
          </motion.p>
        </div>

        {/* ── Image column: desktop only ── */}
        <div className="hidden lg:block lg:w-[45%] lg:flex-shrink-0">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}

/* ─── Shared hero image with embossed drop-shadow ─── */

function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 22,
        mass: 0.9,
        delay: 0.15,
      }}
      className="relative"
    >
      {/* Atmospheric glow behind characters */}
      <div
        className="absolute inset-0 -inset-x-6 rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(0,61,165,0.05) 0%, rgba(109,40,217,0.025) 40%, transparent 70%)",
        }}
      />

      {/* Team image — drop-shadow traces the transparent character silhouettes */}
      <Image
        src="/agents/team-hero.png"
        alt="The AI agent team — Sanjaya, Vibhishana, Parthasarathi, Vyasa, and Valmiki"
        width={900}
        height={600}
        priority
        className="relative w-full h-auto"
        style={{
          filter: [
            "drop-shadow(0 2px 3px rgba(15,23,42,0.1))",
            "drop-shadow(0 8px 20px rgba(50,50,93,0.12))",
            "drop-shadow(0 20px 44px rgba(50,50,93,0.08))",
          ].join(" "),
        }}
      />
    </motion.div>
  );
}
