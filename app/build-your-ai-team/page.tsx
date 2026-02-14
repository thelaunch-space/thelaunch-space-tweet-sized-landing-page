"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { agents } from "@/lib/agents";
import AgentCard from "@/components/AgentCard";

/* ── agent node: avatar image with name ── */
function AgentNode({ name, slug, id }: { name: string; slug: string; id: string }) {
  return (
    <Link href={`/build-your-ai-team/${slug}`} className="group/node flex flex-col items-center gap-1.5 shrink-0 w-[56px] md:w-[64px]">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden transition-transform group-hover/node:scale-110">
        <img
          src={`/agent-avatars/${id}.png`}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span className="text-[10px] font-semibold text-text-secondary group-hover/node:text-text-primary transition-colors leading-none text-center">
        {name}
      </span>
    </Link>
  );
}

export default function AIEmployeesPage() {
  const partha = agents.find((a) => a.id === "parthasarathi")!;
  const vibhishana = agents.find((a) => a.id === "vibhishana")!;
  const vyasa = agents.find((a) => a.id === "vyasa")!;
  const sanjaya = agents.find((a) => a.id === "sanjaya")!;
  const valmiki = agents.find((a) => a.id === "valmiki")!;

  const orderedAgents = [partha, vyasa, vibhishana, sanjaya, valmiki];

  const lanes = [
    {
      agents: [{ ...sanjaya }],
      action: "finds leads daily",
      outcome: "You close them",
    },
    {
      agents: [{ ...vibhishana }, { ...vyasa }],
      action: "research → SEO blogs",
      outcome: "Your site ranks",
    },
    {
      agents: [{ ...valmiki }],
      action: "writes posts in your voice for your ICP",
      outcome: "Your authority grows",
    },
  ];

  return (
    <main className="flex-1">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 lg:flex lg:gap-16 xl:gap-20">
        {/* ═══ LEFT: Hero (sticky on desktop) ═══ */}
        <motion.div
          className="pt-12 md:pt-20 pb-12 md:pb-16 lg:pb-0 lg:w-[38%] xl:w-[35%] lg:sticky lg:top-16 lg:self-start lg:pt-24 lg:min-h-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="lg:max-w-md">
            <motion.p
              className="text-accent-emerald text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-5 md:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Your Brain. Your Agents. Real Output.
            </motion.p>

            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] mb-6 md:mb-8">
              Meet My
              <br />
              <span className="bg-gradient-to-r from-accent-emerald via-accent-blue to-accent-purple bg-clip-text text-transparent">
                AI Employees
              </span>
            </h1>

            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 md:mb-12">
              Scaling tasks is easy. Scaling <strong className="text-text-primary font-semibold">how you think</strong> —
              your voice, your judgment, your standards — that&apos;s the hard part.
              I built agents that carry <em>my</em> thinking into everything.{" "}
              <strong className="text-text-primary font-semibold">I&apos;ll help you build yours.</strong>
            </p>

            {/* CTA cluster */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <a
                href="https://wa.me/919902216155?text=Hey%20Krishna%2C%20I%20saw%20your%20AI%20employees%20page.%20I%E2%80%99d%20love%20to%20chat%20about%20building%20something%20similar%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-emerald text-background font-semibold text-sm whitespace-nowrap hover:brightness-110 transition-all"
              >
                Chat on WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/in/krishna-goutham/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0A66C2] text-white font-semibold text-sm whitespace-nowrap hover:bg-[#004182] transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
            <a
              href="mailto:krishna@thelaunch.space"
              className="inline-block mt-3 text-xs text-text-secondary/60 hover:text-text-secondary transition-colors"
            >
              or email krishna@thelaunch.space
            </a>

            {/* Agent count — visible on desktop as scroll cue */}
            <div className="hidden lg:flex items-center gap-3 mt-16 text-text-secondary/50">
              <div className="flex -space-x-2">
                {agents.map((a) => (
                  <div
                    key={a.id}
                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold"
                    style={{
                      background: `${a.accentHex}20`,
                      color: a.accentHex,
                    }}
                  >
                    {a.name[0]}
                  </div>
                ))}
              </div>
              <span className="text-xs">5 agents active</span>
            </div>
          </div>
        </motion.div>

        {/* ═══ RIGHT: Agent cards + Pipeline (scrolls on desktop) ═══ */}
        <div className="lg:w-[62%] xl:w-[65%] pb-24 md:pb-32 lg:pt-24 space-y-5 md:space-y-6">
          {/* ─── Agent Cards Grid ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {orderedAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              >
                <AgentCard agent={agent} />
              </motion.div>
            ))}
          </div>

          {/* ─── Pipeline Visualization ─── */}
          <motion.section
            className="mt-8 md:mt-12 rounded-2xl md:rounded-3xl border border-border-color bg-surface p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6 md:mb-7">
              <h2 className="text-xl md:text-2xl font-bold font-display whitespace-nowrap">
                How They Work Together
              </h2>
              <div className="flex-1 h-px bg-border-color/50" />
            </div>

            <div className="space-y-5 md:space-y-6">
              {lanes.map((lane, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 md:gap-4"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Agent nodes — fixed width so all lanes align */}
                  <div className="flex items-start gap-1.5 md:gap-2 shrink-0 w-[140px] md:w-[160px]">
                    {lane.agents.map((agent, j) => (
                      <div key={agent.id} className="flex items-center gap-1.5 md:gap-2">
                        {j > 0 && <span className="text-text-secondary/40 text-sm font-medium mt-1">+</span>}
                        <AgentNode name={agent.name} slug={agent.workPageSlug} id={agent.id} />
                      </div>
                    ))}
                  </div>

                  {/* Connecting line + action */}
                  <div className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
                    <div className="flex-1 border-t border-dashed border-border-color/60" />
                    <span className="text-[11px] md:text-xs text-text-secondary italic whitespace-nowrap shrink-0">
                      {lane.action}
                    </span>
                    <div className="w-4 md:w-6 border-t border-dashed border-border-color/60 shrink-0" />
                  </div>

                  {/* Outcome */}
                  <span className="hidden sm:inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-text-primary whitespace-nowrap shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald shrink-0" />
                    {lane.outcome}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Orchestrator lane — same structure as above */}
            <motion.div
              className="mt-6 md:mt-7 pt-5 border-t border-border-color/50 flex items-center gap-1.5 md:gap-2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start shrink-0 w-[140px] md:w-[160px]">
                <Link href={`/build-your-ai-team/${partha.workPageSlug}`} className="group/node flex flex-col items-center gap-1.5 shrink-0 w-[56px] md:w-[64px]">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden transition-transform group-hover/node:scale-110">
                    <img src="/agent-avatars/parthasarathi.png" alt="Parthasarathi" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-semibold text-text-secondary group-hover/node:text-text-primary transition-colors leading-none text-center">
                    Parthasarathi
                  </span>
                </Link>
              </div>

              <div className="flex-1 flex items-center gap-2 md:gap-3 min-w-0">
                <div className="flex-1 border-t border-dashed border-border-color/60" />
                <span className="text-[11px] md:text-xs text-text-secondary italic whitespace-nowrap shrink-0">
                  tracks all ops, sends you daily reports
                </span>
                <div className="w-4 md:w-6 border-t border-dashed border-border-color/60 shrink-0" />
              </div>

              <span className="hidden sm:inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-text-primary whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald shrink-0" />
                Nothing falls through
              </span>
            </motion.div>
          </motion.section>

          {/* ─── Bottom CTA ─── */}
          <motion.section
            className="mt-8 md:mt-12 text-center py-10 md:py-14 px-6 md:px-10 rounded-2xl md:rounded-3xl border border-accent-emerald/20 bg-accent-emerald/[0.03]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg md:text-xl font-bold font-display text-text-primary mb-2">
              Want this team working for YOUR business?
            </p>
            <p className="text-sm text-text-secondary mb-6">
              Same agents. Your industry. Your voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919902216155?text=Hey%20Krishna%2C%20I%20saw%20your%20AI%20employees%20page.%20I%E2%80%99d%20love%20to%20chat%20about%20building%20something%20similar%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-emerald text-background font-semibold text-sm hover:brightness-110"
              >
                Chat on WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/in/krishna-goutham/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0A66C2] text-white font-semibold text-sm hover:bg-[#004182] transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
            <a
              href="mailto:krishna@thelaunch.space"
              className="inline-block mt-3 text-xs text-text-secondary/60 hover:text-text-secondary transition-colors"
            >
              or email krishna@thelaunch.space
            </a>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
