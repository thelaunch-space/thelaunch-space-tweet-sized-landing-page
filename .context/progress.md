# Progress — thelaunch.space Landing Page + Blog

Last updated: 2026-03-03

## Completed
- [x] Project scaffolding (originally Vite + React 18, later migrated to Next.js 14)
- [x] Hero section with headline, tagline, CTA
- [x] Social links (X, LinkedIn) in header
- [x] "What We Do" services page with pricing tiers
- [x] State-based navigation (hero ↔ services)
- [x] Lead capture modal with form validation
- [x] Email / WhatsApp contact toggle
- [x] Make.com webhook integration (replaced Supabase)
- [x] Animated client dock (macOS-style magnification)
- [x] Portal-based tooltips (desktop hover, mobile tap)
- [x] Particle effects background (tsparticles)
- [x] Framer Motion animations
- [x] Responsive design (mobile-first)
- [x] OG tags and SEO meta
- [x] ESLint + TypeScript strict mode configured
- [x] **Migrated from Vite SPA → Next.js 14 App Router**
- [x] **Server-side rendered HTML (crawlable/SEO-ready)**
- [x] **Webhook URL moved server-side via API route (/api/lead)**
- [x] **Fonts self-hosted via next/font (no CDN dependency)**
- [x] **Supabase fully removed (package + file)**
- [x] **Route stubs for /blogs/[topic]/[title] and /tools/[tool-slug]**
- [x] **Netlify deployment configured (@netlify/plugin-nextjs)**
- [x] **Blog publishing system — AI agent (OpenClaw) creates posts via GitHub PRs**
- [x] **Blog agent docs: BLOG-AGENT-INSTRUCTIONS.md, BLOG-STYLE-REFERENCE.md, BLOG-OWNER-GUIDE.md**
- [x] **First blog post published: "How to Find a Technical Cofounder (Without Getting Ghosted)"**
- [x] **`/?cta=open` query param — auto-opens lead capture modal (for blog CTAs)**
- [x] **LandingPage wrapped in Suspense (required by Next.js 14 for useSearchParams)**
- [x] **GitHub branch protection on `main` (requires PR + approval)**
- [x] **`robots.txt` and `sitemap.xml` via Next.js metadata API (auto-discovers blog posts)**
- [x] **NavBar component — site-wide navigation (logo, blog link, social icons)**
- [x] **Blog index page (`/blogs`) — auto-discovers and lists posts by category**
- [x] **Google Analytics (GA4) — gtag.js via next/script, auto page view tracking**
- [x] **`lib/blog.ts` — shared blog discovery utility (used by sitemap + blog index)**
- [x] **Blog category index pages (`/blogs/[topic]/`) — dynamic route filtering posts by topic**
- [x] **New blog post: "Why Your Agency Wasted $30K on Your MVP"**
- [x] **New blog post: "When No-Code Tools Stop Working (And What to Do Next)"**
- [x] **New blog post: "Can't Find a Technical Cofounder? Here's What to Do"**
- [x] **Blog index (`/blogs`) redesigned — horizontal card layout with sticky header/footer**
- [x] **"My AI Employees" section — full agent showcase at `/my-ai-employees`**
- [x] **Agent data layer (`lib/agents.ts`) — 5 agents: Parthasarathi, Sanjaya, Valmiki, Vibhishana, Vyasa**
- [x] **Agent card component (`AgentCard.tsx`) — highlight/standard/compact sizes, accent colors**
- [x] **Agent detail pages (`/my-ai-employees/[agent]`) — KRAs, daily rhythm, proof points**
- [x] **FloatingCTA component — scroll-triggered sticky CTA button**
- [x] **Individual agent page routes with layouts for all 5 agents**
- [x] **NavBar updated with "My AI Employees" link**
- [x] **Sitemap updated to include agent pages**
- [x] **Tailwind config extended with agent accent colors**
- [x] **New CSS utilities for agent card animations (scan line, glow pulse)**
- [x] **Dark → Light mode migration — full site color scheme overhaul**
- [x] **Design system: "Quiet Luxury" polish pass across all pages**
- [x] **Off-white base (#FAFBFC) + noise grain texture overlay**
- [x] **Layered shadow system (shadow-card, shadow-card-hover, shadow-cta, shadow-nav)**
- [x] **Surface color tokens (surface: #FFFFFF, surface-alt: #F8FAFD) for card elevation**
- [x] **Typography refinements — letter-spacing on headings (-0.03em h1, -0.02em h2/h3)**
- [x] **NavBar scroll-aware shadow (strengthens on scroll)**
- [x] **Hero radial gradient atmosphere + refined CTA glass effect**
- [x] **Card elevation across all pages (blog cards, agent cards, KRA cards, proof points)**
- [x] **Logo flash fix — added width/height attributes to prevent FOUC**
- [x] **`.context/feedback-and-bugs.md` — bug/feedback tracking doc**

- [x] **Blog index redesign v2 — removed repetitive containers, inline header, CTA moved to NavBar on scroll, footer removed**
- [x] **Blog post width — widened from `max-w-[720px]` to `max-w-6xl` across all posts + category page + style reference**
- [x] **NavBar scroll-aware CTA — on `/blogs` pages, CTA button appears in navbar after scrolling 100px (rounded-xl, matches navbar radius)**
- [x] **Agent blog template instruction updated — told agent (via Partha) to use `max-w-6xl` for future posts**
- [x] **AI Employees page redesign — left-hero sticky + right 2-col scrolling card grid**
- [x] **AgentCard refactored — highlight/standard/compact sizes with fixed image heights (no more aspect-ratio cards)**
- [x] **Hero copy rewrite — "Your Brain. Your Agents. Real Output." eyebrow, scaling-your-thinking body copy with bold/italic emphasis**
- [x] **CTAs updated — primary WhatsApp (wa.me with pre-filled msg), secondary LinkedIn (brand blue #0A66C2), tertiary email link**
- [x] **Landing page hero — "15+ MVPs shipped" → "60+ projects built"**
- [x] **Client dock — full-color logos (removed grayscale), stronger border/shadow, overflow-hidden corner fix**
- [x] **Design system — Valmiki avatar prompt updated (sage in late 50s, not young 30s)**
- [x] **New blog post: "Should You Hire a Developer or Build With AI?"**
- [x] **Client logos redesign — replaced Dock with inline grayscale logo plates on white tiles**
- [x] **Added Vitalyf and Classroots (text logo) as clients**
- [x] **Mobile: horizontal scroll for client logos, hamburger menu nav, slimmer CTA button**
- [x] **Desktop: all logos in single row, intentional subheadline line breaks ("cofounder" / "CTO")**
- [x] **Logo images get `rounded-lg` for dark-background logos (Tripture)**
- [x] **NavBar: "AI Team" → "Build Your AI Team" (aspirational CTA-style label)**
- [x] **NavBar: logo enlarged (h-14 md:h-16), active link pill indicators (subtle blue bg)**
- [x] **NavBar: mobile hamburger menu with dropdown (logo + hamburger only on small screens)**
- [x] **Announcement ribbon component (`AnnouncementRibbon.tsx`) — site-wide top banner**
- [x] **Renamed `/my-ai-employees` → `/build-your-ai-team` (aspirational URL)**
- [x] **Pipeline section redesign on AI team page + mobile layout fix**
- [x] **Launch Control backend (Convex) — 4 tables, 4 HTTP ingestion endpoints, Clerk auth, provider wiring**
- [x] **Convex schema deployed: questions, briefs, blogs, agentActivity with 11 indexes**
- [x] **HTTP Actions: `/ingestQuestions` (batch), `/ingestBrief`, `/ingestBlog`, `/ingestActivity` — Bearer token auth + CORS**
- [x] **Public queries: listRecent (questions/blogs), listMetadata (briefs), agentStatuses, recentFeed**
- [x] **Admin queries: listFullDetails (questions), getFullBrief + listFull (briefs), fullLog (activity)**
- [x] **Clerk middleware (`middleware.ts`) — permissive, no route blocking, makes auth available**
- [x] **ConvexClientProvider wrapping entire app (ClerkProvider + ConvexProviderWithClerk)**
- [x] **Netlify build updated to `npx convex deploy --cmd 'npm run build'`**
- [x] **All 4 Convex HTTP endpoints tested with curl — data confirmed in Convex Dashboard**
- [x] **3 SKILL.md files created: convex-push-scanner (Vibhishana), convex-push-blog (Vyasa), convex-push-activity (all agents)**
- [x] **Partha deployed skills on VPS — all 3 installed at `/app/skills/`, API key stored, test push successful**
- [x] **Historical data backfill — 13 briefs (with full markdown), 7 blogs, 30 questions pushed to Convex**
- [x] **Convex schema fully enriched — all 12 scanner fields, all 14 blog-queue columns, matches Partha's audit**

- [x] **Launch Control frontend dashboard (`/launch-control`) — full 3-column dashboard built**
- [x] **LC: 5 new Convex queries (weeklyStats, allTimeStats, agentTodayActivity, agentWeeklySummary, communityBreakdown)**
- [x] **LC: Route + Layout — server page, CSS Grid 3-col (sidebar/center/feed), responsive**
- [x] **LC: HeaderBar — "Launch Control by [logo]", stat pills, Clerk auth, no main NavBar on this page**
- [x] **LC: Agent Sidebar — 5 agents, status dots, click-to-expand detail panel (inline swap, not overlay)**
- [x] **LC: Agent Expanded Panel — full-bleed portrait, status badge (Working/Idle/Offline), today+week stats, schedule, click-outside-to-close**
- [x] **LC: Live Feed — real-time Convex WebSocket, filter tabs (All/Tasks/Milestones), animated entries**
- [x] **LC: Scoreboard — count-up animation (intersection observer), 5 stat cards, all-time totals**
- [x] **LC: Daily Timeline — merges live activity + hardcoded IST schedule, 3 states (completed/active/upcoming)**
- [x] **LC: Admin Tabs (auth-gated) — Communities panel, Questions table (sortable, frozen header/col, mobile cards), Briefs panel**
- [x] **LC: Brief Reader Modal — near-fullscreen, react-markdown + remark-gfm, SEO metadata sidebar**
- [x] **LC: Mobile — avatar strip, stacked cards for questions, sheet overlays for panels**
- [x] **LC: CTA moved inline into live feed column (no separate footer section)**
- [x] **LC: NavBar hidden on `/launch-control` — self-contained header**
- [x] **LC: Sitemap updated with `/launch-control` URL**
- [x] **LC: NavBar updated with "Launch Control" link (desktop + mobile)**
- [x] **LC: `react-markdown` + `remark-gfm` packages installed**
- [x] **LC: Portrait edge fix — CSS `mask-image` feathering on agent expanded panel portraits**
- [x] **LC: Font size bump — body text upgraded one notch across all dashboard components (timeline, feed, sidebar, header, scoreboard)**
- [x] **LC: Waitlist CTA — replaces "Sign in" button. Email input captures leads via Make.com webhook. Hidden admin gate: `krishna@thelaunch.space` reveals Clerk sign-in/sign-up. Disappears when signed in.**
- [x] **LC: HeaderBar simplified — "Sign in" removed, only Clerk `UserButton` shown when authenticated**
- [x] **LC: Center column tabs (`CenterTabs.tsx`) — "Overview" tab (Scoreboard + Timeline) always visible. Communities/Questions/Briefs tabs appear only when signed in. Same space, no scrolling down.**
- [x] **LC: Brief Reader Modal fix — `react-markdown` v10 requires children prop, was self-closing with no content passed. Fixed.**
- [x] **LC: Test brief pushed to Convex with full `contentMarkdown` (2523 chars) — renders tables, code blocks, headings, bold, lists**
- [x] **LC: Mobile QA — 12 files fixed** — responsive breakpoints for all components (dashboard stacked layout, scrollable tabs, bottom-sheet modals, card views for tables, capped feed height, vertical CTA, responsive scoreboard/timeline)
- [x] **LC: NavBar hooks fix — moved early return after all hook declarations (rules-of-hooks lint error)**
- [x] **Clerk production instance** — created prod instance, cloned dev settings, added `thelaunch.space` domain, 5 CNAME records in GoDaddy DNS (`clerk`, `accounts`, `clk._domainkey`, `clk2._domainkey`, `mail`), all verified green
- [x] **Convex production deployment** — `curious-iguana-738` prod instance, env vars set (AGENT_API_KEY, CLERK_ISSUER_URL), functions deployed
- [x] **Netlify env vars updated** — 4 vars swapped to prod values (NEXT_PUBLIC_CONVEX_URL, CONVEX_DEPLOY_KEY, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY)
- [x] **Deployed to production** — committed all LC frontend + mobile QA, merged PR #19 to main, Netlify auto-deployed
- [x] **VPS agent skills updated** — Partha changed 3 skill URLs from dev (`impartial-pelican-672`) to prod (`curious-iguana-738`), test push confirmed
- [x] **Partha historical data backfill** — 554 questions, 14 briefs (with full markdown), 7 blogs, 30 activity entries pushed to prod Convex. 605 total records.
- [x] **LC: Public preview tabs** — All 4 tabs (Overview, Communities, Questions, Briefs) now visible to non-authenticated visitors. Top 3 rows of real data shown, rest blurred with gradient overlay + "Want your own AI team? Join Waitlist" CTA (same `/api/lead` webhook). Questions titles clickable to Reddit. Briefs clickable to open public reader modal (new `getPublicBrief` Convex query — returns content without SEO metadata).
- [x] **LC: Scoreboard toggle** — "This Week" / "All Time" toggle replaces static layout. Click to swap which dataset powers the big numbers. Removed old "All Time" text line.
- [x] **LC: Dynamic imports** — Tab panel components lazy-loaded via `next/dynamic` to prevent webpack compilation hang on initial page load.
- [x] **LC: New Convex query `briefs.getPublicBrief`** — Public read-only query returning brief content without sensitive SEO fields (keywords, competitive gaps, angles). Deployed to both dev and prod.
- [x] **LC: New components** — `PreviewGate.tsx` (blur overlay + waitlist CTA), `QuestionsPreview.tsx` (3-row public table), `BriefsPreview.tsx` (clickable cards + public reader modal), `CommunitiesPreview.tsx` (placeholder cards with blur).
- [x] **AnnouncementRibbon updated** — changed from "Coming Soon" to "Live Now" with link to `/launch-control` instead of LinkedIn DM (2026-02-16)
- [x] **Context docs audit & update** — all 10 `.context/` files audited against codebase and corrected (2026-02-16)

- [x] **`/hire-your-24x7-team` pitch page — BUILT** — Full scrolling service pitch page with 14 components under `components/pitch/`. Sections: HookSection (live weekly stats from Convex), HowItWorksSection, TeamSection (Pokemon-style AgentStatCard with stat bars + live Convex data), TrustNudge, RecentWorkSection (tabbed questions/briefs/blogs from Convex), TimelineSection (4-week engagement), PricingSection ($200 POC + $1K growth), LeadCaptureSection (form → Make.com + TimeSlotPicker), SecondaryCtaSection (→ Launch Control), FooterTease. Floating dual CTA (Watch live + Get your AI team) appears after 600px scroll. All data live from Convex.
- [x] **NavBar updated** — "Launch Control" link removed. "Build Your AI Team" replaced with "Hire Your 24/7 Team" pointing to `/hire-your-24x7-team`. Desktop + mobile.
- [x] **AnnouncementRibbon updated** — Now visible on `/` and `/hire-your-24x7-team` (removed `/build-your-ai-team`). Links to `/launch-control`.
- [x] **Sitemap updated** — `/hire-your-24x7-team` added (priority 0.9), `/build-your-ai-team` agent pages removed.
- [x] **LC: FTUE Guided Tour (`GuidedTour.tsx`)** — Spotlight tour for first-time non-admin visitors. 5 desktop steps (scoreboard, tab-bar, pipeline, agent-sidebar, live-feed) + 4 mobile steps (scoreboard, tab-bar, pipeline, agent-strip). Uses `data-tour` attributes, spotlight overlay with CSS box-shadow cutout, tooltip placement logic with viewport clamping, localStorage `lc_tour_completed` flag. Auto-starts after 800ms for non-admin visitors. Scroll lock during tour.
- [x] **LC: BlogsPanel component** — New tab panel showing published blog posts in Launch Control admin view. Uses `BlogPost` type from `lib/blog.ts` + `CATEGORY_LABELS` from new `lib/blog-labels.ts`. Category badges, links to blog URLs.
- [x] **`lib/blog-labels.ts`** — Extracted `CATEGORY_LABELS` from `lib/blog.ts` into a separate client-safe module (no `fs` import). Used by BlogsPanel and other client components.
- [x] **New blog category: "AI Tools"** — Added `ai-tools` to category labels.
- [x] **New blog post: "Best AI Tools for Non-Technical Founders to Build MVPs"** — `app/blogs/ai-tools/ai-tools-non-technical-founders-mvp/page.tsx`. Published 2026-02-16.
- [x] **Team hero image** — `public/agents/team-hero.png` added for pitch page TeamSection.
- [x] **`.context/thelaunch-space-icp.md` created** — Full ICP profile doc (domain-expert founders, 35-50, $100K-$2M services businesses). Was previously a todo item.
- [x] **Pitch page mobile layout + timeline cards fixed** — Responsive layout fixes for mobile pitch page.
- [x] **LC: Live stats on pitch page** — HookSection shows "This week: X questions found, Y briefs written, Z blogs published" with real Convex data + "all time" comparison line.

- [x] **LC: Sticky tabs + frozen headers** — Center column now height-constrained on desktop (`lg:max-h`, flex column). Tab bar sticky on mobile (below header). Questions/Communities tables have sticky `<thead>` + frozen first column with proper z-index layering. QuestionsPreview also gets sticky thead. (2026-02-16)
- [x] **LC: Communities tab → table with reasoning** — Replaced card grid with sortable table: Community | Why It Was Picked | Relevant Qs | Last Scanned. New `lib/community-data.ts` with strategic reasons per subreddit. CommunitiesPreview also rebuilt as table. Mobile shows card view with reasons. (2026-02-16)
- [x] **LC: Voice/addressing fix** — Dashboard copy changed from "your AI team" to "the AI team" / "the agents" across 6 files (CenterTabs, DailyTimeline, GuidedTour, HeaderBar). New center tagline in header: "This runs on my business daily. Yours will be trained on yours." (desktop only). PreviewGate/WaitlistCTA "your" language preserved (correctly addresses visitor). (2026-02-16)

- [x] **Vidura agent (6th agent) — BUILT** — New agent "Vidura, The Strategist" (SEO Intelligence Advisor). Added to `lib/agents.ts` (full agent data with KRAs, daily rhythm, proof points), `lib/pitch-data.ts` (pitch card with stat bars + skills tags). Agent detail page at `/build-your-ai-team/vidura/`. Avatars at `public/agents/vidura.png` + `public/agent-avatars/vidura.png`. Accent color: cyan (#06B6D4). (2026-02-17)
- [x] **Vidura Convex tables + HTTP endpoints** — Two new tables in `convex/schema.ts`: `topicClusters` (SEO content planning — pillar name, cluster topic, target keyword, intent type, status) and `toolOpportunities` (interactive tool proposals — tool name, source question, why-tool rationale, complexity, status). New files: `convex/topicClusters.ts`, `convex/toolOpportunities.ts` with ingest + query functions. HTTP ingestion at `/ingestTopicCluster` and `/ingestToolOpportunity`. (2026-02-17)
- [x] **LC: Strategy tab** — New "Strategy" tab in CenterTabs showing Vidura's topic clusters + tool opportunities. New components: `StrategyPanel.tsx` (admin — full data tables), `StrategyPreview.tsx` (public preview). Tab description: "Topic clusters and tool opportunities mapped by Vidura, The Strategist". (2026-02-17)
- [x] **LC: Blogs tab upgraded to sortable table** — Old `BlogsPanel.tsx` replaced by `BlogsTable.tsx` (sortable table with columns: Title, Category, Keyword, Words, Enrichment, Status, Published) + `BlogsPreview.tsx` (public preview). Merges local blog file data with Convex blog data (enrichment count, status). (2026-02-17)
- [x] **Blog enrichment fields** — `blogs` Convex table now has `enrichmentCount`, `lastEnrichmentDate`, `enrichmentLog` fields for tracking Vidura's enrichment passes. (2026-02-17)
- [x] **New skill: `convex-push-strategy.SKILL.md`** — Vidura pushes topic clusters (Mon/Wed) and tool opportunities (Fri) to Convex. (2026-02-17)
- [x] **LC: Meetings tab** — New `MeetingsPanel.tsx` component for viewing pitch page bookings. New `pitchBookings` Convex table. (2026-02-17)
- [x] **LC: CenterTabs expanded to 7 tabs** — Overview, Blogs, Communities, Questions, Briefs, Strategy, Meetings. Was 4 tabs. Tab descriptions added for each. (2026-02-17)
- [x] **Pitch page agents expanded** — Now shows 4 active agents (Parthasarathi, Vibhishana, Vyasa, Vidura) + 2 coming soon (Valmiki, Sanjaya). Was 3 active + 2 coming soon. (2026-02-17)
- [x] **Geo-detected cost savings** — New `lib/geo-savings.ts` (pricing + savings config for IN vs INTL), `lib/useGeo.ts` (cookie-based geo hook), `components/ui/SavingsTooltip.tsx` (tooltip explaining rate sources). Middleware updated to set `geo_region` cookie from `x-country` header. INR pricing for India visitors, USD for international. Used in Scoreboard + pitch page. (2026-02-17)
- [x] **Cost formula overhauled** — Replaced activity-based formula (scanRuns × 2.5 + briefs × 4 + blogs × 4 + orchestration) with per-blog agency rate model. Switched to all-time stats. INR rates use real Indian freelancer rates (₹500-600/hr). (2026-02-17)
- [x] **Scoreboard hero pair layout** — "Hours Saved" and "Cost Saved" displayed as hero-sized pair cards. Uses geo-detected currency (₹ or $). SavingsTooltip explains calculation rationale. (2026-02-18)
- [x] **Cost Saved tooltip legibility** — Improved contrast and readability of SavingsTooltip component. (2026-02-18)
- [x] **Pricing updated** — POC: $200 → $99/mo (launch price, was $199). Growth: $1,000 → $699/mo (launch price, was $1,000). "Launch price — first 10 founders" framing. Pricing framing line removed from hero section. (2026-02-17)
- [x] **`.context/cost-savings-research.md` created** — Research doc with Upwork/Glassdoor/Indian freelancer rate data backing the cost savings numbers. (2026-02-17)
- [x] **New blog: "Post-MVP Doubt: Should You Keep Going or Quit?"** — `app/blogs/founder-advice/post-mvp-doubt-should-you-keep-going/`. 2nd post in founder-advice category. (2026-02-17)
- [x] **New blog: "Why Your MVP Costs Too Much (And How to Fix It)"** — `app/blogs/startup-mvps/why-mvp-costs-too-much-validation-first/`. 7th post in startup-mvps category. (2026-02-17)

- [x] **Question dedup fix** — `ingestBatch` now upserts by URL (query `by_url` index, patch if exists, insert if new). Prevents duplicate rows from Vibhishana's daily Reddit scans. `by_url` index added to `questions` table in schema. 249 duplicates cleaned from prod (1020 → 771). (2026-02-22)
- [x] **Convex updated to 1.32.0** — Minor version bump from 1.31.7. (2026-02-22)

- [x] **Documents table + endpoint** — 8th Convex table (`documents`) for agent research reports, strategy docs, process docs. Upsert by slug. `convex/documents.ts` with `listMetadata` (admin), `getDocument` (admin), `upsert` (internal). HTTP endpoint `/upsertDocument`. Auto-logs activity on new document creation via shared `convex/lib/activityHelper.ts`.
- [x] **Upsert endpoints** — New HTTP routes `/upsertQuestions`, `/upsertBlog`, `/upsertBrief`, `/upsertDocument` — same mutations with dedup logic, cleaner names. Partha updated agent skill files to use these paths.
- [x] **Blog enrichment endpoints** — `/updateBlogEnrichment` (update enrichment count/date/log by slug) + `/updateBriefStatus` (update brief status by slug). Both via HTTP Actions.
- [x] **Activity dedup** — `dedupKey` field + `by_dedupKey` index on `agentActivity` table. Prevents duplicate milestone entries.
- [x] **Blog dedup** — `by_slug` index on `blogs` table. Upsert by slug in `blogs.ingest`.
- [x] **Shared activity helper** — `convex/lib/activityHelper.ts` (`logActivityIfNew`) — dedup-aware activity logging used by documents and other mutations.
- [x] **New blog: "Invoice Automation for Small Businesses: When to Automate"** — `app/blogs/ai-tools/invoice-automation-small-business-ocr-custom/`. 3rd post in ai-tools category. (2026-02-24)
- [x] **Enriched blog: "When to Skip Landing Page Tests"** — Added stats, comparison table, FAQ section. (2026-02-24)
- [x] **Enriched blog: "When to Stop Using Spreadsheets for Leads"** — Added statistics, FAQ section, comparison table. (2026-02-24)
- [x] **New blog posts from agents (Feb 22-24 batch):** "CRM for Small Service Businesses" (enriched), "AI Generated Code Deployment Reality" (enriched), "Why Most Founders Fail at Distribution" (enriched), "Why Your MVP Costs Too Much" (enriched). All merged via batch PR review.

- [x] **Fixed Netlify build failure** — `netlify.toml` split by context: production runs `npx convex deploy --cmd 'npm run build'`, deploy previews run `npm run build` only. Root cause: `CONVEX_DEPLOY_KEY` in Netlify env vars caused Convex to reject deploy preview builds ("non-production build environment" error). This was introduced when Clerk+Convex deploy was added on Feb 15. (2026-02-25)
- [x] **Removed Clerk from middleware** — `clerkMiddleware()` was wrapping every request but doing zero auth checks. It crashed the entire site on Netlify because edge functions can't access `CLERK_SECRET_KEY` at runtime. Middleware now does geo cookie only. Clerk auth works client-side via ClerkProvider. (2026-02-25)
- [x] **Added `/admin` login page** — Clean Clerk `<SignIn>` page at `/admin` (no sign-up). Redirects to `/launch-control` after sign-in. Replaces the old email field hack in WaitlistCTA. (2026-02-25)
- [x] **WaitlistCTA → redirect to pitch page** — Replaced email forms in WaitlistCTA and PreviewGate with "Get Your AI Team" buttons linking to `/hire-your-24x7-team#lead-capture`. All leads now funnel through pitchBookings in Convex. (2026-02-25)
- [x] **Opened up Launch Control tabs** — Removed blur/PreviewGate from Blogs, Communities, Strategy, Briefs tabs. All public content now fully visible to visitors. Communities uses real data (`communityBreakdown` query made public). Strategy shows 20 clusters + 10 tools. Briefs shows 20 briefs, all clickable. Only Documents and Meetings remain admin-only. (2026-02-25)

- [x] **Work Mode Kanban — full build** — WorkBoard, WorkBoardColumn, WorkBoardCard, AddManualTaskForm, WorkBoardArchive. 5 kanban columns + Archive column (previous weeks, collapsible by week). Owner tags (Krishna = orange "K" badge; agents = colored pills). Health bar per card (green → red over 14 days). Work mode hides agent sidebar (full-width board). Header stats strip (Done this week / In Progress / To Do / Blocked — live from Convex). Hydration fix: workMode reads from localStorage via useEffect, not useState initializer. (2026-02-26)
- [x] **Convex SSOT migration** — canonical `/push/*` and `/update/*` write endpoints deployed. GET read endpoints live: `/query/briefs`, `/query/topic-clusters`, `/query/tool-opportunities`, `/query/linkedin-posts`. `linkedinPosts` + `manualTasks` tables added. All agent helper scripts rewired (Vyasa, Vibhishana, Vidura, Valmiki). Sheets now fallback-only. (2026-02-26)
- [x] **Kanban status dropdown + feedback loop** — Replaced action buttons on brief/blog/LinkedIn cards with nuanced status dropdown (Approve / Needs Revision / Drop / Publish / Skip etc). Confirm step with optional feedback textarea for non-approval statuses. Feedback stored in `krishnaFeedback` field (briefs + linkedinPosts). Blocked cards show stored feedback + Slack reminder to paste it to the agent. Blog cleanup migration run: 4 junk/duplicate blog entries marked "dropped" on dev (production cleanup pending). Partha brief written at `openclaw-config-global/prompts/kanban-feedback-loop-brief-for-partha.md`. (2026-02-26)

- [x] **Shakti Phase 0 — Convex Foundation** — `clients`, `projects`, `tasks` tables + `convex/clients.ts`, `convex/projects.ts`, `convex/shaktiTasks.ts` + 9 new HTTP endpoints. WorkBoard `task` type wired. (2026-02-28)
- [x] **Shakti Phase 1 — WorkBoard UI** — `WorkBoardCard.tsx` handles `type: "task"` with client/project labels, task type badge, estimated hours, action buttons. (2026-02-28)
- [x] **7th agent: Shakti "The Chief of Staff"** — `lib/agents.ts`, `lib/pitch-data.ts`, `lib/geo-savings.ts` all updated. Sanjaya is now the only coming-soon agent. (2026-02-28)
- [x] **Shakti Phase 2 — VPS Agent Setup** — Full Shakti workspace at `/home/node/openclaw/shakti/` (10 files). 3 client context files (beacon-house, edutechplus, thelaunch-space) saved to VPS — self-contained, no local Mac paths. 4 crons registered (7AM Morning Brief, 4:30PM Afternoon Check, 9:30PM Evening Consolidation, Sunday 10AM Weekly Digest IST). Parthasarathi AGENTS.md updated (Shakti in watched paths + team table). 3 clients + 16 projects seeded to prod Convex. (2026-02-28)
- [x] **Blog enrichment batch (Feb 28)** — 6 blogs enriched; 1 new blog added (Why Your Landing Page Gets Zero Signups). Total: 22 posts. (2026-02-28)
- [x] **Design system Shakti avatar prompt** — Prompt 7 of 8 + team hero Prompt 8 of 8 (7 characters, camera spec, DO NOT list). (2026-02-28)
- [x] **Slug, anchor & pricing overhaul (2026-02-27)** — Route renamed `/hire-your-24x7-team` → `/your-ai-team`. Permanent redirect added. Anchor `#lead-capture` → `#contact` in LeadCaptureSection, PitchPage (2 instances). NavBar label "Hire Your 24/7 Team" → "Your AI Team", all hrefs updated. AnnouncementRibbon, WaitlistCTA, PreviewGate, sitemap all updated. Pricing tiers renamed: "Proof of Concept" → "DIY Kickstart" ($299 one-time), "Growth Partnership" → "Founder's Partnership" ($1,500/mo, first month $750). Geo pricing updated (India: ₹24,999 / ₹1,20,000). `pocOriginalPrice`/`growthOriginalPrice` removed (no strikethrough). `pocLaunchLabel`/`growthLaunchLabel` added to `GeoPricing` interface. `getPriceDisplay` no longer appends "/mo". LeadCaptureSection copy updated ("One-time setup. You own the system.").

- [x] **Kanban: Blog PR preview link** — `prUrl: v.optional(v.string())` added to `blogs` Convex table. `blogs.ingest` accepts and stores it. `workboard.ts` includes `prUrl` in blog card `meta`. Clicking a `pr_created` blog card title opens `meta.prUrl` (Netlify deploy preview) in new tab; falls back to `meta.url` for published blogs. (2026-03-01)
- [x] **Kanban: Task Detail Modal** — New `TaskDetailModal.tsx` component. Clicking a Shakti task (`type: "task"`) or manual task (`type: "manual"`) card title opens a modal. Shows client/project/type/priority/deadline read-only for task type; editable title + description for manual. Editable notes/description textarea saves via `manualTasks.update` (existing) or new `shaktiTasks.update` public mutation. (2026-03-01)
- [x] **Kanban: Backlog "+" creation button** — `WorkBoardColumn.tsx` now shows "+" on both `todo` and `backlog` columns. `AddTaskForm.tsx` accepts `targetColumn?: "backlog" | "todo"` prop and uses it as the `status` when creating via `manualTasks.create` or `shaktiTasks.create`. `manualTasks.create` now accepts optional `status` param (defaults to `"todo"`). `workboard.ts` `mapManualStatus` now maps `"backlog"` → backlog column. (2026-03-01)

- [x] **Kanban: Hook/CTA selection on LinkedIn approve** — `WorkBoardCard.tsx` shows pill pickers for `hookOptions` + `ctaOptions` when approving a linkedin post-brief. Confirm button disabled until both are selected. `workboard.updateArtifactStatus` accepts `selectedHook` + `selectedCta` params, stores them on the `linkedinPosts` record. (2026-03-03)
- [x] **Blog category pages pre-rendered at build time** — `app/blogs/[topic]/page.tsx` now exports `generateStaticParams()` using `getBlogCategories()`. Added loading skeletons (`app/blogs/loading.tsx`, `app/blogs/[topic]/loading.tsx`, `app/your-ai-team/loading.tsx`). `lib/blog.ts` discovery results cached to avoid redundant fs scans. Fix for broken Netlify builds where dynamic routes weren't being pre-built. (2026-03-03)
- [x] **New blogs: "dev-disappeared" + "feature-request-overwhelm"** — `app/blogs/founder-advice/dev-disappeared/page.tsx` + `app/blogs/founder-advice/feature-request-overwhelm/page.tsx`. Blog total: **24 published posts** (8 startup-mvps, 12 founder-advice, 4 ai-tools). (2026-03-03)
- [x] **Kanban mobile: sticky dismiss button** — All 3 card modals (`BriefReaderModal`, `PostBriefModal`, `TaskDetailModal`) now render a `fixed bottom-3` "dismiss" pill (`sm:hidden`) at `z-60`. Always reachable on mobile even when modal sheet overflows the viewport. (2026-03-03)

## In Progress
- End-to-end brief→blog flow verification (Vyasa picking up brief from Convex, pushing pr_created status back)

## Blocked
- Nothing currently blocked

## Known Issues
- Daily Timeline times are hardcoded in `lib/launch-control-types.ts` — need Partha to verify they match actual VPS cron jobs.
- **Question count mismatch** — Prod Convex has 771 unique questions, Google Sheet has 891. ~120 questions may not have been pushed to Convex, or have slightly different URLs. Needs investigation.

## Recent Changes (latest first)
1. **Kanban mobile dismiss + blog pre-render + hook/CTA selection** — (2026-03-03) Mobile: sticky dismiss pill on all 3 card modals. Blog category pages now pre-rendered at build time (generateStaticParams). LinkedIn approve flow requires hook + CTA selection. 2 new blogs (dev-disappeared, feature-request-overwhelm). Blog total: 24 posts.
2. **Shakti Phase 0 + 1 — COMPLETE** — `clients`, `projects`, `tasks` tables added to Convex schema (13 tables total). `convex/clients.ts`, `convex/projects.ts`, `convex/shaktiTasks.ts` created. 9 new HTTP endpoints: `/push/clients`, `/push/projects`, `/push/tasks`, `/update/task-status`, `/query/clients`, `/query/projects`, `/query/tasks`. WorkBoard `task` card type wired in `workboard.ts` (`getBoard` + `updateArtifactStatus`) and `WorkBoardCard.tsx` (client/project badges, task type badge, estimated hours, action buttons). (2026-02-28)
2. **7th agent: Shakti** — "The Chief of Staff" added to `lib/agents.ts` (indigo accent #4F46E5, 6 task types, daily planning KRAs), `lib/pitch-data.ts` (Pace: 9, Intel: 8, active — Sanjaya remains only coming-soon), `lib/geo-savings.ts` ($800/mo INTL, ₹15K/mo IN for Task management). (2026-02-28)
3. **Design system: Shakti avatar prompt** — `.context/design-system-v2.md` updated: Shakti Prompt 7 of 8 added (deep magenta glowing eyes, charcoal blazer over magenta silk kurta, 4 orbiting holographic task panels). All individual agent prompts renumbered 1 of 8 through 7 of 8. Team hero updated to Prompt 8 of 8 — now includes all 7 characters, full camera spec (24–35mm, 2.5:1 panoramic, chest-height, studio lighting), 14-item DO NOT list, and troubleshooting table. (2026-02-28)
4. **New blog + 6 enrichments** — New blog: "Why Your Landing Page Gets Zero Signups" (founder-advice). Enriched: `why-agency-mvp-failed`, `how-to-find-technical-cofounder`, `hire-developer-vs-build-with-ai`, `when-no-code-tools-stop-working`, `find-technical-cofounder-alternative`, `solo-lawyer-case-management-decision`. Blog total: **22 published posts** (8 startup-mvps, 10 founder-advice, 4 ai-tools). (2026-02-28)
5. **Netlify Durable Cache bug fixed** — `netlify.toml` `Netlify-CDN-Cache-Control: no-store` on `/*` prevents HTML from being cached in Durable Cache. `/_next/static/*` override keeps static asset caching. New `app/api/deploy-hook/route.ts` purge endpoint. One-time purge run. Full incident doc at `.context/netlify-caching-incident.md`. (2026-02-27)
2. Kanban status dropdown — replaced action buttons on brief/blog/LinkedIn cards with dropdown + confirm + feedback textarea. `krishnaFeedback` stored in Convex. Blocked cards show Slack reminder. Blog cleanup migration run (4 junk entries → dropped). Partha brief written. (2026-02-26)
2. Work Mode Kanban — owner tags, health bar, archive column, header stats, sidebar hidden in work mode. Hydration fix. Deployed to production. (2026-02-26)
3. Convex SSOT migration — GET endpoints live, all agent helper scripts rewired (Vyasa/Vibhishana/Vidura/Valmiki). Sheets = fallback only. (2026-02-26)
3. Opened up LC tabs (no blur), /admin login page, WaitlistCTA→redirect, removed Clerk from middleware, fixed Netlify build (2026-02-25)
2. 3 blog PRs merged (#44 #45 #46) — 1 new blog (invoice automation) + 2 enriched blogs (landing page tests, spreadsheets for leads) (2026-02-24)
2. Documents table + upsert endpoints + blog enrichment endpoints + activity dedup + shared activity helper (2026-02-22–24)
3. Question dedup fix — `ingestBatch` upserts by URL, `by_url` index, 249 prod duplicates cleaned (2026-02-22)
4. Convex updated 1.31.7 → 1.32.0 (2026-02-22)
3. Scoreboard hero pair layout + Cost Saved tooltip legibility (2026-02-18)
2. Vidura agent + strategy pipeline + Blogs table upgrade + Meetings tab — 6th agent, 2 new Convex tables, 3 new LC components, BlogsPanel→BlogsTable (2026-02-17)
3. Geo-detected cost savings — INR/USD pricing, middleware geo cookie, SavingsTooltip (2026-02-17)
4. Cost formula overhaul — per-blog agency rate, all-time stats, removed hardcoded baseline (2026-02-17)
5. Pricing update — $99 POC / $699 Growth (launch pricing) (2026-02-17)
6. New blogs: "Post-MVP Doubt" + "Why Your MVP Costs Too Much" (2026-02-17)
7. Cost savings research doc created (2026-02-17)
8. LC dashboard improvements — sticky tabs + frozen headers, communities table with reasoning, voice fix ("the AI team" not "your AI team") (2026-02-16)
2. FTUE spotlight tour for Launch Control + live stats on pitch page (2026-02-16)
2. Team hero image + pitch page mobile layout + timeline card fixes (2026-02-16)
3. `/hire-your-24x7-team` pitch page built — 14 components, live Convex data, Pokemon stat cards, lead capture, pricing, timeline (2026-02-16)
4. NavBar updated — "Launch Control" removed, "Hire Your 24/7 Team" added (2026-02-16)
5. New blog: "Best AI Tools for Non-Technical Founders to Build MVPs" + new `ai-tools` category (2026-02-16)
6. BlogsPanel + blog-labels.ts added to Launch Control (2026-02-16)
7. ICP doc (`.context/thelaunch-space-icp.md`) created (2026-02-16)
8. Context docs audit — all 10 `.context/` files corrected against codebase (stale URLs, wrong component names, outdated statuses). AnnouncementRibbon fixed from "Coming Soon" to "Live Now" with `/launch-control` link. (2026-02-16)
2. Public preview tabs + scoreboard toggle — all 4 tabs visible to visitors with blur gate, briefs clickable, dynamic imports fix, new `getPublicBrief` Convex query (2026-02-15)
2. Partha historical data backfill complete — 605 records in production Convex (554 questions, 14 briefs, 7 blogs, 30 activity) (2026-02-15)
3. Production deployment — Clerk prod instance (5 CNAMEs), Convex prod (`curious-iguana-738`), Netlify env vars, VPS skills updated, deployed to main (2026-02-15)
2. Mobile QA — 12 files fixed for responsive layout (stacked sidebar, scrollable tabs, bottom-sheet modals, card views, capped heights) (2026-02-15)
3. Launch Control polish session — portrait masking, font size bump, waitlist CTA with hidden admin gate, tabbed center layout, brief reader markdown fix (2026-02-15)
2. Launch Control frontend dashboard — 21 new files, 4 modified files, full 3-column dashboard with agent sidebar, scoreboard, timeline, live feed, admin tabs, brief reader. Typecheck + lint + build all pass. (2026-02-15)
2. Launch Control VPS deployment — 3 SKILL.md files installed, API key stored, 50 records backfilled (13 briefs, 7 blogs, 30 questions), test push verified (2026-02-15)
2. Launch Control SKILL.md files — 3 separate skills created (convex-push-scanner, convex-push-blog, convex-push-activity), Node.js JSON escaping instead of jq (2026-02-15)
3. Launch Control Convex backend — schema, HTTP endpoints, auth, provider wiring, tested with curl (2026-02-15)
2. Announcement ribbon, pipeline redesign, `/my-ai-employees` → `/build-your-ai-team` rename (2026-02-15)
3. Client logos redesign (grayscale plates, +Vitalyf, +Classroots), nav overhaul (hamburger, pill indicators, "Build Your AI Team"), mobile UX improvements (2026-02-14)
2. AI Employees page redesign + hero copy + CTAs (WhatsApp/LinkedIn/email) + dock polish (2026-02-14)
2. Landing page "60+ projects built" credential update (2026-02-14)
3. Valmiki avatar prompt redesigned as wise sage (2026-02-14)
4. Blog index v2 redesign — removed header/footer containers, inline title row, NavBar scroll CTA (2026-02-14)
5. Blog post width widened — `max-w-[720px]` → `max-w-6xl` across all 6 posts + category page + docs (2026-02-14)
6. "Quiet Luxury" design polish — shadows, grain, typography, card elevation, hero atmosphere (2026-02-14)
4. Dark → Light mode migration — full site, 15 files, ~75 color edits (2026-02-14)
5. Added full "My AI Employees" section with agent index, detail pages, cards, data layer (2026-02-14)
6. Redesigned `/blogs` page — horizontal card layout with sticky header/footer (2026-02-14)
3. Published blog: "Can't Find a Technical Cofounder? Here's What to Do" (2026-02-14)
4. Published blog: "When No-Code Tools Stop Working (And What to Do Next)" (2026-02-14)
5. Added blog category index pages at `/blogs/[topic]/` with SEO metadata (2026-02-11)
6. Published blog: "Why Your Agency Wasted $30K on Your MVP" (2026-02-11)
3. Added NavBar, blog index page, GA4 tracking, shared blog discovery utility (2026-02-09)
2. Added robots.txt and sitemap.xml with auto-discovery (2026-02-09)
3. Published first blog post via AI agent PR workflow (2026-02-09)
4. Added `/?cta=open` query param to auto-open modal from blog CTAs (2026-02-09)
5. Wrapped LandingPage in Suspense for useSearchParams (2026-02-09)
6. Netlify config added for Next.js deployment (2026-02-08)
7. Migrated to Next.js 14 App Router (SSR, API routes, next/font)
8. Removed Supabase files, updated docs
