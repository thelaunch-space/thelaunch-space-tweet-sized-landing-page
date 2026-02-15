# Progress — thelaunch.space Landing Page + Blog

Last updated: 2026-02-15

## Completed
- [x] Project scaffolding (Vite + React 18 + TS + Tailwind)
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

## In Progress
- [ ] Launch Control mobile QA + final design polish
- [ ] Clerk production instance setup (separate from dev)
- [ ] Convex production deployment

## Blocked
- Nothing currently blocked

## Recent Changes (latest first)
1. Launch Control polish session — portrait masking, font size bump, waitlist CTA with hidden admin gate, tabbed center layout, brief reader markdown fix (2026-02-15)
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
