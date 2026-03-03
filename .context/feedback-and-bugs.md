# Feedback & Bugs — thelaunch.space

Last updated: 2026-03-03

## Active Bugs

### BUG-007: Kanban card modals cut off dismiss/close on mobile (2026-03-03)
**Status:** Fixed (2026-03-03)
**Reported:** On mobile, tapping a Kanban card title opens a bottom-sheet modal. The sheet was taking up the full viewport height, pushing the header (with X button) and footer (with Close/Save) off-screen. Multiple height-reduction attempts (`max-h-[75dvh]`, `max-h-[70dvh]`) didn't reliably fix across all phones.
**Root cause:** Bottom-sheet modal content (especially PostBriefModal with long draft text + hook/CTA pickers) can exceed `80dvh` on small-screen devices. The `overflow-y-auto` on the body scrolls content, but header/footer are inside the sheet so they scroll too on short devices.
**Fix:** Added a `fixed bottom-3 left-1/2 -translate-x-1/2 z-[60] sm:hidden` "dismiss" pill button to all 3 modals (`BriefReaderModal`, `PostBriefModal`, `TaskDetailModal`). It sits outside the modal sheet div, always pinned to the viewport bottom, unreachable by the sheet's overflow.
**Affected files:** `components/launch-control/BriefReaderModal.tsx`, `components/launch-control/PostBriefModal.tsx`, `components/launch-control/TaskDetailModal.tsx`

### BUG-006: Netlify Durable Cache serving stale HTML after deploys (2026-02-26)
**Status:** Fixed (2026-02-27)
**Reported:** After every deploy, some pages (mainly blog pages) served old HTML referencing outdated CSS/JS chunk hashes → 404 on static assets → broken styling site-wide. Fresh browsers / incognito affected. Home page worked fine.
**Root cause:** Netlify has two cache layers. Netlify Edge CDN auto-purges on deploy. Netlify Durable Cache does NOT — it has a ~364-day TTL. `@netlify/plugin-nextjs` stores pre-rendered HTML in Durable Cache. The plugin's `onSuccess` hook only prewarms the root URL `/` after deploy, leaving all blog pages with stale 364-day-old Durable Cache entries. Issue surfaced reliably after `generateBuildId` with `COMMIT_REF` was added — making buildId mismatches obvious (commit SHA vs. old random ID).
**Fix:** (1) `netlify.toml`: added `Netlify-CDN-Cache-Control: no-store` on `/*` to prevent HTML responses from being stored in Durable Cache. Added `Netlify-CDN-Cache-Control: durable, max-age=31536000, immutable` on `/_next/static/*` to keep static asset caching. (2) `app/api/deploy-hook/route.ts`: new POST endpoint that calls Netlify purge API to clear all Durable Cache entries. (3) Ran one-time purge curl command to clear existing stale entries.
**Full incident doc:** `.context/netlify-caching-incident.md` — root cause, all failed attempts, fix details, Step 3 automation setup.
**Affected files:** `netlify.toml`, `app/api/deploy-hook/route.ts`

## Active Bugs (pre-existing)

### BUG-003: `/admin` shows sign-up option — should be sign-in only (2026-02-25)
**Status:** Open (logged for next session)
**Reported:** Krishna noticed Clerk's `<SignIn>` component at `/admin` still shows a "Sign up" link. Two problems: (1) sign-up should be disabled — only Krishna should be able to log in. (2) If someone does sign up, they'd see the full admin dashboard (Documents, Meetings tabs). Admin view must be gated to `krishna@thelaunch.space` only.
**Fix needed:** Either disable Clerk sign-up entirely (Clerk dashboard setting), or add an admin email check in the dashboard code. Non-Krishna accounts should see a "request access" message, not the admin tabs.
**Affected files:** `app/admin/page.tsx`, `components/launch-control/CenterTabs.tsx`

### BUG-004: Clerk middleware crashed entire site on Netlify (2026-02-25)
**Status:** Fixed
**Reported:** `thelaunch.space` showed "@clerk/nextjs: Missing secretKey" error on every page (including homepage, blogs).
**Root cause:** `clerkMiddleware()` was added to `middleware.ts` on Feb 15 as part of Launch Control backend setup. It wrapped every request but did zero auth checks — the middleware only sets a geo cookie. Netlify edge functions can't reliably access `CLERK_SECRET_KEY` at runtime, so Clerk panicked and blocked the entire site. The error surfaced now because previous builds had been failing due to a separate Convex deploy key issue (BUG-005), so the old pre-Clerk code was still running. Once the build was fixed, the Clerk middleware deployed for the first time and broke everything.
**Fix:** Removed `clerkMiddleware()` from `middleware.ts` entirely. Middleware now uses plain Next.js middleware for the geo cookie. Clerk auth works client-side via ClerkProvider — doesn't need middleware.
**Lesson:** NEVER add Clerk to middleware.ts in this project. See CLAUDE.md for the permanent warning.

### BUG-005: Netlify deploy preview builds failing since Feb 15 (2026-02-25)
**Status:** Fixed
**Root cause:** `netlify.toml` had a single build command (`npx convex deploy --cmd 'npm run build'`) that ran for ALL builds. Deploy previews (PR builds) had the production `CONVEX_DEPLOY_KEY` in env vars, and Convex refused to deploy to production from a non-production context. The entire build failed, including the Next.js part.
**Fix:** Split `netlify.toml` by context — production runs `npx convex deploy --cmd 'npm run build'`, deploy previews and branch deploys run `npm run build` only (no Convex deploy).

### (BUG-001 and BUG-002 moved to Resolved Bugs section below)

## Design Feedback

### FB-001: Dark mode felt flat, switched to light mode (2026-02-14)
**Context:** Blogs and other pages didn't look good on dark mode. Krishna wanted a premium white background.
**Action:** Full dark→light mode migration across all pages. Updated tailwind.config.js color tokens + hardcoded values in ~15 files.

### FB-002: Light mode lacked "taste" — felt flat and purposeless (2026-02-14)
**Context:** After light mode switch, everything felt like "constructs" rather than intentional design. No depth, no texture, no visual rhythm.
**Action:** Applied "Quiet Luxury" design polish — off-white base (#FAFBFC), noise grain texture, layered shadow system, typography refinements (letter-spacing), card elevation, CTA glass effects, scroll-aware NavBar shadow, hero radial gradient atmosphere.

### BUG-002: AI Employees page shows blank/empty (2026-02-14)
**Status:** Fixed
**Reported:** Krishna saw a completely empty page when navigating to `/my-ai-employees`
**Root cause:** Stale `.next` dev server cache. After many file edits, the JS chunks (`app-pages-internals.js`, `main-app.js`, `page.js`) were returning 404s. The HTML rendered server-side (200 status) but client JS never loaded, so framer-motion's `initial={{ opacity: 0 }}` animations never resolved — everything stayed invisible.
**Fix:** Cleared `.next` cache (`rm -rf .next`) and restarted dev server. Not a code bug — a dev environment caching issue.
**Note:** This recurs frequently after heavy multi-file edits. If pages go blank, first try clearing `.next` and restarting. This has happened multiple times across sessions — it's a dev environment issue, not a code bug.
**Recurrence:** 2026-02-14 — happened again during landing page redesign session (CTA + layout spacing edits). Same symptoms: page appears blank, JS chunks 404.
**Recurrence:** 2026-02-14 — happened again during floating slab header changes while a parallel Claude Code instance was editing AI employees page. Error: `TypeError: __webpack_modules__[moduleId] is not a function`. Same root cause — `.next` cache corruption from concurrent file edits.
**Recurrence:** 2026-02-14 — happened again during blog index redesign + blog post width changes. Giant logo rendered (NavBar logo at native size without CSS). Fixed with `Cmd+Shift+R` hard refresh. AI employees page also went blank during same session — fixed by killing and restarting dev server.
**ACTION FOR ALL CLAUDE CODE SESSIONS:** After ANY multi-file edit session or layout/CSS changes, remind Krishna to hard refresh (`Cmd+Shift+R`). If that doesn't work, kill dev server and restart `npm run dev`. Don't wait for the bug report.

### FB-003: Blog page had too many repetitive rounded containers (2026-02-14)
**Context:** Three stacked rounded rectangle containers (navbar, blog header, footer CTA) looked repetitive. CTA button was too rounded (rounded-full didn't match navbar's rounded-xl/2xl).
**Action:** Removed blog header container (title is now inline in content area). Removed fixed footer CTA. Moved CTA into NavBar on scroll (appears after 100px, rounded-xl to match navbar). Blog post width widened from `max-w-[720px]` to `max-w-6xl` to match index page width.
**Files:** `components/NavBar.tsx`, `app/blogs/page.tsx`, all 6 blog post pages, `app/blogs/[topic]/page.tsx`, `docs/BLOG-STYLE-REFERENCE.md`

### FB-004: Blog post content too narrow — squeezed in the middle (2026-02-14)
**Context:** Blog posts used `max-w-[720px]` which left massive side margins on wide screens.
**Action:** Changed to `max-w-6xl` (1152px) across all posts + category page + style reference doc. Agent instruction also updated (sent to Partha).

### FB-005: AI Employees page bento grid was "too tall and weird" (2026-02-14)
**Context:** Attempted a 12-column CSS Grid bento mosaic layout with tilted cards and variant sizing. Krishna found it over-engineered and visually broken.
**Action:** Reverted to left-sticky hero + right-scrolling cards. Then iterated: single-column cards were too wide → switched to 2-column grid. Partha gets highlight (full-width), others in pairs.
**Lesson:** Don't over-design. Simple layouts with intentional hierarchy beat fancy grids.

### FB-006: Cards too wide in single-column layout (2026-02-14)
**Context:** After reverting from bento, cards stacked in a single column were too wide/short with landscape aspect ratios.
**Action:** Changed to 2-col grid for standard cards. Switched portrait back to taller ratio (`aspect-[3/4]`). Then moved to fixed-height approach (`h-40 md:h-48`) for more control.

### FB-007: Hero body copy too long, felt like filler (2026-02-14)
**Context:** Original copy was 3 disconnected lines of text occupying space without communicating. No visual emphasis.
**Action:** Rewrote as one connected thought with bold/italic on key phrases: "Scaling **how you think**" (problem), "*my*" thinking (proof), "**I'll help you build yours.**" (offer). Shortened overall.

### FB-008: Client dock logos too faint on light background (2026-02-14)
**Context:** Dock container used `bg-surface/80` with `border-color/40`, logos were `grayscale opacity-60`. Everything blended into the off-white background.
**Action:** Removed grayscale filter entirely. Full-color logos at all times. Strengthened border to full `border-color`, shadow to `shadow-card-hover`. Added `overflow-hidden` to fix corner bleed on logos with sharp corners.

### FB-009: Dock logo corners bleeding through rounded container (2026-02-14)
**Context:** Some logos (especially dark ones) had visible sharp corners inside the rounded dock item containers.
**Action:** Removed `p-1.5` padding from icon anchor (image now fills edge-to-edge). Added `overflow-hidden` so container clips image to rounded corners. Removed `rounded-[inherit]` from img since parent handles clipping.

## Resolved Bugs

### BUG-001: Logo flashes at full size during navigation (2026-02-14)
**Resolved:** Fixed by adding explicit `width`/`height` attributes to `<img>` tags in NavBar.tsx and LandingPage.tsx.

### BUG-002: AI Employees page shows blank/empty (2026-02-14)
**Resolved:** Stale `.next` dev server cache issue. Not a code bug — cleared cache and restarted dev server. Recurred multiple times during heavy edit sessions. Standard fix: `Cmd+Shift+R` or restart `npm run dev`.
