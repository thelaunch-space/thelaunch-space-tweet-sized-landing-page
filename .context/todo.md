# Todo — thelaunch.space Landing Page + Blog

Last updated: 2026-02-15

## Priority: High
- [ ] **Verify Daily Timeline times** — hardcoded in `lib/launch-control-types.ts`. Ask Partha to confirm they match actual VPS cron jobs.
- [ ] **Fix Scoreboard baseline** — remove hardcoded `5*3` hours / `5*180` cost, zero out or make data-dependent
- [ ] Build out free tools pages (`/tools/[tool-slug]`)

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
- [x] LC: Public preview tabs + scoreboard toggle — all 4 tabs visible to visitors, top 3 rows + blur + waitlist CTA, briefs clickable (public reader modal), dynamic imports, new `getPublicBrief` query deployed to prod
- [x] Partha historical data backfill — 605 records in production Convex (554 questions, 14 briefs, 7 blogs, 30 activity)
- [x] Launch Control DEPLOYED TO PRODUCTION — Clerk prod, Convex prod (`curious-iguana-738`), Netlify env vars, VPS skills updated, PR #19 merged
- [x] Launch Control mobile QA — 12 files fixed (responsive stacking, scrollable tabs, bottom-sheet modals, card views, capped heights)
- [x] Launch Control frontend dashboard — full 3-column dashboard, 23 new files, tabbed center, waitlist CTA, brief reader
- [x] Launch Control polish — portrait masking, font size bump, waitlist CTA with hidden admin gate, center tabs, markdown fix
- [x] Launch Control Convex backend — schema, HTTP endpoints, Clerk auth, provider wiring, curl-tested
- [x] Launch Control SKILL.md — 3 separate skill files (scanner, blog, activity) created and deployed on VPS
- [x] Convex schema enriched — all 12 scanner fields, all 14 blog-queue columns (matches Partha's full audit)
- [x] Build "My AI Employees" section — agent index + detail pages for all 5 agents
- [x] Build out blog pages (`/blogs/[topic]/[title]`) — AI agent creates via PRs
- [x] Add `/?cta=open` deep link for blog CTAs to open modal directly
- [x] Add `robots.txt` and `sitemap.xml` — done (auto-discovers blog posts from filesystem)
- [x] Add analytics tracking — GA4 via next/script (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- [x] Add site-wide navigation (NavBar) with blog link
- [x] Blog index page (`/blogs`) listing all posts by category
- [x] Blog category index pages (`/blogs/[topic]/`) — dynamic route with filtered listings
