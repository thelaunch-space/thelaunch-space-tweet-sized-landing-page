"use client";

import { usePathname } from "next/navigation";

const VISIBLE_PATHS = ["/", "/build-your-ai-team"];

export default function AnnouncementRibbon() {
  const pathname = usePathname();

  const isVisible = VISIBLE_PATHS.some(
    (p) => pathname === p || (p !== "/" && pathname.startsWith(p + "/"))
  );

  if (!isVisible) return null;

  return (
    <div className="relative z-[60] w-full overflow-hidden bg-[#0a0e1a]">
      {/* Subtle animated gradient shimmer — moves slowly left-to-right */}
      <div
        className="absolute inset-0 opacity-[0.07] animate-ribbon-shimmer"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #003DA5 20%, #6D28D9 50%, #5A9A80 80%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Fine bottom border with brand gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, #003DA5 30%, #6D28D9 70%, transparent)",
        }}
      />

      <div className="relative flex items-center justify-center gap-x-3 px-4 py-[7px] sm:py-2">
        {/* Live pulse dot */}
        <span className="relative flex h-[6px] w-[6px] shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-60" />
          <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-accent-emerald" />
        </span>

        {/* Label */}
        <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-white/50">
          Coming Soon
        </span>

        {/* Divider dot — desktop only */}
        <span className="hidden sm:inline text-white/20 text-[8px]">
          &bull;
        </span>

        {/* Main copy */}
        <span className="text-[11px] sm:text-xs text-white/70 font-sans">
          <span className="font-semibold text-white/90">Launch Control</span>
          <span className="hidden sm:inline">
            {" "}— watch your AI agents work in real time
          </span>
        </span>

        {/* CTA link */}
        <a
          href="https://www.linkedin.com/in/krishna-goutham/"
          target="_blank"
          rel="noopener noreferrer"
          className="group ml-1 inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-accent-emerald/90 hover:text-accent-emerald transition-colors whitespace-nowrap"
        >
          <span className="hidden sm:inline">DM for early access</span>
          <span className="sm:hidden">Early access</span>
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}
