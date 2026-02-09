# Integrations — thelaunch.space Landing Page + Blog

Last updated: 2026-02-09

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
- **Fonts:** Sora (400, 600, 700), Syne (700, 800)
- **Loaded in:** `app/layout.tsx` via `next/font/google` (self-hosted, no CDN)
- **CSS variables:** `--font-sora`, `--font-syne`
- **Mapped in:** `tailwind.config.js` → `fontFamily.sans` (Sora), `fontFamily.display` (Syne)

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

## GitHub (Active)
- **Repo:** `thelaunch-space/thelaunch-space-tweet-sized-landing-page`
- **Branch protection:** `main` requires PR with 1 approval
- **Branches:** `main` (production), `staging` (development), `blog/*` (agent posts)
- **Agent token:** Fine-grained PAT with Contents + Pull Requests permissions only
