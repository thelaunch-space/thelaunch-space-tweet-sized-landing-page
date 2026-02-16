"use client";

import type { BlogPost } from "@/lib/blog";
import { CATEGORY_LABELS } from "@/lib/blog-labels";

interface BlogsPanelProps {
  blogPosts: BlogPost[];
}

export default function BlogsPanel({ blogPosts }: BlogsPanelProps) {
  if (blogPosts.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-text-secondary">No blogs published yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border-color/40">
      {blogPosts.map((post) => (
        <div
          key={post.url}
          className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-alt/40 transition-colors"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent-blue/70 bg-accent-blue/10 px-1.5 py-0.5 rounded shrink-0">
                {CATEGORY_LABELS[post.topic] ?? post.topic.replace(/-/g, " ")}
              </span>
            </div>
            <p className="text-sm font-medium text-text-primary truncate">{post.title}</p>
          </div>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-accent-blue hover:text-accent-purple transition-colors shrink-0 flex items-center gap-1"
          >
            View Blog
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
}
