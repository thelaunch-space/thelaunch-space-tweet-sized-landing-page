"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/nextjs";

type TooltipPlacement = "below" | "above" | "left" | "right";

interface TourStep {
  target: string;
  placement: TooltipPlacement;
  title: string;
  body: string;
  radius: number;
}

const DESKTOP_STEPS: TourStep[] = [
  {
    target: "scoreboard",
    placement: "below",
    title: "Your AI Team\u2019s Output",
    body: "Questions found, blogs published, hours saved. All real numbers. Toggle \u201CThis Week\u201D or \u201CAll Time.\u201D",
    radius: 16,
  },
  {
    target: "tab-bar",
    placement: "below",
    title: "Explore Each Tab",
    body: "Blogs your writer published. Communities your scout monitors. Questions found on Reddit. Research briefs that feed the content engine.",
    radius: 8,
  },
  {
    target: "pipeline",
    placement: "below",
    title: "Today\u2019s Schedule",
    body: "Your agents follow this pipeline every day, automatically. Green = done. No human needed.",
    radius: 16,
  },
  {
    target: "agent-sidebar",
    placement: "right",
    title: "Your 5 AI Employees",
    body: "Each agent has a name and role. Click any agent to see what they did today and their full work history.",
    radius: 16,
  },
  {
    target: "live-feed",
    placement: "left",
    title: "Live Activity Feed",
    body: "Real-time log of what the agents are doing right now. Watch tasks complete as they happen.",
    radius: 16,
  },
];

const MOBILE_STEPS: TourStep[] = [
  {
    target: "scoreboard",
    placement: "below",
    title: "Your AI Team\u2019s Output",
    body: "Questions found, blogs published, hours saved. All real numbers. Toggle \u201CThis Week\u201D or \u201CAll Time.\u201D",
    radius: 16,
  },
  {
    target: "tab-bar",
    placement: "below",
    title: "Explore Each Tab",
    body: "Blogs your writer published. Communities your scout monitors. Questions found on Reddit. Research briefs that feed the content engine.",
    radius: 8,
  },
  {
    target: "pipeline",
    placement: "below",
    title: "Today\u2019s Schedule",
    body: "Your agents follow this pipeline every day, automatically. Green = done. No human needed.",
    radius: 16,
  },
  {
    target: "agent-strip",
    placement: "below",
    title: "Your 5 AI Employees",
    body: "Scroll through your team. Open the full dashboard on desktop to see detailed agent profiles and the live feed.",
    radius: 16,
  },
];

const TOOLTIP_WIDTH = 384;
const SPOTLIGHT_PAD = 8;
const TOOLTIP_GAP = 16;
const VIEWPORT_MARGIN = 16;
const ESTIMATED_TOOLTIP_HEIGHT = 220;

function clampToViewport(style: { top: number; left: number }): { top: number; left: number } {
  const maxLeft = window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_MARGIN;
  const maxTop = window.innerHeight - ESTIMATED_TOOLTIP_HEIGHT - VIEWPORT_MARGIN;
  return {
    top: Math.max(VIEWPORT_MARGIN, Math.min(style.top, maxTop)),
    left: Math.max(VIEWPORT_MARGIN, Math.min(style.left, maxLeft)),
  };
}

function getTooltipStyle(rect: DOMRect, placement: TooltipPlacement): { top: number; left: number } {
  const padded = {
    top: rect.top - SPOTLIGHT_PAD,
    left: rect.left - SPOTLIGHT_PAD,
    right: rect.right + SPOTLIGHT_PAD,
    bottom: rect.bottom + SPOTLIGHT_PAD,
    width: rect.width + SPOTLIGHT_PAD * 2,
  };

  const centerX = padded.left + padded.width / 2 - TOOLTIP_WIDTH / 2;

  // Check if "below" would push tooltip off-screen; if so, overlay at bottom of spotlight
  if (placement === "below") {
    const belowTop = padded.bottom + TOOLTIP_GAP;
    if (belowTop + ESTIMATED_TOOLTIP_HEIGHT > window.innerHeight - VIEWPORT_MARGIN) {
      // Place tooltip at the bottom of the visible spotlight area, overlaid inside
      return clampToViewport({
        top: Math.min(padded.bottom - ESTIMATED_TOOLTIP_HEIGHT - TOOLTIP_GAP, window.innerHeight - ESTIMATED_TOOLTIP_HEIGHT - VIEWPORT_MARGIN),
        left: centerX,
      });
    }
    return clampToViewport({ top: belowTop, left: centerX });
  }

  switch (placement) {
    case "above":
      return clampToViewport({
        top: padded.top - TOOLTIP_GAP - ESTIMATED_TOOLTIP_HEIGHT,
        left: centerX,
      });
    case "right":
      return clampToViewport({
        top: padded.top,
        left: padded.right + TOOLTIP_GAP,
      });
    case "left":
      return clampToViewport({
        top: padded.top,
        left: padded.left - TOOLTIP_WIDTH - TOOLTIP_GAP,
      });
  }
}

async function waitForElement(selector: string, retries = 3, delay = 300): Promise<Element | null> {
  for (let i = 0; i < retries; i++) {
    const el = document.querySelector(selector);
    if (el) return el;
    await new Promise((r) => setTimeout(r, delay));
  }
  return null;
}

export default function GuidedTour() {
  const { isSignedIn, isLoaded } = useAuth();
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const transitioning = useRef(false);

  const steps = isDesktop ? DESKTOP_STEPS : MOBILE_STEPS;
  const totalSteps = steps.length;

  // Detect breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (showTour) {
        setCurrentStep(0);
        setTargetRect(null);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [showTour]);

  // Show tour for first-time non-admin visitors — start directly at step 0
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) return;
    if (localStorage.getItem("lc_tour_completed")) return;

    const timer = setTimeout(() => setShowTour(true), 800);
    return () => clearTimeout(timer);
  }, [isSignedIn, isLoaded]);

  // Lock scroll while tour is active
  useEffect(() => {
    if (showTour) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [showTour]);

  const dismiss = useCallback(() => {
    localStorage.setItem("lc_tour_completed", "true");
    setShowTour(false);
    setCurrentStep(0);
    setTargetRect(null);
  }, []);

  const handleNext = useCallback(() => {
    if (transitioning.current) return;
    transitioning.current = true;
    setNextDisabled(true);

    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      dismiss();
    }

    setTimeout(() => {
      transitioning.current = false;
      setNextDisabled(false);
    }, 400);
  }, [currentStep, totalSteps, dismiss]);

  // Measure target element for current step
  const measureTarget = useCallback(async () => {
    if (!showTour || currentStep >= steps.length) {
      setTargetRect(null);
      return;
    }

    const step = steps[currentStep];
    const el = await waitForElement(`[data-tour="${step.target}"]`);

    if (!el) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        dismiss();
      }
      return;
    }

    // Scroll into view if needed
    const rect = el.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (!inView) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      await new Promise((r) => setTimeout(r, 400));
    }

    setTargetRect(el.getBoundingClientRect());
  }, [currentStep, steps, dismiss, showTour]);

  useEffect(() => {
    measureTarget();
  }, [measureTarget]);

  // Debounced resize recalc
  useEffect(() => {
    if (!showTour || currentStep >= steps.length) return;

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const el = document.querySelector(`[data-tour="${steps[currentStep].target}"]`);
        if (el) setTargetRect(el.getBoundingClientRect());
      }, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [showTour, currentStep, steps]);

  if (!showTour) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <>
      {/* Spotlight overlay */}
      {targetRect && step && (
        <motion.div
          className="fixed z-[9998] rounded-[var(--tour-radius)] pointer-events-none"
          style={
            {
              "--tour-radius": `${step.radius}px`,
              boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
            } as React.CSSProperties
          }
          layout
          initial={false}
          animate={{
            top: targetRect.top - SPOTLIGHT_PAD,
            left: targetRect.left - SPOTLIGHT_PAD,
            width: targetRect.width + SPOTLIGHT_PAD * 2,
            height: targetRect.height + SPOTLIGHT_PAD * 2,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
      )}

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        {targetRect && step && (
          <motion.div
            key={currentStep}
            className="fixed z-[9999] bg-white rounded-2xl border border-border-color/40 shadow-card-hover p-5 sm:p-6"
            style={{
              width: TOOLTIP_WIDTH,
              maxWidth: `calc(100vw - ${VIEWPORT_MARGIN * 2}px)`,
              ...getTooltipStyle(targetRect, step.placement),
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-text-secondary/40 hover:text-text-secondary transition-colors"
              aria-label="Close tour"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Step counter */}
            <p className="text-[10px] font-mono tracking-[0.12em] uppercase text-text-secondary">
              Step {currentStep + 1} of {totalSteps}
            </p>

            {/* Title */}
            <h3 className="text-lg font-display font-semibold text-text-primary mt-3">
              {step.title}
            </h3>

            {/* Body */}
            <p className="text-sm text-text-secondary leading-relaxed mt-2">
              {step.body}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-5">
              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === currentStep ? "bg-accent-blue" : "bg-border-color"
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={dismiss}
                  className="text-xs text-text-secondary/60 hover:text-text-secondary transition-colors"
                >
                  Skip tour
                </button>
                <button
                  onClick={handleNext}
                  disabled={nextDisabled}
                  className="rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isLastStep ? "Got it, let me explore" : "Next \u2192"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
