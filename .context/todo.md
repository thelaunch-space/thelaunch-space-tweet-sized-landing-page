# Todo — thelaunch.space Landing Page + Blog

Last updated: 2026-02-09

## Priority: High
- [ ] Build out free tools pages (`/tools/[tool-slug]`)
- [x] ~~Add `robots.txt` and `sitemap.xml`~~ — done (auto-discovers blog posts from filesystem)

## Priority: Medium
- [ ] Add Vitest + React Testing Library for lead capture flow
- [ ] Add basic error boundary component
- [ ] Clean up Netlify: remove duplicate site (`thelaunch-space-v2` if still present)
- [ ] Fix branch protection: disable "require status checks" (deploy previews not configured, checks always fail)

## Priority: Low
- [ ] Add analytics tracking (Plausible, PostHog, or similar)
- [ ] Consider next/image for optimized image loading
- [ ] Add loading skeleton for particle effects init
- [ ] Consider Netlify deploy previews for PR review (currently using local preview)

## Done (moved from above)
- [x] Build out blog pages (`/blogs/[topic]/[title]`) — AI agent creates via PRs
- [x] Add `/?cta=open` deep link for blog CTAs to open modal directly
