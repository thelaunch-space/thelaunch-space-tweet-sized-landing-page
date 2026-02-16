"use client";

import { motion } from "framer-motion";
import { TIMELINE_STEPS } from "@/lib/pitch-data";

export default function TimelineSection() {
  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="font-display tracking-[-0.02em] text-2xl md:text-3xl text-text-primary"
      >
        Your 4-Week Journey
      </motion.h2>

      {/* Mobile: vertical timeline with cards */}
      <div className="mt-8 md:hidden relative pl-10">
        <div className="absolute left-[13px] top-1 bottom-1 w-[2px] bg-accent-blue/15" />
        {TIMELINE_STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative pb-8 last:pb-0"
          >
            <div className="absolute -left-10 top-0 w-7 h-7 rounded-full bg-accent-blue flex items-center justify-center shadow-sm">
              <span className="text-[11px] font-mono font-bold text-white">{step.week}</span>
            </div>
            <div className="rounded-xl border border-border-color/40 bg-surface p-4 shadow-sm">
              <h3 className="font-display tracking-[-0.02em] text-lg text-text-primary">{step.title}</h3>
              <p className="text-text-secondary text-sm mt-1.5 leading-relaxed">{step.description}</p>
              <p className="text-accent-blue text-sm font-medium mt-2.5">{step.outcome}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: horizontal 4-col grid with embossed cards */}
      <div className="mt-8 hidden md:grid md:grid-cols-4 gap-5">
        {TIMELINE_STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="rounded-2xl border border-border-color/40 bg-surface p-5 flex flex-col"
            style={{
              boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 2px 8px rgba(50,50,93,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center mb-3 shadow-sm">
              <span className="text-xs font-mono font-bold text-white">{step.week}</span>
            </div>
            <h3 className="font-display tracking-[-0.02em] text-lg text-text-primary">{step.title}</h3>
            <p className="text-text-secondary text-sm mt-1.5 leading-relaxed flex-1">{step.description}</p>
            <p className="text-accent-blue text-sm font-medium mt-3">{step.outcome}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
