"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";
import XIcon from "@/components/XIcon";

export default function NavBar() {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blogs");
  const isAITeam = pathname.startsWith("/my-ai-employees");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isBlog) return;
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isBlog]);

  const showCTA = isBlog && scrolled;

  return (
    <nav className="sticky top-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 pt-3 pb-1">
      <div className="max-w-[1200px] mx-auto rounded-xl sm:rounded-2xl border border-border-color/40 shadow-slab bg-surface/80 backdrop-blur-sm px-5 md:px-8 py-3 flex items-center justify-between">
        <Link href="/">
          <img
            src="/logo.png"
            alt="thelaunch.space"
            className="h-12 md:h-14 w-auto"
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/blogs"
            className={`text-sm font-medium transition-colors ${
              isBlog
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/my-ai-employees"
            className={`text-sm font-medium transition-colors ${
              isAITeam
                ? "text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            AI Team
          </Link>
          <div className="w-px h-4 bg-border-color/60" />
          <div className={`flex items-center gap-6 transition-all duration-300 ${showCTA ? "hidden sm:flex" : "flex"}`}>
            <a
              href="https://x.com/nkgoutham"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary"
              aria-label="Follow on X"
            >
              <XIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/krishna-goutham/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
          {showCTA && (
            <a
              href="/?cta=open"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(37,99,235,0.35)] animate-in fade-in slide-in-from-right-2"
            >
              Get Your Launch Roadmap
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
