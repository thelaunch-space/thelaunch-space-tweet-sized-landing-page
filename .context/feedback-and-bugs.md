# Feedback & Bugs — thelaunch.space

Last updated: 2026-02-14

## Active Bugs

### BUG-001: Logo flashes at full size during navigation (2026-02-14)
**Status:** Fixed
**Reported:** Krishna noticed massive logos appearing when navigating between pages
**Root cause:** `<img src="/logo.png">` tags in NavBar.tsx and LandingPage.tsx had no `width`/`height` attributes. The logo PNG is ~940x788px. During client-side navigation or before Tailwind CSS hydrates, the image renders at intrinsic size momentarily.
**Fix:** Added explicit `width={168} height={56}` attributes + `max-h-14` constraint to both logo `<img>` tags. This gives the browser a layout hint so it reserves the correct space before CSS loads.
**Files:** `components/NavBar.tsx`, `components/LandingPage.tsx`

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

## Resolved Bugs
(none yet — move bugs here when fully verified in production)
