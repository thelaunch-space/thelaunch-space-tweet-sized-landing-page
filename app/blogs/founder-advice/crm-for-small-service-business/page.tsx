import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM for Small Service Businesses: Pick One Your Team Will Use | thelaunch.space",
  description: "50-70% of CRMs fail because teams won't use them. Here's how to pick the right CRM for your 5-person agency based on adoption, not features.",
  openGraph: {
    title: "CRM for Small Service Businesses: Pick One Your Team Will Use | thelaunch.space",
    description: "50-70% of CRMs fail because teams won't use them. Here's how to pick the right CRM for your 5-person agency based on adoption, not features.",
    url: "https://thelaunch.space/blogs/founder-advice/crm-for-small-service-business",
    siteName: "thelaunch.space",
    type: "article",
    publishedTime: "2026-02-21T00:00:00.000Z",
    authors: ["thelaunch.space"],
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CRM for Small Service Businesses: Pick One Your Team Will Use" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM for Small Service Businesses: Pick One Your Team Will Use | thelaunch.space",
    description: "50-70% of CRMs fail because teams won't use them. Here's how to pick the right CRM for your 5-person agency based on adoption, not features.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://thelaunch.space/blogs/founder-advice/crm-for-small-service-business" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CRM for Small Service Businesses: Pick One Your Team Will Use",
  description: "50-70% of CRMs fail because teams won't use them. Here's how to pick the right CRM for your 5-person agency based on adoption, not features.",
  url: "https://thelaunch.space/blogs/founder-advice/crm-for-small-service-business",
  datePublished: "2026-02-21T00:00:00.000Z",
  dateModified: "2026-02-21T00:00:00.000Z",
  author: { "@type": "Organization", name: "thelaunch.space", url: "https://thelaunch.space" },
  publisher: {
    "@type": "Organization",
    name: "thelaunch.space",
    url: "https://thelaunch.space",
    logo: { "@type": "ImageObject", url: "https://thelaunch.space/logo.png" }
  },
  image: "https://thelaunch.space/og-image.png",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://thelaunch.space/blogs/founder-advice/crm-for-small-service-business" },
};

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background text-text-primary">
        <header className="max-w-[720px] mx-auto px-6 md:px-8 pt-8 md:pt-12">
          <a href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm font-medium transition-colors">
            ← thelaunch.space
          </a>
        </header>

        <article className="max-w-[720px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">CRM for Small Service Businesses: Pick One Your Team Will Actually Use</h1>
          <div className="flex items-center gap-3 text-sm text-text-secondary mb-10">
            <span>thelaunch.space</span><span>·</span>
            <time dateTime="2026-02-21">Feb 21, 2026</time><span>·</span>
            <span>10 min read</span>
          </div>

          <p className="text-lg md:text-xl text-text-primary leading-relaxed mb-8">
            The best CRM for your small service business is the one your team opens every day. Not the one with the most features. Not the one your competitor uses. The one that gets used. Because 50-70% of CRM implementations fail, and the reason is almost never the technology itself.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            If you run a 5-person consultancy, creative agency, or professional services firm, you know the pain. Spreadsheets worked when it was just you. Email threads were manageable when you had two people. But somewhere around 4-5 team members, leads start slipping through cracks. You don&apos;t know who last talked to which prospect. Follow-ups get missed. And you think: <span className="text-text-primary font-semibold">we need a CRM</span>.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            So you sign up for HubSpot because everyone says it&apos;s the standard. Two weeks later, half your team hasn&apos;t logged in. Three months later, you&apos;re back to spreadsheets with a $50/month subscription you forgot to cancel.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            This guide is about breaking that cycle. We&apos;ve seen this pattern across dozens of service businesses at <a href="/" className="text-accent-blue hover:underline">thelaunch.space</a>, and we&apos;ve built CRM-adjacent tools for clients who needed something their teams would actually use. The answer isn&apos;t finding the &quot;best&quot; CRM. It&apos;s finding the right one for your specific situation.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Why Your Team Abandoned the Last CRM</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Here&apos;s a statistic that should reframe how you think about CRM selection: according to research from <a href="https://vantagepoint.io/blog/hs/why-70-of-crm-projects-fail-and-how-the-people-process-technology-framework-prevents-it" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">Vantage Point</a>, 38% of CRM failures come from low user adoption. Another 22% come from inadequate change management. <span className="text-text-primary font-semibold">Only 6% of failures are caused by actual technical problems with the software.</span>
          </p>

          <div className="bg-border-color/30 border border-border-color rounded-xl p-8 my-10 text-center">
            <p className="text-3xl md:text-4xl font-bold text-text-primary mb-2">60%+</p>
            <p className="text-sm md:text-base text-text-secondary">of CRM failures are people problems, not technology problems</p>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            This means the CRM vendor almost doesn&apos;t matter. What matters is whether your specific team, with your specific workflows, will actually log in and enter data consistently. The most feature-rich, highly-rated, enterprise-grade CRM is worthless if your sales rep keeps their real pipeline in a personal spreadsheet.
          </p>

          <div className="border-l-4 border-accent-blue pl-6 my-8">
            <p className="text-base md:text-lg text-text-primary font-medium leading-relaxed">The question isn&apos;t &quot;which CRM has the best features?&quot; It&apos;s &quot;which CRM will my team actually use every single day?&quot;</p>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The adoption problem hits service businesses especially hard. Unlike SaaS companies with 50-person sales teams and dedicated ops people, a 5-person agency doesn&apos;t have anyone whose job is &quot;CRM administrator.&quot; You need something that works out of the box, requires minimal setup, and doesn&apos;t punish you for missing a day of data entry.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The 5-Person Inflection Point</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            There&apos;s a specific moment when service businesses feel the CRM pain most acutely. We call it the <span className="text-text-primary font-semibold">5-person inflection point</span>. Here&apos;s what it looks like:
          </p>

          <div className="space-y-4 my-8">
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">1-3 people: Spreadsheets and email work fine</p>
              <p className="text-text-secondary text-base leading-relaxed">You know every client personally. Your inbox is your CRM. A simple spreadsheet tracks leads. Nothing falls through cracks because everything is in your head.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">4-5 people: Chaos emerges</p>
              <p className="text-text-secondary text-base leading-relaxed">Now you have multiple people talking to prospects. Who last contacted that warm lead? Did anyone follow up after the discovery call? The founder no longer has complete visibility. Leads slip through cracks. Revenue gets left on the table.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">5+ people trying enterprise CRM: Overwhelm</p>
              <p className="text-text-secondary text-base leading-relaxed">You sign up for HubSpot or Salesforce. Setup takes 2-3 days minimum. The interface is confusing. Half the features are irrelevant to service businesses. Your team enters data once, realizes it&apos;s a chore, and quietly stops.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Back to spreadsheets: Pain remains</p>
              <p className="text-text-secondary text-base leading-relaxed">The CRM subscription lingers. The spreadsheet returns. The chaos continues. You&apos;ve now wasted setup time, subscription fees, and team goodwill on a failed tool adoption.</p>
            </div>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The real question at this inflection point isn&apos;t &quot;what CRM should we use?&quot; It&apos;s: <span className="text-text-primary font-semibold">what&apos;s the simplest thing that will actually get used?</span> Not the most features. Not the industry standard. The tool your specific team will open every day.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The Adoption Pyramid: A Framework for Choosing</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Most CRM advice starts with features: pipeline visualization, email tracking, automation, reporting. That&apos;s backwards. Features don&apos;t matter if no one logs in. Instead, we recommend evaluating CRMs using what we call the <span className="text-text-primary font-semibold">Adoption Pyramid</span>:
          </p>

          <div className="space-y-4 my-8">
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Layer 1 (Foundation): Will your team open it daily?</p>
              <p className="text-text-secondary text-base leading-relaxed">This is the only question that matters at first. Does the tool fit into existing workflows? Can someone log in and do something useful in under 30 seconds? If the answer is no, nothing else matters.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Layer 2 (Critical Data): Does it capture the 3 essentials?</p>
              <p className="text-text-secondary text-base leading-relaxed">For service businesses, you only need three data points to start: <span className="text-text-primary font-semibold">lead source</span> (where they came from), <span className="text-text-primary font-semibold">last contact</span> (when you talked), and <span className="text-text-primary font-semibold">next action</span> (what happens next). Everything else is optional.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Layer 3 (Nice-to-Haves): Advanced features</p>
              <p className="text-text-secondary text-base leading-relaxed">Email automation, reporting dashboards, lead scoring, integrations. These matter, but only after Layers 1 and 2 are solid. Most CRM selection processes start here. That&apos;s why most fail.</p>
            </div>
          </div>

          <div className="border-l-4 border-accent-blue pl-6 my-8">
            <p className="text-base md:text-lg text-text-primary font-medium leading-relaxed">A Notion database that your team updates religiously beats a $100/month CRM that nobody touches. Start with Layer 1.</p>
          </div>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Three Paths for Service Businesses</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Based on where you are in the 5-person inflection and your team&apos;s comfort with tools, here are three realistic paths. Each serves a different situation.
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Path 1: Notion or Airtable (Simplest, Free to Start)</h3>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Best for:</span> Teams of 1-5 who already use Notion/Airtable for other things. Founders who want something working in under 2 hours. Businesses where &quot;CRM&quot; really means &quot;lead tracker.&quot;
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Setup time:</span> 30 minutes to 2 hours with a template.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Cost:</span> Free (Notion) or free tier (Airtable).
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The advantage here is adoption. If your team already lives in Notion for project management, adding a CRM database means they don&apos;t need to learn a new tool or remember to log into something separate. The <a href="https://www.notion.com/templates/category/crm" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">Notion template gallery</a> has dozens of free CRM templates that work out of the box.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Limitations:</span> No native email tracking. No automation. No lead scoring. You&apos;re essentially building a structured spreadsheet with better views. For many service businesses, that&apos;s exactly enough.
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Path 2: Simple Dedicated CRM (Pipedrive, Capsule, Bigin)</h3>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Best for:</span> Teams of 3-10 with a real sales process. Businesses where pipeline stages matter. Founders who want actual CRM features without enterprise complexity.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Setup time:</span> 3 days to 2 weeks.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Cost:</span> $14-20/user/month.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <a href="https://www.pipedrive.com/en/industries/crm-solutions-for-small-business" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">Pipedrive</a> is the standout here for service businesses. It was designed specifically for small sales teams, has a visual pipeline that makes sense immediately, and doesn&apos;t overwhelm you with features you&apos;ll never use. <a href="https://capsulecrm.com/" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">Capsule CRM</a> is another solid option if you want tight integration with project management.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Why not HubSpot?</span> HubSpot is powerful, but its free tier is designed to upsell you, and the full setup for a small team takes 2-4 weeks minimum according to <a href="https://www.marketveep.com/blog/hubspot-crm-implementation-guide" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">implementation guides</a>. For a 5-person agency, that&apos;s often overkill. Pipedrive users report getting set up in about 3 days.
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">Path 3: Custom-Built (Supabase, Retool, or Full Custom)</h3>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Best for:</span> Teams with very specific workflows that no off-the-shelf CRM handles well. Businesses already working with a tech partner. Companies where the CRM needs to integrate deeply with other custom systems.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Setup time:</span> 1-3 weeks with an experienced builder.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            <span className="text-text-primary font-semibold">Cost:</span> $1,500-4,000 one-time (vs. ongoing subscription).
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            This sounds extreme, but hear us out. At thelaunch.space, we&apos;ve built lightweight CRM tools for clients who tried the standard options and found them too generic. A <a href="/blogs/startup-mvps/build-mvp-without-coding-ai-tools" className="text-accent-blue hover:underline">custom-built system using modern tools</a> can be simpler than HubSpot while doing exactly what your business needs.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The math often works out: $20/user/month × 5 users × 12 months = $1,200/year for a tool that might not fit. A $2,500 custom build that fits perfectly pays for itself in two years, and you own it forever.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">What to Actually Track (The Minimalist Approach)</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Enterprise CRMs want you to track 47 fields per contact. For a small service business, that&apos;s a recipe for zero adoption. Here&apos;s what actually matters based on patterns we&apos;ve seen across 65+ projects:
          </p>

          <div className="bg-border-color/30 border border-border-color rounded-xl p-6 my-8">
            <p className="text-text-primary font-medium mb-4">The 6 Fields That Matter</p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg">
              <li><span className="text-text-primary font-semibold">Contact info</span> (name, email, phone)</li>
              <li><span className="text-text-primary font-semibold">Lead source</span> (referral, website, LinkedIn, event)</li>
              <li><span className="text-text-primary font-semibold">Status</span> (new, contacted, qualified, proposal sent, won/lost)</li>
              <li><span className="text-text-primary font-semibold">Owner</span> (who on your team owns this relationship)</li>
              <li><span className="text-text-primary font-semibold">Last contact date</span> (when did we last talk)</li>
              <li><span className="text-text-primary font-semibold">Next action + date</span> (what happens next and when)</li>
            </ul>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            That&apos;s it. Six fields. If you capture these consistently, you have 90% of the value of any CRM. Everything else (deal value, company size, industry, decision maker role, buying timeline) is nice to have but not essential for a 5-person service business.
          </p>

          <div className="border-l-4 border-accent-blue pl-6 my-8">
            <p className="text-base md:text-lg text-text-primary font-medium leading-relaxed">The &quot;next action&quot; field is the most important and most often skipped. Without it, your CRM becomes a graveyard of contacts you meant to follow up with.</p>
          </div>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The &quot;Good Enough&quot; Test</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Before committing to any CRM, run this 3-question test:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Can a new team member add a lead in under 30 seconds?</span> If it takes longer, adoption will suffer.</li>
            <li><span className="text-text-primary font-semibold">Can you see all leads needing follow-up in one view?</span> This is the daily driver feature. If it&apos;s buried, it won&apos;t get used.</li>
            <li><span className="text-text-primary font-semibold">Will your least tech-savvy team member actually use it?</span> The chain is only as strong as its weakest link. If one person refuses to log data, the whole system breaks.</li>
          </ol>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            If you can answer yes to all three, the CRM is good enough. Don&apos;t optimize for features you might need someday. Optimize for consistent usage today.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Real Setup Times (What to Actually Expect)</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            CRM vendors love to claim &quot;set up in minutes.&quot; Here&apos;s what our research and experience shows for actual time to productive use with a 5-person team:
          </p>

          <div className="overflow-x-auto my-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-color">
                  <th className="py-3 pr-4 text-text-primary font-semibold">Tool</th>
                  <th className="py-3 pr-4 text-text-primary font-semibold">Setup Time</th>
                  <th className="py-3 text-text-primary font-semibold">Cost (5 users)</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border-color/50">
                  <td className="py-3 pr-4">Notion template</td>
                  <td className="py-3 pr-4">30-90 minutes</td>
                  <td className="py-3">Free</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 pr-4">Airtable template</td>
                  <td className="py-3 pr-4">1-2 hours</td>
                  <td className="py-3">Free-$100/mo</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 pr-4">Pipedrive</td>
                  <td className="py-3 pr-4">3 days - 1 week</td>
                  <td className="py-3">$70-100/mo</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 pr-4">Capsule CRM</td>
                  <td className="py-3 pr-4">2-5 days</td>
                  <td className="py-3">$90/mo</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 pr-4">HubSpot (basic)</td>
                  <td className="py-3 pr-4">2-4 weeks</td>
                  <td className="py-3">Free-$450/mo</td>
                </tr>
                <tr className="border-b border-border-color/50">
                  <td className="py-3 pr-4">Salesforce</td>
                  <td className="py-3 pr-4">4-8 weeks</td>
                  <td className="py-3">$125-500/mo</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Custom (Supabase)</td>
                  <td className="py-3 pr-4">1-3 weeks</td>
                  <td className="py-3">$1,500-4,000 once</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Notice the pattern: the simpler tools have shorter setup times and higher adoption rates. For a 5-person service business, faster setup usually means better long-term results because you haven&apos;t burned through team patience before seeing value.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">The Adoption Math</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Let&apos;s make this concrete. According to <a href="https://heydan.ai/articles/why-crm-adoption-fails-and-how-to-finally-fix-it" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">CRM adoption research</a>, companies that achieve 90%+ adoption rates see transformative results:
          </p>

          <div className="bg-border-color/30 border border-border-color rounded-xl p-8 my-10 text-center">
            <p className="text-3xl md:text-4xl font-bold text-text-primary mb-2">$8.71</p>
            <p className="text-sm md:text-base text-text-secondary">return for every $1 spent on CRM (when actually adopted)</p>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            But only 40% of businesses achieve 90%+ adoption rates. The majority invest in CRM tools that deliver a fraction of their potential value.
          </p>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The implication is clear: a $0/month Notion CRM that gets 100% adoption beats a $100/month enterprise CRM that gets 30% adoption. Always.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">Making Your Decision</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Here&apos;s a simple decision tree based on everything above:
          </p>

          <div className="space-y-4 my-8">
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">Your team already uses Notion daily?</p>
              <p className="text-text-secondary text-base leading-relaxed">→ Start with a Notion CRM template. It&apos;s free, fast to set up, and has the highest adoption probability because it&apos;s already in your workflow.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">You have a real sales pipeline with multiple stages?</p>
              <p className="text-text-secondary text-base leading-relaxed">→ Try Pipedrive&apos;s free trial. It&apos;s designed for exactly this use case and has the simplest setup among proper CRMs.</p>
            </div>
            <div className="bg-border-color/20 rounded-xl p-5">
              <p className="text-text-primary font-semibold mb-1">You&apos;ve already failed with 2+ CRMs?</p>
              <p className="text-text-secondary text-base leading-relaxed">→ The problem might not be the tool. Consider whether a custom-built solution designed around your specific workflow would finally break the cycle. Sometimes paying once for something that fits perfectly beats paying monthly for something that doesn&apos;t.</p>
            </div>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Whatever you choose, remember the Adoption Pyramid. Layer 1 first: will your team actually use it? Everything else is secondary.
          </p>

          <hr className="border-border-color my-12" />

          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">When You Need Help</h2>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            If you&apos;re hitting the 5-person inflection point and need a CRM that actually fits your service business, there are two paths forward:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li><span className="text-text-primary font-semibold">Go simple first.</span> Try the Notion/Pipedrive route. Most service businesses don&apos;t need more than this.</li>
            <li><span className="text-text-primary font-semibold">Build something custom.</span> If your workflows are genuinely unique, or you&apos;ve already failed with off-the-shelf options, a custom solution might be worth the investment.</li>
          </ol>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            At thelaunch.space, we help non-technical founders <a href="/blogs/founder-advice/validate-startup-idea-domain-expert" className="text-accent-blue hover:underline">validate and build</a> exactly these kinds of tools. If you&apos;re spending more time fighting your CRM than using it, that&apos;s a solvable problem.
          </p>

        </article>

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
