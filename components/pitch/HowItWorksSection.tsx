"use client";

import { motion } from "framer-motion";

const STEPS = [
  "Your team scans Reddit, forums, and communities for questions your customers are asking",
  "Those questions become research briefs — topics your blog should cover",
  "SEO-optimized blog posts get written and published to your site",
  "Every day. No prompting. No supervision.",
];

export default function HowItWorksSection() {
  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="font-display tracking-[-0.02em] text-2xl md:text-3xl text-text-primary"
      >
        Here&apos;s what happens every day, automatically
      </motion.h2>

      {/* Mobile: vertical with connector line */}
      <div className="mt-8 md:hidden relative pl-10">
        <div className="absolute left-[13px] top-1 bottom-1 w-px bg-accent-blue/20" />
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative pb-7 last:pb-0"
          >
            <div className="absolute -left-10 top-0 w-7 h-7 rounded-full bg-surface border-2 border-accent-blue/30 flex items-center justify-center">
              <span className="text-[11px] font-mono font-bold text-accent-blue">{i + 1}</span>
            </div>
            <p className="text-text-primary text-sm leading-relaxed">{step}</p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: horizontal 4-col grid */}
      <div className="mt-8 hidden md:grid md:grid-cols-4 gap-6">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative"
          >
            <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center mb-3">
              <span className="text-xs font-mono font-bold text-accent-blue">{i + 1}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="hidden md:block absolute top-4 left-10 right-0 h-px bg-accent-blue/15" />
            )}
            <p className="text-text-primary text-sm leading-relaxed">{step}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-text-secondary text-sm mt-8 italic"
      >
        You wake up, there&apos;s a new blog post on your site targeting keywords your customers actually search for.
      </motion.p>
    </section>
  );
}
