# Product Requirements — thelaunch.space Landing Page + Blog

Last updated: 2026-02-11

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
- Dark theme with blue/purple accents
- Google Fonts: Sora (body), Syne (headings)

### Blog System
- AI agent creates SEO-optimized blog posts via GitHub PRs
- Self-contained static pages at `/blogs/<topic>/<slug>`
- Dark theme consistent with landing page design
- Blog CTAs link to `/?cta=open` (directly opens lead capture modal)
- Human reviews and merges every post before it goes live
- Category index pages at `/blogs/<topic>/` show filtered post listings per topic
