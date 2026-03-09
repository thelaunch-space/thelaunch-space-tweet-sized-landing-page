"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   AgentRelayAnimation

   Minimalist vertical pipeline showing agent orchestration.
   Agent steps in muted gray, human-input loops in brand blue.
   Reusable — pass in steps via props.
   ═══════════════════════════════════════════════════════════════ */

export interface RelayStep {
  agent: string;
  action: string;
  humanLoop?: boolean;
}

interface Props {
  steps: RelayStep[];
}

/* ── Timing ── */
const STEP_DURATION = 900;
const HUMAN_PAUSE = 1600;
const END_HOLD = 2200;
const RESET_PAUSE = 600;

export default function AgentRelayAnimation({ steps }: Props) {
  const [activeStep, setActiveStep] = useState(-1);
  const [showHumanLoop, setShowHumanLoop] = useState(-1);
  const [dotY, setDotY] = useState(0);
  const [running, setRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-40px" });
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Start when in view */
  useEffect(() => {
    if (isInView && !running) {
      setRunning(true);
    }
  }, [isInView, running]);

  /* Animation loop */
  useEffect(() => {
    if (!running) return;

    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((r) => {
        const t = setTimeout(() => { if (!cancelled) r(); }, ms);
        return () => clearTimeout(t);
      });

    const getStepY = (i: number): number => {
      const el = stepRefs.current[i];
      const container = containerRef.current;
      if (!el || !container) return i * 56;
      return el.offsetTop + 10;
    };

    const runCycle = async () => {
      setActiveStep(-1);
      setShowHumanLoop(-1);
      setDotY(getStepY(0));
      await sleep(RESET_PAUSE);

      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return;
        setDotY(getStepY(i));
        await sleep(i === 0 ? 300 : STEP_DURATION);
        if (cancelled) return;
        setActiveStep(i);

        if (steps[i].humanLoop) {
          await sleep(400);
          setShowHumanLoop(i);
          await sleep(HUMAN_PAUSE);
          setShowHumanLoop(-1);
        } else {
          await sleep(STEP_DURATION);
        }
      }

      await sleep(END_HOLD);
      if (!cancelled) runCycle();
    };

    runCycle();
    return () => { cancelled = true; };
  }, [running, steps]);

  return (
    <div ref={containerRef} className="relative py-2">
      {/* ── Vertical connector line ── */}
      <div
        className="absolute"
        style={{
          left: 9,
          top: 20,
          bottom: 16,
          width: 1,
          background: "#E5E5E5",
        }}
      />

      {/* ── Traveling dot ── */}
      <motion.div
        className="absolute rounded-full z-10"
        style={{
          width: 7,
          height: 7,
          left: 6,
          background: "#1A1A1A",
          boxShadow: "0 0 6px rgba(26,26,26,0.25)",
        }}
        animate={{ top: dotY - 3 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* ── Steps ── */}
      <div className="space-y-0">
        {steps.map((step, i) => {
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;
          const loopVisible = showHumanLoop === i;

          return (
            <div
              key={step.agent}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="relative flex items-start gap-3"
              style={{ paddingTop: 6, paddingBottom: step.humanLoop ? 4 : 6 }}
            >
              {/* Node circle */}
              <motion.div
                className="relative z-[1] flex-shrink-0 rounded-full flex items-center justify-center"
                style={{
                  width: 20,
                  height: 20,
                  border: "1.5px solid",
                  borderColor: isActive ? "#1A1A1A" : "#D1D5DB",
                  background: isActive ? "#1A1A1A" : "white",
                }}
                animate={{
                  scale: isCurrent ? [1, 1.15, 1] : 1,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: isActive ? "white" : "#D1D5DB",
                    fontFamily: "var(--font-mono), monospace",
                  }}
                >
                  {i + 1}
                </span>
              </motion.div>

              {/* Label */}
              <div className="flex-1 min-w-0 pt-0.5">
                <motion.p
                  className="font-mono leading-none"
                  style={{ fontSize: 9, letterSpacing: "0.02em" }}
                  animate={{ color: isActive ? "#6B7280" : "#D1D5DB" }}
                  transition={{ duration: 0.3 }}
                >
                  agent:{step.agent}
                </motion.p>
                <motion.p
                  className="font-sans leading-snug mt-0.5"
                  style={{ fontSize: 10 }}
                  animate={{ color: isActive ? "#9CA3AF" : "#E5E5E5" }}
                  transition={{ duration: 0.3 }}
                >
                  {step.action}
                </motion.p>

                {/* ── Human input loop ── */}
                {step.humanLoop && (
                  <motion.div
                    className="flex items-center gap-1.5 mt-1.5"
                    animate={{
                      opacity: loopVisible ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    <svg
                      width="28"
                      height="16"
                      viewBox="0 0 28 16"
                      fill="none"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M2 2 C 2 12, 24 12, 24 2"
                        stroke={loopVisible ? "#003DA5" : "#D1D5DB"}
                        strokeWidth="1"
                        strokeDasharray="2.5 2.5"
                        fill="none"
                        style={{ transition: "stroke 0.35s" }}
                      />
                      <path
                        d="M22 4.5 L24 2 L26 4.5"
                        stroke={loopVisible ? "#003DA5" : "#D1D5DB"}
                        strokeWidth="1"
                        fill="none"
                        strokeLinecap="round"
                        style={{ transition: "stroke 0.35s" }}
                      />
                    </svg>
                    <span
                      className="font-mono uppercase leading-none"
                      style={{
                        fontSize: 8,
                        letterSpacing: "0.08em",
                        color: loopVisible ? "#003DA5" : "#D1D5DB",
                        transition: "color 0.35s",
                      }}
                    >
                      human input
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
