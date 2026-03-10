"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { X, Check, Copy, Loader2 } from "lucide-react";
import type { WorkBoardTask } from "@/lib/launch-control-types";
import type { Id } from "@/convex/_generated/dataModel";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending_review: { label: "Pending Review", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  needs_revision: { label: "Needs Revision", color: "text-red-700", bg: "bg-red-50 border-red-200" },
  approved:       { label: "Approved", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  draft_ready:    { label: "Draft Ready", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  dropped:        { label: "Dropped", color: "text-text-secondary", bg: "bg-surface-alt border-border-color/30" },
  posted:         { label: "Posted", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  skipped:        { label: "Skipped", color: "text-text-secondary", bg: "bg-surface-alt border-border-color/30" },
};

interface PostBriefModalProps {
  task: WorkBoardTask;
  open: boolean;
  onClose: () => void;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-1 shrink-0 p-0.5 rounded text-text-secondary/50 hover:text-text-secondary transition-colors"
      title="Copy"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
    </button>
  );
}

export default function PostBriefModal({ task, open, onClose }: PostBriefModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const { meta, title, status } = task;
  const statusConfig = STATUS_CONFIG[status] ?? {
    label: status,
    color: "text-text-secondary",
    bg: "bg-surface-alt border-border-color/30",
  };

  // Fetch full LinkedIn post detail (includes draftText + rationale stripped from board query)
  const postDetail = useQuery(api.workboard.getLinkedinPostDetail, { postId: task.id as Id<"linkedinPosts"> });
  const isLoadingDetail = postDetail === undefined;

  const insightText = meta.insightText as string | null;
  const rationale = postDetail?.rationale ?? null;
  const hookOptions = meta.hookOptions as string[] | null;
  const ctaOptions = meta.ctaOptions as string[] | null;
  const draftText = postDetail?.draftText ?? null;
  const sourceBlogTitle = meta.sourceBlogTitle as string | null;
  const sourceBlogUrl = meta.sourceBlogUrl as string | null;

  const hasSidebar = !!(rationale || hookOptions?.length || ctaOptions?.length || sourceBlogUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Mobile-only sticky dismiss — always visible even if sheet overflows */}
      <button
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[60] sm:hidden px-5 py-1.5 rounded-full bg-black/30 text-white/50 text-[11px] backdrop-blur-sm border border-white/10 hover:bg-black/50 hover:text-white/80 transition-colors"
        onClick={onClose}
      >
        dismiss
      </button>

      <div
        className="bg-surface border border-border-color/60 rounded-t-2xl sm:rounded-2xl shadow-card-hover w-full sm:max-w-[1100px] max-h-[80dvh] sm:max-h-[90dvh] relative animate-scaleIn overflow-hidden flex flex-col sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div
          className="flex justify-center pt-2.5 pb-1 sm:hidden cursor-pointer"
          onClick={onClose}
        >
          <div className="w-10 h-1 rounded-full bg-border-color/50" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-border-color/40 shrink-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="font-display text-base sm:text-lg font-semibold text-text-primary truncate">
                {title}
              </h2>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${statusConfig.color} ${statusConfig.bg}`}>
                {statusConfig.label}
              </span>
            </div>
            {sourceBlogTitle && (
              <p className="text-[11px] text-text-secondary italic truncate">↳ {sourceBlogTitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left — main content */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 space-y-6">
              {isLoadingDetail ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 size={20} className="animate-spin text-text-secondary/50" />
                  <span className="ml-2 text-sm text-text-secondary/50">Loading details...</span>
                </div>
              ) : draftText ? (
                <>
                  {insightText && (
                    <div>
                      <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-wider mb-2">Angle</p>
                      <p className="text-sm text-text-primary leading-relaxed">{insightText}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-wider mb-3">Full Draft</p>
                    <pre className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap font-sans bg-surface-alt/30 border border-border-color/20 rounded-xl p-4">
                      {draftText}
                    </pre>
                  </div>
                </>
              ) : (
                <>
                  {insightText ? (
                    <div>
                      <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-wider mb-2">Angle / Insight</p>
                      <p className="text-sm text-text-primary leading-relaxed">{insightText}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-text-secondary italic">No brief content yet.</p>
                  )}
                </>
              )}
            </div>

            {/* Right sidebar — source blog + rationale (always) + hook/CTA options */}
            {hasSidebar && (
              <div className="hidden sm:block lg:w-[320px] shrink-0 border-t lg:border-t-0 lg:border-l border-border-color/40 p-4 sm:p-6 bg-surface-alt/20 space-y-6">

                {/* Source blog link */}
                {sourceBlogUrl && (
                  <div>
                    <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-wider mb-2">Source Blog</p>
                    <a
                      href={sourceBlogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-blue hover:underline break-all leading-relaxed"
                    >
                      {sourceBlogTitle ?? sourceBlogUrl}
                    </a>
                  </div>
                )}

                {/* Rationale — always visible, this is the ICP bookmark-worthiness argument */}
                {rationale && (
                  <div>
                    <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-wider mb-2">Why ICP will bookmark this</p>
                    <p className="text-xs text-text-secondary leading-relaxed">{rationale}</p>
                  </div>
                )}

                {/* Hook options */}
                {hookOptions && hookOptions.length > 0 && (
                  <div>
                    <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-wider mb-3">Hook Options</p>
                    <ol className="space-y-2">
                      {hookOptions.map((hook, i) => (
                        <li key={i} className="flex items-start gap-2 group">
                          <span className="text-[10px] font-mono text-text-secondary/40 mt-0.5 shrink-0 w-4">{i + 1}.</span>
                          <p className="text-xs text-text-secondary leading-relaxed flex-1">{hook}</p>
                          <CopyButton text={hook} />
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* CTA options */}
                {ctaOptions && ctaOptions.length > 0 && (
                  <div>
                    <p className="text-[11px] font-medium text-text-secondary/60 uppercase tracking-wider mb-3">CTA Options</p>
                    <ol className="space-y-2">
                      {ctaOptions.map((cta, i) => (
                        <li key={i} className="flex items-start gap-2 group">
                          <span className="text-[10px] font-mono text-text-secondary/40 mt-0.5 shrink-0 w-4">{i + 1}.</span>
                          <p className="text-xs text-text-secondary leading-relaxed flex-1">{cta}</p>
                          <CopyButton text={cta} />
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
