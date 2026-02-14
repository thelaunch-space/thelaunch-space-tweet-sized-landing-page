"use client";

import { motion } from "framer-motion";
import { agents } from "@/lib/agents";
import AgentCard from "@/components/AgentCard";

export default function AIEmployeesPage() {
  const partha = agents.find((a) => a.id === "parthasarathi")!;
  const vibhishana = agents.find((a) => a.id === "vibhishana")!;
  const vyasa = agents.find((a) => a.id === "vyasa")!;
  const sanjaya = agents.find((a) => a.id === "sanjaya")!;
  const valmiki = agents.find((a) => a.id === "valmiki")!;

  const orderedAgents = [partha, vyasa, vibhishana, sanjaya, valmiki];

  const pipelineSteps = [
    { agent: sanjaya, text: "Sanjaya finds leads", result: "You close them" },
    {
      agent: vibhishana,
      text: "Vibhishana scans",
      mid: "Vyasa writes",
      midAgent: vyasa,
      result: "Your site ranks",
    },
    { agent: valmiki, text: "Valmiki posts daily", result: "Your authority grows" },
    {
      agent: partha,
      text: "Parthasarathi coordinates all of it",
      result: "Nothing falls through",
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

        {/* ═══ RIGHT: Agent cards (scrolls on desktop) ═══ */}
        <div className="lg:w-[62%] xl:w-[65%] pb-24 md:pb-32 lg:pt-24 space-y-5 md:space-y-6">
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
            className="mt-8 md:mt-12 rounded-2xl md:rounded-3xl border border-border-color bg-background/60 backdrop-blur-sm p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl font-bold font-display mb-6">
              How They Work Together
            </h2>

            <div className="space-y-4">
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 flex-wrap"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: step.agent.accentHex }}
                  >
                    {step.text}
                  </span>
                  {step.mid && step.midAgent && (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-text-secondary/30 shrink-0"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: step.midAgent.accentHex }}
                      >
                        {step.mid}
                      </span>
                    </>
                  )}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-text-secondary/30 shrink-0"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm text-text-secondary">
                    {step.result}
                  </span>
                </motion.div>
              ))}
            </div>
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
