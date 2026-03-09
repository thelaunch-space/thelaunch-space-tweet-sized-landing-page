"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "./SectionLabel";

const principles = [
  {
    title: "Your process first.",
    body: "We don\u2019t start with AI. We start by understanding exactly how you do the work today. Every agent is trained on your actual workflow.",
  },
  {
    title: "They work. You decide.",
    body: "Agents research, draft, scan, report. You approve what matters. Your judgment stays in the loop. Always.",
  },
  {
    title: "Not a black box.",
    body: "You see every step. Launch Control shows what\u2019s running, what\u2019s pending, what needs your review. Full control, full transparency.",
  },
  {
    title: "Gets sharper over time.",
    body: "Your feedback trains the system. Week 1 output is good. Week 4 output sounds like you.",
  },
  {
    title: "You own everything.",
    body: "The agents, the infrastructure, the output. It\u2019s all yours. No lock-in. No hostage situation.",
  },
  {
    title: "Built by one person.",
    body: "You talk to Krishna. The person who designs the agents is the person who answers your questions. No layers.",
  },
];

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

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="principles"
      ref={sectionRef}
      className="snap-section relative pt-16 md:pt-20 pb-16 md:pb-20"
    >
      {/* Atmospheric radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={itemVariants}>
            <SectionLabel text="HOW WE WORK" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-6 font-display font-medium tracking-heading text-text-primary"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Six things we won&apos;t compromise on.
          </motion.h2>

          {/* 2-column asymmetric grid */}
          <div className="relative mt-10 md:mt-14">
            {/* Vertical accent spine — between the two columns on desktop */}
            <motion.div
              className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-[2px] origin-top -translate-x-px"
              style={{
                scaleY: spineScale,
                background: "linear-gradient(to bottom, #003DA5, #6D28D9)",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
              {principles.map((principle, i) => {
                const isRight = i % 2 === 1;
                return (
                  <motion.div
                    key={principle.title}
                    variants={itemVariants}
                    className={`py-6 md:py-7 ${
                      /* On desktop: left column items get right padding, right column items get left padding */
                      isRight ? "lg:pl-14" : "lg:pr-14"
                    } ${
                      /* Border between stacked items on mobile, between pairs on desktop */
                      i < principles.length - 2
                        ? "border-b border-border-color/30"
                        : i < principles.length - 1
                          ? "border-b border-border-color/30 lg:border-b-0"
                          : ""
                    }`}
                  >
                    {/* Number — large, gradient-tinted */}
                    <span
                      className="font-display font-bold text-5xl md:text-6xl select-none block"
                      style={{
                        lineHeight: 1,
                        background: "linear-gradient(135deg, #003DA5 0%, #6D28D9 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        opacity: 0.15,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <h3 className="mt-3 font-display font-semibold text-xl md:text-2xl text-text-primary tracking-heading">
                      {principle.title}
                    </h3>

                    {/* Body */}
                    <p className="mt-2 font-sans font-normal text-text-secondary leading-relaxed text-[15px]">
                      {principle.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
