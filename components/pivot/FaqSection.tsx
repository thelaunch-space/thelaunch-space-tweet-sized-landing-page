"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionLabel from "./SectionLabel";

const faqs = [
  {
    question: "Can you build agents for my specific use case?",
    answer:
      "If your business has a process that lives in one person\u2019s head, repeatable, domain-specific, and bottlenecks when that person is busy, yes.\n\nWe\u2019ve built teams for content marketing, storyboard review, and SEO research. The call is where we figure out if your use case fits.",
  },
  {
    question:
      "Will the output match my standards or feel like generic AI?",
    answer:
      "Every agent is trained on your process, your standards, your domain. Month 1 is specifically designed for calibration. You review, give feedback, and the system sharpens. By week 4, it sounds like your team wrote it.",
  },
  {
    question:
      "I\u2019m not technical. Can I actually use this?",
    answer:
      "You won\u2019t write prompts or touch a server. Your entire interaction is Slack. Agents post output, you review and give feedback in plain language. If you use Slack, you can use this.",
  },
  {
    question: "What happens after Month 1?",
    answer:
      "DIY Kickstart: it\u2019s yours. You own the agents, the setup, the docs. You operate it yourself.\n\nFounder\u2019s Partnership: Month 2 is where we build the full system. Dedicated infrastructure, dashboard, monitoring, strategy calls. You keep reviewing. We keep managing.",
  },
  {
    question: "What if I want to change how agents work?",
    answer:
      "That\u2019s built in. When you give feedback (\u201ctoo formal,\u201d \u201cmisses the point\u201d) it gets incorporated. On Founder\u2019s Partnership, we tune agent behavior weekly. On DIY, we show you exactly what to adjust.",
  },
  {
    question:
      "How is this different from an agency or freelancers?",
    answer:
      "Agencies use generalist contractors who spend a week learning your industry, then move on. This runs every day. Agents are trained on your specific process. Your judgment stays in the loop. And unlike freelancers, agents don\u2019t miss deadlines or need re-briefing every Monday.",
  },
  {
    question:
      "No testimonials yet. Why should I trust this?",
    answer:
      "The output is live. thelaunch.space/blogs is researched, written, and published by these agents daily. The dashboard at /launch-control shows the work in real time. Month 1 is designed to reduce exactly this risk. You see real output within days, not months.",
  },
  {
    question: "What do I need to prepare for the call?",
    answer:
      "Just know what process you want to scale, the bottleneck that lives in your head. No technical spec needed. 25 minutes. You describe the work. We\u2019ll tell you if agents can do it.",
  },
  {
    question: "What\u2019s the refund policy?",
    answer:
      "There are no refunds. We invest significant time in the first week studying your process, designing your agent team, and training agents on your domain. That work begins immediately.\n\nThat said, we\u2019re selective on the call. If we don\u2019t think agents are the right fit for your use case, we\u2019ll say so before you\u2019ve spent anything. The goal is working with founders where this genuinely works, not collecting payments.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="snap-section pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10">
        {/* Two-column: header left, accordion right */}
        <div className="lg:flex lg:gap-16">
          {/* Left — sticky header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:w-[280px] flex-shrink-0 mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start"
          >
            <SectionLabel text="QUESTIONS" />

            <h2
              className="mt-6 font-display font-medium tracking-heading text-text-primary"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              Common
              <br />
              questions.
            </h2>

            <p className="mt-3 font-sans text-sm text-text-secondary">
              Can&apos;t find your answer?{" "}
              <a
                href="#contact"
                className="font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors"
              >
                Book a call &rarr;
              </a>
            </p>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1] as const,
              delay: 0.1,
            }}
            className="flex-1 min-w-0"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={
                  index < faqs.length - 1
                    ? "border-b border-border-color/50"
                    : ""
                }
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full justify-between items-center py-4 text-left cursor-pointer group"
                >
                  <span className="font-sans font-medium text-[15px] text-text-primary pr-4 group-hover:text-accent-blue transition-colors">
                    {faq.question}
                  </span>
                  <Plus
                    size={16}
                    className="text-text-secondary/50 flex-shrink-0 transition-transform duration-300"
                    style={{
                      transform:
                        openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans font-normal text-text-secondary text-sm leading-relaxed pb-4 whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
