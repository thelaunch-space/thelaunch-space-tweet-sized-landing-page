# Integrations — thelaunch.space Landing Page + Blog

Last updated: 2026-02-15

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

## Convex (Active — Launch Control Backend)
- **Purpose:** Real-time database for Launch Control dashboard — stores agent activity, scanned questions, briefs, blog metadata
- **Deployment:** `impartial-pelican-672` (dev). Production deployment TBD.
- **Client URL:** `https://impartial-pelican-672.convex.cloud`
- **HTTP Actions URL:** `https://impartial-pelican-672.convex.site`
- **Env vars (`.env.local`):** `NEXT_PUBLIC_CONVEX_URL`, `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_SITE_URL`, `CONVEX_DEPLOY_KEY`
- **Env vars (Convex Dashboard):** `AGENT_API_KEY` (shared secret for HTTP endpoint auth), `CLERK_ISSUER_URL` (Clerk identity provider)
- **Schema:** 4 tables (questions, briefs, blogs, agentActivity) with 11 indexes
- **HTTP Endpoints:** 4 POST routes (`/ingestQuestions`, `/ingestBrief`, `/ingestBlog`, `/ingestActivity`) — all require Bearer token auth
- **Queries:** Public (no auth needed) for read-only dashboard data; Admin (Clerk auth required) for full brief content + activity logs
- **Frontend wiring:** `app/ConvexClientProvider.tsx` wraps entire app in ClerkProvider + ConvexProviderWithClerk
- **Build:** `npx convex deploy --cmd 'npm run build'` — pushes Convex functions before Next.js build
- **Real-time:** `useQuery()` creates WebSocket subscriptions, instant frontend updates when agents push data
- **Netlify env vars needed for production:** `NEXT_PUBLIC_CONVEX_URL`, `CONVEX_DEPLOY_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

## Clerk (Active — Authentication)
- **Purpose:** Authentication for Launch Control admin features (Krishna's login only)
- **Instance (dev):** `famous-krill-26.clerk.accounts.dev` — separate from production instance (TBD)
- **Env vars (`.env.local`):** `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- **Middleware:** `middleware.ts` at project root — permissive `clerkMiddleware()`, does NOT block any route
- **Integration with Convex:** `ConvexProviderWithClerk` passes Clerk auth tokens to Convex for admin query validation
- **Admin queries:** Check `ctx.auth.getUserIdentity()` in Convex — throw if not authenticated
- **No route protection:** All existing pages work without login. Auth is only checked inside admin query functions.
- **Waitlist gate (UI hack):** No public "Sign in" button. `WaitlistCTA.tsx` shows email input; only `krishna@thelaunch.space` reveals Clerk SignIn/SignUp. Other emails captured as leads via `/api/lead`. This avoids Clerk Pro ($25/mo) allowlist requirement.
- **Dev vs Prod:** Dev and prod are separate Clerk instances with separate user databases. Dev uses `pk_test_`/`sk_test_` keys, prod needs `pk_live_`/`sk_live_` keys. Must create prod instance and re-register when deploying.

## GitHub (Active)
- **Repo:** `thelaunch-space/thelaunch-space-tweet-sized-landing-page`
- **Branch protection:** `main` requires PR with 1 approval
- **Branches:** `main` (production), `staging` (development), `blog/*` (agent posts)
- **Agent token:** Fine-grained PAT with Contents + Pull Requests permissions only
