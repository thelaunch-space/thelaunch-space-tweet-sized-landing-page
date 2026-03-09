"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PenLine } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCountUp } from "@/lib/useCountUp";
import { useGeo } from "@/lib/useGeo";
import {
  calculateCostSaved,
  calculateHoursSaved,
  formatCurrency,
} from "@/lib/geo-savings";
import { BRIEF_STATUS_CONFIG } from "@/lib/launch-control-types";
import SectionLabel from "./SectionLabel";
import BadgeStatus from "./BadgeStatus";
import TrustNudge from "@/components/pitch/TrustNudge";

/* ── Animation presets ── */

const fadeUp = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

/* ── Live Stats Strip ── */

function LiveStatsStrip() {
  const region = useGeo();
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-60px" });
  const data = useQuery(api.agentActivity.allTimeStats);

  const totalBlogs = data?.blogs ?? 0;
  const totalQuestions = data?.questions ?? 0;
  const stats = { questions: totalQuestions, briefs: 0, blogs: totalBlogs };
  const hoursSaved = calculateHoursSaved(stats);
  const costSaved = calculateCostSaved(stats, region);

  const ready = data !== undefined;
  const enabled = ready && isInView;

  const blogsCount = useCountUp(totalBlogs, 1800, 200, enabled);
  const questionsCount = useCountUp(totalQuestions, 1800, 400, enabled);
  const hoursCount = useCountUp(hoursSaved, 1800, 600, enabled);
  const costCount = useCountUp(costSaved, 1800, 800, enabled);

  return (
    <div ref={statsRef}>
      {/* LIVE indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
        </span>
        <span className="text-[10px] font-mono tracking-[0.12em] uppercase text-accent-emerald font-semibold">
          LIVE
        </span>
        <span className="text-xs text-text-secondary">
          Real numbers. Updated automatically.
        </span>
      </div>

      {/* Stat cards */}
      {ready ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border-color/40 bg-surface-alt p-4 text-center shadow-card">
            <div className="font-display text-2xl font-semibold text-text-primary tracking-tight tabular-nums">
              {blogsCount}
            </div>
            <p className="meta-label mt-1 text-text-secondary">blogs published</p>
          </div>
          <div className="rounded-xl border border-border-color/40 bg-surface-alt p-4 text-center shadow-card">
            <div className="font-display text-2xl font-semibold text-text-primary tracking-tight tabular-nums">
              {questionsCount}
            </div>
            <p className="meta-label mt-1 text-text-secondary">questions researched</p>
          </div>
          <div className="rounded-xl border border-border-color/40 bg-surface-alt p-4 text-center shadow-card">
            <div className="font-display text-2xl font-semibold text-accent-emerald tracking-tight tabular-nums">
              {hoursCount}<span className="text-lg">h</span>
            </div>
            <p className="meta-label mt-1 text-text-secondary">hours saved</p>
          </div>
          <div className="rounded-xl border border-border-color/40 bg-surface-alt p-4 text-center shadow-card">
            <div className="font-display text-2xl font-semibold text-accent-blue tracking-tight tabular-nums">
              {formatCurrency(costCount, region)}
            </div>
            <p className="meta-label mt-1 text-text-secondary">cost saved</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-border-color/40 bg-surface-alt p-4">
              <div className="h-8 w-16 mx-auto bg-border-color/20 rounded animate-pulse" />
              <div className="h-3 w-20 mx-auto mt-2 bg-border-color/20 rounded animate-pulse" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Real Work Tabs ── */

type Tab = "questions" | "briefs" | "blogs";

const TABS: { key: Tab; label: string }[] = [
  { key: "blogs", label: "Blogs" },
  { key: "briefs", label: "Briefs" },
  { key: "questions", label: "Source Questions" },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function LoadingRows() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-5 bg-surface-alt rounded animate-pulse" style={{ width: `${70 + i * 5}%` }} />
      ))}
    </div>
  );
}

function RealWorkTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("blogs");
  const questions = useQuery(api.questions.listRecent, { limit: 8 });
  const briefs = useQuery(api.briefs.listMetadata, {});
  const blogs = useQuery(api.blogs.listRecent, { limit: 8 });

  const recentBriefs = briefs?.slice(0, 8);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border-color">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-accent-blue text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4 min-h-[180px]">
        <AnimatePresence mode="wait">
          {activeTab === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {!questions ? (
                <LoadingRows />
              ) : questions.length === 0 ? (
                <p className="text-text-secondary text-sm py-6 text-center">No questions found yet.</p>
              ) : (
                <div className="divide-y divide-border-color/50">
                  {questions.map((q, i) => (
                    <div key={i} className="py-2.5 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-primary hover:text-accent-blue transition-colors line-clamp-1 flex-1"
                      >
                        {q.title}
                      </a>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-mono tracking-[0.12em] uppercase bg-surface-alt rounded-full px-2.5 py-0.5 text-text-secondary">
                          {q.subreddit}
                        </span>
                        <span className="text-xs text-text-secondary">{formatDate(q.scannedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "briefs" && (
            <motion.div
              key="briefs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {!recentBriefs ? (
                <LoadingRows />
              ) : recentBriefs.length === 0 ? (
                <p className="text-text-secondary text-sm py-6 text-center">No briefs yet.</p>
              ) : (
                <div className="divide-y divide-border-color/50">
                  {recentBriefs.map((b) => {
                    const statusCfg = BRIEF_STATUS_CONFIG[b.status];
                    return (
                      <div key={b._id} className="py-2.5 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <span className="text-sm text-text-primary line-clamp-1 flex-1">
                          {b.title}
                        </span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-mono tracking-[0.12em] bg-surface-alt rounded-full px-2.5 py-0.5 text-text-secondary">
                            {b.primaryKeyword}
                          </span>
                          {statusCfg && (
                            <span
                              className={`text-[10px] font-mono tracking-[0.12em] rounded-full px-2.5 py-0.5 border ${statusCfg.bg} ${statusCfg.color}`}
                            >
                              {statusCfg.label}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "blogs" && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {!blogs ? (
                <LoadingRows />
              ) : blogs.length === 0 ? (
                <p className="text-text-secondary text-sm py-6 text-center">No blogs published yet.</p>
              ) : (
                <div className="divide-y divide-border-color/50">
                  {blogs.map((bl, i) => {
                    const href = `/blogs/${bl.slug}`;
                    return (
                      <div key={i} className="py-2.5 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <Link
                          href={href}
                          className="text-sm text-text-primary hover:text-accent-blue transition-colors line-clamp-1 flex-1"
                        >
                          {bl.title}
                        </Link>
                        <span className="text-xs text-text-secondary flex-shrink-0">
                          {bl.publishedAt ? formatDate(bl.publishedAt) : formatDate(bl._creationTime.toString())}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Section ── */

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-driven expansion: tracks from section entering viewport to 25% from top */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.25"],
  });

  /* Panel expands from card-width (~320px) to full container (1152px = max-w-6xl)
     On mobile, min-w-full overrides maxWidth so no expansion — just fade in */
  const maxWidth = useTransform(scrollYProgress, [0, 1], [320, 1152]);
  const maxWidthPx = useTransform(maxWidth, (v) => `${v}px`);

  /* Accent bar draws in sync with scroll */
  const accentBarScale = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section ref={sectionRef} id="proof" className="snap-section pt-10 pb-16 md:pt-12 md:pb-20">
      {/* Centering wrapper */}
      <div className="flex justify-center px-0 sm:px-4 lg:px-10">
        <motion.div
          style={{
            maxWidth: maxWidthPx,
          }}
          className="relative w-full min-w-full sm:min-w-0 rounded-none sm:rounded-2xl border-y sm:border border-border-color bg-[#F7F9FC] shadow-none sm:shadow-card overflow-hidden"
        >
          {/* ── Top gradient accent bar — draws left-to-right on scroll ── */}
          <motion.div
            style={{ scaleX: accentBarScale }}
            className="h-1 bg-gradient-to-r from-accent-blue to-accent-purple origin-left"
          />

          {/* ── Panel content ── */}
          <div className="px-5 py-8 sm:p-8 md:p-10">
            {/* Context bar — echoes the SEO card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2 mb-6"
            >
              <PenLine className="w-3.5 h-3.5 text-text-secondary" />
              <span className="text-xs font-semibold text-text-secondary tracking-wide">
                SEO &amp; Content Marketing
              </span>
              <BadgeStatus status="live" />
            </motion.div>

            {/* Header */}
            <motion.div {...fadeUp}>
              <SectionLabel text="PROOF" />
            </motion.div>

            <motion.h2
              {...fadeUp}
              className="mt-4 font-display font-medium tracking-heading text-text-primary text-2xl md:text-3xl"
            >
              We eat our own cooking.
            </motion.h2>

            <motion.p
              {...fadeUp}
              className="mt-4 font-sans text-text-secondary leading-relaxed max-w-[42rem]"
              style={{ fontSize: "17px" }}
            >
              Everything below is produced by the same AI team we&apos;d build
              for you, running on thelaunch.space every single day. Not
              samples. Not demos.
            </motion.p>

            {/* ── Live Stats ── */}
            <motion.div className="mt-10" {...fadeUp}>
              <LiveStatsStrip />
            </motion.div>

            {/* ── Real Work Output ── */}
            <motion.div className="mt-12" {...fadeUp}>
              <h3 className="font-display text-xl tracking-heading text-text-primary">
                Real work from this week
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Click any link. It&apos;s live on the site or linked to the original source.
              </p>
              <div className="mt-5 rounded-2xl border border-border-color bg-surface-alt p-5 md:p-6 shadow-card">
                <RealWorkTabs />
              </div>
            </motion.div>

            {/* ── Agent Team ── */}
            <motion.div className="mt-12" {...fadeUp}>
              <h3 className="font-display text-xl tracking-heading text-text-primary">
                The team behind it
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Four AI agents, each with a clear role. They run every day without prompting.
              </p>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { avatar: "/agent-avatars/vibhishana.png", name: "Vibhishana", title: "SEO Scanner", role: "Scans Reddit for real questions your ICP is asking" },
                  { avatar: "/agent-avatars/vyasa.png", name: "Vyasa", title: "Blog Writer", role: "Writes full SEO blogs from brief to published draft" },
                  { avatar: "/agent-avatars/valmiki.png", name: "Valmiki", title: "LinkedIn Strategist", role: "Extracts post angles from every published blog" },
                  { avatar: "/agent-avatars/vidura.png", name: "Vidura", title: "SEO Intelligence", role: "Tracks keyword clusters and citation opportunities" },
                ].map((agent) => (
                  <div key={agent.name} className="rounded-xl border border-border-color/50 bg-white overflow-hidden">
                    <div className="aspect-square overflow-hidden relative">
                      <Image
                        src={agent.avatar}
                        alt={agent.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-sans text-sm font-semibold text-text-primary leading-tight">
                        {agent.name}
                      </p>
                      <p className="font-mono text-[10px] tracking-wide uppercase text-text-secondary/70 mt-0.5">
                        {agent.title}
                      </p>
                      <p className="font-sans text-[11px] text-text-secondary leading-relaxed mt-1.5">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Trust Nudge 2 ── */}
            <motion.div className="mt-8" {...fadeUp}>
              <TrustNudge
                message="Not a demo. That's real output from this week."
                linkText="Read the blog"
                linkHref="/blogs"
                arrow="bounce"
              />
            </motion.div>

            {/* ── Blog Quality + Launch Control ── */}
            <motion.div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6" {...fadeUp}>
              {/* Blog quality card */}
              <div className="rounded-2xl border border-border-color bg-surface-alt p-6 shadow-card">
                <h3 className="font-display text-lg tracking-heading text-text-primary">
                  The writing is the proof.
                </h3>
                <p className="mt-3 font-sans text-sm text-text-secondary leading-relaxed">
                  Read a post. You&apos;ll know within two paragraphs whether it was
                  written by someone who understood the problem, or by someone who
                  Googled it.
                </p>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-1 mt-4 font-sans text-sm font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors"
                >
                  <span>Read the blog</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              {/* Launch Control card */}
              <div className="rounded-2xl border border-border-color bg-surface-alt p-6 shadow-card">
                <h3 className="font-display text-lg tracking-heading text-text-primary">
                  Watch them work. Live.
                </h3>
                <p className="mt-3 font-sans text-sm text-text-secondary leading-relaxed">
                  Launch Control is our internal dashboard. You can see every question
                  scanned, every brief written, every blog published. In real time.
                </p>
                <Link
                  href="/launch-control"
                  className="inline-flex items-center gap-1.5 mt-4 font-sans text-sm font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-px">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                  </svg>
                  <span>Enter Launch Control</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </motion.div>

          </div>

          {/* ── Bottom gradient accent bar — closing bookend (draws right-to-left) ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-gradient-to-l from-accent-blue to-accent-purple origin-right"
          />
        </motion.div>
      </div>
    </section>
  );
}
