"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import SectionLabel from "./SectionLabel";

/* ── Typewriter constants ── */

const ROTATING_WORDS = [
  "content marketing",
  "storyboard review",
  "lead qualification",
  "customer onboarding",
  "client reporting",
  "competitor monitoring",
  "SEO research",
];

const CHAR_DELAY = 50;
const HOLD_DURATION = 1500;
const FADE_DURATION = 250;
const CURSOR_BLINK_RATE = 530;

const LONGEST_WORD = ROTATING_WORDS.reduce((a, b) =>
  a.length > b.length ? a : b
);

/* ── Typewriter hook ── */

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "fading">(
    "typing"
  );
  const [visible, setVisible] = useState(true);
  const charIndex = useRef(0);

  useEffect(() => {
    if (phase === "typing") {
      const word = words[wordIndex];
      if (charIndex.current < word.length) {
        const timeout = setTimeout(() => {
          charIndex.current += 1;
          setDisplayText(word.slice(0, charIndex.current));
        }, CHAR_DELAY);
        return () => clearTimeout(timeout);
      } else {
        setPhase("holding");
      }
    }

    if (phase === "holding") {
      const timeout = setTimeout(() => setPhase("fading"), HOLD_DURATION);
      return () => clearTimeout(timeout);
    }

    if (phase === "fading") {
      setVisible(false);
      const timeout = setTimeout(() => {
        charIndex.current = 0;
        setDisplayText("");
        setVisible(true);
        setWordIndex((prev) => (prev + 1) % words.length);
        setPhase("typing");
      }, FADE_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [phase, displayText, wordIndex, words]);

  return { displayText, visible };
}

/* ── Blinking cursor ── */

function BlinkingCursor() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setOn((v) => !v), CURSOR_BLINK_RATE);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-accent-warm" style={{ opacity: on ? 1 : 0 }}>
      |
    </span>
  );
}

/* ── Blog Ticker ── */

function BlogTicker() {
  const blogs = useQuery(api.blogs.listRecent, { limit: 12 });

  const publishedBlogs = (blogs ?? []).filter(
    (b) => b.status === "published" || b.status === "pr_merged" || b.publishedAt
  );

  if (publishedBlogs.length === 0) return null;

  const tickerItems = publishedBlogs.map((blog) => ({
    title: blog.title,
    slug: blog.slug,
  }));

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top rule */}
      <div className="w-full h-px bg-border-color/40" />

      {/* Count + scroll area */}
      <div className="flex items-center">
        {/* Left: article count (stays fixed) */}
        <div className="shrink-0 flex items-center gap-2 pl-5 md:pl-8 lg:pl-10 pr-5 md:pr-6 py-4 border-r border-border-color/30 bg-background z-20 relative">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-emerald" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-secondary whitespace-nowrap">
            {publishedBlogs.length} articles
          </span>
        </div>

        {/* Right: scrolling titles */}
        <div className="relative flex-1 overflow-hidden">
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div
            className="flex items-center hover:[animation-play-state:paused]"
            style={{ animation: "scroll 50s linear infinite" }}
          >
            {[0, 1].map((set) => (
              <div key={set} className="flex shrink-0 items-center">
                {tickerItems.map((item, i) => (
                  <Link
                    key={`${set}-${i}`}
                    href={`/blogs/${item.slug}`}
                    className="group flex items-center shrink-0 whitespace-nowrap"
                  >
                    <span className="w-px h-3.5 bg-border-color/40 mx-5 md:mx-6 shrink-0" />
                    <span className="font-display text-[13px] md:text-sm text-text-primary/70 group-hover:text-text-primary transition-colors duration-200">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero Variant B ── */

export default function HeroVariantB() {
  const { displayText, visible } = useTypewriter(ROTATING_WORDS);

  return (
    <section
      className="snap-section relative min-h-[calc(100dvh-7rem)] flex flex-col justify-center"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,61,165,0.025) 0%, transparent 70%)",
      }}
    >
      {/* ── Centered hero content ── */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-16 text-center">
          {/* Section label */}
          <SectionLabel text="YOUR AI TEAM" />

          {/* H1 */}
          <h1 className="mt-6 font-display font-semibold tracking-display text-text-primary text-3xl md:text-4xl lg:text-5xl leading-tight">
            We build AI teams
            <br />
            trained on how you work.
          </h1>

          {/* Typewriter */}
          <div className="mt-5">
            <p className="font-display italic font-normal tracking-heading text-text-primary text-xl md:text-2xl">
              Your{" "}
              <span className="relative inline-block align-baseline mx-3">
                <span className="absolute -inset-x-2.5 -inset-y-0.5 rounded bg-accent-blue/[0.06]" />
                <span className="relative invisible whitespace-nowrap">
                  {LONGEST_WORD}
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-center text-accent-warm whitespace-nowrap transition-opacity"
                  style={{
                    opacity: visible ? 1 : 0,
                    transitionDuration: `${FADE_DURATION}ms`,
                  }}
                >
                  {displayText}
                  <BlinkingCursor />
                </span>
                <span className="absolute -bottom-0.5 -left-2.5 -right-2.5 h-[1.5px] bg-gradient-to-r from-accent-blue/60 to-accent-purple/60 rounded-full" />
              </span>{" "}
              <span className="text-text-primary/50">
                - working around the clock.
              </span>
            </p>
          </div>

          {/* Body + trust punch */}
          <div className="mt-8">
            <p
              className="font-sans font-normal text-text-secondary leading-relaxed max-w-[36rem] mx-auto"
              style={{ fontSize: "17px" }}
            >
              We study how you work. Then we build an AI team trained on your
              process, your standards, your judgment. It runs around the
              clock.
            </p>
            <p className="mt-3 font-sans font-medium text-text-primary text-base">
              They work. You stay in control.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex items-center justify-center">
            <a
              href="#use-cases"
              className="w-full sm:w-auto text-center bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl py-3.5 px-7 font-sans font-semibold text-sm shadow-cta hover:-translate-y-0.5 hover:shadow-cta-hover transition-all duration-300"
            >
              See what we&apos;ve built ↓
            </a>
          </div>

          {/* Whisper */}
          <p className="mt-4">
            <Link
              href="/launch-control"
              className="inline-flex items-center gap-1.5 font-sans text-xs text-text-secondary hover:text-accent-blue transition-colors"
            >
              <span className="italic">Watch our agents work live</span>
              <span>&rarr;</span>
            </Link>
          </p>
        </div>
      </div>

      {/* ── Ticker annotation ── */}
      <div className="flex items-center gap-3 px-5 md:px-8 lg:px-10 max-w-6xl mx-auto mb-2">
        <svg
          width="60"
          height="32"
          viewBox="0 0 80 40"
          fill="none"
          className="shrink-0 text-accent-blue/50"
        >
          <path
            d="M6 8C20 6 40 10 55 22L50 17M55 22L48 25"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-display italic text-sm md:text-base text-text-secondary tracking-[-0.01em]">
          Written by our agents
        </span>
      </div>

      {/* ── Blog ticker strip ── */}
      <BlogTicker />
    </section>
  );
}
