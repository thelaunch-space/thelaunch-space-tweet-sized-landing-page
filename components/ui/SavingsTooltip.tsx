"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

interface SavingsTooltipProps {
  rationale: string;
  children: ReactNode;
}

export default function SavingsTooltip({
  rationale,
  children,
}: SavingsTooltipProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  // Close on outside tap (mobile)
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [open]);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex items-baseline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-text-secondary/50 hover:text-text-secondary text-xs ml-0.5 cursor-help leading-none"
        aria-label="How we calculate savings"
      >
        *
      </button>
      {open && (
        <span
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg border border-border-color bg-surface-alt p-3 text-xs text-text-secondary shadow-card z-[100] text-left leading-relaxed"
          role="tooltip"
        >
          {rationale}
        </span>
      )}
    </span>
  );
}
