# Progress — thelaunch.space Landing Page + Blog

Last updated: 2026-02-17 (geo-detected cost savings, INR/USD pricing)

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

## In Progress
- Nothing currently in progress

## Blocked
- Nothing currently blocked

## Known Issues
- Scoreboard shows 15h / $900 with empty DB due to hardcoded baseline formula (`5*3` hours, `5*180` cost for agent overhead). Fix later by zeroing baseline or making it data-dependent.
- Daily Timeline times are hardcoded in `lib/launch-control-types.ts` — need Partha to verify they match actual VPS cron jobs.

## Recent Changes (latest first)
1. LC dashboard improvements — sticky tabs + frozen headers, communities table with reasoning, voice fix ("the AI team" not "your AI team") (2026-02-16)
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
