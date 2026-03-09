"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionLabel from "./SectionLabel";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function FounderStrip() {
  return (
    <section className="snap-section py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel text="THE FOUNDER" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-10"
          >
            {/* Photo */}
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-40 md:w-36 md:h-44 rounded-xl overflow-hidden border border-border-color/40">
                <img
                  src="/krishna-portrait.jpg"
                  alt="Krishna Goutham"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Narrative */}
            <div className="text-center md:text-left">
              <p className="font-sans font-semibold text-text-primary text-base">
                Krishna Goutham
              </p>
              <p className="mt-0.5 font-sans text-sm text-text-secondary">
                10 years in education &middot; Product lead at BYJU&apos;S
                (5 &rarr; 500+ team) &middot; 65+ products shipped
              </p>

              <div className="mt-5 space-y-3 font-sans text-text-secondary text-[15px] leading-relaxed">
                <p>
                  I spent the last year building products for small businesses.
                  CRMs, admissions platforms, field-sales apps, lead funnels. 65
                  projects across education, healthcare, and professional
                  services. One client has been on retainer for 14 months.
                </p>
                <p>
                  Every founder I worked with knew their domain cold. They had
                  the ideas, the standards, the judgment. What they didn&apos;t
                  have was bandwidth. Content, SEO, follow-ups, research - it
                  all fell behind because there was only one of them.
                </p>
                <p>
                  I hit the same wall. So I built an agentic workflow for
                  myself. AI agents trained on my process, running my content
                  and SEO while I kept doing what I&apos;m actually good at:
                  building for clients.{" "}
                  <span className="text-text-primary font-medium">
                    It worked.
                  </span>{" "}
                  The live stats on this page are proof. Come back tomorrow and
                  they&apos;ll be different.
                </p>
                <p>
                  That same process clicked with other founders I work with.
                  So now I&apos;m building it as a service. The same system,
                  adapted to your workflow, your standards, your judgment.
                </p>
              </div>

              <p className="mt-4">
                <Link
                  href="/launch-control"
                  className="font-sans text-sm font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors"
                >
                  Watch the agents work live &rarr;
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
