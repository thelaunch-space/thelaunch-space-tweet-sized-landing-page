"use client";

import { motion } from "framer-motion";
import { PenLine, BookOpen, Headphones, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionLabel from "./SectionLabel";
import BadgeStatus from "./BadgeStatus";
import Link from "next/link";
import AgentRelayAnimation from "./AgentRelayAnimation";
import type { RelayStep } from "./AgentRelayAnimation";

/* ── Card data ── */

interface UseCaseCard {
  status: "live" | "in-progress" | "coming-soon";
  icon: LucideIcon;
  title: string;
  teamsDeployed?: number;
  relaySteps: RelayStep[];
  accent: string;
  iconBg: string;
  cta?: { text: string; href: string };
}

const USE_CASES: UseCaseCard[] = [
  {
    status: "live",
    icon: PenLine,
    title: "SEO & Content Marketing",
    teamsDeployed: 2,
    relaySteps: [
      { agent: "scanner", action: "Scans Reddit threads & keywords" },
      { agent: "brief-writer", action: "Researches & writes SEO brief", humanLoop: true },
      { agent: "blog-writer", action: "Writes blog in your tone, raises PR", humanLoop: true },
      { agent: "linkedin-drafter", action: "Extracts angles, drafts post" },
    ],
    accent: "from-accent-blue to-accent-purple",
    iconBg: "bg-accent-blue/10 text-accent-blue",
    cta: { text: "Watch live", href: "/launch-control" },
  },
  {
    status: "in-progress",
    icon: BookOpen,
    title: "Expert Content Review",
    teamsDeployed: 1,
    relaySteps: [
      { agent: "parser", action: "Extracts storyboard structure" },
      { agent: "reviewer", action: "Checks content against rubric", humanLoop: true },
      { agent: "tester", action: "Validates classroom feasibility" },
      { agent: "comparator", action: "Aligns to curriculum standards" },
      { agent: "auditor", action: "Final quality sign-off", humanLoop: true },
    ],
    accent: "from-accent-warm to-amber-400",
    iconBg: "bg-accent-warm/10 text-accent-warm",
    cta: { text: "See pipeline", href: "#" },
  },
  {
    status: "coming-soon",
    icon: Headphones,
    title: "Customer Support",
    relaySteps: [
      { agent: "triage", action: "Classifies incoming tickets" },
      { agent: "drafter", action: "Writes response from playbook" },
      { agent: "router", action: "Sends to right team member" },
      { agent: "escalator", action: "Flags what needs a human" },
    ],
    accent: "from-gray-300 to-gray-200",
    iconBg: "bg-gray-100 text-text-secondary",
  },
  {
    status: "coming-soon",
    icon: Building2,
    title: "Internal Operations",
    relaySteps: [
      { agent: "planner", action: "Pulls tasks from all projects" },
      { agent: "tracker", action: "Monitors deadlines and blockers" },
      { agent: "briefer", action: "Delivers daily summary" },
      { agent: "reporter", action: "Weekly digest and metrics" },
    ],
    accent: "from-gray-300 to-gray-200",
    iconBg: "bg-gray-100 text-text-secondary",
  },
];

/* ── Animation ── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Static relay for coming-soon cards ── */

function StaticRelay({ steps }: { steps: RelayStep[] }) {
  return (
    <div className="mt-4 space-y-0">
      {steps.map((step, i) => (
        <div key={step.agent} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div
              className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
            >
              <span className="text-[9px] font-bold text-text-secondary">
                {i + 1}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-px h-4 bg-gray-200" />
            )}
          </div>
          <div className="pt-0.5 pb-1 min-w-0">
            <p className="font-sans text-xs font-semibold text-text-primary leading-none">
              {step.agent.charAt(0).toUpperCase() + step.agent.slice(1).replace(/-/g, " ")}
            </p>
            <p className="font-sans text-[11px] text-text-secondary leading-snug mt-0.5">
              {step.action}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Section ── */

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="snap-section py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel text="WHAT WE BUILD" />

          <h2 className="mt-4 font-display font-medium tracking-heading text-text-primary text-2xl md:text-3xl">
            Built for your use case.
          </h2>

          <p
            className="mt-3 font-sans text-text-secondary leading-relaxed"
            style={{ fontSize: "17px" }}
          >
            Every agent team is different, designed around how your business actually works.
          </p>
        </motion.div>

        {/* ── 1x4 card grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {USE_CASES.map((card) => {
            const Icon = card.icon;
            const isComingSoon = card.status === "coming-soon";
            const isAnimated = card.status === "live" || card.status === "in-progress";

            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className={`group relative rounded-2xl bg-white overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  isComingSoon
                    ? "border border-dashed border-border-color hover:border-solid hover:shadow-card"
                    : "border border-border-color shadow-card hover:shadow-card-hover"
                }`}
              >
                {/* Accent top bar */}
                <div className={`h-1 bg-gradient-to-r ${card.accent}`} />

                <div
                  className={`p-5 flex flex-col flex-1 ${
                    isComingSoon
                      ? "opacity-55 group-hover:opacity-90 transition-opacity"
                      : ""
                  }`}
                >
                  {/* Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center`}
                    >
                      <Icon size={16} strokeWidth={1.8} />
                    </div>
                    <BadgeStatus status={card.status} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-display font-semibold text-base tracking-heading text-text-primary leading-snug">
                    {card.title}
                  </h3>

                  {/* Teams deployed */}
                  {card.teamsDeployed && (
                    <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-accent-emerald">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                      {card.teamsDeployed}{" "}
                      {card.teamsDeployed === 1 ? "team" : "teams"} deployed
                    </p>
                  )}

                  {/* Vertical agent relay */}
                  {isAnimated ? (
                    <div className="mt-4">
                      <AgentRelayAnimation steps={card.relaySteps} />
                    </div>
                  ) : (
                    <StaticRelay steps={card.relaySteps} />
                  )}

                  {/* CTA */}
                  {card.cta && (
                    <Link
                      href={card.cta.href}
                      className="inline-flex items-center gap-1 mt-auto pt-4 font-sans text-sm font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors"
                    >
                      <span>{card.cta.text}</span>
                      <span>&rarr;</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center font-sans text-sm text-text-secondary"
        >
          If it&apos;s repeatable and lives in someone&apos;s head, we can
          build a team around it.{" "}
          <a
            href="#contact"
            className="font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors"
          >
            Let&apos;s talk &rarr;
          </a>
        </motion.p>
      </div>
    </section>
  );
}
