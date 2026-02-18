# Todo — thelaunch.space Landing Page + Blog

Last updated: 2026-02-18 (Vidura agent + strategy pipeline, geo savings, pricing update, blogs table)

## Priority: High
- [ ] **Verify Daily Timeline times** — hardcoded in `lib/launch-control-types.ts`. Ask Partha to confirm they match actual VPS cron jobs.
- [ ] **Update Vidura skill URL to production** — `skills/convex-push-strategy.SKILL.md` currently points to dev (`impartial-pelican-672`). Must change to prod (`curious-iguana-738`) before Partha deploys on VPS.
- [ ] **Deploy Vidura Convex changes to production** — `topicClusters` + `toolOpportunities` tables, HTTP endpoints, and queries need `npx convex deploy` to prod (`curious-iguana-738`). Currently only on dev.
- [ ] **Set up 301 redirects** — `/build-your-ai-team` → `/hire-your-24x7-team`, `/build-your-ai-team/[agent]` → `/hire-your-24x7-team#team`. Old agent detail pages still exist as routes but navbar no longer links to them.
- [ ] **Launch Control public view updates** — Per `hire-your-24x7-team.md` spec: show all questions openly (not just top 3), show 5 briefs in full (blur rest), show all blogs freely.
- [ ] Build out free tools pages (`/tools/[tool-slug]`) — Vidura's tool opportunities data now feeds tool ideas via Convex

## Priority: Medium
- [ ] Add Vitest + React Testing Library for lead capture flow
- [ ] Add basic error boundary component
- [ ] Clean up Netlify: remove duplicate site (`thelaunch-space-v2` if still present)
- [ ] Fix branch protection: disable "require status checks" (deploy previews not configured, checks always fail)
- [ ] Delete test brief from Convex dev (`jd7efw8gxba5hc5c3jqvmkwvs9817nw6`)

## Priority: Low
- [ ] Consider next/image for optimized image loading
- [ ] Add loading skeleton for particle effects init
- [ ] Consider Netlify deploy previews for PR review (currently using local preview)
- [ ] Regenerate Valmiki avatar using updated sage prompt (design-system-v2.md)

## Done (moved from above)
- [x] Vidura agent (6th agent) — full agent data, pitch card, detail page, avatars, Convex tables, strategy pipeline, skill file
- [x] LC: Strategy tab — StrategyPanel + StrategyPreview for Vidura's topic clusters + tool opportunities
- [x] LC: Blogs tab → sortable table (BlogsTable.tsx) with enrichment data from Convex
- [x] LC: Meetings tab — MeetingsPanel for pitch bookings
- [x] Geo-detected cost savings — INR/USD pricing, middleware geo cookie, SavingsTooltip
- [x] Cost formula overhaul — per-blog agency rate, all-time stats, removed hardcoded baseline
- [x] Pricing: $99 POC / $699 Growth (launch pricing, first 10 founders)
- [x] Scoreboard hero pair layout — Hours Saved + Cost Saved as hero cards
- [x] New blogs: "Post-MVP Doubt" + "Why Your MVP Costs Too Much"
- [x] Scoreboard baseline fixed — removed hardcoded `5*3` hours / `5*180` cost
- [x] LC: Sticky tabs + frozen headers/columns (Google Sheets-style scrolling)
- [x] LC: Communities tab rebuilt as sortable table with "Why It Was Picked" reasoning column
- [x] LC: Voice fix — "your AI team" → "the AI team" + header tagline
- [x] `/hire-your-24x7-team` pitch page — 14 components, live Convex data, Pokemon stat cards, lead capture + time slots, pricing, 4-week timeline, floating dual CTA
- [x] Launch Control FTUE spotlight tour — GuidedTour.tsx with 5 desktop / 4 mobile steps, spotlight overlay, localStorage tracking
- [x] `.context/thelaunch-space-icp.md` created — full ICP profile doc
- [x] NavBar updated — "Launch Control" removed, "Hire Your 24/7 Team" added
- [x] BlogsPanel + blog-labels.ts added to Launch Control
- [x] New blog: "Best AI Tools for Non-Technical Founders to Build MVPs" + `ai-tools` category
- [x] Team hero image added (`public/agents/team-hero.png`)
- [x] LC: Public preview tabs + scoreboard toggle
- [x] Partha historical data backfill — 605 records in production Convex
- [x] Launch Control DEPLOYED TO PRODUCTION
- [x] Launch Control mobile QA — 12 files fixed
- [x] Launch Control frontend dashboard — full 3-column dashboard
- [x] Launch Control Convex backend — schema, HTTP endpoints, Clerk auth
- [x] Launch Control SKILL.md — 3 skill files deployed on VPS
- [x] Convex schema enriched — all fields match Partha's audit
- [x] Build "My AI Employees" section — agent index + detail pages for all 5 agents
- [x] Build out blog pages (`/blogs/[topic]/[title]`) — AI agent creates via PRs
- [x] Add `/?cta=open` deep link for blog CTAs to open modal directly
- [x] Add `robots.txt` and `sitemap.xml` — done (auto-discovers blog posts from filesystem)
- [x] Add analytics tracking — GA4 via next/script
- [x] Add site-wide navigation (NavBar) with blog link
- [x] Blog index page (`/blogs`) listing all posts by category
- [x] Blog category index pages (`/blogs/[topic]/`) — dynamic route with filtered listings
