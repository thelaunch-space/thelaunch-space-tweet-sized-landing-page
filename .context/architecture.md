# Architecture — thelaunch.space Landing Page + Blog

Last updated: 2026-02-15

## Overview
Next.js 14 App Router application. Server-side rendered for SEO/crawlability. Landing page content rendered as a client component for interactivity. Blog posts are static Server Components created by an AI agent via GitHub PRs. "Build Your AI Team" section showcases 5 AI agents with index + detail pages. Webhook proxy via API route (server-side, no secrets exposed to browser). Hosted on Netlify. Google Analytics (GA4) tracking via `next/script`. **Convex** real-time database for Launch Control dashboard (agent activity, questions, briefs, blogs). **Clerk** authentication for admin access. Entire app wrapped in ConvexProviderWithClerk + ClerkProvider.

## File Structure
```
app/
├── layout.tsx              # Root layout (next/font, metadata API, NavBar, AnnouncementRibbon, GA4 scripts, ConvexClientProvider wrapper)
├── ConvexClientProvider.tsx # "use client" — ClerkProvider + ConvexProviderWithClerk (wraps all children)
├── page.tsx                # Server Component → <Suspense><LandingPage /></Suspense>
├── globals.css             # Tailwind directives + custom keyframes
├── robots.ts               # robots.txt (allows all, points to sitemap)
├── sitemap.ts              # sitemap.xml (uses lib/blog.ts to auto-discover posts)
├── api/lead/route.ts       # POST handler (proxies to Make.com webhook)
├── blogs/page.tsx          # Blog index page (server component, lists all posts by category)
├── blogs/[topic]/page.tsx  # Category index page (server component, filtered by topic)
├── blogs/[topic]/[title]/  # Dynamic blog route (fallback)
│   └── page.tsx
├── blogs/startup-mvps/     # Blog topic folder (6 posts)
│   ├── how-to-find-technical-cofounder/
│   ├── why-agency-mvp-failed/
│   ├── when-no-code-tools-stop-working/
│   ├── find-technical-cofounder-alternative/
│   ├── build-mvp-without-coding-ai-tools/
│   └── hire-developer-vs-build-with-ai/
├── blogs/founder-advice/   # Blog topic folder (1 post)
│   └── validate-startup-idea-domain-expert/
├── build-your-ai-team/     # AI team showcase section (renamed from my-ai-employees)
│   ├── layout.tsx          # Section layout
│   ├── page.tsx            # Agent index page (card grid)
│   ├── parthasarathi/      # Agent detail pages (one per agent)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── sanjaya/
│   ├── valmiki/
│   ├── vibhishana/
│   └── vyasa/
├── launch-control/
│   └── page.tsx            # Server component — metadata + renders LaunchControlDashboard
└── tools/[tool-slug]/      # Future tool routes (placeholder)
middleware.ts               # Clerk middleware (permissive — no route blocking, makes auth available)
components/
├── NavBar.tsx              # "use client" — site-wide nav (hidden on /launch-control). Logo, blog, AI Team, Launch Control, socials, hamburger mobile, scroll CTA on blog pages
├── LandingPage.tsx         # "use client" — main landing page (hero + services)
├── AgentCard.tsx           # "use client" — agent showcase card (highlight/standard/compact sizes)
├── AgentDetailPage.tsx     # "use client" — full agent detail view (KRAs, rhythm, proof points)
├── FloatingCTA.tsx         # "use client" — scroll-triggered sticky CTA button
├── Modal.tsx               # "use client" — lead capture form
├── XIcon.tsx               # Pure SVG component
├── ui/
│   ├── dock.tsx            # "use client" — macOS-style magnification dock
│   └── sparkles.tsx        # "use client" — tsparticles background
└── launch-control/         # 20 components for the Launch Control dashboard
    ├── LaunchControlDashboard.tsx  # Master orchestrator. CSS Grid 3-col. Top-level useQuery hooks
    ├── HeaderBar.tsx               # Sticky top bar: "Launch Control" title, stat pills, date, Clerk UserButton
    ├── AgentSidebar.tsx            # Left column: 5 agents with avatars, status dots, click-to-expand
    ├── AgentExpandedPanel.tsx      # Slide-out agent detail (portrait with CSS mask-image feathering, stats, schedule)
    ├── AgentAvatarStrip.tsx        # Mobile-only horizontal avatar scroll strip
    ├── StatusDot.tsx               # Animated status dot (green pulse / orange static / red blink / gray)
    ├── CenterTabs.tsx              # Tabbed center: "Overview" (public) + Communities/Questions/Briefs (admin-only)
    ├── Scoreboard.tsx              # Count-up stat cards (questions/briefs/blogs/hours/cost saved)
    ├── DailyTimeline.tsx           # Today's pipeline chronological view
    ├── TimelineItem.tsx            # Timeline entry (completed/active/upcoming states)
    ├── LiveFeed.tsx                # Right column: real-time activity log with filter tabs (All/Tasks/Milestones)
    ├── FeedItem.tsx                # Single feed entry with avatar, agent name, message, timestamp
    ├── CommunitiesPanel.tsx        # Subreddit card grid (admin)
    ├── QuestionsTable.tsx          # Sortable table with frozen header/column, mobile card view (admin)
    ├── BriefsPanel.tsx             # Brief card list (admin)
    ├── BriefCard.tsx               # Single brief card with color-coded status badge
    ├── BriefReaderModal.tsx        # Near-fullscreen modal: react-markdown content + SEO metadata sidebar
    ├── WaitlistCTA.tsx             # Email input: krishna@thelaunch.space reveals Clerk auth, others → lead capture
    └── Skeleton.tsx                # Reusable skeleton loading components (SkeletonLine, SkeletonCard, SkeletonAvatar)
lib/
├── agents.ts              # Agent data layer (5 agents, typed interfaces, structured for future DB migration)
├── blog.ts                # Blog discovery utility (shared by sitemap.ts + blogs/page.tsx)
├── launch-control-types.ts # LC TypeScript interfaces, agent schedule data (IST times), status badge configs
├── useCountUp.ts          # Custom hook: animated count-up with requestAnimationFrame + easing
├── utils.ts               # cn() (clsx+tailwind-merge), scaleValue()
└── submit-lead.ts          # Client fetch to /api/lead
docs/
├── BLOG-AGENT-INSTRUCTIONS.md  # AI agent instructions for creating blog posts
├── BLOG-STYLE-REFERENCE.md     # Code template, design tokens for blog pages
└── BLOG-OWNER-GUIDE.md         # Human guide for PR review workflow
public/
├── agents/                 # Agent avatar images (+ AVATAR-PROMPTS.md for generation)
└── ...                     # Static assets (logos, OG image, favicon)
convex/
├── _generated/             # Auto-generated types + API references (do not edit)
├── schema.ts               # 4 tables: questions, briefs, blogs, agentActivity (with indexes)
├── auth.config.ts          # Clerk identity provider config for Convex
├── http.ts                 # HTTP Action router — 4 ingestion endpoints with Bearer token auth
├── questions.ts            # ingestBatch (internal) + listRecent (public) + listFullDetails (admin)
├── briefs.ts               # ingest (internal) + listMetadata (public) + getFullBrief/listFull (admin)
├── blogs.ts                # ingest (internal) + listRecent (public)
└── agentActivity.ts        # ingest (internal) + agentStatuses/recentFeed (public) + fullLog (admin)
skills/
├── convex-push-scanner.SKILL.md  # Vibhishana: push questions (batch) + briefs (with markdown) to Convex
├── convex-push-blog.SKILL.md     # Vyasa: push blog metadata to Convex after PR creation
└── convex-push-activity.SKILL.md # All agents: push milestone activity to Convex
netlify.toml                # Netlify build config (npx convex deploy --cmd 'npm run build')
```

## Component Tree
```
RootLayout (Server)
├── ConvexClientProvider ("use client") — ClerkProvider + ConvexProviderWithClerk (wraps everything below)
├── AnnouncementRibbon              — Top banner
├── NavBar ("use client")           — Logo (link to /), Blog link, AI Team link, X + LinkedIn icons, scroll CTA on blog pages
├── page.tsx (Server)
│   └── Suspense
│       └── LandingPage ("use client")
│           ├── SparklesCore      — Particle effects background
│           ├── Hero / WhatWeDo    — State-toggled views (useState)
│           ├── Client Logos        — Inline grayscale plates (horizontal scroll on mobile, single row on desktop)
│           │   └── Hover tooltip   — Brand name label below tile
│           ├── CTA Button         — Opens Modal
│           └── Modal              — Lead capture form → /api/lead
├── blogs/page.tsx (Server)       — Blog index (lists posts by category)
├── blogs/<topic>/page.tsx (Server) — Category index (filtered by topic, 404 if empty)
├── blogs/<topic>/<slug>/page.tsx (Server)
│   └── Static blog post (no "use client", self-contained)
├── build-your-ai-team/page.tsx (Server)
│   └── AgentCard ("use client")   — Card grid for all 5 agents
├── build-your-ai-team/<agent>/page.tsx (Server)
│   ├── AgentDetailPage ("use client") — Full agent profile (KRAs, rhythm, proof)
│   └── FloatingCTA ("use client")     — Scroll-triggered sticky CTA
└── launch-control/page.tsx (Server)
    └── LaunchControlDashboard ("use client")
        ├── HeaderBar              — Title, stat pills, date, Clerk UserButton
        ├── AgentSidebar (left)    — 5 agents, StatusDots, click → AgentExpandedPanel
        │   └── AgentAvatarStrip   — Mobile-only horizontal strip
        ├── CenterTabs (center)    — Tabbed: Overview (public) + admin tabs (auth-gated)
        │   ├── Overview tab       — Scoreboard + DailyTimeline (always visible)
        │   ├── Communities tab    — CommunitiesPanel (admin only)
        │   ├── Questions tab      — QuestionsTable (admin only)
        │   └── Briefs tab         — BriefsPanel → BriefCard → BriefReaderModal (admin only)
        ├── LiveFeed (right)       — Real-time activity feed, FeedItems
        └── WaitlistCTA (right)    — Email gate (admin auth or lead capture)
```

## NavBar
- Rendered in `app/layout.tsx`, visible on ALL pages
- Left: Logo linked to `/` (h-14 mobile, h-16 desktop) — Right: "Blog" link, "Build Your AI Team" link, X icon, LinkedIn icon
- Active link indicators: subtle blue pill background (`bg-accent-blue/[0.07]`) on current page link, hover shows faint tint
- Desktop: full nav inline — Mobile: hamburger menu (Menu/X icons from lucide), dropdown with links + socials
- Dropdown closes on route change or click outside (useRef + mousedown listener)
- Scroll-aware CTA on blog pages: when on `/blogs/*` and scrolled >100px, a "Get Your Launch Roadmap" button appears in the navbar. Uses `useState` + `useEffect` with `window.scrollY`.
- The "What We Do" view in LandingPage has its own fixed header (z-40) that overlays the NavBar

## Data Flow
1. User fills Modal form → client-side validation
2. `submitLead()` POSTs to `/api/lead` (Next.js API route)
3. API route proxies to Make.com webhook (server-side, URL never exposed)
4. Make.com processes lead (external)
5. Modal shows success/error state

## CTA Deep Link
- `/?cta=open` query param auto-opens the lead capture modal
- Implemented via `useSearchParams()` + `useEffect` in LandingPage.tsx
- Requires `<Suspense>` wrapper in `app/page.tsx` (Next.js 14 static generation requirement)
- Blog post CTAs use `href="/?cta=open"` to skip the redundant homepage click

## Blog System
- AI agent (OpenClaw, Opus 4.5) creates blog posts as self-contained `page.tsx` files
- Each post lives at `app/blogs/<topic>/<slug>/page.tsx` (Server Component)
- Agent creates `blog/*` branches and opens PRs for human review
- Owner reviews locally (`npm run dev`) or on GitHub, then merges to `main`
- Netlify auto-deploys on merge
- `lib/blog.ts` provides `discoverBlogPosts()`, `getBlogCategories()`, and `CATEGORY_LABELS` — shared by sitemap, blog index, and category pages
- Blog index at `/blogs` auto-discovers and lists all posts — inline title row (no container), horizontal card rows per category, CTA in NavBar on scroll (no footer)
- Category index at `/blogs/[topic]/` filters posts by topic slug, returns 404 for empty/unknown topics

## AI Employees Section
- Index page at `/my-ai-employees` — left-sticky hero + right-scrolling 2-column card grid
- Hero: "Your Brain. Your Agents. Real Output." → "Meet My AI Employees" → scaling-thinking copy → WhatsApp/LinkedIn/email CTAs
- Agent order: Parthasarathi (highlight card, full-width), then 2-col grid: Vyasa+Vibhishana, Sanjaya+Valmiki
- Card sizes: `highlight` (h-48 md:h-64), `standard` (h-40 md:h-48), `compact` (h-28 md:h-36) — controlled via `size` prop
- Pipeline visualization + bottom CTA (WhatsApp/LinkedIn/email) below card grid
- Detail pages at `/my-ai-employees/<agent>` show full profile: KRAs, daily rhythm, proof points
- Agent data in `lib/agents.ts` — static TypeScript objects, structured for future Convex DB migration
- 5 agents: Parthasarathi (ops), Sanjaya (lead intel), Valmiki (social content), Vibhishana (research), Vyasa (SEO blog)
- Each agent has: accent color, avatar, KRAs with outcomes/frequency, daily rhythm, proof points
- `AgentCard.tsx` — highlight/standard/compact sizes, fixed image heights, accent-colored gradients, image fallback to initials
- `AgentDetailPage.tsx` — full detail view with breadcrumb, sections for KRAs/rhythm/proof
- `FloatingCTA.tsx` — appears after 600px scroll, links to external booking/contact
- NavBar includes "My AI Employees" link
- Sitemap includes agent pages

## Google Analytics (GA4)
- Measurement ID stored in `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
- gtag.js loaded via `next/script` with `strategy="afterInteractive"` in layout.tsx
- Auto-tracks page views on all route changes (no extra code needed)

## Convex Backend (Launch Control)

### Database Tables (Convex)
| Table | Purpose | Ingestion |
|-------|---------|-----------|
| `questions` | Vibhishana's Reddit scans | Batch via `/ingestQuestions` |
| `briefs` | Vibhishana's research briefs | Single via `/ingestBrief` |
| `blogs` | Vyasa's published blog metadata | Single via `/ingestBlog` |
| `agentActivity` | All agent milestones | Single via `/ingestActivity` |

### HTTP Ingestion Endpoints
Base URL: `https://impartial-pelican-672.convex.site` (dev deployment)
- All 4 POST endpoints require `Authorization: Bearer <AGENT_API_KEY>`
- AGENT_API_KEY stored in Convex env vars (server-side only)
- CORS preflight (OPTIONS) handled for all endpoints
- `/ingestQuestions` accepts array OR single object (normalizes to array)

### Query Functions
- **Public (no auth):** `questions.listRecent`, `briefs.listMetadata`, `blogs.listRecent`, `agentActivity.agentStatuses`, `agentActivity.recentFeed`, `agentActivity.weeklyStats`, `agentActivity.allTimeStats`, `agentActivity.agentTodayActivity`, `agentActivity.agentWeeklySummary`
- **Admin (auth required):** `questions.listFullDetails`, `questions.communityBreakdown`, `briefs.getFullBrief`, `briefs.listFull`, `agentActivity.fullLog`
- Admin queries check `ctx.auth.getUserIdentity()` — throw if not authenticated

### Auth
- **Provider:** Clerk (ClerkProvider wraps ConvexProviderWithClerk)
- **Middleware:** `middleware.ts` at project root — permissive `clerkMiddleware()`, does not block any route
- **Convex auth config:** `convex/auth.config.ts` — Clerk issuer domain from env var
- **No route protection:** All existing pages work without login. Admin queries enforce auth at the function level.

### Data Flow (Agent → Dashboard)
```
Agent on VPS → curl POST to Convex HTTP Action → validates Bearer token → internalMutation → writes to DB → Convex WebSocket pushes to subscribed frontends → instant UI update
```

### Dev Workflow
```
Terminal 1: npx convex dev    (watches convex/ files, syncs to dev deployment)
Terminal 2: npm run dev       (Next.js dev server at localhost:3000)
```

## Launch Control Frontend Dashboard

### Layout
- **Desktop (>=1024px):** CSS Grid `grid-cols-[240px_1fr_320px]` — sidebar / center / feed
- **Tablet (768-1023px):** `grid-cols-[200px_1fr]` — feed drops below center
- **Mobile (<768px):** Single column, sidebar becomes horizontal avatar strip
- NavBar hidden on `/launch-control` — self-contained HeaderBar instead

### Auth Flow (Waitlist Hack)
- No public "Sign In" button anywhere. WaitlistCTA replaces it.
- WaitlistCTA shows an email input labeled "Join the waitlist"
- If email === `krishna@thelaunch.space` → reveals Clerk SignInButton + SignUpButton
- Any other email → POSTs to `/api/lead` (same Make.com webhook as main lead capture) → "You're on the list!"
- When signed in, WaitlistCTA returns `null` (disappears). Clerk UserButton shows in HeaderBar.
- Admin tabs (Communities/Questions/Briefs) in CenterTabs only appear when `isSignedIn` is true.

### Center Column Tabs
- `CenterTabs.tsx` manages a tabbed interface in the center column
- **Overview tab** (always visible): Scoreboard + DailyTimeline
- **Communities tab** (admin only): CommunitiesPanel
- **Questions tab** (admin only): QuestionsTable
- **Briefs tab** (admin only): BriefsPanel → click card → BriefReaderModal

### Brief Reader Modal
- Near-fullscreen (~90vh × 1200px max-width)
- Left (~70%): `react-markdown` + `remark-gfm` renders `brief.contentMarkdown` with custom Tailwind component mapping
- Right (~30%): SEO metadata sidebar (keywords as pills, ICP problem, competitive gap, angles, source URLs)
- **Important:** react-markdown v10 requires content as children: `<ReactMarkdown>{content}</ReactMarkdown>` (not self-closing)

### Real-time Updates
- All dashboard data uses `useQuery()` from `convex/react` — creates WebSocket subscriptions
- When agents push data via HTTP endpoints, Convex WebSocket pushes to all subscribed frontends instantly
- LiveFeed shows real-time activity log with animated entry transitions (Framer Motion)

### Packages
- `react-markdown` — renders brief contentMarkdown in BriefReaderModal
- `remark-gfm` — GitHub-flavored markdown (tables, strikethrough) in briefs

## State Management
- `useState` only — no global state, no context
- `showWhatWeDo` — toggles hero vs services view
- `isModalOpen` — toggles lead capture modal (also triggered by `?cta=open`)
- Modal manages its own form state internally

## Styling
- Tailwind utility-first with custom theme
- Framer Motion for animations
- CSS keyframes for hero animations (fadeIn, scaleIn, heroAppear)
- `clamp()` for fluid typography
- "Quiet Luxury" light theme: off-white `#FAFBFC` base, surface tokens (`#FFFFFF` cards, `#F8FAFD` alt), layered shadow system (card/nav/cta), noise grain texture overlay, blue/purple accents preserved
- Fonts via `next/font/google` (self-hosted, CSS variables)

## Build & Deploy
- Build command: `npx convex deploy --cmd 'npm run build'` (pushes Convex functions then builds Next.js)
- `next build` produces optimized output in `.next/`
- Landing page is statically prerendered (SSG)
- Blog pages are statically generated at build time
- API route + Clerk middleware run server-side
- Hosted on Netlify with `@netlify/plugin-nextjs`
- Auto-deploys on merge to `main`
- Convex dev deployment: `impartial-pelican-672` (production deployment TBD)
