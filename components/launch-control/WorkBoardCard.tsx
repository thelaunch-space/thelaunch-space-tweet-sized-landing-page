"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MoreHorizontal } from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";
import type { WorkBoardTask, KanbanColumn } from "@/lib/launch-control-types";
import { CARD_BADGE_CONFIG, KANBAN_COLUMNS, OWNER_TAG_CONFIG } from "@/lib/launch-control-types";
import BriefReaderModal from "./BriefReaderModal";
import PostBriefModal from "./PostBriefModal";
import TaskDetailModal from "./TaskDetailModal";

// Slack channel for each agent — shown as reminder when feedback is sent
const AGENT_SLACK_CHANNEL: Record<string, string> = {
  Vibhishana: "#vibhishana-seo",
  Valmiki: "#valmiki-content",
};

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// Returns the "target" status when moving a card to a given column
function columnToStatus(column: KanbanColumn, type: string): string {
  switch (type) {
    case "brief":
      if (column === "todo") return "pending_review";
      if (column === "blocked") return "needs_revision";
      if (column === "in_progress") return "brief_ready";
      if (column === "done") return "published";
      return "pending_review";
    case "blog":
      if (column === "in_progress") return "writing";
      if (column === "todo") return "pr_created";
      if (column === "done") return "published";
      return "writing";
    case "linkedin":
      if (column === "todo") return "pending_review";
      if (column === "blocked") return "needs_revision";
      if (column === "in_progress") return "approved";
      if (column === "done") return "posted";
      return "pending_review";
    case "booking":
      if (column === "todo") return "new";
      if (column === "in_progress") return "contacted";
      if (column === "done") return "completed";
      return "new";
    case "tool":
      if (column === "backlog") return "proposed";
      if (column === "todo") return "approved";
      if (column === "done") return "built";
      return "proposed";
    case "cluster":
      if (column === "backlog") return "planned";
      if (column === "in_progress") return "in_progress";
      if (column === "done") return "complete";
      return "planned";
    case "manual":
      if (column === "todo") return "todo";
      if (column === "in_progress") return "in_progress";
      if (column === "blocked") return "blocked";
      if (column === "done") return "done";
      return "todo";
    case "task":
      if (column === "backlog") return "backlog";
      if (column === "todo") return "todo";
      if (column === "in_progress") return "in_progress";
      if (column === "blocked") return "blocked";
      if (column === "done") return "done";
      return "todo";
    default:
      return "todo";
  }
}

interface WorkBoardCardProps {
  task: WorkBoardTask;
}

export default function WorkBoardCard({ task }: WorkBoardCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number } | null>(null);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [postBriefModalOpen, setPostBriefModalOpen] = useState(false);
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);

  // Status dropdown state (for brief / blog / linkedin)
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [confirming, setConfirming] = useState(false);

  // Hook/CTA selection state (linkedin post-briefs only)
  const [pickedHook, setPickedHook] = useState<string | null>(null);
  const [pickedCta, setPickedCta] = useState<string | null>(null);

  const revisionCount = (task.meta.revisionCount as number) ?? 0;

  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const updateStatus = useMutation(api.workboard.updateArtifactStatus);
  const removeTask = useMutation(api.manualTasks.remove);
  const removeShaktiTask = useMutation(api.shaktiTasks.remove);

  const badge = CARD_BADGE_CONFIG[task.type];

  // Click-outside to close menu
  useEffect(() => {
    if (!menuOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [menuOpen]);

  function openMenu() {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
    setMenuOpen(true);
  }

  async function handleStatusChange(newStatus: string, feedbackText?: string, hookSelection?: string, ctaSelection?: string) {
    await updateStatus({
      type: task.type,
      id: task.id,
      newStatus,
      ...(feedbackText ? { feedback: feedbackText } : {}),
      ...(hookSelection ? { selectedHook: hookSelection } : {}),
      ...(ctaSelection ? { selectedCta: ctaSelection } : {}),
    });
  }

  async function handleConfirm() {
    const needsFeedback = selectedStatus === "needs_revision" || selectedStatus === "dropped" || selectedStatus === "skipped";
    const isLinkedinApprove = task.type === "linkedin" && selectedStatus === "approved";
    await handleStatusChange(
      selectedStatus,
      needsFeedback && feedback ? feedback : undefined,
      isLinkedinApprove && pickedHook ? pickedHook : undefined,
      isLinkedinApprove && pickedCta ? pickedCta : undefined,
    );
    // Open PR URL when publishing a blog
    if (task.type === "blog" && selectedStatus === "published" && task.meta.url) {
      window.open(task.meta.url as string, "_blank", "noopener,noreferrer");
    }
    setSelectedStatus("");
    setFeedback("");
    setPickedHook(null);
    setPickedCta(null);
    setConfirming(false);
  }

  function getStatusOptions(): { value: string; label: string }[] {
    const { type, status } = task;
    if (type === "brief") {
      if (status === "pending_review") return [
        { value: "brief_ready", label: "Approve" },
        { value: "needs_revision", label: "Needs Revision" },
        { value: "dropped", label: "Drop" },
      ];
      if (status === "brief_ready") return [
        { value: "dropped", label: "Drop" },
      ];
      if (status === "needs_revision") return [
        { value: "brief_ready", label: "Approve" },
        { value: "dropped", label: "Drop" },
      ];
    }
    if (type === "blog") {
      if (status === "pr_created") return [
        { value: "published", label: "Publish" },
        { value: "dropped", label: "Drop" },
      ];
    }
    if (type === "linkedin") {
      if (status === "pending_review") return [
        { value: "approved", label: "Approve" },
        { value: "needs_revision", label: "Needs Revision" },
        { value: "dropped", label: "Drop" },
      ];
      if (status === "needs_revision") return [
        { value: "approved", label: "Approve" },
        { value: "dropped", label: "Drop" },
      ];
      if (status === "draft_ready") return [
        { value: "posted", label: "Mark Posted" },
        { value: "skipped", label: "Skip" },
      ];
    }
    return [];
  }

  async function handleDelete() {
    if (task.type === "manual") {
      await removeTask({ id: task.id as Id<"manualTasks"> });
    } else if (task.type === "task") {
      await removeShaktiTask({ id: task.id as Id<"tasks"> });
    }
  }

  function handleTitleClick() {
    if (task.type === "brief") {
      setBriefModalOpen(true);
    } else if (task.type === "blog") {
      if (task.status === "pr_created" && task.meta.prUrl) {
        const prUrl = task.meta.prUrl as string;
        const prNumber = prUrl.match(/\/pull\/(\d+)/)?.[1];
        const topic = task.meta.topic as string | null;
        const slug = task.meta.slug as string;
        // Construct Netlify deploy preview URL if we have PR number + topic slug
        const deployPreviewUrl = prNumber && topic
          ? `https://deploy-preview-${prNumber}--thelaunchspace.netlify.app/blogs/${topic}/${slug}`
          : prUrl; // fallback: open GitHub PR URL
        window.open(deployPreviewUrl, "_blank", "noopener,noreferrer");
      } else {
        const url = task.meta.url as string | null;
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      }
    } else if (task.type === "linkedin") {
      setPostBriefModalOpen(true);
    } else if (task.type === "task" || task.type === "manual") {
      setTaskDetailOpen(true);
    }
  }

  // Secondary metadata line — type-specific context
  function renderMeta() {
    const { type, meta } = task;

    if (type === "brief" && meta.primaryKeyword) {
      return (
        <span className="text-[10px] font-mono bg-surface-alt text-text-secondary px-1.5 py-0.5 rounded truncate max-w-full">
          {meta.primaryKeyword as string}
        </span>
      );
    }
    if (type === "blog") {
      const keyword = (meta.keyword || meta.targetKeyword) as string | undefined;
      if (keyword) return <span className="text-[10px] text-text-secondary truncate">{keyword}</span>;
    }
    if (type === "linkedin" && meta.sourceBlogTitle) {
      return (
        <span className="text-[10px] text-text-secondary truncate italic">
          ↳ {meta.sourceBlogTitle as string}
        </span>
      );
    }
    if (type === "booking" && meta.email) {
      return <span className="text-[10px] text-text-secondary truncate">{meta.email as string}</span>;
    }
    if (type === "tool" && meta.targetKeyword) {
      return <span className="text-[10px] text-text-secondary truncate">{meta.targetKeyword as string}</span>;
    }
    if (type === "cluster" && meta.pillarName) {
      return <span className="text-[10px] text-text-secondary truncate">{meta.pillarName as string}</span>;
    }
    if (type === "manual" && meta.description) {
      return <span className="text-[10px] text-text-secondary truncate italic">{meta.description as string}</span>;
    }
    if (type === "task") {
      const clientSlug = meta.clientSlug as string;
      const projectSlug = meta.projectSlug as string;
      const taskType = meta.taskType as string;
      return (
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <span className="text-[10px] text-text-secondary truncate">{clientSlug} / {projectSlug}</span>
          <span className="text-[9px] font-mono bg-surface-alt text-text-secondary px-1 py-0.5 rounded w-fit">{taskType}</span>
        </div>
      );
    }
    return null;
  }

  // Action buttons for non-dropdown card types (booking, tool, manual)
  function renderActions() {
    const { type, status } = task;

    if (type === "booking") {
      if (status === "new") return (
        <ActionBtn label="Contacted" onClick={() => handleStatusChange("contacted")} primary />
      );
      if (status === "contacted") return (
        <>
          <ActionBtn label="Scheduled" onClick={() => handleStatusChange("scheduled")} primary />
          <ActionBtn label="Complete" onClick={() => handleStatusChange("completed")} />
        </>
      );
    }

    if (type === "tool") {
      if (status === "proposed") return (
        <>
          <ActionBtn label="Approve" onClick={() => handleStatusChange("approved")} primary />
          <ActionBtn label="Reject" onClick={() => handleStatusChange("rejected")} danger />
        </>
      );
    }

    if (type === "manual") {
      if (status === "todo") return <ActionBtn label="Start" onClick={() => handleStatusChange("in_progress")} primary />;
      if (status === "in_progress") return <ActionBtn label="Done" onClick={() => handleStatusChange("done")} primary />;
    }

    if (type === "task") {
      if (status === "todo") return <ActionBtn label="Start" onClick={() => handleStatusChange("in_progress")} primary />;
      if (status === "in_progress") return (
        <>
          <ActionBtn label="Done" onClick={() => handleStatusChange("done")} primary />
          <ActionBtn label="Block" onClick={() => handleStatusChange("blocked")} danger />
        </>
      );
      if (status === "blocked") return <ActionBtn label="Unblock" onClick={() => handleStatusChange("in_progress")} primary />;
    }

    return null;
  }

  // Status dropdown for brief / blog / linkedin
  function renderStatusDropdown() {
    const options = getStatusOptions();
    if (options.length === 0) return null;
    const showFeedback = confirming && (
      selectedStatus === "needs_revision" || selectedStatus === "dropped" || selectedStatus === "skipped"
    );
    const selectedLabel = options.find((o) => o.value === selectedStatus)?.label;

    // When approving a linkedin post-brief, require hook + CTA selection
    const isLinkedinApprove = confirming && task.type === "linkedin" && selectedStatus === "approved";
    const hookOptions = task.meta.hookOptions as string[] | null;
    const ctaOptions = task.meta.ctaOptions as string[] | null;
    const hasHookOptions = isLinkedinApprove && hookOptions && hookOptions.length > 0;
    const hasCtaOptions = isLinkedinApprove && ctaOptions && ctaOptions.length > 0;
    const approveDisabled = isLinkedinApprove && (hasHookOptions || hasCtaOptions) && (!pickedHook || !pickedCta);

    return (
      <div className="mt-2 w-full">
        {!confirming ? (
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setConfirming(true);
            }}
            className="bg-surface border border-border-color/30 rounded-lg text-[11px] text-text-primary px-2 py-1 w-full cursor-pointer"
          >
            <option value="">Change status...</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        ) : (
          <>
            <p className="text-[11px] text-text-secondary mb-1.5">
              → <span className="text-text-primary font-medium">{selectedLabel}</span>?
            </p>

            {/* Hook selection pills (linkedin approve only) */}
            {hasHookOptions && (
              <div className="mb-2">
                <p className="text-[10px] font-medium text-text-secondary/60 uppercase tracking-wider mb-1.5">Pick a hook</p>
                <div className="flex flex-wrap gap-1">
                  {hookOptions.map((hook, i) => (
                    <button
                      key={i}
                      onClick={() => setPickedHook(pickedHook === hook ? null : hook)}
                      className={`text-[10px] leading-snug px-2 py-1 rounded-lg border transition-colors text-left ${
                        pickedHook === hook
                          ? "bg-accent-blue/10 text-accent-blue border-accent-blue/30 font-medium"
                          : "bg-surface-alt text-text-secondary border-border-color/30 hover:border-border-color/60"
                      }`}
                    >
                      {hook}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA selection pills (linkedin approve only) */}
            {hasCtaOptions && (
              <div className="mb-2">
                <p className="text-[10px] font-medium text-text-secondary/60 uppercase tracking-wider mb-1.5">Pick a CTA</p>
                <div className="flex flex-wrap gap-1">
                  {ctaOptions.map((cta, i) => (
                    <button
                      key={i}
                      onClick={() => setPickedCta(pickedCta === cta ? null : cta)}
                      className={`text-[10px] leading-snug px-2 py-1 rounded-lg border transition-colors text-left ${
                        pickedCta === cta
                          ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 font-medium"
                          : "bg-surface-alt text-text-secondary border-border-color/30 hover:border-border-color/60"
                      }`}
                    >
                      {cta}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showFeedback && (
              <textarea
                placeholder="Feedback (optional) — stored as audit trail..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="bg-surface-alt border border-border-color/30 rounded-lg text-[11px] text-text-primary px-2 py-1.5 w-full resize-none mt-1"
                rows={2}
              />
            )}
            <div className="flex gap-2 mt-1.5">
              <button
                onClick={handleConfirm}
                disabled={!!approveDisabled}
                className={`text-white text-[10px] font-medium px-2.5 py-1 rounded-md transition-colors ${
                  approveDisabled
                    ? "bg-emerald-500/40 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => { setSelectedStatus(""); setFeedback(""); setPickedHook(null); setPickedCta(null); setConfirming(false); }}
                className="bg-surface-alt text-text-secondary text-[10px] px-2 py-1 rounded-md hover:text-text-primary transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Revision count indicator — shown on brief cards that have been revised
  function renderRevisionHistory() {
    if (task.type !== "brief" || revisionCount === 0) return null;
    const label = revisionCount === 1 ? "1 revision" : `${revisionCount} revisions`;

    return (
      <div className="mt-2">
        <span className="text-[10px] text-text-secondary/50">
          ↩ {label}
        </span>
      </div>
    );
  }

  // Stored feedback display — shown on blocked cards that have feedback saved
  function renderFeedbackBadge() {
    const storedFeedback = task.meta.krishnaFeedback as string | null;
    if (!storedFeedback) return null;
    if (task.column !== "blocked") return null;

    const agentOwner = task.owner;
    const slackChannel = agentOwner ? AGENT_SLACK_CHANNEL[agentOwner] : null;

    return (
      <div className="mt-2 bg-amber-500/5 border border-amber-500/20 rounded-lg px-2 py-1.5">
        <p className="text-[10px] text-amber-700 font-medium mb-0.5">Feedback stored:</p>
        <p className="text-[10px] text-text-secondary leading-relaxed">{storedFeedback}</p>
        {slackChannel && (
          <p className="text-[10px] text-amber-600/70 mt-1">
            → Send to {agentOwner} in <span className="font-mono">{slackChannel}</span>
          </p>
        )}
      </div>
    );
  }

  const meta = renderMeta();
  const usesDropdown = task.type === "brief" || task.type === "blog" || task.type === "linkedin";

  // LinkedIn phase sub-badge — inferred from status + presence of draftText
  const linkedinSubBadge: { label: string; color: string } | null = (() => {
    if (task.type !== "linkedin") return null;
    const hasDraft = !!task.meta.hasDraft;
    switch (task.status) {
      case "pending_review":  return { label: "Post-Brief",   color: "text-amber-600" };
      case "needs_revision":  return { label: "Needs Revision", color: "text-red-500" };
      case "approved":        return { label: "Writing…",     color: "text-blue-500" };
      case "draft_ready":     return { label: hasDraft ? "Post-Draft" : "Post-Brief", color: "text-emerald-600" };
      case "posted":          return { label: "Posted",       color: "text-emerald-500" };
      case "skipped":         return { label: "Skipped",      color: "text-text-secondary/50" };
      case "dropped":         return { label: "Dropped",      color: "text-text-secondary/50" };
      default:                return null;
    }
  })();

  return (
    <>
      <div className="bg-surface border border-border-color/30 rounded-xl p-3 shadow-sm hover:shadow-card hover:border-border-color/60 transition-all cursor-default">
        {/* Header row: badge + version pill + overflow menu */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${badge.color} ${badge.bg}`}>
              {badge.label}
            </span>
            {linkedinSubBadge && (
              <span className={`shrink-0 text-[9px] font-medium ${linkedinSubBadge.color}`}>
                {linkedinSubBadge.label}
              </span>
            )}
            {task.type === "brief" && revisionCount > 0 && (
              <span className="text-[9px] font-mono text-text-secondary/50 bg-surface-alt px-1 py-0.5 rounded border border-border-color/20 shrink-0">
                v{revisionCount + 1}
              </span>
            )}
          </div>

          {/* Overflow menu button */}
          <button
            ref={btnRef}
            onClick={openMenu}
            className="p-1 rounded text-text-secondary/40 hover:text-text-secondary hover:bg-surface-alt transition-colors shrink-0"
            aria-label="More options"
          >
            <MoreHorizontal size={13} />
          </button>
        </div>

        {/* Title */}
        <button
          className="text-xs font-medium text-text-primary text-left line-clamp-2 leading-snug hover:text-accent-blue transition-colors w-full mb-1.5 disabled:cursor-default disabled:hover:text-text-primary"
          onClick={handleTitleClick}
          disabled={task.type !== "brief" && task.type !== "blog" && task.type !== "task" && task.type !== "manual" && task.type !== "linkedin"}
          title={task.title}
        >
          {task.title}
        </button>

        {/* Metadata line */}
        {meta && (
          <div className="flex items-center mb-2 overflow-hidden">
            {meta}
          </div>
        )}

        {/* Footer: owner + actions (booking/tool/manual only) */}
        <div className="flex items-center justify-between gap-2">
          {task.owner ? (
            <OwnerTag owner={task.owner} />
          ) : (
            <span className="text-[10px] text-text-secondary">—</span>
          )}
          {!usesDropdown && (
            <div className="flex items-center gap-1 shrink-0">
              {renderActions()}
            </div>
          )}
        </div>

        {/* Stored feedback badge (blocked cards with saved feedback) */}
        {usesDropdown && renderFeedbackBadge()}

        {/* Revision history (brief cards revised in place) */}
        {renderRevisionHistory()}

        {/* Status dropdown (brief / blog / linkedin) */}
        {usesDropdown && task.column !== "done" && renderStatusDropdown()}

        <p className="text-[10px] text-text-secondary/40 font-mono text-right mt-1">
          {relativeTime(task.timestamp)}
        </p>
        <HealthBar timestamp={task.timestamp} isDone={task.column === "done"} />
      </div>

      {/* Overflow menu — fixed-position to avoid column clipping */}
      {menuOpen && menuPos && (
        <div
          ref={menuRef}
          className="fixed z-50 bg-surface border border-border-color/60 rounded-xl shadow-card-hover py-1 min-w-[160px]"
          style={{ top: menuPos.top, right: menuPos.right }}
        >
          <p className="text-[10px] text-text-secondary/60 px-3 py-1 font-medium uppercase tracking-wide">Move to</p>
          {KANBAN_COLUMNS.map((col) =>
            col.id !== task.column ? (
              <button
                key={col.id}
                onClick={() => {
                  handleStatusChange(columnToStatus(col.id, task.type));
                  setMenuOpen(false);
                }}
                className="w-full text-left text-xs text-text-secondary hover:text-text-primary hover:bg-surface-alt px-3 py-1.5 transition-colors"
              >
                {col.label}
              </button>
            ) : null
          )}

          {(task.type === "manual" || task.type === "task") && (
            <>
              <div className="my-1 border-t border-border-color/40" />
              <button
                onClick={() => {
                  handleDelete();
                  setMenuOpen(false);
                }}
                className="w-full text-left text-xs text-red-600 hover:bg-red-50 px-3 py-1.5 transition-colors"
              >
                Delete task
              </button>
            </>
          )}
          {task.type === "brief" && task.status === "pending_review" && (
            <>
              <div className="my-1 border-t border-border-color/40" />
              <button
                onClick={() => {
                  handleStatusChange("dropped");
                  setMenuOpen(false);
                }}
                className="w-full text-left text-xs text-red-600 hover:bg-red-50 px-3 py-1.5 transition-colors"
              >
                Drop brief
              </button>
            </>
          )}
        </div>
      )}

      {briefModalOpen && task.type === "brief" && (
        <BriefReaderModal
          briefId={task.id as Id<"briefs">}
          onClose={() => setBriefModalOpen(false)}
        />
      )}

      {task.type === "linkedin" && postBriefModalOpen && (
        <PostBriefModal
          task={task}
          open={postBriefModalOpen}
          onClose={() => setPostBriefModalOpen(false)}
        />
      )}

      {taskDetailOpen && (task.type === "task" || task.type === "manual") && (
        <TaskDetailModal
          task={task}
          onClose={() => setTaskDetailOpen(false)}
        />
      )}
    </>
  );
}

function OwnerTag({ owner, compact }: { owner: string; compact?: boolean }) {
  const isKrishna = owner === "Krishna";
  const config = OWNER_TAG_CONFIG[owner];

  if (isKrishna) {
    return (
      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800">
        <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
          K
        </span>
        {!compact && <span className="text-[10px] font-medium">Krishna</span>}
      </span>
    );
  }

  if (!config) return <span className="text-[10px] text-text-secondary">{owner}</span>;

  return (
    <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border ${config.bg} ${config.color} ${config.border}`}>
      <img
        src={`/agent-avatars/${owner.toLowerCase()}.png`}
        alt=""
        className="w-4 h-4 rounded-full object-cover shrink-0"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      {!compact && <span className="text-[10px] font-medium">{owner}</span>}
    </span>
  );
}

function HealthBar({ timestamp, isDone }: { timestamp: string; isDone: boolean }) {
  if (isDone) {
    return <div className="h-[2px] w-full rounded-full bg-emerald-400 mt-1" />;
  }

  const ageMs = Date.now() - new Date(timestamp).getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  const MAX_DAYS = 14;
  const fillPct = Math.min(100, (ageDays / MAX_DAYS) * 100);

  let color: string;
  if (ageDays < 1) color = "bg-emerald-400";
  else if (ageDays < 3) color = "bg-yellow-400";
  else if (ageDays < 7) color = "bg-orange-400";
  else color = "bg-red-500";

  return (
    <div
      className="h-[2px] w-full rounded-full bg-surface-alt mt-1 overflow-hidden"
      title={`In stage for ${Math.floor(ageDays)}d`}
    >
      <div
        className={`h-full rounded-full ${color} transition-all`}
        style={{ width: `${fillPct}%` }}
      />
    </div>
  );
}

function ActionBtn({
  label,
  onClick,
  primary,
  danger,
  icon,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
        primary
          ? "bg-accent-blue/10 text-accent-blue border-accent-blue/20 hover:bg-accent-blue/20"
          : danger
          ? "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20"
          : "bg-surface-alt text-text-secondary border-border-color/40 hover:text-text-primary"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
