"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCountUp } from "@/lib/useCountUp";

interface HookSectionProps {
  weeklyStats: { questions: number; briefs: number; blogs: number } | undefined;
}

export default function HookSection({ weeklyStats }: HookSectionProps) {
  const q = weeklyStats?.questions ?? 0;
  const b = weeklyStats?.briefs ?? 0;
  const bl = weeklyStats?.blogs ?? 0;
  const hoursSaved = Math.round((q / 50) * 2.5 + b * 4 + bl * 4 + 5 * 3);

  const ready = weeklyStats !== undefined;

  const blogsCount = useCountUp(bl, 1800, 200, ready);
  const questionsCount = useCountUp(q, 1800, 400, ready);
  const hoursCount = useCountUp(hoursSaved, 1800, 600, ready);

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

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-6"
          >
            {ready ? (
              <p className="text-sm text-text-secondary">
                This week:{" "}
                <span className="font-semibold text-text-primary">{blogsCount}</span> blogs published,{" "}
                <span className="font-semibold text-text-primary">{questionsCount}</span> questions found,{" "}
                <span className="font-semibold text-text-primary">{hoursCount}</span> hours saved.{" "}
                <span className="text-accent-blue font-medium">Zero human hours.</span>
              </p>
            ) : (
              <div className="h-5 w-80 max-w-full bg-surface-alt rounded animate-pulse" />
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <a
              href="#lead-capture"
              className="inline-block rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 text-sm font-semibold text-white shadow-cta hover:-translate-y-0.5 hover:shadow-cta-hover transition-all duration-300"
            >
              Get your AI team this week
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

          {/* Nudge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-3 text-xs text-text-secondary/60 italic"
          >
            I use this for my own business &mdash; every number above is real.
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
