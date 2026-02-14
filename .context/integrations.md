# Integrations — thelaunch.space Landing Page + Blog

Last updated: 2026-02-14

## Make.com Webhook (Active)
- **Purpose:** Lead capture → CRM pipeline
- **Client file:** `lib/submit-lead.ts` — POSTs to `/api/lead`
- **Server file:** `app/api/lead/route.ts` — proxies to Make.com webhook
- **Env var:** `WEBHOOK_URL` (server-only, in `.env.local`, no NEXT_PUBLIC_ prefix)
- **Payload:**
  ```
  {
    project_description: string
    email: string | null
    whatsapp_number: string | null
    prefer_whatsapp: boolean
  }
  ```
- **Error handling:** try-catch, console logging, user-facing error message
- **Security:** Webhook URL never reaches the browser (server-side only)

## Google Fonts (Active — Self-hosted)
- **Fonts:** Inter (400, 500, 600, 700), Cormorant Garamond (400, 500, 600, 700), JetBrains Mono (400, 500)
- **Loaded in:** `app/layout.tsx` via `next/font/google` (self-hosted, no CDN)
- **CSS variables:** `--font-sans` (Inter), `--font-display` (Cormorant Garamond), `--font-mono` (JetBrains Mono)
- **Mapped in:** `tailwind.config.js` → `fontFamily.sans` (Inter), `fontFamily.display` (Cormorant Garamond), `fontFamily.mono` (JetBrains Mono)

## Netlify (Active)
- **Purpose:** Hosting and auto-deployment
- **Config:** `netlify.toml` with `@netlify/plugin-nextjs`
- **Trigger:** Auto-deploys on merge to `main`
- **Env var on Netlify:** `WEBHOOK_URL` (same as local `.env.local`)
- **Note:** Deploy previews not currently configured; PRs reviewed locally

## OpenClaw / AI Blog Agent (Active)
- **Purpose:** Automated blog post creation via GitHub PRs
- **Model:** Claude Opus 4.5
- **Scope:** Can only create files in `app/blogs/` — no access to landing page code
- **Workflow:** Creates `blog/*` branch → opens PR → human reviews → merges
- **Config docs:** `docs/BLOG-AGENT-INSTRUCTIONS.md`, `docs/BLOG-STYLE-REFERENCE.md`
- **Standing rules:**
  - Blog CTAs must use `href="/?cta=open"` (not `/`)
  - PR revisions push to same branch (no new PRs for fixes)
  - Include YouTube video links with channel citations where relevant

## Google Analytics GA4 (Active)
- **Purpose:** Page view and engagement tracking across all pages (landing + blog)
- **Implementation:** `next/script` with `strategy="afterInteractive"` in `app/layout.tsx`
- **Env var:** `NEXT_PUBLIC_GA_MEASUREMENT_ID` (client-side, in `.env.local`)
- **Measurement ID:** `G-TQXCZMEZDQ`
- **Auto-tracks:** Page views on all route changes (including Next.js client-side navigation)
- **No extra code needed:** GA4 handles blog page tracking automatically since scripts are in root layout
- **Netlify env:** Must also set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Netlify dashboard

## GitHub (Active)
- **Repo:** `thelaunch-space/thelaunch-space-tweet-sized-landing-page`
- **Branch protection:** `main` requires PR with 1 approval
- **Branches:** `main` (production), `staging` (development), `blog/*` (agent posts)
- **Agent token:** Fine-grained PAT with Contents + Pull Requests permissions only
