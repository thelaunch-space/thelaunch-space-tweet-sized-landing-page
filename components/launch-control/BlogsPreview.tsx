"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CATEGORY_LABELS } from "@/lib/blog-labels";
import type { BlogPost } from "@/lib/blog";
import PreviewGate from "./PreviewGate";

interface BlogsPreviewProps {
  blogPosts: BlogPost[];
}

export default function BlogsPreview({ blogPosts }: BlogsPreviewProps) {
  const convexBlogs = useQuery(api.blogs.listRecent, { limit: 100 });

  if (blogPosts.length === 0) {
    return (
      <p className="text-xs text-text-secondary italic text-center py-8">
        No blogs published yet
      </p>
    );
  }

  const posts = blogPosts.map((post) => {
    const convex = convexBlogs?.find((b) => post.url?.includes(b.slug));
    return {
      ...post,
      keyword: convex?.keyword ?? "",
      categoryLabel: CATEGORY_LABELS[post.topic] ?? post.topic.replace(/-/g, " "),
    };
  });

  return (
    <PreviewGate>
      <div className="lg:flex lg:flex-col lg:flex-1 lg:min-h-0">
        {/* Mobile: card view */}
        <div className="md:hidden space-y-3 p-3">
          {posts.map((p) => (
            <div key={p.url} className="rounded-xl border border-border-color/30 p-3 space-y-2">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-text-primary hover:text-accent-blue transition-colors line-clamp-2 block"
              >
                {p.title}
              </a>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent-blue/70 bg-accent-blue/10 px-1.5 py-0.5 rounded">
                  {p.categoryLabel}
                </span>
                {p.keyword && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-alt text-text-secondary">
                    {p.keyword}
                  </span>
                )}
                <span className="text-[10px] text-text-secondary ml-auto">{new Date(p.publishedTime).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table view */}
        <div className="hidden md:block overflow-auto lg:flex-1 lg:min-h-0 scrollbar-hide">
          <table className="w-full text-xs">
            <thead className="sticky top-0 z-[1]">
              <tr className="border-b border-border-color/30 bg-surface-alt">
                <th className="text-left px-3 py-2.5 font-medium text-text-secondary">Title</th>
                <th className="text-left px-3 py-2.5 font-medium text-text-secondary">Category</th>
                <th className="text-left px-3 py-2.5 font-medium text-text-secondary">Keyword</th>
                <th className="text-left px-3 py-2.5 font-medium text-text-secondary">Published</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.url} className="border-b border-border-color/10">
                  <td className="px-3 py-2.5 max-w-[260px]">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-accent-blue transition-colors font-medium line-clamp-1 block"
                    >
                      {p.title}
                    </a>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent-blue/70 bg-accent-blue/10 px-1.5 py-0.5 rounded">
                      {p.categoryLabel}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-text-secondary max-w-[160px] truncate">
                    {p.keyword || "—"}
                  </td>
                  <td className="px-3 py-2.5 text-text-secondary font-mono whitespace-nowrap">
                    {new Date(p.publishedTime).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PreviewGate>
  );
}
