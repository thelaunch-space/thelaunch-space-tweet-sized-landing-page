# Architecture — thelaunch.space Landing Page + Blog

Last updated: 2026-02-09

## Overview
Next.js 14 App Router application. Server-side rendered for SEO/crawlability. Landing page content rendered as a client component for interactivity. Blog posts are static Server Components created by an AI agent via GitHub PRs. Webhook proxy via API route (server-side, no secrets exposed to browser). Hosted on Netlify.

## File Structure
```
app/
├── layout.tsx              # Root layout (next/font, metadata API)
├── page.tsx                # Server Component → <Suspense><LandingPage /></Suspense>
├── globals.css             # Tailwind directives + custom keyframes
├── robots.ts               # robots.txt (allows all, points to sitemap)
├── sitemap.ts              # sitemap.xml (auto-discovers blog posts from filesystem)
├── api/lead/route.ts       # POST handler (proxies to Make.com webhook)
├── blogs/[topic]/[title]/  # Dynamic blog route (fallback)
│   └── page.tsx
├── blogs/startup-mvps/     # Blog topic folder
│   └── how-to-find-technical-cofounder/
│       └── page.tsx        # First published blog post (static Server Component)
└── tools/[tool-slug]/      # Future tool routes (placeholder)
components/
├── LandingPage.tsx         # "use client" — main landing page (hero + services)
├── Modal.tsx               # "use client" — lead capture form
├── XIcon.tsx               # Pure SVG component
└── ui/
    ├── dock.tsx            # "use client" — macOS-style magnification dock
    └── sparkles.tsx        # "use client" — tsparticles background
lib/
├── utils.ts               # cn() (clsx+tailwind-merge), scaleValue()
└── submit-lead.ts          # Client fetch to /api/lead
docs/
├── BLOG-AGENT-INSTRUCTIONS.md  # AI agent instructions for creating blog posts
├── BLOG-STYLE-REFERENCE.md     # Code template, design tokens for blog pages
└── BLOG-OWNER-GUIDE.md         # Human guide for PR review workflow
public/                     # Static assets (logos, OG image, favicon)
netlify.toml                # Netlify build config (@netlify/plugin-nextjs)
```

## Component Tree
```
RootLayout (Server)
├── page.tsx (Server)
│   └── Suspense
│       └── LandingPage ("use client")
│           ├── SparklesCore      — Particle effects background
│           ├── Header             — Logo, social links (X, LinkedIn)
│           ├── Hero / WhatWeDo    — State-toggled views (useState)
│           ├── Dock               — Client logos with magnification
│           │   └── Tooltip (Portal) — Rendered outside DOM tree
│           ├── CTA Button         — Opens Modal
│           └── Modal              — Lead capture form → /api/lead
└── blogs/<topic>/<slug>/page.tsx (Server)
    └── Static blog post (no "use client", self-contained)
```

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
- Dark theme: `#101018` base, blue/purple accents
- Fonts via `next/font/google` (self-hosted, CSS variables)

## Build & Deploy
- `next build` produces optimized output in `.next/`
- Landing page is statically prerendered (SSG)
- Blog pages are statically generated at build time
- API route runs server-side
- Hosted on Netlify with `@netlify/plugin-nextjs`
- Auto-deploys on merge to `main`
