"use client";

import type { StatusDotColor } from "@/lib/launch-control-types";

const DOT_STYLES: Record<StatusDotColor, { bg: string; ping: string | null }> = {
  green: { bg: "bg-emerald-500", ping: "bg-emerald-400" },
  orange: { bg: "bg-amber-500", ping: null },
  red: { bg: "bg-red-500", ping: "bg-red-400" },
  gray: { bg: "bg-gray-300", ping: null },
};

interface StatusDotProps {
  color: StatusDotColor;
  size?: "sm" | "md";
}

export default function StatusDot({ color, size = "sm" }: StatusDotProps) {
  const style = DOT_STYLES[color];
  const dim = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";
  const pingDim = size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <span className={`relative flex ${dim}`}>
      {style.ping && (
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${pingDim} ${style.ping} ${
            color === "green" ? "animate-ping" : "animate-pulse"
          }`}
        />
      )}
      <span className={`relative inline-flex rounded-full ${dim} ${style.bg} border-2 border-surface`} />
    </span>
  );
}
