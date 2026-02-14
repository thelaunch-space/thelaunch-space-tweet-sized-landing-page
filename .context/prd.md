# Product Requirements — thelaunch.space Landing Page + Blog

Last updated: 2026-02-14

## Core Concept
"Tweet-sized" landing page — deliver the full value prop instantly, no scrolling. Reflects agency ethos: cut bureaucracy, deliver fast. Also hosts SEO-optimized blog posts for programmatic content marketing.

## Target Audience
Ambitious founders and product leaders who prioritize execution and clarity over lengthy process.

## Layout Rules (Non-Negotiable)
- All primary landing page content visible within first fold (desktop + mobile)
- No vertical scrolling required for main pitch
- Fully responsive: small phones → large desktops

## Features

### Hero Section
- Headline: "21 days. idea to revenue"
- Tagline: "We think like your cofounder, and build like your CTO"
- Social links: X (Twitter), LinkedIn in header
- CTA button: "Get Your Launch Roadmap" → opens lead capture modal

### Services Overview ("What We Do")
- Secondary view (state toggle, not new route)
- Three tiers: Landing Pages ($500), MVPs ($1.5k-4k), Retainers ($2k+/mo)
- Back navigation to hero

### Animated Client Dock
- macOS-style dock with 7 client logos
- Desktop: magnification on hover + tooltip (name + project description)
- Mobile: tap to reveal tooltip
- Tooltip rendered via React Portal (prevents clipping)

### Lead Capture Modal
- Fields: project description (min 10 chars), email OR WhatsApp (toggle)
- Submits to Make.com webhook
- Success confirmation (2s display)
- Loading state during submission
- Directly accessible from blog CTAs via `/?cta=open`

### Visual Polish
- Particle effects background (tsparticles)
- Framer Motion animations (modal, fadeIn, scaleIn, heroAppear)
- Light "Quiet Luxury" theme — off-white base, surface elevation, layered shadows, noise grain texture, blue/purple accents
- Google Fonts: Inter (body), Cormorant Garamond (headings), JetBrains Mono (labels)

### Site-Wide Navigation (NavBar)
- Rendered in root layout, visible on ALL pages
- Left: Logo linked to `/` — Right: "Blog" link, "AI Team" link, X icon, LinkedIn icon
- Active link highlighting via `usePathname()`
- Scroll-aware CTA on blog pages: "Get Your Launch Roadmap" button appears in navbar after 100px scroll (rounded-xl, matches navbar radius). On mobile, replaces social icons; on desktop, coexists.

### Blog System
- AI agent creates SEO-optimized blog posts via GitHub PRs
- Self-contained static pages at `/blogs/<topic>/<slug>`
- Blog index at `/blogs` — inline title row (no container), horizontal card rows per category, CTA in NavBar on scroll (no footer)
- Light "Quiet Luxury" theme consistent with landing page design
- Blog CTAs link to `/?cta=open` (directly opens lead capture modal)
- Human reviews and merges every post before it goes live
- Category index pages at `/blogs/<topic>/` show filtered post listings per topic

### My AI Employees Section
- Showcase page at `/my-ai-employees` presenting all 5 AI agents as a team
- 5 agents: Parthasarathi (ops), Sanjaya (lead intel), Valmiki (social), Vibhishana (research), Vyasa (SEO blog)
- Card grid with highlight/standard/compact sizing and per-agent accent colors
- Individual detail pages at `/my-ai-employees/<agent>` showing:
  - Key Responsibility Areas (KRAs) with outcomes and frequency
  - Daily rhythm / schedule
  - Proof points (stats, links, real-world catches)
- Floating CTA button appears on scroll for conversion
- Designed to sell the "AI employees" concept to potential clients
- Agent data structured in TypeScript for future database migration

### Analytics
- Google Analytics (GA4) via `next/script` in root layout
- Auto-tracks page views on all routes (landing page + blog posts + agent pages)
- Measurement ID via `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
