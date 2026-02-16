"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRIEF_STATUS_CONFIG } from "@/lib/launch-control-types";

interface RecentWorkSectionProps {
  questions:
    | Array<{ title: string; subreddit: string; scannedAt: string; url: string }>
    | undefined;
  briefs:
    | Array<{
        _id: string;
        title: string;
        primaryKeyword: string;
        category?: string;
        status: string;
      }>
    | undefined;
  blogs:
    | Array<{ title: string; url?: string; slug: string; publishedAt?: string }>
    | undefined;
}

type Tab = "questions" | "briefs" | "blogs";

const TABS: { key: Tab; label: string }[] = [
  { key: "questions", label: "Questions" },
  { key: "briefs", label: "Briefs" },
  { key: "blogs", label: "Blogs" },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function RecentWorkSection({
  questions,
  briefs,
  blogs,
}: RecentWorkSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>("questions");

  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="font-display tracking-[-0.02em] text-2xl md:text-3xl text-text-primary"
      >
        Real Work From This Week — by AI Agents
      </motion.h2>
      <p className="text-text-secondary text-sm mt-2">
        Not samples. Not demos. This is what the agents actually produced this week on thelaunch.space.
      </p>

      {/* Tab bar */}
      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border-color">
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
      <div className="mt-4 min-h-[200px]">
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
                <EmptyState label="No questions found yet." />
              ) : (
                <div className="divide-y divide-border-color">
                  {questions.map((q, i) => (
                    <div key={i} className="py-3 flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-primary hover:text-accent-blue transition-colors line-clamp-2 flex-1"
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
              {!briefs ? (
                <LoadingRows />
              ) : briefs.length === 0 ? (
                <EmptyState label="No briefs yet." />
              ) : (
                <div className="divide-y divide-border-color">
                  {briefs.map((b) => {
                    const statusCfg = BRIEF_STATUS_CONFIG[b.status];
                    return (
                      <div
                        key={b._id}
                        className="py-3 flex flex-col md:flex-row md:items-center gap-1 md:gap-4"
                      >
                        <span className="text-sm text-text-primary line-clamp-2 flex-1">
                          {b.title}
                        </span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-mono tracking-[0.12em] bg-surface-alt rounded-full px-2.5 py-0.5 text-text-secondary">
                            {b.primaryKeyword}
                          </span>
                          {b.category && (
                            <span className="text-[10px] font-mono tracking-[0.12em] bg-surface-alt rounded-full px-2.5 py-0.5 text-text-secondary">
                              {b.category}
                            </span>
                          )}
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
                <EmptyState label="No blogs published yet." />
              ) : (
                <div className="divide-y divide-border-color">
                  {blogs.map((bl, i) => {
                    const href = bl.url || `/blogs/${bl.slug}`;
                    return (
                      <div
                        key={i}
                        className="py-3 flex flex-col md:flex-row md:items-center gap-1 md:gap-4"
                      >
                        <a
                          href={href}
                          className="text-sm text-text-primary hover:text-accent-blue transition-colors line-clamp-2 flex-1"
                        >
                          {bl.title}
                        </a>
                        {bl.publishedAt && (
                          <span className="text-xs text-text-secondary flex-shrink-0">
                            {formatDate(bl.publishedAt)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
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

function EmptyState({ label }: { label: string }) {
  return <p className="text-text-secondary text-sm py-6 text-center">{label}</p>;
}
