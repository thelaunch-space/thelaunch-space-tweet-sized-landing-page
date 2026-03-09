"use client";

import { motion } from "framer-motion";
import {
  Bot,
  GitBranch,
  RefreshCw,
  Columns3,
  BarChart3,
  Server,
  Plug,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface LayerItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Layer {
  title: string;
  accentColor: string;
  items: LayerItem[];
}

const layers: Layer[] = [
  {
    title: "Your Agents",
    accentColor: "#003DA5",
    items: [
      {
        icon: Bot,
        title: "Custom AI Agents",
        description: "3\u20135 agents trained on your workflow and standards.",
      },
      {
        icon: GitBranch,
        title: "Automated Workflows",
        description: "End-to-end pipelines running around the clock.",
      },
      {
        icon: RefreshCw,
        title: "Feedback Loop",
        description: "Every correction sharpens the system over time.",
      },
    ],
  },
  {
    title: "Your Command Center",
    accentColor: "#5A9A80",
    items: [
      {
        icon: Columns3,
        title: "Review Dashboard",
        description: "Kanban board to approve, revise, or flag output.",
      },
      {
        icon: BarChart3,
        title: "Monitoring & Reports",
        description: "Live stats and automated weekly summaries.",
      },
    ],
  },
  {
    title: "Your Infrastructure",
    accentColor: "#B8860B",
    items: [
      {
        icon: Server,
        title: "Dedicated Server",
        description: "Your own deployment, not a shared SaaS instance.",
      },
      {
        icon: Plug,
        title: "Integrations",
        description: "Slack, email, CMS. Output goes where you work.",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const closerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function LaunchControlSection() {
  return (
    <section id="launch-control-includes" className="snap-section">
      <div className="bg-[#0F1117] py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Header */}
            <motion.div variants={fadeUpVariants}>
              <p className="section-label !text-white/50">LAUNCH CONTROL</p>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="mt-4 font-display font-medium tracking-heading text-white"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Everything you just saw? That&apos;s Launch Control.
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="mt-2 font-sans text-gray-400 text-sm md:text-[15px]"
            >
              The live stats. The blog pipeline. The agents running around the
              clock. That&apos;s the system. The same one we build for you.
            </motion.p>

            {/* 3-column layer cards */}
            <motion.div
              variants={containerVariants}
              className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {layers.map((layer) => (
                <motion.div
                  key={layer.title}
                  variants={cardVariants}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden flex flex-col"
                >
                  {/* Accent top bar */}
                  <div
                    className="h-[3px]"
                    style={{ backgroundColor: layer.accentColor }}
                  />

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-base font-semibold text-white tracking-heading">
                      {layer.title}
                    </h3>

                    <div className="mt-4 space-y-4 flex-1">
                      {layer.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.title} className="flex gap-3">
                            <Icon
                              size={16}
                              className="text-white/30 flex-shrink-0 mt-0.5"
                              strokeWidth={1.5}
                            />
                            <div>
                              <h4 className="text-white text-sm font-semibold font-sans leading-snug">
                                {item.title}
                              </h4>
                              <p className="text-gray-500 text-xs font-sans leading-relaxed mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Closer */}
            <motion.div
              variants={closerVariants}
              className="mt-10 pt-8 border-t border-white/[0.06] text-center"
            >
              <p className="font-display italic font-normal text-white text-lg md:text-xl">
                Month 1: agents + Slack. Prove it works.
              </p>
              <p className="font-display italic font-normal text-gray-500 text-lg md:text-xl mt-0.5">
                Month 2+: the full system.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
