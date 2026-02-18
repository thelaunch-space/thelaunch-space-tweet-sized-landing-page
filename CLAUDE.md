# thelaunch.space — Tweet-Sized Landing Page

Single-page landing page for thelaunch.space agency. "21 days, idea to revenue" — all content fits in the first fold, no scrolling.

## Global Context — Where This Fits

This is Krishna's storefront — where blogs land, leads convert, and eventually free tools will live. AI agents (Vibhishana + Vyasa) produce daily blog posts that get merged here via PRs. Social media posts drive traffic here. Organic search traffic is the long-term goal.

**Sibling projects** (see root [CLAUDE.md](../CLAUDE.md) for full map):
- `social-media-content-openclaw/` — Daily LinkedIn/X posts (main priority now). Drives awareness to this site.
- `agent-config-openclaw/` — Where agent behavior is designed. Agent changes affect blog quality/topics.
- `seo-mastery-openclaw/` — SEO strategy (activating soon). Will shape what keywords blogs target.
- `content-creation-openclaw/` — OpenClaw setup knowledge base. Mostly done. Future lead magnet.
- `_openclaw-business-archive/` — Old archive. Ignore, getting deleted.

## Stack
Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS 3 + Framer Motion + tsparticles

## Commands
- `npm install` — Install dependencies
- `npm run dev` — Next.js dev server (localhost:3000)
- `npm run build` — Production build to `.next/`
- `npm start` — Start production server
- `npm run lint` — ESLint (flat config, React Hooks rules)
- `npm run typecheck` — Strict `tsc --noEmit`
- `npx convex dev --once` — Push Convex functions to dev instance (generates types + deploys)

## Stale Cache Fix — CRITICAL
If the dev server renders broken (no styling, raw images, unstyled text), the `.next` cache is stale. This happens after component changes, especially new/deleted files. Fix:
```bash
# 1. Kill the dev server
lsof -ti:3000 | xargs kill -9
# 2. Delete the stale cache
rm -rf .next
# 3. Restart fresh
npm run dev
```
**Do this proactively** after creating, deleting, or renaming component files — don't wait for Krishna to report broken styling.

## Convex — CRITICAL
After ANY change to files in `convex/` (schema, mutations, queries, http routes), you MUST run `npx convex dev --once` to deploy the changes to the dev instance. Without this step, the app will crash at runtime with "Could not find public function" errors. `npx convex codegen` only generates TypeScript types — it does NOT deploy functions. Always use `npx convex dev --once` instead.

## Context Docs
Reference `.context/` files when needed:

| File | Load When |
|------|-----------|
| prd.md | Understanding requirements, adding features |
| progress.md | Checking what's done, planning next steps |
| todo.md | Picking up tasks, prioritizing work |
| integrations.md | Working with webhooks, external services |
| architecture.md | Understanding component structure, data flow |
| feedback-and-bugs.md | Logging bugs, design feedback, and issues from Krishna |
| design-system-v2.md | Brand colors, typography, shadows, AI employee character designs, NBP avatar prompts |
| hire-your-24x7-team.md | **START HERE** — Full brainstorm for `/hire-your-24x7-team` service pitch page. Pricing ($200 POC), 4-week timeline, Pokemon stat cards for agents, Launch Control hidden behind secondary CTA. |
| launch-control-frontend-spec.md | Full frontend spec for the LC dashboard (what's built and live) |
| live-dashboard-convex.md | LC backend architecture, Convex schema, build progress, agent skill files |

## Key Patterns
- **No scrolling:** All primary content must be above the fold on all devices. This is non-negotiable.
- **NavBar in layout:** `components/NavBar.tsx` renders in `app/layout.tsx` (visible on ALL pages except `/launch-control`). Uses `usePathname()` for active link pill indicators. Links: Blog, "Hire Your 24/7 Team". NO Launch Control link (LC is only reachable via pitch page secondary CTA or direct URL). Desktop: full inline nav. Mobile: hamburger menu with dropdown. The "What We Do" view has its own fixed header at z-40 that overlays it.
- **Blog index:** `app/blogs/page.tsx` (server component) auto-discovers posts via `lib/blog.ts` and lists them by category. Can scroll (unlike landing page).
- **Blog category pages:** `app/blogs/[topic]/page.tsx` (server component) filters posts by topic slug, returns 404 for unknown topics. Same card design as blog index.
- **Blog discovery:** `lib/blog.ts` exports `discoverBlogPosts()`, `getBlogCategories()`, and `CATEGORY_LABELS` — shared by `app/sitemap.ts`, `app/blogs/page.tsx`, and `app/blogs/[topic]/page.tsx`.
- **State-based routing:** Landing page views (hero, "what we do") toggle via `useState` in `components/LandingPage.tsx`. File-based routing for future pages (blogs, tools).
- **Lead capture → API route → Make.com:** Modal form POSTs to `/api/lead` (server-side route handler), which proxies to Make.com webhook. Webhook URL never reaches the browser.
- **`"use client"` components:** LandingPage, Modal, NavBar, Dock, SparklesCore all require client-side interactivity. XIcon is a pure SVG (no directive needed).

## Environment
Requires `.env.local` with:
```
WEBHOOK_URL=https://hook.us2.make.com/...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
`WEBHOOK_URL` is server-only (no `NEXT_PUBLIC_` prefix). Never commit real webhook URLs.
`NEXT_PUBLIC_GA_MEASUREMENT_ID` is client-side (GA4 gtag loaded via `next/script` in layout).

## Git
- `main` — production
- `staging` — development (current)
- `blog/*` — AI agent (OpenClaw) creates these branches for blog post PRs
- Run `lint` and `typecheck` before committing
- **Branch protection on `main`:** Requires PR + 1 approval. This exists to gate the AI blog agent's PRs (see `docs/BLOG-AGENT-INSTRUCTIONS.md`), NOT to block the owner. Use `gh pr merge --admin` to bypass when merging your own PRs.

---
IMPORTANT: After ANY code change, update relevant .context/ docs to keep this system alive and accurate.

IMPORTANT: When Krishna reports bugs, design feedback, or issues during a session, ALWAYS log them to `.context/feedback-and-bugs.md` — include the date, description, root cause (if known), fix status, and affected files. This is the living record of all feedback.

IMPORTANT: When brainstorming or making decisions with Krishna, do NOT leave open questions in docs for "next session." Use the AskUserQuestion tool to ask Krishna immediately. Only mark something as an open question if Krishna explicitly says he doesn't know the answer yet and needs to think about it.

IMPORTANT: ALWAYS use the AskUserQuestion tool to ask Krishna questions — never ask questions in plain text output. Questions in prompt output waste time because Krishna has to type a response. AskUserQuestion gives him selectable options and is faster. Provide context behind the question in your text output, then use the tool for the actual question.
