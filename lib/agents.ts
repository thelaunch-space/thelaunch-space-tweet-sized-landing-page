// Agent data layer — static TypeScript objects structured for future Convex DB migration
// To migrate: swap this import for a Convex query, zero component changes needed

export interface AgentKRA {
  title: string;
  what: string;
  outcome: string;
  frequency: string;
}

export interface ProofPoint {
  type: "stat" | "link" | "quote";
  label: string;
  value: string;
  href?: string;
}

export interface Agent {
  id: string;
  name: string;
  plainTitle: string;
  role: string;
  description: string;
  status: "active" | "coming-soon";
  accentColor: string;
  accentHex: string;
  avatarPath: string;
  workPageSlug: string;
  roleForICP: string;
  kras: AgentKRA[];
  outcomes: string[];
  dailyRhythm: string[];
  proofPoints: ProofPoint[];
  pipelineRole: string;
}

// ─── Agent Roster ───────────────────────────────────────────────────────────

export const agents: Agent[] = [
  {
    id: "parthasarathi",
    name: "Parthasarathi",
    plainTitle: "The Manager",
    role: "Operations Orchestrator",
    description:
      "The conductor. Partha coordinates all agents, manages workflows across Slack and Make.com, and makes sure nothing falls through the cracks. If something needs to happen, Partha makes it happen.",
    status: "active",
    accentColor: "accent-blue",
    accentHex: "#2563EB",
    avatarPath: "/agents/parthasarathi.png",
    workPageSlug: "parthasarathi",
    roleForICP: "Keeps your entire team running on schedule",
    outcomes: [
      "Nothing falls through the cracks",
      "Problems caught before they cascade",
      "One daily report instead of checking 5 tools",
    ],
    kras: [
      {
        title: "Daily Health Checks",
        what: "Runs system-wide health checks across all agents, pipelines, and integrations",
        outcome: "Problems caught before they cascade into missed deadlines",
        frequency: "3x/day",
      },
      {
        title: "Cross-Team Coordination",
        what: "Routes tasks, briefs, and outputs between agents so nothing gets lost",
        outcome: "Every agent has what they need, when they need it",
        frequency: "Daily",
      },
      {
        title: "Strategic Pattern-Spotting",
        what: "Identifies recurring issues and workflow bottlenecks across the team",
        outcome: "Systemic problems get fixed, not just symptoms",
        frequency: "Daily",
      },
      {
        title: "Due Diligence Reporting",
        what: "Compiles a comprehensive end-of-day report on everything that happened",
        outcome: "You know exactly what your team did today in one read",
        frequency: "Daily at 7PM",
      },
    ],
    dailyRhythm: [
      "8AM — Morning health check across all systems",
      "1PM — Midday check and task routing",
      "3PM — Pre-delivery check on all outputs",
      "7PM — Full due diligence report delivered",
    ],
    proofPoints: [
      { type: "stat", label: "Health checks per day", value: "4" },
      { type: "stat", label: "Agents coordinated", value: "4" },
      {
        type: "quote",
        label: "Real catch",
        value:
          "Caught a broken pipeline before it cost a day's content",
      },
    ],
    pipelineRole: "Coordinates all agents — nothing falls through",
  },
  {
    id: "sanjaya",
    name: "Sanjaya",
    plainTitle: "The Hunter",
    role: "Lead Intelligence Scout",
    description:
      "The scout who never sleeps. Sanjaya scans LinkedIn, X, Reddit, and job boards daily to find prospects who need what you sell — before they even start looking for you.",
    status: "active",
    accentColor: "accent-amber",
    accentHex: "#F59E0B",
    avatarPath: "/agents/sanjaya.png",
    workPageSlug: "sanjaya",
    roleForICP: "Finds your next client before they find you",
    outcomes: [
      "Pipeline fills without you scrolling LinkedIn",
      "Qualified leads delivered daily",
      "You only spend time on prospects who are ready",
    ],
    kras: [
      {
        title: "Signal Detection",
        what: "Scans LinkedIn, X, Reddit, and job boards for buying signals and pain indicators",
        outcome: "You see opportunities the moment they appear",
        frequency: "Daily",
      },
      {
        title: "Lead Qualification",
        what: "Runs every prospect through a 3-tier qualification system with confidence scores",
        outcome: "No more wasting calls on people who aren't ready",
        frequency: "Per lead",
      },
      {
        title: "Prospect Intelligence Briefings",
        what: "Delivers structured briefs on each qualified lead with context and timing",
        outcome: "You walk into every conversation already informed",
        frequency: "Daily",
      },
      {
        title: "Market Pattern Recognition",
        what: "Identifies emerging trends and shifts in your target market",
        outcome: "You adapt your offer before competitors notice the change",
        frequency: "Weekly",
      },
    ],
    dailyRhythm: [
      "Morning — LinkedIn and X signal scan",
      "Midday — Reddit and job board sweep",
      "Afternoon — Lead briefings delivered",
      "Weekly — Market pattern report",
    ],
    proofPoints: [
      { type: "stat", label: "Qualification tiers", value: "3" },
      { type: "stat", label: "Briefings include confidence scores", value: "Yes" },
      {
        type: "quote",
        label: "Real find",
        value:
          "Found a funded startup with no CTO posting a job listing — perfect timing",
      },
    ],
    pipelineRole: "Finds leads → You close them",
  },
  {
    id: "valmiki",
    name: "Valmiki",
    plainTitle: "The Voice",
    role: "Social Content Strategist",
    description:
      "The voice. Valmiki writes your LinkedIn and X posts in your actual voice — not generic AI slop. Every post is strategy-backed, quality-gated, and ready for your review.",
    status: "active",
    accentColor: "accent-rose",
    accentHex: "#F43F5E",
    avatarPath: "/agents/valmiki.png",
    workPageSlug: "valmiki",
    roleForICP: "Writes your social media in your voice, not AI slop",
    outcomes: [
      "Show up on social daily without spending 2 hours writing",
      "Content that attracts clients, not just followers",
      "Your voice, your authority, your audience",
    ],
    kras: [
      {
        title: "Daily Content Drafts",
        what: "Produces LinkedIn and X posts aligned with your content strategy and ICP",
        outcome: "You show up every day without the daily writing grind",
        frequency: "Daily",
      },
      {
        title: "Content Strategy Per Post",
        what: "Each post maps to a specific intent — authority, engagement, conversion, or storytelling",
        outcome: "Every post serves a business purpose, not just vanity metrics",
        frequency: "Per post",
      },
      {
        title: "Quality Gates",
        what: "Runs every draft through a 7-point checklist before it reaches you",
        outcome: "No AI slop, no cringe, no generic advice gets through",
        frequency: "Per post",
      },
      {
        title: "Voice Consistency",
        what: "Maintains your unique voice and tone across platforms",
        outcome: "Your audience recognizes you, not a bot",
        frequency: "Ongoing",
      },
    ],
    dailyRhythm: [
      "Review today's strategy and ICP signals",
      "Draft LinkedIn post",
      "Draft X post",
      "Quality gate checks on both",
      "Ready for your review",
    ],
    proofPoints: [
      { type: "stat", label: "Quality gate checklist", value: "7-point" },
      { type: "stat", label: "Content archetypes", value: "6" },
      {
        type: "quote",
        label: "Quality standard",
        value:
          "Passes the 'would a friend say this at coffee?' test every time",
      },
    ],
    pipelineRole: "Posts daily → Your authority grows",
  },
  {
    id: "vibhishana",
    name: "Vibhishana",
    plainTitle: "The Scout",
    role: "Research Intelligence Analyst",
    description:
      "The scout. Vibhishana monitors 12+ founder communities daily, identifies pain-point patterns, and turns raw Reddit/Slack/Discord chatter into actionable research clusters that drive your content strategy.",
    status: "active",
    accentColor: "accent-emerald",
    accentHex: "#10B981",
    avatarPath: "/agents/vibhishana.png",
    workPageSlug: "vibhishana",
    roleForICP: "Knows what your market wants before your competitors do",
    outcomes: [
      "Know what your market struggles with this week",
      "Content always aligned with real demand",
      "Competitive gaps spotted first",
    ],
    kras: [
      {
        title: "Community Scanning",
        what: "Monitors 10+ communities daily for pain points, questions, and emerging needs",
        outcome: "You always know what your market is struggling with right now",
        frequency: "Daily",
      },
      {
        title: "Pain Point Extraction",
        what: "Digs beneath surface questions to find the real underlying needs",
        outcome: "Your content addresses what people actually need, not what they say",
        frequency: "3x/day briefs",
      },
      {
        title: "Competitive Gap Analysis",
        what: "Identifies topics and angles your competitors haven't covered",
        outcome: "You own the gaps before anyone else notices them",
        frequency: "Per brief",
      },
      {
        title: "Strategic Research Briefs",
        what: "Delivers structured research briefs ready for the content team to act on",
        outcome: "Your content pipeline never runs dry or misses the mark",
        frequency: "3x/day",
      },
    ],
    dailyRhythm: [
      "9AM — Reddit scan across all communities",
      "11AM — First research brief delivered",
      "2PM — Second brief delivered",
      "5PM — Third brief delivered",
      "6PM — Evening report with patterns and trends",
    ],
    proofPoints: [
      { type: "stat", label: "Questions analyzed in week 1", value: "410+" },
      { type: "stat", label: "Communities monitored daily", value: "12" },
      {
        type: "link",
        label: "See the blogs this research produced",
        value: "Browse the blog",
        href: "/blogs",
      },
    ],
    pipelineRole: "Scans communities → Feeds research to Vyasa",
  },
  {
    id: "vyasa",
    name: "Vyasa",
    plainTitle: "The Writer",
    role: "SEO Blog Writer",
    description:
      "The storyteller. Vyasa takes Vibhishana's research and turns it into SEO-optimized blog posts that rank. Real founder pain, real solutions, zero fluff. Published daily to thelaunch.space.",
    status: "active",
    accentColor: "accent-purple",
    accentHex: "#7C3AED",
    avatarPath: "/agents/vyasa.png",
    workPageSlug: "vyasa",
    roleForICP: "Turns market intelligence into content that ranks and attracts",
    outcomes: [
      "Your site becomes the go-to resource in your niche",
      "Inbound leads from people who found your blog",
      "1 published article per day, on autopilot",
    ],
    kras: [
      {
        title: "SEO Blog Writing",
        what: "Writes full blog posts from Vibhishana's research briefs, optimized for search",
        outcome: "Your site ranks for the exact terms your prospects are searching",
        frequency: "Daily",
      },
      {
        title: "Search + AI Citation Optimization",
        what: "Optimizes for both traditional search engines and AI citation (ChatGPT, Perplexity)",
        outcome: "You get found whether prospects search Google or ask AI",
        frequency: "Per post",
      },
      {
        title: "Authority Content",
        what: "Writes posts that pass the bookmark test — content people save and share",
        outcome: "Your blog builds trust before prospects ever talk to you",
        frequency: "Per post",
      },
      {
        title: "End-to-End Publishing",
        what: "Handles the full pipeline from draft to internal linking to PR-based publishing",
        outcome: "Articles go live without you touching a CMS",
        frequency: "Daily",
      },
    ],
    dailyRhythm: [
      "Pick up research brief from Vibhishana",
      "Competitive research on the topic",
      "Write full blog post",
      "Internal linking + URL validation",
      "Publish to site via PR",
    ],
    proofPoints: [
      { type: "stat", label: "Blogs published in first week", value: "6" },
      {
        type: "link",
        label: "How to Find a Technical Cofounder",
        value: "Read the post",
        href: "/blogs/startup-mvps/how-to-find-technical-cofounder",
      },
      {
        type: "link",
        label: "Build MVP Without Coding",
        value: "Read the post",
        href: "/blogs/startup-mvps/build-mvp-without-coding-ai-tools",
      },
    ],
    pipelineRole: "Writes from research → Your site ranks",
  },
  {
    id: "vidura",
    name: "Vidura",
    plainTitle: "The Strategist",
    role: "SEO Intelligence Advisor",
    description:
      "The strategic brain. Vidura sits above the content pipeline — mapping topic clusters, identifying tool opportunities, monitoring LLM citations, and making sure every piece of content serves a larger strategic purpose.",
    status: "active",
    accentColor: "accent-cyan",
    accentHex: "#06B6D4",
    avatarPath: "/agents/vidura.png",
    workPageSlug: "vidura",
    roleForICP: "Makes sure your content strategy builds authority, not just volume",
    outcomes: [
      "Every published blog belongs to a strategic cluster",
      "Tool opportunities identified from real community questions",
      "LLM citation coverage tracked and growing",
      "Content pipeline aligned with business goals, not just volume",
    ],
    kras: [
      {
        title: "Topic Cluster Mapping",
        what: "Maps content pillars to keyword clusters so every blog strengthens a pillar, not exists in isolation",
        outcome: "Your content builds compounding authority in strategic topic areas",
        frequency: "Weekly",
      },
      {
        title: "Tool Opportunity Identification",
        what: "Finds questions that deserve interactive tools, not just blog posts — tools capture traffic that content alone can't",
        outcome: "You build assets that attract and retain visitors, not just rank",
        frequency: "Weekly",
      },
      {
        title: "LLM Citation Monitoring",
        what: "Tracks which thelaunch.space pages get cited by AI models and optimizes content for LLM visibility",
        outcome: "You get found whether prospects search Google or ask AI",
        frequency: "Daily",
      },
      {
        title: "Content Strategy Alignment",
        what: "Reviews pipeline output against strategic goals, flags content that doesn't serve a cluster or misses a keyword opportunity",
        outcome: "Every piece of content serves a business purpose",
        frequency: "Daily",
      },
    ],
    dailyRhythm: [
      "9:30 AM — Morning strategy review and analysis",
      "10:30 AM — Cluster mapping (Mon) / Topic generation (Wed) / Tool scan (Fri)",
      "2:30 PM — Midday strategy check and pipeline alignment",
      "7:30 PM — Evening review and citation analysis",
    ],
    proofPoints: [
      { type: "stat", label: "Topic clusters mapped", value: "0" },
      { type: "stat", label: "Tool opportunities found", value: "0" },
      {
        type: "stat",
        label: "Citation coverage",
        value: "Tracking",
      },
    ],
    pipelineRole: "Strategizes → Pipeline executes with purpose",
  },
];

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
