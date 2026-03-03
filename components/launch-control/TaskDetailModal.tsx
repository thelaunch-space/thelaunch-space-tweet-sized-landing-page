"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { WorkBoardTask } from "@/lib/launch-control-types";

const PRIORITY_LABEL: Record<number, string> = { 1: "Low", 2: "Medium", 3: "High" };

interface TaskDetailModalProps {
  task: WorkBoardTask;
  onClose: () => void;
}

export default function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const updateManual = useMutation(api.manualTasks.update);
  const updateTask = useMutation(api.shaktiTasks.update);

  const isManual = task.type === "manual";
  const isTask = task.type === "task";

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState((task.meta.description as string | null) ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleSave() {
    setSaving(true);
    try {
      if (isManual) {
        await updateManual({
          id: task.id as Id<"manualTasks">,
          title: title.trim() || task.title,
          description: description.trim() || undefined,
        });
      } else {
        await updateTask({
          id: task.id as Id<"tasks">,
          title: title.trim() || undefined,
          description: description.trim() || undefined,
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  // Meta fields for client tasks
  const clientSlug = task.meta.clientSlug as string | undefined;
  const projectSlug = task.meta.projectSlug as string | undefined;
  const taskType = task.meta.taskType as string | undefined;
  const priority = task.meta.priority as number | undefined;
  const deadline = task.meta.deadline as string | undefined;
  const estimatedHours = task.meta.estimatedHours as number | undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/60 backdrop-blur-sm"
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
        className="bg-surface border border-border-color/60 rounded-t-2xl sm:rounded-2xl shadow-card-hover w-full sm:max-w-lg max-h-[80dvh] sm:max-h-[90dvh] relative overflow-hidden flex flex-col sm:mx-4"
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
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border-color/40 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border bg-surface-alt border-border-color/40 text-text-secondary shrink-0">
              {isManual ? "Manual" : "Task"}
            </span>
            <span className="text-xs font-medium text-text-secondary truncate">{task.status}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary/50 hover:text-text-secondary hover:bg-surface-alt transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Client task metadata — read-only */}
          {!isManual && clientSlug && (
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface-alt rounded-lg px-3 py-2">
                <p className="text-[10px] text-text-secondary/60 mb-0.5 uppercase tracking-wide font-medium">Client</p>
                <p className="text-xs text-text-primary font-medium">{clientSlug}</p>
              </div>
              <div className="bg-surface-alt rounded-lg px-3 py-2">
                <p className="text-[10px] text-text-secondary/60 mb-0.5 uppercase tracking-wide font-medium">Project</p>
                <p className="text-xs text-text-primary font-medium">{projectSlug ?? "—"}</p>
              </div>
              {taskType && (
                <div className="bg-surface-alt rounded-lg px-3 py-2">
                  <p className="text-[10px] text-text-secondary/60 mb-0.5 uppercase tracking-wide font-medium">Type</p>
                  <p className="text-xs text-text-primary">{taskType}</p>
                </div>
              )}
              {priority !== undefined && (
                <div className="bg-surface-alt rounded-lg px-3 py-2">
                  <p className="text-[10px] text-text-secondary/60 mb-0.5 uppercase tracking-wide font-medium">Priority</p>
                  <p className="text-xs text-text-primary">{PRIORITY_LABEL[priority] ?? priority}</p>
                </div>
              )}
              {deadline && (
                <div className="bg-surface-alt rounded-lg px-3 py-2">
                  <p className="text-[10px] text-text-secondary/60 mb-0.5 uppercase tracking-wide font-medium">Deadline</p>
                  <p className="text-xs text-text-primary">{deadline}</p>
                </div>
              )}
              {estimatedHours !== undefined && (
                <div className="bg-surface-alt rounded-lg px-3 py-2">
                  <p className="text-[10px] text-text-secondary/60 mb-0.5 uppercase tracking-wide font-medium">Est. Hours</p>
                  <p className="text-xs text-text-primary">{estimatedHours}h</p>
                </div>
              )}
            </div>
          )}

          {/* Editable title (manual and task types) */}
          {(isManual || isTask) && (
            <div>
              <label className="text-[10px] text-text-secondary/60 uppercase tracking-wide font-medium block mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-sm bg-surface-alt rounded-lg px-3 py-2 text-text-primary border border-border-color/40 focus:outline-none focus:border-accent-blue/50"
              />
            </div>
          )}

          {/* Editable description */}
          <div>
            <label className="text-[10px] text-text-secondary/60 uppercase tracking-wide font-medium block mb-1">
              Notes / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes or a description..."
              rows={5}
              className="w-full text-xs bg-surface-alt rounded-lg px-3 py-2.5 text-text-primary placeholder-text-secondary/40 border border-border-color/40 focus:outline-none focus:border-accent-blue/50 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-border-color/40 shrink-0">
          <button
            onClick={onClose}
            className="text-xs text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs px-3 py-1.5 rounded-lg bg-accent-blue text-white font-medium disabled:opacity-40 transition-all"
          >
            {saved ? "Saved!" : saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
