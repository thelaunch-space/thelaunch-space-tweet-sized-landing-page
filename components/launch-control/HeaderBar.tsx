"use client";

import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import type { WeeklyStats } from "@/lib/launch-control-types";

interface HeaderBarProps {
  weeklyStats: WeeklyStats | undefined;
}

export default function HeaderBar({ weeklyStats }: HeaderBarProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border-color/40">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Title + Logo attribution */}
        <div className="flex items-center gap-2.5 min-w-0">
          <h1 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-text-primary whitespace-nowrap">
            Launch Control
          </h1>

          {/* "by thelaunch.space" with logo — desktop */}
          <div className="hidden md:flex items-center gap-1.5 pl-2.5 border-l border-border-color/40">
            <span className="text-[11px] text-text-secondary/60 font-medium">by</span>
            <Link href="/" className="opacity-60 hover:opacity-100 transition-opacity">
              <img
                src="/logo.png"
                alt="thelaunch.space"
                className="h-5 w-auto"
              />
            </Link>
          </div>
        </div>

        {/* Right: Date + Stats + Auth */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:block text-xs text-text-secondary font-mono">{today}</span>

          {weeklyStats && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-alt/60">
              <span className="meta-label text-text-secondary">7d</span>
              <span className="font-mono text-xs text-text-primary">{weeklyStats.questions}q</span>
              <span className="text-border-color/60 text-[9px]">&bull;</span>
              <span className="font-mono text-xs text-text-primary">{weeklyStats.briefs}b</span>
              <span className="text-border-color/60 text-[9px]">&bull;</span>
              <span className="font-mono text-xs text-text-primary">{weeklyStats.blogs}p</span>
            </div>
          )}

          <div className="hidden sm:block w-px h-5 bg-border-color/40" />

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Mobile: logo attribution */}
      <div className="md:hidden flex items-center gap-1.5 px-3 pb-2 -mt-0.5">
        <span className="text-[10px] text-text-secondary/50 font-medium">by</span>
        <Link href="/" className="opacity-50 hover:opacity-80 transition-opacity">
          <img
            src="/logo.png"
            alt="thelaunch.space"
            className="h-4 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
