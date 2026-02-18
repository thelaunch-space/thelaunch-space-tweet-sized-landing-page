"use client";

import { useState, useRef, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CATEGORY_LABELS } from "@/lib/blog-labels";
import type { BlogPost } from "@/lib/blog";
import type { Doc } from "@/convex/_generated/dataModel";

type SortKey = "title" | "category" | "keyword" | "wordCount" | "enrichment" | "status" | "published";
type SortDir = "asc" | "desc";

const BLOG_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  published: { label: "Published", color: "text-emerald-700", bg: "bg-emerald-500/10" },
  pr_created: { label: "PR Created", color: "text-blue-700", bg: "bg-blue-500/10" },
  writing: { label: "Writing", color: "text-amber-700", bg: "bg-amber-500/10" },
  draft: { label: "Draft", color: "text-purple-700", bg: "bg-purple-500/10" },
};

interface MergedBlog {
  slug: string;
  title: string;
  url: string;
  category: string;
  categoryLabel: string;
  keyword: string;
  wordCount: number;
  enrichment: number;
  enrichmentLog: string;
  status: string;
  published: string;
  briefId: string;
  hasPillar: boolean;
}

interface BlogsTableProps {
  blogPosts: BlogPost[];
}

function mergeBlogData(
  blogPosts: BlogPost[],
  convexBlogs: Doc<"blogs">[] | undefined,
  clusters: Doc<"topicClusters">[] | undefined,
): MergedBlog[] {
  return blogPosts.map((post) => {
    const convex = convexBlogs?.find((b) => post.url?.includes(b.slug));
    const hasPillar = clusters?.some((c) => c.blogUrl && post.url?.includes(c.blogUrl)) ?? false;
    return {
      slug: post.slug,
      title: post.title,
      url: post.url,
      category: post.topic,
      categoryLabel: CATEGORY_LABELS[post.topic] ?? post.topic.replace(/-/g, " "),
      keyword: convex?.keyword ?? "",
      wordCount: convex?.wordCount ?? 0,
      enrichment: convex?.enrichmentCount ?? 0,
      enrichmentLog: convex?.enrichmentLog ?? "",
      status: convex?.status ?? "published",
      published: post.publishedTime,
      briefId: convex?.briefId ?? "",
      hasPillar,
    };
  });
}

function sortBlogs(blogs: MergedBlog[], key: SortKey, dir: SortDir): MergedBlog[] {
  return [...blogs].sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case "wordCount":
      case "enrichment":
        cmp = (a[key] ?? 0) - (b[key] ?? 0);
        break;
      case "published":
        cmp = new Date(a.published).getTime() - new Date(b.published).getTime();
        break;
      default:
        cmp = String(a[key] ?? "").localeCompare(String(b[key] ?? ""));
    }
    return dir === "asc" ? cmp : -cmp;
  });
}

export default function BlogsTable({ blogPosts }: BlogsTableProps) {
  const convexBlogs = useQuery(api.blogs.listRecent, { limit: 100 });
  const clusters = useQuery(api.topicClusters.listFull, { limit: 200 });

  const [sortKey, setSortKey] = useState<SortKey>("published");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
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

  if (blogPosts.length === 0 && convexBlogs === undefined) {
    return (
      <div className="space-y-2 animate-pulse p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-surface-alt rounded" />
        ))}
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <p className="text-xs text-text-secondary italic text-center py-8">
        No blogs published yet — Vyasa publishes daily
      </p>
    );
  }

  const merged = mergeBlogData(blogPosts, convexBlogs ?? undefined, clusters ?? undefined);

  const filtered = merged.filter((b) => {
    if (categoryFilter !== "all" && b.category !== categoryFilter) return false;
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    return true;
  });

  const sorted = sortBlogs(filtered, sortKey, sortDir);

  const categories = [...new Set(merged.map((b) => b.category))];
  const statuses = [...new Set(merged.map((b) => b.status))];

  const SortArrow = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return <span className="ml-0.5">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const config = BLOG_STATUS_CONFIG[status] ?? { label: status, color: "text-text-secondary", bg: "bg-surface-alt" };
    return (
      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const EnrichmentBadge = ({ count, log }: { count: number; log: string }) => {
    if (!count) return <span className="text-text-secondary/40">—</span>;
    return (
      <span
        className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 cursor-default"
        title={log || `Enriched ${count} time${count > 1 ? "s" : ""}`}
      >
        {count}x
      </span>
    );
  };

  // Mobile card view
  const MobileCards = () => (
    <div className="md:hidden space-y-3 p-3">
      {sorted.map((b) => (
        <div key={b.slug} className="rounded-xl border border-border-color/30 p-3 space-y-2">
          <a
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-text-primary hover:text-accent-blue transition-colors line-clamp-2 block"
          >
            {b.title}
          </a>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent-blue/70 bg-accent-blue/10 px-1.5 py-0.5 rounded">
              {b.categoryLabel}
            </span>
            {b.keyword && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-alt text-text-secondary">
                {b.keyword}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-text-secondary">
            <StatusBadge status={b.status} />
            <EnrichmentBadge count={b.enrichment} log={b.enrichmentLog} />
            <span className="ml-auto font-mono">{new Date(b.published).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="lg:flex lg:flex-col lg:flex-1 lg:min-h-0">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-3 shrink-0 px-3 pt-3">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-[11px] px-2 py-1 rounded-lg border border-border-color/40 bg-surface text-text-secondary"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c] ?? c}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-[11px] px-2 py-1 rounded-lg border border-border-color/40 bg-surface text-text-secondary"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{BLOG_STATUS_CONFIG[s]?.label ?? s}</option>
          ))}
        </select>
        <span className="text-[10px] font-mono text-text-secondary self-center ml-auto">
          {sorted.length} of {merged.length}
        </span>
      </div>

      {/* Mobile cards */}
      <MobileCards />

      {/* Desktop table */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="hidden md:block overflow-auto scrollbar-hide rounded-lg border border-border-color/30 mx-3 mb-3 lg:flex-1 lg:min-h-0"
      >
        <table className="w-full text-xs min-w-[900px]">
          <thead className="sticky top-0 z-[3]">
            <tr className="border-b border-border-color/30 bg-surface-alt">
              <th
                className="sticky left-0 z-[4] bg-surface-alt text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-colors max-w-[260px]"
                style={{ boxShadow: showShadow ? "4px 0 8px -2px rgba(0,0,0,0.06)" : "none" }}
                onClick={() => toggleSort("title")}
              >
                Title<SortArrow col="title" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary whitespace-nowrap" onClick={() => toggleSort("category")}>
                Category<SortArrow col="category" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary whitespace-nowrap" onClick={() => toggleSort("keyword")}>
                Keyword<SortArrow col="keyword" />
              </th>
              <th className="text-right px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary whitespace-nowrap" onClick={() => toggleSort("wordCount")}>
                Words<SortArrow col="wordCount" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary whitespace-nowrap" onClick={() => toggleSort("enrichment")}>
                Enriched<SortArrow col="enrichment" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary whitespace-nowrap" onClick={() => toggleSort("status")}>
                Status<SortArrow col="status" />
              </th>
              <th className="text-left px-3 py-2.5 font-medium text-text-secondary cursor-pointer hover:text-text-primary whitespace-nowrap" onClick={() => toggleSort("published")}>
                Published<SortArrow col="published" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((b) => (
              <tr key={b.slug} className="border-b border-border-color/10 hover:bg-surface-alt/30 transition-colors">
                <td
                  className="sticky left-0 z-[1] bg-surface px-3 py-2.5 max-w-[260px]"
                  style={{ boxShadow: showShadow ? "4px 0 8px -2px rgba(0,0,0,0.06)" : "none" }}
                >
                  <div className="flex items-center gap-1.5">
                    {b.hasPillar && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" title="Aligned to pillar cluster" />
                    )}
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-accent-blue transition-colors line-clamp-2 font-medium"
                    >
                      {b.title}
                    </a>
                  </div>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent-blue/70 bg-accent-blue/10 px-1.5 py-0.5 rounded">
                    {b.categoryLabel}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-mono text-text-secondary max-w-[160px] truncate">
                  {b.keyword || "—"}
                </td>
                <td className="px-3 py-2.5 font-mono text-text-secondary text-right whitespace-nowrap">
                  {b.wordCount || "—"}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <EnrichmentBadge count={b.enrichment} log={b.enrichmentLog} />
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-3 py-2.5 text-text-secondary font-mono whitespace-nowrap">
                  {new Date(b.published).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
