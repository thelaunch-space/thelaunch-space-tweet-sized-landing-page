"use client";

import { motion } from "framer-motion";

interface BadgeStatusProps {
  status: "live" | "in-progress" | "coming-soon";
}

export default function BadgeStatus({ status }: BadgeStatusProps) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-accent-emerald">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block w-2 h-2 rounded-full bg-accent-emerald"
        />
        LIVE
      </span>
    );
  }

  if (status === "in-progress") {
    return (
      <span className="font-mono text-xs font-medium text-accent-warm">
        IN PROGRESS
      </span>
    );
  }

  return (
    <span className="font-mono text-xs font-medium text-text-secondary">
      COMING SOON
    </span>
  );
}
