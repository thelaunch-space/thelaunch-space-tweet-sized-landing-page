import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "When to Leave Teachable/Kajabi for Custom | thelaunch.space",
  description: "Course creators at $5K+/month: when do SaaS fees justify custom? Revenue thresholds, 2026 build costs, and a practitioner framework from 65+ projects.",
  openGraph: {
    title: "When to Leave Teachable/Kajabi for Custom | thelaunch.space",
    description: "Course creators at $5K+/month: when do SaaS fees justify custom? Revenue thresholds, 2026 build costs, and a practitioner framework from 65+ projects.",
    url: "https://thelaunch.space/blogs/founder-advice/teachable-kajabi-custom-decision",
    siteName: "thelaunch.space",
    type: "article",
    publishedTime: "2026-03-04T00:00:00.000Z",
    authors: ["thelaunch.space"],
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "When to Leave Teachable or Kajabi for Custom" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "When to Leave Teachable/Kajabi for Custom | thelaunch.space",
    description: "Course creators at $5K+/month: when do SaaS fees justify custom? Revenue thresholds, 2026 build costs, and a practitioner framework from 65+ projects.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://thelaunch.space/blogs/founder-advice/teachable-kajabi-custom-decision" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "When to Leave Teachable/Kajabi for Custom",
  description: "Course creators at $5K+/month: when do SaaS fees justify custom? Revenue thresholds, 2026 build costs, and a practitioner framework from 65+ projects.",
  url: "https://thelaunch.space/blogs/founder-advice/teachable-kajabi-custom-decision",
  datePublished: "2026-03-04T00:00:00.000Z",
  dateModified: "2026-03-04T00:00:00.000Z",
  author: { "@type": "Organization", name: "thelaunch.space", url: "https://thelaunch.space" },
  publisher: {
    "@type": "Organization",
    name: "thelaunch.space",
    url: "https://thelaunch.space",
    logo: { "@type": "ImageObject", url: "https://thelaunch.space/logo.png" }
  },
  image: "https://thelaunch.space/og-image.png",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thelaunch.space/blogs/founder-advice/teachable-kajabi-custom-decision" },
};

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background text-text-primary">
        {/* Back link */}
        <header className="max-w-[720px] mx-auto px-6 md:px-8 pt-8 md:pt-12">
          <a href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm font-medium transition-colors">
            ← thelaunch.space
          </a>
        </header>

        <article className="max-w-[720px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">When to Leave Teachable or Kajabi for Custom: A Course Creator&apos;s Decision Framework</h1>
          <div className="flex items-center gap-3 text-sm text-text-secondary mb-10">
            <span>thelaunch.space</span><span>·</span>
            <time dateTime="2026-03-04">Mar 4, 2026</time><span>·</span>
            <span>12 min read</span>
          </div>

          <p className="text-lg md:text-xl text-text-primary leading-relaxed mb-8">
            If you&apos;re a course creator earning $5,000 or more per month, you&apos;ve probably done the math: Teachable&apos;s transaction fees and Kajabi&apos;s $179–$499 monthly subscription add up fast. Over three years, a creator at $10K/month revenue could pay $15,000–$25,000 in platform fees alone. At what point does building custom actually make financial sense?
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The answer isn&apos;t &quot;as soon as you&apos;re frustrated.&quot; It&apos;s more nuanced than that—and getting it wrong in either direction is expensive. Build too early, and you&apos;re maintaining custom infrastructure when you should be creating content. Build too late, and you&apos;ve burned tens of thousands on fees that could have funded ownership.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            This guide gives you the decision framework we use when advising course creators through this transition. We&apos;ve shipped <a href="/" className="text-accent-blue hover:underline">65+ projects at thelaunch.space</a>—many for education businesses—and we&apos;ve seen both successful migrations and expensive mistakes. Here&apos;s what actually matters.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The Real Cost of Staying on SaaS Platforms</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Let&apos;s start with honest math. Most course creators dramatically underestimate their cumulative platform costs because they think in monthly terms, not multi-year terms.
          </p>

          <div className="bg-border-color/30 border border-border-color rounded-xl p-8 my-10 text-center">
            <p className="text-3xl md:text-4xl font-bold text-text-primary mb-2">$18,000 – $36,000</p>
            <p className="text-sm md:text-base text-text-secondary">Typical 3-year platform cost for a course creator at $10K/month revenue</p>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Here&apos;s how the numbers break down for the major platforms as of March 2026:
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Teachable</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Starter ($39/month):</span> Plus 7.5% transaction fee. At $10K/month revenue = $39 + $750 = $789/month, or $28,404 over 3 years.</li>
            <li><span className="text-text-primary font-semibold">Pro ($159/month):</span> 0% transaction fee. $159/month = $5,724 over 3 years.</li>
            <li><span className="text-text-primary font-semibold">Pro+ ($249/month):</span> 0% transaction fee. $249/month = $8,964 over 3 years.</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Kajabi (2026 Pricing)</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Basic ($179/month):</span> 0% transaction fee. $179/month = $6,444 over 3 years.</li>
            <li><span className="text-text-primary font-semibold">Growth ($249/month):</span> 0% transaction fee. $249/month = $8,964 over 3 years.</li>
            <li><span className="text-text-primary font-semibold">Pro ($499/month):</span> 0% transaction fee. $499/month = $17,964 over 3 years.</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Thinkific</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Basic ($49/month):</span> 0% transaction fee. $49/month = $1,764 over 3 years.</li>
            <li><span className="text-text-primary font-semibold">Start ($99/month):</span> 0% transaction fee. $99/month = $3,564 over 3 years.</li>
            <li><span className="text-text-primary font-semibold">Grow ($199/month):</span> 0% transaction fee. $199/month = $7,164 over 3 years.</li>
          </ul>

          <div className="border-l-4 border-accent-blue pl-6 my-8">
            <p className="text-base md:text-lg text-text-primary font-medium leading-relaxed">The real trap: most creators start on a lower tier with transaction fees, then upgrade when fees get painful. By the time they&apos;re on a &quot;good&quot; plan, they&apos;ve already paid thousands in transaction fees they&apos;ll never recover.</p>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Beyond direct costs, consider what you&apos;re <span className="text-text-primary font-semibold">not</span> able to do on these platforms: white-label branding for corporate clients, multi-tenancy for B2B training, custom assessments beyond multiple choice, proprietary gamification, and workflows that don&apos;t fit their template. These limitations often cost more than the subscription—in deals you can&apos;t close, in competitive positioning you can&apos;t achieve.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The Revenue Threshold Decision Framework</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Not every course creator should build custom. Here&apos;s the framework we use to help clients decide:
          </p>

          <div className="space-y-4 my-8">
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Under $2K/month revenue: Stay on SaaS</p>
              <p className="text-text-secondary text-base leading-relaxed">Focus on content creation and audience building. Platform fees are a minor cost at this stage. Thinkific Basic at $49/month is your best bet—0% transaction fees, unlimited courses.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">$2K–$10K/month revenue: Evaluate and plan</p>
              <p className="text-text-secondary text-base leading-relaxed">Calculate your 3-year total cost of ownership on current platform. If it exceeds $15K, start planning the transition. Consider WordPress + LearnDash as an intermediate step.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">$10K–$30K/month revenue: Custom becomes cost-neutral</p>
              <p className="text-text-secondary text-base leading-relaxed">At this level, a $20K–$40K custom build pays for itself within 12–24 months. The question isn&apos;t &quot;can I afford custom?&quot;—it&apos;s &quot;do I have the unique workflow needs that justify it?&quot;</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">$30K+ monthly revenue: Custom almost always wins</p>
              <p className="text-text-secondary text-base leading-relaxed">You&apos;re paying $6K–$18K/year in platform fees. A custom platform with $200/month hosting costs $2,400/year after the initial build. The math is obvious. Your competitive advantage depends on owning your platform.</p>
            </div>
          </div>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The Platform Outgrown Checklist: 8 Signals</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Revenue is one factor. But some creators at $5K/month need custom, while others at $20K/month don&apos;t. The difference? Whether your platform limitations are actively costing you business.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">If you hit 3 or more of these signals, custom evaluation is warranted:</span>
          </p>

          <ol className="list-decimal list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Transaction fees exceed $300/month.</span> You&apos;re paying $3,600+/year just for the privilege of using someone else&apos;s checkout.</li>
            <li><span className="text-text-primary font-semibold">You need multi-tenancy for B2B.</span> Corporate clients want their own branded portal. Teachable and Kajabi don&apos;t support this without awkward workarounds.</li>
            <li><span className="text-text-primary font-semibold">White-label branding is critical for your positioning.</span> You&apos;re selling premium courses to enterprise clients who expect your domain, your branding, no &quot;Powered by Kajabi&quot; footer.</li>
            <li><span className="text-text-primary font-semibold">You need custom workflows the platform can&apos;t support.</span> Maybe it&apos;s peer review assessments, team-based learning, or certification workflows with expiration dates.</li>
            <li><span className="text-text-primary font-semibold">You need advanced assessments.</span> File uploads, open-ended submissions with rubrics, portfolio-based evaluation—Teachable&apos;s multiple-choice quizzes aren&apos;t cutting it.</li>
            <li><span className="text-text-primary font-semibold">You want proprietary gamification or engagement features.</span> Your competitors are building sticky experiences. You&apos;re stuck with basic progress bars.</li>
            <li><span className="text-text-primary font-semibold">Integration needs are forcing expensive workarounds.</span> You&apos;re paying $100+/month for Zapier to connect tools that should talk to each other natively.</li>
            <li><span className="text-text-primary font-semibold">Platform acquisition or policy changes threaten your business.</span> Teachable was acquired by Hotmart in 2020. Pricing and policies can change overnight. Ownership means control.</li>
          </ol>

          <div className="bg-border-color/30 border border-border-color rounded-xl p-6 my-8">
            <p className="text-text-primary font-medium">Hit 5 or more signals? Custom likely wins financially. But even with 2–3 signals, do the ROI math—you might be surprised how quickly custom pays off.</p>
          </div>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The 2026 Custom Build Spectrum</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            &quot;Custom&quot; doesn&apos;t mean hiring an agency for $150K. In 2026, with AI-assisted development tools like Cursor, Claude Code, and Bolt.new, the options have expanded dramatically. Here are your four paths:
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Level 1: WordPress + LearnDash</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Setup cost:</span> $500–$2,000 (theme, plugins, configuration)</li>
            <li><span className="text-text-primary font-semibold">Ongoing:</span> $50–$150/month (hosting, plugin licenses)</li>
            <li><span className="text-text-primary font-semibold">LearnDash license:</span> $199–$799/year</li>
            <li><span className="text-text-primary font-semibold">Best for:</span> Creators who want ownership without full custom development</li>
            <li><span className="text-text-primary font-semibold">Limitations:</span> Still template-based, limited customization without coding</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Level 2: No-Code Custom (Bubble, Softr, Webflow + Memberstack)</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Build cost:</span> $3,000–$8,000</li>
            <li><span className="text-text-primary font-semibold">Ongoing:</span> $50–$200/month (platform fees, hosting)</li>
            <li><span className="text-text-primary font-semibold">Best for:</span> Creators with unique workflows who can&apos;t code but want more flexibility</li>
            <li><span className="text-text-primary font-semibold">Limitations:</span> Still dependent on platform pricing, some performance constraints</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Level 3: AI-Assisted True Custom</h3>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            This is the 2026 unlock that most content about this topic ignores. Tools like <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">Cursor</a>, <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">Bolt.new</a>, and Claude Code have changed what&apos;s possible for non-technical founders.
          </p>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Build cost:</span> $8,000–$25,000 for MVP</li>
            <li><span className="text-text-primary font-semibold">Ongoing:</span> $100–$300/month (hosting, database, occasional updates)</li>
            <li><span className="text-text-primary font-semibold">Best for:</span> Course creators who want full ownership, proprietary features, and competitive differentiation</li>
            <li><span className="text-text-primary font-semibold">What you get:</span> Custom course player, admin dashboard, payment integration, student management—all built specifically for your workflow</li>
          </ul>

          <div className="border-l-4 border-accent-blue pl-6 my-8">
            <p className="text-base md:text-lg text-text-primary font-medium leading-relaxed">At thelaunch.space, we&apos;ve built educational platforms for $15K–$30K that would have cost $80K+ from traditional agencies just two years ago. AI-assisted development isn&apos;t &quot;vibe coding&quot;—it&apos;s a genuine cost reduction with <a href="/blogs/ai-tools/vibe-coding-scaling-wall" className="text-accent-blue hover:underline">proper architecture practices</a>.</p>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Level 4: Traditional Agency Build</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Build cost:</span> $50,000–$150,000+</li>
            <li><span className="text-text-primary font-semibold">Ongoing:</span> $500–$2,000/month maintenance</li>
            <li><span className="text-text-primary font-semibold">Best for:</span> Enterprise-level operations with complex compliance needs, high user volume</li>
            <li><span className="text-text-primary font-semibold">Reality check:</span> Overkill for 95% of independent course creators and small education businesses</li>
          </ul>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The Hybrid Strategy: You Don&apos;t Have to Choose</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            One of the biggest misconceptions about this decision: it&apos;s all-or-nothing. In practice, the smartest transitions are hybrid.
          </p>

          <div className="space-y-4 my-8">
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Pattern 1: Teachable for delivery + custom dashboard</p>
              <p className="text-text-secondary text-base leading-relaxed">Keep Teachable&apos;s reliable video hosting and course delivery. Build custom for what it can&apos;t do: advanced analytics, custom gamification, B2B admin portal.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Pattern 2: Kajabi for marketing + custom course player</p>
              <p className="text-text-secondary text-base leading-relaxed">Kajabi&apos;s email automation and funnel tools are genuinely good. Keep using them for marketing while building a branded course experience that matches your premium positioning.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Pattern 3: Existing students on SaaS + new B2B clients on custom</p>
              <p className="text-text-secondary text-base leading-relaxed">Don&apos;t force a migration on existing students. Keep your SaaS platform running for consumer courses while building custom for corporate training contracts with different pricing and features.</p>
            </div>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Hybrid approaches reduce risk, let you test custom before full commitment, and avoid disrupting revenue while you transition.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The Real Build Cost: 2026 Edition</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Let&apos;s cut through the ambiguity. Based on industry data and our project experience, here&apos;s what custom course platforms actually cost in 2026:
          </p>

          <div className="overflow-x-auto my-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-color">
                  <th className="py-3 px-4 text-text-primary font-semibold">Approach</th>
                  <th className="py-3 px-4 text-text-primary font-semibold">Upfront Cost</th>
                  <th className="py-3 px-4 text-text-primary font-semibold">Monthly Cost</th>
                  <th className="py-3 px-4 text-text-primary font-semibold">3-Year Total</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border-color/50">
                  <td className="py-3 px-4">Teachable Pro</td>
                  <td className="py-3 px-4">$0</td>
                  <td className="py-3 px-4">$159</td>
                  <td className="py-3 px-4">$5,724</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 px-4">Kajabi Growth</td>
                  <td className="py-3 px-4">$0</td>
                  <td className="py-3 px-4">$249</td>
                  <td className="py-3 px-4">$8,964</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 px-4">WordPress + LearnDash</td>
                  <td className="py-3 px-4">$1,500</td>
                  <td className="py-3 px-4">$100</td>
                  <td className="py-3 px-4">$5,100</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 px-4">AI-Assisted Custom MVP</td>
                  <td className="py-3 px-4">$15,000</td>
                  <td className="py-3 px-4">$200</td>
                  <td className="py-3 px-4">$22,200</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 px-4">Agency Custom Build</td>
                  <td className="py-3 px-4">$60,000</td>
                  <td className="py-3 px-4">$800</td>
                  <td className="py-3 px-4">$88,800</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">The breakeven insight:</span> An AI-assisted custom MVP at $15K + $200/month costs $22,200 over 3 years. But you <span className="text-text-primary font-semibold">own</span> the platform—no transaction fees ever, no pricing increases, full control. For a course creator at $10K/month revenue, the custom option is actually <span className="text-text-primary font-semibold">cheaper</span> than Kajabi Pro over 3 years, with dramatically more capability.
          </p>

          <div className="bg-border-color/30 border border-border-color rounded-xl p-8 my-10 text-center">
            <p className="text-3xl md:text-4xl font-bold text-text-primary mb-2">18 months</p>
            <p className="text-sm md:text-base text-text-secondary">Average payback period for a $15K custom build vs. $249/month SaaS platform</p>
          </div>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Migration Without Panic: A 90-Day Roadmap</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Migrating from an established platform feels risky. Here&apos;s how to do it without disrupting your business:
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Phase 1: Audit and Decide (Days 1–30)</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li>Export all data from your current platform (students, transactions, course content). Don&apos;t trust vendor portals—download everything.</li>
            <li>Document your current workflows: what clicks happen daily? What&apos;s manual? What frustrates you?</li>
            <li>Map must-have vs. nice-to-have features for custom</li>
            <li>Run the 3-year TCO calculation. Is custom genuinely better?</li>
            <li>Decision: Full custom, hybrid, or stay on SaaS?</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Phase 2: Build or Scope (Days 31–60)</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li>If custom: Define MVP scope—course delivery, student dashboard, basic admin. Skip advanced analytics for v1.</li>
            <li>If hybrid: Identify exactly what stays on SaaS, what goes custom</li>
            <li>Get quotes from 2–3 development partners (or scope the AI-assisted build yourself)</li>
            <li>Set up infrastructure: hosting, domain, email systems</li>
          </ul>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Phase 3: Test and Launch (Days 61–90)</h3>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li>Migrate ONE course as a pilot—not your entire catalog</li>
            <li>Invite 10–20 beta students for feedback</li>
            <li>Iterate on UX based on real usage</li>
            <li>If successful: migrate remaining courses</li>
            <li>If not: you still have your SaaS platform as fallback</li>
          </ul>

          <div className="border-l-4 border-accent-blue pl-6 my-8">
            <p className="text-base md:text-lg text-text-primary font-medium leading-relaxed">The key insight: run both platforms in parallel for 30–60 days. Don&apos;t burn bridges. Student churn from poor migrations is far more expensive than paying for two platforms briefly.</p>
          </div>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">When Custom Is a Mistake</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            We&apos;d be doing you a disservice if we only talked about when to build custom. Here&apos;s when you should absolutely <span className="text-text-primary font-semibold">not</span> make the leap:
          </p>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Revenue under $2K/month:</span> Focus on content and audience. Platform costs are a rounding error compared to the marketing and content creation work you need to do.</li>
            <li><span className="text-text-primary font-semibold">First course, still validating:</span> Don&apos;t optimize infrastructure for a product you haven&apos;t proven. Use Thinkific or Teachable to test demand first.</li>
            <li><span className="text-text-primary font-semibold">Solo creator with no technical budget:</span> Custom requires ongoing maintenance. If you can&apos;t afford $200–$500/month for occasional updates and hosting, stick with SaaS.</li>
            <li><span className="text-text-primary font-semibold">Standard workflows that fit existing platforms:</span> If Teachable does everything you need, why add complexity? &quot;Control&quot; isn&apos;t worth the overhead if you don&apos;t need unique features.</li>
            <li><span className="text-text-primary font-semibold">High technical anxiety:</span> Custom platforms require some operational involvement. If the idea of managing a database sounds terrifying (even with support), SaaS may be the right long-term choice.</li>
          </ul>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Permission to stay on SaaS: <span className="text-text-primary font-semibold">not every education business needs custom</span>. If Teachable + Zapier gets you to $30K/month without friction, ride that wave. Custom is a tool, not a badge of achievement.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The 2026 Bottom Line</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The question has shifted from &quot;Can I afford custom?&quot; to &quot;Can I afford not to own my platform?&quot;
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            At $10K+ monthly revenue, SaaS fees equal your custom build costs every 18–24 months. You&apos;re either renting forever or investing once (with modest ongoing maintenance). AI-assisted development has made the &quot;build&quot; path dramatically more accessible than it was even two years ago.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            But the decision isn&apos;t just financial. It&apos;s strategic. Do you need white-label for B2B? Multi-tenancy for corporate clients? Custom assessments for professional certifications? If yes, custom isn&apos;t a luxury—it&apos;s a requirement.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Use the Revenue Threshold Framework and the 8-signal checklist to make an informed choice. And if you&apos;re in the $10K–$30K/month range, seriously consider the AI-assisted custom path. The 2026 unlock is real—you can own your platform for less than you think.
          </p>

          <div className="bg-border-color/30 border border-border-color rounded-xl p-6 my-8">
            <p className="text-text-primary font-medium">Ready to evaluate your options? Start with the audit: export your data, document your workflows, run the 3-year TCO math. The decision framework above will make the right path clear.</p>
          </div>

        </article>

        {/* Footer CTA */}
        <footer className="max-w-[720px] mx-auto px-6 md:px-8 pb-16">
          <div className="border-t border-border-color pt-10">
            <p className="text-text-secondary mb-4">Have an idea? We ship MVPs in 21 days.</p>
            <a href="/?cta=open" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-10 text-base font-semibold text-white shadow-[0_20px_35px_rgba(37,99,235,0.35)] transition-transform hover:-translate-y-0.5">
              Get Your Launch Roadmap
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
