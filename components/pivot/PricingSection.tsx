"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { useGeo } from "@/lib/useGeo";
import { getGeoConfig } from "@/lib/geo-savings";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0 text-accent-emerald"
    >
      <path
        d="M3 8.5L6.5 12L13 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckIcon />
      <span>{children}</span>
    </li>
  );
}

export default function PricingSection() {
  const region = useGeo();
  const config = getGeoConfig(region);
  const { pricing } = config;

  return (
    <section id="pricing" className="snap-section pt-20 md:pt-24 pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel text="PRICING" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h2
              className="font-display font-medium tracking-heading text-text-primary"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Founder pricing.
            </h2>

            {/* Urgency ribbon */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-warm/30 bg-accent-warm/[0.06] px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-warm opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-warm" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-accent-warm font-medium">
                3 of 10 spots taken &middot; 7 remaining
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-3 font-sans text-text-secondary text-[15px] max-w-[36rem]"
          >
            Limited to our first 10 founders. These rates won&apos;t last.
          </motion.p>

          {/* Pricing cards — 2 columns */}
          <motion.div
            variants={containerVariants}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Tier 1 — DIY Kickstart */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl border border-border-color bg-white overflow-hidden flex flex-col"
            >
              {/* Accent top */}
              <div className="h-1 bg-gradient-to-r from-accent-blue to-accent-purple" />

              {/* MOST POPULAR badge */}
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-accent-blue font-semibold bg-accent-blue/[0.08] rounded-full px-2.5 py-1">
                  MOST POPULAR
                </span>
              </div>

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <p className="font-display font-semibold text-base text-text-primary tracking-heading">
                  DIY Kickstart
                </p>
                <p className="mt-0.5 font-sans text-xs text-text-secondary">
                  We set it up. You run it.
                </p>

                <div className="mt-4">
                  <span className="font-display font-bold text-3xl text-text-primary tracking-heading">
                    {pricing.pocDisplay}
                  </span>
                  <span className="ml-1.5 font-sans text-sm text-text-secondary">
                    one-time
                  </span>
                </div>

                <div className="border-t border-border-color/50 my-4" />

                <ul className="font-sans text-sm text-text-secondary space-y-2 leading-relaxed flex-1">
                  <BulletItem>VPS setup &amp; configuration</BulletItem>
                  <BulletItem>Slack integration for all agents</BulletItem>
                  <BulletItem>Initial agent configuration &amp; wiring</BulletItem>
                  <BulletItem>Full handoff documentation</BulletItem>
                  <BulletItem>You own and run the system</BulletItem>
                </ul>

                <div className="mt-5">
                  <a
                    href="#contact"
                    className="block w-full text-center bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-xl py-3 px-6 font-sans font-semibold text-sm shadow-cta hover:-translate-y-0.5 hover:shadow-cta-hover transition-all duration-200"
                  >
                    {pricing.pocCta}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Tier 2 — Founder's Partnership */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl border border-border-color bg-white overflow-hidden flex flex-col"
            >
              {/* Accent top */}
              <div className="h-1 bg-gradient-to-r from-accent-emerald to-accent-emerald/60" />

              <div className="p-5 md:p-6 flex flex-col flex-1">
                <p className="font-display font-semibold text-base text-text-primary tracking-heading">
                  Founder&apos;s Partnership
                </p>
                <p className="mt-0.5 font-sans text-xs text-text-secondary">
                  We run it. You review.
                </p>

                <div className="mt-4">
                  <span className="font-display font-bold text-3xl text-text-primary tracking-heading">
                    {pricing.growthDisplay}
                  </span>
                  <span className="ml-1.5 font-sans text-sm text-text-secondary">
                    /mo
                  </span>
                </div>
                {pricing.growthLaunchLabel && (
                  <p className="mt-1 font-mono text-[11px] tracking-wide text-accent-emerald font-medium">
                    {pricing.growthLaunchLabel}
                  </p>
                )}

                <div className="border-t border-border-color/50 my-4" />

                <ul className="font-sans text-sm text-text-secondary space-y-2 leading-relaxed flex-1">
                  <BulletItem>Everything in DIY Kickstart</BulletItem>
                  <BulletItem>We study your process end-to-end</BulletItem>
                  <BulletItem>Weekly agent tuning &amp; doc updates</BulletItem>
                  <BulletItem>Monthly strategy calls with Krishna</BulletItem>
                  <BulletItem>Output optimization &amp; pattern analysis</BulletItem>
                  <BulletItem>Month 2: your own performance dashboard</BulletItem>
                </ul>

                <div className="mt-5">
                  <a
                    href="#contact"
                    className="block w-full text-center rounded-xl border-2 border-text-primary text-text-primary py-3 px-6 font-sans font-semibold text-sm hover:bg-text-primary hover:text-white transition-all duration-200"
                  >
                    {pricing.growthCta}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Footnote */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-center font-sans text-xs text-text-secondary/70"
          >
            No long-term contracts. The call is where we both decide if it&apos;s a fit.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
