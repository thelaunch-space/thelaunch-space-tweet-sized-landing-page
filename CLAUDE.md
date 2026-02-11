# thelaunch.space — Tweet-Sized Landing Page

Single-page landing page for thelaunch.space agency. "21 days, idea to revenue" — all content fits in the first fold, no scrolling.

## Stack
Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS 3 + Framer Motion + tsparticles

## Commands
- `npm install` — Install dependencies
- `npm run dev` — Next.js dev server (localhost:3000)
- `npm run build` — Production build to `.next/`
- `npm start` — Start production server
- `npm run lint` — ESLint (flat config, React Hooks rules)
- `npm run typecheck` — Strict `tsc --noEmit`

## Context Docs
Reference `.context/` files when needed:

| File | Load When |
|------|-----------|
| prd.md | Understanding requirements, adding features |
| progress.md | Checking what's done, planning next steps |
| todo.md | Picking up tasks, prioritizing work |
| integrations.md | Working with webhooks, external services |
| architecture.md | Understanding component structure, data flow |

## Key Patterns
- **No scrolling:** All primary content must be above the fold on all devices. This is non-negotiable.
- **NavBar in layout:** `components/NavBar.tsx` renders in `app/layout.tsx` (visible on ALL pages). Uses `usePathname()` for active link highlighting. The "What We Do" view has its own fixed header at z-40 that overlays it.
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
