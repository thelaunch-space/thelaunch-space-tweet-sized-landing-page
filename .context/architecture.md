# Architecture — thelaunch.space Landing Page + Blog

Last updated: 2026-02-18 (Vidura agent, strategy pipeline, Blogs table, geo savings, 7 LC tabs, pricing update)

## Overview
Next.js 14 App Router application. Server-side rendered for SEO/crawlability. Landing page content rendered as a client component for interactivity. Blog posts are static Server Components created by an AI agent via GitHub PRs. "Build Your AI Team" section showcases 6 AI agents with index + detail pages. Webhook proxy via API route (server-side, no secrets exposed to browser). Hosted on Netlify. Google Analytics (GA4) tracking via `next/script`. **Convex** real-time database for Launch Control dashboard (agent activity, questions, briefs, blogs, topic clusters, tool opportunities, pitch bookings). **Clerk** authentication for admin access. Entire app wrapped in ConvexProviderWithClerk + ClerkProvider. **Geo-detected pricing** — middleware sets `geo_region` cookie (IN/INTL) for localized cost savings display.

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
├── blogs/startup-mvps/     # Blog topic folder (8 posts)
│   ├── how-to-find-technical-cofounder/
│   ├── why-agency-mvp-failed/
│   ├── when-no-code-tools-stop-working/
│   ├── find-technical-cofounder-alternative/
│   ├── build-mvp-without-coding-ai-tools/
│   ├── hire-developer-vs-build-with-ai/
│   ├── agency-vs-in-house-development/
│   └── why-mvp-costs-too-much-validation-first/
├── blogs/founder-advice/   # Blog topic folder (2 posts)
│   ├── validate-startup-idea-domain-expert/
│   └── post-mvp-doubt-should-you-keep-going/
├── blogs/ai-tools/         # Blog topic folder (1 post)
│   └── ai-tools-non-technical-founders-mvp/
├── build-your-ai-team/     # AI team showcase section (legacy, redirects planned to /hire-your-24x7-team)
│   ├── layout.tsx          # Section layout
│   ├── page.tsx            # Agent index page (card grid)
│   ├── parthasarathi/      # Agent detail pages (one per agent)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── sanjaya/
│   ├── valmiki/
│   ├── vibhishana/
│   ├── vidura/             # NEW — Vidura detail page
│   └── vyasa/
├── hire-your-24x7-team/
│   └── page.tsx            # Server component → <PitchPage /> (service pitch page with live Convex data)
├── launch-control/
│   └── page.tsx            # Server component — metadata + renders LaunchControlDashboard
└── tools/[tool-slug]/      # Future tool routes (placeholder)
middleware.ts               # Clerk middleware (permissive — no route blocking, makes auth available) + geo cookie (sets geo_region=IN/INTL from x-country header)
components/
├── NavBar.tsx              # "use client" — site-wide nav (hidden on /launch-control). Logo, Blog, "Hire Your 24/7 Team", socials, hamburger mobile, scroll CTA on blog pages. NO Launch Control link.
├── LandingPage.tsx         # "use client" — main landing page (hero + services)
├── AgentCard.tsx           # "use client" — agent showcase card (highlight/standard/compact sizes)
├── AgentDetailPage.tsx     # "use client" — full agent detail view (KRAs, rhythm, proof points)
├── FloatingCTA.tsx         # "use client" — scroll-triggered sticky CTA button
├── Modal.tsx               # "use client" — lead capture form
├── XIcon.tsx               # Pure SVG component
├── ui/
│   ├── dock.tsx            # "use client" — macOS-style magnification dock
│   ├── sparkles.tsx        # "use client" — tsparticles background
│   └── SavingsTooltip.tsx  # "use client" — tooltip explaining cost savings calculation rationale
├── pitch/                  # 14 components for the /hire-your-24x7-team service pitch page
│   ├── PitchPage.tsx              # Master orchestrator. Live Convex data (weeklyStats, allTimeStats, agent summaries, questions, briefs, blogs). Floating dual CTA.
│   ├── HookSection.tsx            # Above-fold hook — headline, subhead, live weekly stats from Convex, CTA
│   ├── HowItWorksSection.tsx      # 4-step "here's what happens daily" workflow in plain English
│   ├── TeamSection.tsx            # 3 Pokemon/WWE-style agent stat cards with live Convex data
│   ├── AgentStatCard.tsx          # Individual agent card — portrait, plain-English title, StatBars, skills tags, weekly summary
│   ├── StatBar.tsx                # Animated stat bar (pace/intel/saving) with in-view trigger
│   ├── TrustNudge.tsx             # Inline social proof nudge with arrow animation → links to Launch Control
│   ├── RecentWorkSection.tsx      # Tabbed section (Questions/Briefs/Blogs) showing real Convex data
│   ├── TimelineSection.tsx        # 4-week engagement timeline (Setup → Trial → Iteration → Handoff)
│   ├── PricingSection.tsx         # $200 POC + $1K Growth Partnership cards
│   ├── LeadCaptureSection.tsx     # Lead form (company, website, challenge dropdown) → Make.com + TimeSlotPicker
│   ├── TimeSlotPicker.tsx         # Inline time slot selector for booking calls
│   ├── SecondaryCtaSection.tsx    # "See the proof" → /launch-control secondary CTA
│   └── FooterTease.tsx            # "More workstreams coming" footer text
└── launch-control/         # 28 components for the Launch Control dashboard
    ├── LaunchControlDashboard.tsx  # Master orchestrator. CSS Grid 3-col. Top-level useQuery hooks
    ├── HeaderBar.tsx               # Sticky top bar: "Launch Control" title, stat pills, date, Clerk UserButton
    ├── AgentSidebar.tsx            # Left column: 5 agents with avatars, status dots, click-to-expand
    ├── AgentExpandedPanel.tsx      # Slide-out agent detail (portrait with CSS mask-image feathering, stats, schedule)
    ├── AgentAvatarStrip.tsx        # Mobile-only horizontal avatar scroll strip
    ├── StatusDot.tsx               # Animated status dot (green pulse / orange static / red blink / gray)
    ├── AdminTabs.tsx               # Admin-only tab management (when signed in)
    ├── CenterTabs.tsx              # Tabbed center: 7 tabs (Overview/Blogs/Communities/Questions/Briefs/Strategy/Meetings). Preview vs full based on auth. Tab descriptions for each.
    ├── Scoreboard.tsx              # Count-up stat cards with "This Week"/"All Time" toggle. Hero pair layout for Hours Saved + Cost Saved. Geo-detected currency (INR/USD) via useGeo + SavingsTooltip.
    ├── DailyTimeline.tsx           # Today's pipeline chronological view (11 scheduled items)
    ├── TimelineItem.tsx            # Timeline entry (completed/active/upcoming states)
    ├── LiveFeed.tsx                # Right column: real-time activity log with filter tabs (All/Tasks/Milestones) + inline feed items
    ├── CommunitiesPanel.tsx        # Subreddit card grid (admin)
    ├── CommunitiesPreview.tsx      # Placeholder community cards with blur overlay (public)
    ├── QuestionsTable.tsx          # Sortable table with frozen header/column, mobile card view (admin)
    ├── QuestionsPreview.tsx        # Top 3 rows of questions with Reddit links + blur overlay (public)
    ├── BriefsPanel.tsx             # Brief card list (admin)
    ├── BriefsPreview.tsx           # Top 3 clickable briefs + blur overlay + public reader modal (public)
    ├── PreviewGate.tsx             # Blur overlay wrapper with waitlist CTA form (shared by all preview components)
    ├── BriefCard.tsx               # Single brief card with color-coded status badge
    ├── BriefReaderModal.tsx        # Near-fullscreen modal: react-markdown content + SEO metadata sidebar
    ├── BlogsTable.tsx              # Sortable blog table (admin) — merges local BlogPost data + Convex enrichment data. Columns: Title, Category, Keyword, Words, Enrichment, Status, Published.
    ├── BlogsPreview.tsx            # Blog posts preview (public) — top rows with blur overlay
    ├── StrategyPanel.tsx           # Vidura's strategy data (admin) — topic clusters table + tool opportunities table with status/intent badges
    ├── StrategyPreview.tsx         # Strategy preview (public) — top rows with blur overlay
    ├── MeetingsPanel.tsx           # Pitch page bookings table (admin) — from pitchBookings Convex table
    ├── GuidedTour.tsx              # FTUE spotlight tour for first-time visitors (5 desktop / 4 mobile steps, localStorage tracking)
    └── WaitlistCTA.tsx             # Email input: krishna@thelaunch.space reveals Clerk auth, others → lead capture
lib/
├── agents.ts              # Agent data layer (6 agents, typed interfaces, structured for future DB migration). Includes Vidura.
├── blog.ts                # Blog discovery utility (shared by sitemap.ts + blogs/page.tsx). Server-only (uses fs).
├── blog-labels.ts         # CATEGORY_LABELS extracted for client components (no fs import). Used by BlogsTable, blog index.
├── geo-savings.ts         # Geo-detected pricing/savings config. GeoRegion (IN/INTL), calculateCostSaved, calculateHoursSaved, formatCurrency, getGeoConfig. INR rates for India, USD for international.
├── useGeo.ts              # Client hook: reads geo_region cookie set by middleware, returns GeoRegion.
├── pitch-data.ts          # Pitch page data: PITCH_AGENTS (6 agents with stat scores, skill tags), TIMELINE_STEPS, PRICING_TIERS ($99 POC/$699 Growth), CHALLENGE_OPTIONS, COUNTRY_CODES.
├── launch-control-types.ts # LC TypeScript interfaces, agent schedule data (IST times), status badge configs
├── useCountUp.ts          # Custom hook: animated count-up with requestAnimationFrame + easing
├── utils.ts               # cn() (clsx+tailwind-merge), scaleValue()
└── submit-lead.ts          # Client fetch to /api/lead
docs/
├── BLOG-AGENT-INSTRUCTIONS.md  # AI agent instructions for creating blog posts
├── BLOG-STYLE-REFERENCE.md     # Code template, design tokens for blog pages
└── BLOG-OWNER-GUIDE.md         # Human guide for PR review workflow
public/
├── agent-avatars/          # Agent avatar images used by LiveFeed (parthasarathi, sanjaya, valmiki, vibhishana, vyasa)
├── agents/                 # Agent avatar images used by AgentCard/detail pages (+ AVATAR-PROMPTS.md for generation)
└── ...                     # Static assets (logos, OG image, favicon)
convex/
├── _generated/             # Auto-generated types + API references (do not edit)
├── schema.ts               # 7 tables: questions, briefs, blogs, agentActivity, topicClusters, toolOpportunities, pitchBookings (with indexes)
├── auth.config.ts          # Clerk identity provider config for Convex
├── http.ts                 # HTTP Action router — 6+ ingestion endpoints with Bearer token auth
├── questions.ts            # ingestBatch (internal) + listRecent (public) + listFullDetails (admin)
├── briefs.ts               # ingest (internal) + listMetadata (public) + getFullBrief/listFull (admin)
├── blogs.ts                # ingest (internal) + listRecent (public) + enrichment fields (enrichmentCount, lastEnrichmentDate, enrichmentLog)
├── agentActivity.ts        # ingest (internal) + agentStatuses/recentFeed (public) + fullLog (admin)
├── topicClusters.ts        # ingest (internal) + listRecent (public) — Vidura's SEO topic clusters
└── toolOpportunities.ts    # ingest (internal) + listRecent (public) — Vidura's interactive tool proposals
skills/
├── convex-push-scanner.SKILL.md   # Vibhishana: push questions (batch) + briefs (with markdown) to Convex
├── convex-push-blog.SKILL.md      # Vyasa: push blog metadata to Convex after PR creation
├── convex-push-activity.SKILL.md  # All agents: push milestone activity to Convex
└── convex-push-strategy.SKILL.md  # Vidura: push topic clusters (Mon/Wed) + tool opportunities (Fri) to Convex
netlify.toml                # Netlify build config (npx convex deploy --cmd 'npm run build')
```

## Component Tree
```
RootLayout (Server)
├── ConvexClientProvider ("use client") — ClerkProvider + ConvexProviderWithClerk (wraps everything below)
├── AnnouncementRibbon              — Top banner (only visible on / and /hire-your-24x7-team paths)
├── NavBar ("use client")           — Logo (link to /), Blog link, "Hire Your 24/7 Team" link, X + LinkedIn icons, scroll CTA on blog pages. NO Launch Control link.
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
├── hire-your-24x7-team/page.tsx (Server)
│   └── PitchPage ("use client")
│       ├── HookSection             — Headline, subhead, live weekly stats from Convex, CTA
│       ├── HowItWorksSection       — 4-step daily workflow
│       ├── TeamSection             — 3 AgentStatCards (Pokemon-style) with live Convex data
│       │   └── AgentStatCard       — Portrait, title, StatBars, skills, weekly summary
│       ├── TrustNudge              — Social proof nudge → Launch Control
│       ├── RecentWorkSection       — Tabbed (Questions/Briefs/Blogs) live Convex data
│       ├── TimelineSection         — 4-week engagement timeline
│       ├── PricingSection          — $200 POC + $1K Growth
│       ├── LeadCaptureSection      — Form → Make.com + TimeSlotPicker
│       ├── SecondaryCtaSection     — "See the proof" → /launch-control
│       └── FooterTease             — "More workstreams coming"
└── launch-control/page.tsx (Server)
    └── LaunchControlDashboard ("use client")
        ├── HeaderBar              — Title, stat pills, date, Clerk UserButton
        ├── AgentSidebar (left)    — 5 agents, StatusDots, click → AgentExpandedPanel
        │   └── AgentAvatarStrip   — Mobile-only horizontal strip
        ├── CenterTabs (center)    — Tabbed: all 7 tabs visible to everyone (preview vs full based on auth)
        │   ├── Overview tab       — Scoreboard ("This Week"/"All Time" toggle, hero pair for Hours/Cost Saved with geo currency) + DailyTimeline
        │   ├── Blogs tab          — BlogsPreview (public) / BlogsTable (admin — sortable, merges local + Convex data)
        │   ├── Communities tab    — CommunitiesPreview (public, placeholder data) / CommunitiesPanel (admin)
        │   ├── Questions tab      — QuestionsPreview (public, top 3 rows + blur) / QuestionsTable (admin)
        │   ├── Briefs tab         — BriefsPreview (public, top 3 clickable + blur) / BriefsPanel → BriefCard → BriefReaderModal (admin)
        │   ├── Strategy tab       — StrategyPreview (public) / StrategyPanel (admin — Vidura's topic clusters + tool opportunities)
        │   └── Meetings tab       — MeetingsPanel (admin — pitch page bookings)
        ├── LiveFeed (right)       — Real-time activity feed (feed items rendered inline)
        ├── WaitlistCTA (right)    — Email gate (admin auth or lead capture)
        └── GuidedTour             — FTUE spotlight tour (non-admin first visit, 5 desktop / 4 mobile steps)
```

## NavBar
- Rendered in `app/layout.tsx`, visible on ALL pages except `/launch-control`
- Left: Logo linked to `/` (h-11 mobile, h-13 desktop) — Right: "Blog" link, "Hire Your 24/7 Team" link, X icon, LinkedIn icon
- **No "Launch Control" link** — LC is discoverable only via pitch page secondary CTA or direct URL
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

## Hire Your 24/7 Team — Service Pitch Page
- Full scrolling pitch page at `/hire-your-24x7-team` — the ICP-facing entry point
- 14 components under `components/pitch/`
- **Live Convex data:** weeklyStats, allTimeStats, agentStatuses, per-agent weeklySummary, recent questions/briefs/blogs — all pulled via `useQuery()` in PitchPage.tsx
- **Sections (in order):** HookSection (headline + live stats + CTA) → HowItWorksSection (4-step daily workflow) → TeamSection (3 Pokemon-style AgentStatCards with StatBars, portraits, skills tags, weekly summaries) → TrustNudge ("I'm my own first customer") → RecentWorkSection (tabbed Questions/Briefs/Blogs) → TrustNudge ("Not a demo") → TimelineSection (4-week engagement) → PricingSection ($200 POC + $1K Growth) → LeadCaptureSection (form + TimeSlotPicker) → SecondaryCtaSection (→ Launch Control) → FooterTease
- **Floating dual CTA:** Appears after 600px scroll — "Watch live" (→ /launch-control) + "Get your AI team" (→ #lead-capture anchor)
- **Lead capture:** Company name + website + challenge dropdown → POSTs to `/api/lead` (same Make.com webhook). TimeSlotPicker for booking.
- **Agent cards:** 4 active agents (Parthasarathi "The Manager", Vibhishana "The Scout", Vyasa "The Writer", Vidura "The Strategist") + 2 coming soon (Valmiki "The Voice", Sanjaya "The Hunter") with stat bars (pace, intelligence, monthly savings), skills tags, and "This Week" live feed from Convex
- **Data note:** Same Convex backend as Launch Control — one-time setup, always live
- Full brainstorm: `.context/hire-your-24x7-team.md`

## Build Your AI Team Section (Legacy)
- Index page at `/build-your-ai-team` — left-sticky hero + right-scrolling 2-column card grid
- Hero: "Your Brain. Your Agents. Real Output." → "Meet My AI Employees" → scaling-thinking copy → WhatsApp/LinkedIn/email CTAs
- Agent order: Parthasarathi (highlight card, full-width), then 2-col grid: Vyasa+Vibhishana, Sanjaya+Valmiki
- Card sizes: `highlight` (h-48 md:h-64), `standard` (h-40 md:h-48), `compact` (h-28 md:h-36) — controlled via `size` prop
- Pipeline visualization + bottom CTA (WhatsApp/LinkedIn/email) below card grid
- Detail pages at `/build-your-ai-team/<agent>` show full profile: KRAs, daily rhythm, proof points
- Agent data in `lib/agents.ts` — static TypeScript objects, structured for future Convex DB migration
- 6 agents: Parthasarathi (ops), Sanjaya (lead intel), Valmiki (social content), Vibhishana (research), Vyasa (SEO blog), Vidura (SEO strategy)
- Each agent has: accent color, avatar, KRAs with outcomes/frequency, daily rhythm, proof points
- `AgentCard.tsx` — highlight/standard/compact sizes, fixed image heights, accent-colored gradients, image fallback to initials
- `AgentDetailPage.tsx` — full detail view with breadcrumb, sections for KRAs/rhythm/proof
- `FloatingCTA.tsx` — appears after 600px scroll, links to external booking/contact
- NavBar includes "Build Your AI Team" link
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
| `blogs` | Vyasa's published blog metadata (+enrichment tracking) | Single via `/ingestBlog` |
| `agentActivity` | All agent milestones | Single via `/ingestActivity` |
| `topicClusters` | Vidura's SEO topic clusters (pillar→cluster mapping) | Single via `/ingestTopicCluster` |
| `toolOpportunities` | Vidura's interactive tool proposals | Single via `/ingestToolOpportunity` |
| `pitchBookings` | Lead capture from pitch page meeting form | Direct mutation |

### HTTP Ingestion Endpoints
Base URL: `https://curious-iguana-738.convex.site` (production deployment)
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
- All 4 tabs visible to ALL visitors — preview components (with blur + waitlist CTA) shown to non-authenticated users, full components shown to admin
- **Overview tab**: Scoreboard (with "This Week"/"All Time" toggle) + DailyTimeline
- **Communities tab**: CommunitiesPreview (public, placeholder data) / CommunitiesPanel (admin)
- **Questions tab**: QuestionsPreview (public, top 3 rows + blur) / QuestionsTable (admin)
- **Briefs tab**: BriefsPreview (public, top 3 clickable + blur) / BriefsPanel → click card → BriefReaderModal (admin)

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
- Convex deployments: dev `impartial-pelican-672`, production `curious-iguana-738`
