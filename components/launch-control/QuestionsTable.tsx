"use client";

import { useState, useRef, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ICP_RELEVANCE_CONFIG } from "@/lib/launch-control-types";
import type { Doc } from "@/convex/_generated/dataModel";

type SortKey = "title" | "subreddit" | "icpRelevance" | "contentPotential" | "engagement" | "status" | "scannedAt";
type SortDir = "asc" | "desc";

function sortQuestions(questions: Doc<"questions">[], key: SortKey, dir: SortDir): Doc<"questions">[] {
  return [...questions].sort((a, b) => {
    const aVal = (a[key] ?? "") as string;
    const bVal = (b[key] ?? "") as string;
    const cmp = aVal.localeCompare(bVal);
    return dir === "asc" ? cmp : -cmp;
  });
}

export default function QuestionsTable() {
  const questions = useQuery(api.questions.listFullDetails, { limit: 50 });
  const [sortKey, setSortKey] = useState<SortKey>("scannedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [relevanceFilter, setRelevanceFilter] = useState<string>("all");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showShadow, setShowShadow] = useState(false);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setShowShadow(scrollRef.current.scrollLeft > 0);
    }
  }, []);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  if (questions === undefined) {
    return (
      <div className="space-y-2 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-surface-alt rounded" />
        ))}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <p className="text-xs text-text-secondary italic text-center py-8">
        No questions scanned yet — Vibhishana scans communities daily at 9 AM IST
      </p>
    );
  }

  const filtered = questions.filter((q) => {
    if (statusFilter !== "all" && q.status !== statusFilter) return false;
    if (relevanceFilter !== "all" && q.icpRelevance !== relevanceFilter) return false;
    return true;
  });

  const sorted = sortQuestions(filtered, sortKey, sortDir);

  const statuses = [...new Set(questions.map((q) => q.status))];
  const relevances = [...new Set(questions.map((q) => q.icpRelevance))];

  const SortArrow = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return <span className="ml-0.5">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  // Mobile: card view
  const MobileCards = () => (
    <div className="md:hidden space-y-3">
      {sorted.map((q) => {
        const relConfig = ICP_RELEVANCE_CONFIG[q.icpRelevance] ?? { color: "text-text-secondary", bg: "bg-surface-alt" };
        return (
          <div key={q._id} className="rounded-xl border border-border-color/30 p-3 space-y-2">
            <a
              href={q.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-text-primary hover:text-accent-blue transition-colors line-clamp-2"
            >
              {q.title}
            </a>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-alt text-text-secondary">{q.subreddit}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${relConfig.bg} ${relConfig.color}`}>{q.icpRelevance}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-alt text-text-secondary">{q.status}</span>
            </div>
            <p className="text-[11px] text-text-secondary line-clamp-2">{q.questionPain}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-[11px] px-2 py-1 rounded-lg border border-border-color/40 bg-surface text-text-secondary"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={relevanceFilter}
          onChange={(e) => setRelevanceFilter(e.target.value)}
          className="text-[11px] px-2 py-1 rounded-lg border border-border-color/40 bg-surface text-text-secondary"
        >
          <option value="all">All relevance</option>
          {relevances.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <span className="text-[10px] font-mono text-text-secondary self-center ml-auto">
          {sorted.length} of {questions.length}
        </span>
      </div>

      {/* Mobile cards */}
      <MobileCards />

      {/* Desktop table */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="hidden md:block overflow-x-auto scrollbar-hide rounded-lg border border-border-color/30"
      >
        <table className="w-full text-xs min-w-[900px]">
          <thead>
            <tr className="border-b border-border-color/30 bg-surface-alt/50">
              <th
                className="sticky left-0 z-[2] bg-surface-alt/90 backdrop-blur-sm text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-colors"
                style={{ boxShadow: showShadow ? "4px 0 8px -2px rgba(0,0,0,0.06)" : "none" }}
                onClick={() => toggleSort("title")}
              >
                Title<SortArrow col="title" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary" onClick={() => toggleSort("subreddit")}>
                Subreddit<SortArrow col="subreddit" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary max-w-[200px]">Pain Point</th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary" onClick={() => toggleSort("icpRelevance")}>
                ICP<SortArrow col="icpRelevance" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary" onClick={() => toggleSort("contentPotential")}>
                Potential<SortArrow col="contentPotential" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary" onClick={() => toggleSort("engagement")}>
                Engagement<SortArrow col="engagement" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary" onClick={() => toggleSort("status")}>
                Status<SortArrow col="status" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary" onClick={() => toggleSort("scannedAt")}>
                Scanned<SortArrow col="scannedAt" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((q) => {
              const relConfig = ICP_RELEVANCE_CONFIG[q.icpRelevance] ?? { color: "text-text-secondary", bg: "bg-surface-alt" };
              return (
                <tr key={q._id} className="border-b border-border-color/10 hover:bg-surface-alt/30 transition-colors">
                  <td
                    className="sticky left-0 z-[1] bg-surface px-3 py-2.5 max-w-[260px]"
                    style={{ boxShadow: showShadow ? "4px 0 8px -2px rgba(0,0,0,0.06)" : "none" }}
                  >
                    <a
                      href={q.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-accent-blue transition-colors line-clamp-2 font-medium"
                    >
                      {q.title}
                    </a>
                  </td>
                  <td className="px-3 py-2.5 text-text-secondary font-mono whitespace-nowrap">{q.subreddit}</td>
                  <td className="px-3 py-2.5 text-text-secondary max-w-[200px] line-clamp-2">{q.questionPain}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${relConfig.bg} ${relConfig.color}`}>
                      {q.icpRelevance}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-text-secondary whitespace-nowrap">{q.contentPotential}</td>
                  <td className="px-3 py-2.5 text-text-secondary font-mono whitespace-nowrap">{q.engagement}</td>
                  <td className="px-3 py-2.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-alt text-text-secondary">
                      {q.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-text-secondary font-mono whitespace-nowrap">
                    {new Date(q.scannedAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
