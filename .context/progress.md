# Progress — thelaunch.space Landing Page + Blog

Last updated: 2026-02-14

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

## In Progress
- Nothing currently in progress

## Blocked
- Nothing currently blocked

## Recent Changes (latest first)
1. Blog index v2 redesign — removed header/footer containers, inline title row, NavBar scroll CTA (2026-02-14)
2. Blog post width widened — `max-w-[720px]` → `max-w-6xl` across all 6 posts + category page + docs (2026-02-14)
3. "Quiet Luxury" design polish — shadows, grain, typography, card elevation, hero atmosphere (2026-02-14)
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
