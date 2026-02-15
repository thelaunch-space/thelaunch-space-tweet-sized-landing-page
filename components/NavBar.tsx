"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Linkedin, Menu, X } from "lucide-react";
import XIcon from "@/components/XIcon";

export default function NavBar() {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blogs");
  const isAITeam = pathname.startsWith("/build-your-ai-team");
  const isLaunchControl = pathname.startsWith("/launch-control");

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBlog) return;
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isBlog]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Launch Control has its own header — hide NavBar entirely
  if (isLaunchControl) return null;

  const showCTA = isBlog && scrolled;

  return (
    <nav className="sticky top-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 pt-3 pb-1">
      <div ref={menuRef} className="max-w-[1200px] mx-auto rounded-xl sm:rounded-2xl border border-border-color/40 shadow-slab bg-surface/80 backdrop-blur-sm px-5 md:px-8 py-3 flex items-center justify-between relative">
        <Link href="/">
          <img
            src="/logo.png"
            alt="thelaunch.space"
            className="h-11 md:h-13 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/blogs"
            className={`text-sm font-medium transition-all duration-200 rounded-lg px-3 py-1.5 ${
              isBlog
                ? "text-text-primary bg-accent-blue/[0.07]"
                : "text-text-secondary hover:text-text-primary hover:bg-black/[0.03]"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/build-your-ai-team"
            className={`text-sm font-medium transition-all duration-200 rounded-lg px-3 py-1.5 ${
              isAITeam
                ? "text-text-primary bg-accent-blue/[0.07]"
                : "text-text-secondary hover:text-text-primary hover:bg-black/[0.03]"
            }`}
          >
            Build Your AI Team
          </Link>
          <Link
            href="/launch-control"
            className={`text-sm font-medium transition-all duration-200 rounded-lg px-3 py-1.5 ${
              isLaunchControl
                ? "text-text-primary bg-accent-blue/[0.07]"
                : "text-text-secondary hover:text-text-primary hover:bg-black/[0.03]"
            }`}
          >
            Launch Control
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-2 rounded-xl border border-border-color/40 bg-surface/95 backdrop-blur-md shadow-slab p-4 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/blogs"
              className={`text-sm font-medium transition-all duration-200 rounded-lg px-3 py-2 -mx-1 ${
                isBlog ? "text-text-primary bg-accent-blue/[0.07]" : "text-text-secondary"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/build-your-ai-team"
              className={`text-sm font-medium transition-all duration-200 rounded-lg px-3 py-2 -mx-1 ${
                isAITeam ? "text-text-primary bg-accent-blue/[0.07]" : "text-text-secondary"
              }`}
            >
              Build Your AI Team
            </Link>
            <Link
              href="/launch-control"
              className={`text-sm font-medium transition-all duration-200 rounded-lg px-3 py-2 -mx-1 ${
                isLaunchControl ? "text-text-primary bg-accent-blue/[0.07]" : "text-text-secondary"
              }`}
            >
              Launch Control
            </Link>
            <div className="h-px bg-border-color/40" />
            <div className="flex items-center gap-5">
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
          </div>
        )}
      </div>
    </nav>
  );
}
