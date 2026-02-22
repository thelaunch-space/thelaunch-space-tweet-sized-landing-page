export interface PitchAgent {
  agentId: string; // matches id in lib/agents.ts
  plainTitle: string;
  tagline: string;
  paceScore: number; // out of 10
  intelScore: number; // out of 10
  skillTags: string[];
  comingSoon?: boolean;
  jdSubtitle: string;
  jdBullets: string[];
}

export const PITCH_AGENTS: PitchAgent[] = [
  {
    agentId: "parthasarathi",
    plainTitle: "The Manager",
    tagline: "Runs the show. Schedules, delegates, keeps everything on track.",
    paceScore: 8,
    intelScore: 10,
    skillTags: ["Orchestration", "Scheduling", "Quality Control"],
    jdSubtitle: "Your AI operations lead. Runs the team so you don't have to.",
    jdBullets: [
      "Assigns daily work to every agent based on your content calendar",
      "Catches errors before they go live — quality gate on all output",
      "Sends you a daily briefing: what got done, what's next",
      "Coordinates handoffs between research, writing, and publishing",
    ],
  },
  {
    agentId: "vibhishana",
    plainTitle: "The Scout",
    tagline: "Finds what your customers are asking, before your competitors do.",
    paceScore: 9,
    intelScore: 9,
    skillTags: ["Community Scanning", "Pain Point Extraction", "Research Briefs"],
    jdSubtitle: "Finds what your customers are asking — before your competitors answer.",
    jdBullets: [
      "Scans Reddit, forums, and communities for buyer-intent questions daily",
      "Extracts real pain points your ICP is talking about right now",
      "Delivers research briefs your writer can turn into blog posts same-day",
      "Tracks trending topics in your niche so you're never behind",
    ],
  },
  {
    agentId: "vyasa",
    plainTitle: "The Writer",
    tagline: "Turns research into published blog posts. Every single day.",
    paceScore: 7,
    intelScore: 10,
    skillTags: ["SEO Writing", "Content Strategy", "Publishing"],
    jdSubtitle: "Publishes SEO blog posts daily. You wake up to new content.",
    jdBullets: [
      "Writes long-form, optimized blog posts from research briefs",
      "Handles meta titles, descriptions, internal linking, and schema markup",
      "Publishes directly to your site — no manual upload needed",
      "Matches your brand voice, not generic AI slop",
    ],
  },
  {
    agentId: "vidura",
    plainTitle: "The Strategist",
    tagline: "Makes sure every blog serves a bigger strategic purpose — not just volume.",
    paceScore: 7,
    intelScore: 10,
    skillTags: ["Topic Clustering", "Tool Discovery", "LLM Citations"],
    jdSubtitle: "Makes sure every post ranks — not just exists.",
    jdBullets: [
      "Builds topic clusters so your blog targets the right keywords together",
      "Enriches existing posts with stats, FAQs, and comparison tables for LLM citations",
      "Identifies content gaps competitors haven't covered yet",
      "Turns a blog into a search moat, not a content graveyard",
    ],
  },
  {
    agentId: "valmiki",
    plainTitle: "The Voice",
    tagline: "Writes your LinkedIn and X posts in your voice. Not AI slop.",
    paceScore: 8,
    intelScore: 9,
    skillTags: ["Social Writing", "Voice Matching", "Content Strategy"],
    jdSubtitle: "Writes your LinkedIn and X posts. Sounds like you, not a bot.",
    jdBullets: [
      "Drafts daily social posts in your actual writing voice",
      "Repurposes blog content into platform-native formats",
      "Handles hooks, threads, and engagement-first framing",
      "Builds your personal brand while you focus on your business",
    ],
  },
  {
    agentId: "sanjaya",
    plainTitle: "The Hunter",
    tagline: "Finds your next client before they start looking for you.",
    paceScore: 9,
    intelScore: 8,
    skillTags: ["Lead Intelligence", "Signal Detection", "Prospect Briefs"],
    comingSoon: true,
    jdSubtitle: "Finds your next client before they start looking.",
    jdBullets: [
      "Monitors buying signals across LinkedIn, communities, and job boards",
      "Builds prospect briefs with context — not cold spam lists",
      "Surfaces warm leads who already need what you sell",
      "Scores leads by intent so you reach out at the right moment",
    ],
  },
];

export interface TimelineStep {
  week: number;
  title: string;
  description: string;
  outcome: string;
}

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    week: 1,
    title: "Setup",
    description: "We build your agent team. Define their KRAs, outcomes, and success metrics. Train them on your brand, your ICP, your industry context.",
    outcome: "Your team knows your business as well as a new hire would after a month.",
  },
  {
    week: 2,
    title: "Trial Run",
    description: "Agents produce output every day. You see everything they do. Daily feedback loop with you.",
    outcome: "You watch real content get created and published. Tweak the direction in real-time.",
  },
  {
    week: 3,
    title: "Iteration",
    description: "We incorporate your feedback. Agents get smarter about your voice, your audience, your standards.",
    outcome: "The output starts feeling like your content, not generic AI slop.",
  },
  {
    week: 4,
    title: "Handoff",
    description: "Your system is running autonomously. We hand off documentation and maintenance guides.",
    outcome: "You have a self-running content engine. Wake up to new blog posts.",
  },
];

export interface PricingTier {
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  launchLabel?: string;
  description: string;
  features: string[];
  highlight: boolean;
  cta: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Proof of Concept",
    price: "$99",
    originalPrice: "$199",
    period: "month",
    launchLabel: "Launch price — first 10 founders",
    description: "Full agent team for 4 weeks. Your SEO handled, your thinking framework scaled. Risk less than a team dinner.",
    features: [
      "Full agent team setup and training",
      "4-week structured engagement",
      "Daily output visible to you",
      "Agents learn your brand, ICP, and voice",
    ],
    highlight: true,
    cta: "Start my team — $99/mo",
  },
  {
    name: "Growth Partnership",
    price: "$699",
    originalPrice: "$1,000",
    period: "month",
    launchLabel: "Launch price",
    description: "For founders who want ongoing strategic support after the POC.",
    features: [
      "Monthly strategy calls",
      "Agent optimization and scaling",
      "New workstream buildout",
      "Like having a fractional AI operations lead",
    ],
    highlight: false,
    cta: "Talk to us",
  },
];

export const CHALLENGE_OPTIONS = [
  "Don't have time for content",
  "Tried it, didn't work",
  "Never started",
];

export interface CountryCode {
  code: string;
  dial: string;
  label: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: "US", dial: "+1", label: "US/CA +1" },
  { code: "GB", dial: "+44", label: "UK +44" },
  { code: "IN", dial: "+91", label: "India +91" },
  { code: "AU", dial: "+61", label: "Australia +61" },
  { code: "DE", dial: "+49", label: "Germany +49" },
  { code: "FR", dial: "+33", label: "France +33" },
  { code: "AE", dial: "+971", label: "UAE +971" },
  { code: "SG", dial: "+65", label: "Singapore +65" },
  { code: "NL", dial: "+31", label: "Netherlands +31" },
  { code: "SE", dial: "+46", label: "Sweden +46" },
  { code: "IL", dial: "+972", label: "Israel +972" },
  { code: "BR", dial: "+55", label: "Brazil +55" },
  { code: "JP", dial: "+81", label: "Japan +81" },
  { code: "KR", dial: "+82", label: "South Korea +82" },
  { code: "PH", dial: "+63", label: "Philippines +63" },
];
