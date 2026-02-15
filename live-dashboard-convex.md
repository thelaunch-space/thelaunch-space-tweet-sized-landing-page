# Launch Control — Live Agent Dashboard

Status: BUILDING — Backend done, skills done, frontend next
Created: 2026-02-14
Updated: 2026-02-15
Reviewed by: Partha (confirmed technically sound, no blockers + schema audit on Feb 15)
Source: Krishna + Partha Slack brainstorm + Claude Code research

---

## The Name: Launch Control

**URL:** `thelaunch.space/launch-control`

Why Launch Control:
- "Launch" ties to the brand (thelaunch.space)
- Globally understood — NASA/space metaphor, no cultural barrier
- Not saturated — "Mission Control" is taken by 5+ products, "Launch Control" is open
- Sells well — "I built Launch Control for my AI team. I can build one for yours."
- Works in posts — "Watch my 3 AI employees work live at thelaunch.space/launch-control"

Alternatives considered:
- "The Launch Space" — creates identity conflict with the existing website
- "Kurukshetra" — beautiful but hard to spell/pronounce for non-Indian ICP
- "Mission Control" — saturated (Bhanu Teja, GitHub, ClawControl HQ, cmd-deck, etc.)

---

## The Problem

1. **Visibility gap:** Vibhishana writes briefs and scans 400+ Reddit questions on the VPS. Krishna can't easily read them — no clear URL, no click-to-review workflow. As volume grows (weeks → months), this gets worse.
2. **Proof gap:** The 30-day challenge posts say "my AI employees did X." But there's no way for the audience to verify it. Every post is "trust me." That's a weak position when selling a service.
3. **Scaling gap:** Google Sheets works now but won't scale as columns, rows, and agent output grow. Need a proper DB layer.

## The Objective

Build a **live, public-facing dashboard** at `thelaunch.space/launch-control` showing Krishna's AI agents working in real-time. Dual purpose:

- **For Krishna:** Review agent output easily (briefs, questions, blog status) without SSH-ing into VPS
- **For the audience:** "Don't believe me? Watch them work." A live link that proves the AI employee system is real
- **For selling the service:** When a potential client asks "can you really do this?" — send them Launch Control. The demo IS the pitch.

## Why This Matters (Strategic)

- **Proof > claims.** A live dashboard is permanently self-updating proof. No more writing "look what my agents did" posts — just link to Launch Control.
- **Compounds over time.** 400 questions today → 1,000+ in a month. The longer agents run, the more impressive it gets.
- **Validated category.** Bhanu Teja built Mission Control (3.5M views on X), now turning it into SaaS at MissionControlHQ.ai. ClawControl HQ charges $250/month for similar. The concept works — but nobody has done it as a public-facing marketing asset the way Krishna plans to.
- **Content multiplier.** Launch Control itself becomes the highest-value content piece of the 30-day challenge. "Here's a live link where you can watch my AI team working right now" is worth more than 10 regular posts.
- **Connects to /my-ai-employees page.** Each agent's page could eventually show live data instead of static marketing copy. "See How I Work" → actual work.

---

## Decisions Made

| Question | Decision |
|----------|----------|
| Name | **Launch Control** |
| URL | `thelaunch.space/launch-control` |
| Frontend location | New route on thelaunch.space (not a separate app) |
| Backend | New Convex project |
| How agents push data | Shell/exec with curl → Convex HTTP Actions (secured with shared secret) |
| Public access | Fully open read-only (no login needed to view) |
| Krishna access | Auth login unlocks admin features (full brief content, approve/flag, activity log) |
| Migration strategy | Dual-write (keep Slack + Sheets, add Convex). Don't rip anything out. |
| MVP scope | **Read-only dashboard.** No signals back to OpenClaw agents. Launch Control is a window, not a control panel. Two-way communication (approve/flag from dashboard, send instructions to agents) is Phase 2. |
| Brief file location | Standardized: `/home/node/openclaw/vibhishana/briefs/YYYY-MM-DD-slug.md` (Partha enforcing this on VPS) |
| Brief content in Convex | Store full markdown content in Convex (`contentMarkdown` field). Frontend renders it as HTML. No need to fetch files from VPS. |
| Feedback workflow (MVP) | Krishna reads briefs in Launch Control, gives feedback manually via Slack. Approve/flag actions from dashboard = Phase 2. |

---

## Architecture

```
AGENT SIDE (VPS — Partha configures)
    Vibhishana → curl POST → Convex HTTP Action /ingestQuestion
    Vibhishana → curl POST → Convex HTTP Action /ingestBrief
    Vyasa      → curl POST → Convex HTTP Action /ingestBlog
    Partha     → curl POST → Convex HTTP Action /ingestActivity

    Auth: Bearer token (shared secret stored on VPS + Convex env var)
    Dual-write: agents keep posting to Slack + Sheets as before

CONVEX BACKEND (Claude Code builds locally)
    HTTP Actions (convex/http.ts)
        → validate shared secret
        → call internalMutation to write to DB

    Database tables: questions, briefs, blogs, agentActivity

    Public queries (no auth): list questions, briefs metadata, blogs, agent status
    Admin queries (auth required): full brief content (rendered markdown), activity log
    Note: MVP is read-only. No mutations from dashboard back to agents (Phase 2).

FRONTEND (Claude Code builds on thelaunch.space)
    thelaunch.space/launch-control

    Public view (no login):
        - Agent status cards (active/sleeping, last active timestamp)
        - Questions scanned (titles, subreddits, count)
        - Brief titles + status (metadata only)
        - Blogs published (titles, links)
        - Live activity feed (real-time via Convex subscriptions)

    Krishna view (logged in):
        - Everything above PLUS:
        - Full brief content (markdown rendered as HTML — click to read)
        - Full agent activity log
        - Phase 2 (later): Approve/flag/revision actions, internal notes, two-way agent communication
```

### Data Flow (Real-Time)

```
Agent does work on VPS
    ↓
curl POST to https://[deployment].convex.site/ingestQuestion
    ↓
Convex HTTP Action validates secret → runs internalMutation
    ↓
Data written to Convex DB
    ↓
Convex pushes update via WebSocket to all subscribed frontends
    ↓
Launch Control page updates instantly (no polling, no refresh)
```

---

## Three Workstreams

### Workstream 1: Convex Backend (Claude Code builds locally)

- Create new Convex project
- Define schema (4 tables: questions, briefs, blogs, agentActivity)
- Write HTTP Actions for each ingest endpoint (with shared secret auth)
- Write public query functions (for frontend read-only)
- Write admin query functions (for Krishna's authenticated view)
- Set up auth (Clerk or Convex Auth) for Krishna's login
- Set AGENT_API_KEY environment variable in Convex

### Workstream 2: Agent Config Updates (Partha does on VPS)

- **Pre-work (can start immediately):** Standardize Vibhishana's brief file location to `/home/node/openclaw/vibhishana/briefs/YYYY-MM-DD-slug.md` — clean up scattered files from 3+ folders
- Receives SKILL.md file(s) from Krishna (designed by Claude Code)
- SKILL.md teaches agents the curl format: endpoint, headers, payload (all fields from enriched schema)
- Each agent gets updated instructions to push data after completing tasks
- Vibhishana pushes: full scanner output (12 fields) + full brief content (markdown + all 14 sheet columns)
- Vyasa pushes: blog metadata on publish
- Partha pushes: activity milestones
- Stores the AGENT_API_KEY on VPS for curl auth headers
- Dual-write: existing Slack + Sheets behavior stays untouched

### Workstream 3: Frontend (Claude Code builds on thelaunch.space)

- New route: `/launch-control`
- Public view: agent status, questions list, brief titles + status, blogs, live activity feed
- Admin view: full brief content rendered as HTML (click-to-read), SEO metadata, scanner analysis, full activity log
- Admin view is **read-only for MVP** — no approve/flag/revision actions yet (Phase 2)
- Real-time updates via Convex `useQuery()` subscriptions
- Design that matches thelaunch.space "Quiet Luxury" aesthetic

---

## Build Sequence

```
Step 1: Convex backend — tables + HTTP endpoints          ← Claude Code
Step 2: SKILL.md for agents + prompts for Partha          ← Claude Code writes, Krishna sends
Step 3: Partha deploys skill on VPS, agents start pushing ← Partha
Step 4: Frontend on thelaunch.space                       ← Claude Code
Step 5: Test, review, iterate                             ← Krishna

Steps 1 and 2 can happen in parallel.
Step 3 depends on 1 + 2 being done.
Step 4 can start as soon as Step 1 is done (with test data).
```

---

## Convex Schema (MVP) — Updated Feb 15, 2026

**Date handling:** No `day` field. All records use timestamps. Frontend queries by date range (today, yesterday, this week, custom). Works beyond the 30-day challenge — it's just "what did agents do on [date]?"

**Schema philosophy:** Capture everything the agents currently produce. We choose what to display later, but we never want to wish we had data we didn't store.

**Update from Partha audit (Feb 15):** Original schema was missing 8 of 14 blog-queue sheet columns and 6 of 12 scanner output fields. Updated below to capture all fields from both sources.

### Table 1: `questions` (Vibhishana's Reddit scans)

All 12 fields from Vibhishana's scanner output. Previously only had 6.

```
{
  // Core identification
  title: string,              // Reddit post title (was "Post Title" in sheet)
  subreddit: string,          // e.g., "r/smallbusiness"
  url: string,                // Reddit thread URL

  // Scanner analysis
  questionPain: string,       // The pain point extracted (was "Question/Pain" in sheet)
  icpRelevance: string,       // "HIGH" | "MEDIUM" | "LOW" (upgraded from boolean — matches sheet)
  launchSpaceAngle: string,   // How thelaunch.space can address this (was "thelaunch.space Angle")
  contentPotential: string,   // "Strong blog candidate" | "Blog candidate" | "Watch"
  engagement: string,         // e.g., "15 upvotes, 23 comments"
  notes: string,              // Scanner notes, e.g., "Matches: developer, frustrated with, took too long"

  // Dates
  postDate: string,           // When the Reddit post was made (as string, e.g., "2026-02-10")
  scannedAt: number,          // Timestamp when Vibhishana scanned it (for date-based filtering)

  // Status
  status: string,             // "new" | "brief_created" | "skipped"
  briefCreated: boolean,      // Was a brief created from this question?
}
```

### Table 2: `briefs` (Vibhishana's research briefs)

Combines all 14 blog-queue sheet columns + the full markdown brief content. Previously only had 6 fields.

**Brief generation schedule:** Vibhishana runs 3 cron jobs daily (11 AM, 2 PM, 5 PM IST). Each run = 1 brief from the questions pool.

**Brief file location (standardized):** `/home/node/openclaw/vibhishana/briefs/YYYY-MM-DD-slug.md` — Partha is enforcing this on VPS. No more scattered files across 3+ folders.

```
{
  // Core identification (from blog-queue sheet columns A-C)
  title: string,              // Brief title / target keyword
  slug: string,               // URL slug, e.g., "mvp-burning-money"
  primaryKeyword: string,     // Target SEO keyword

  // SEO data (from blog-queue sheet columns D, L)
  longTailKeywords: string[], // Supporting keywords
  finalKeywords: string[],    // Final keyword list after review (may differ from initial)

  // Strategic analysis (from blog-queue sheet columns F-J)
  icpProblem: string,         // The ICP pain point this addresses
  competitiveGap: string,     // What's missing in current top results
  launchSpaceAngle: string,   // How thelaunch.space uniquely addresses this
  suggestedStructure: string, // Recommended blog structure (h2/h3 outline)
  researchNotes: string,      // Additional research context

  // Ranking (from blog-queue sheet column N)
  rankingNotes: string,       // Post-publish ranking observations

  // Full content (the big one — markdown rendered as HTML in admin view)
  contentMarkdown: string,    // Full brief as markdown (~500 lines, ~17KB per brief)
                              // Contains: SEO foundation, strategic problem translation,
                              // competitive gap analysis, positioning, execution blueprint,
                              // research notes, quality checks

  // Relationships
  sourceQuestionId: id,       // Link back to questions table
  sourceUrls: string[],       // Reddit thread URLs used in research
  blogUrl: string,            // Published blog URL (filled after Vyasa publishes)

  // Categorization & filtering
  category: string,           // e.g., "Founder-Phase", "Operations", "Hiring"
  status: string,             // "pending_review" | "approved" | "needs_revision" | "brief_ready" | "writing" | "published"

  // Timestamps
  createdAt: number,          // When brief was created
  updatedAt: number,          // Last modification
}
```

### Table 3: `blogs` (Vyasa's output)
```
{
  title: string,
  slug: string,              // URL slug
  url: string,               // Published URL on thelaunch.space
  briefId: id,               // Link back to brief
  status: string,            // "writing" | "pr_created" | "published"
  wordCount: number,
  createdAt: number,         // When Vyasa started writing
  publishedAt: number,       // When it went live (nullable until published)
}
```

### Table 4: `agentActivity` (All agents — milestones only)
```
{
  agent: string,             // "parthasarathi" | "vibhishana" | "vyasa"
  action: string,            // "health_check" | "scan_complete" | "brief_created" | "blog_published"
  timestamp: number,         // Used for date-based filtering + "last active" display
  summary: string,           // One-line description, e.g., "Scanned 47 questions from 5 subreddits"
}
```

**Activity granularity:** Milestones only — scan complete, brief created, blog published, health check done. ~10-15 entries per day. Keeps the feed meaningful, not noisy.

### Schema Gaps Closed (Feb 15 Audit)

**Questions table — 6 fields added:**
| New Field | Source |
|-----------|--------|
| questionPain | Scanner "Question/Pain" column |
| icpRelevance (string) | Was boolean, now HIGH/MEDIUM/LOW to match sheet |
| launchSpaceAngle | Scanner "thelaunch.space Angle" column |
| contentPotential | Scanner "Content Potential" column |
| engagement | Scanner "Engagement" column |
| notes | Scanner "Notes" column |

**Briefs table — 10 fields added:**
| New Field | Source |
|-----------|--------|
| slug | Blog-queue sheet column B |
| primaryKeyword | Blog-queue sheet column C |
| longTailKeywords | Blog-queue sheet column D |
| icpProblem | Blog-queue sheet column F |
| competitiveGap | Blog-queue sheet column G |
| launchSpaceAngle | Blog-queue sheet column H |
| suggestedStructure | Blog-queue sheet column I |
| researchNotes | Blog-queue sheet column J |
| finalKeywords | Blog-queue sheet column L |
| rankingNotes | Blog-queue sheet column N |
| contentMarkdown | Full markdown brief file content (new — previously not captured anywhere queryable) |
| category | From brief metadata (e.g., "Founder-Phase") |
| updatedAt | Timestamp tracking |
| blogUrl | Blog-queue sheet column M (moved from blogs table reference to direct field) |

---

## What to Show Publicly vs. Keep Private

| Data | Public (Launch Control) | Admin (Krishna logged in) |
|------|------------------------|--------------------------|
| Agent status (active/sleeping) | Yes | Yes |
| Question titles + subreddits | Yes | Yes |
| Reddit thread URLs | Yes (Reddit is public) | Yes |
| Question scanner analysis (pain, angle, potential) | No | Yes |
| Brief titles + status + category | Yes (metadata only) | Yes |
| Brief SEO data (keywords, competitive gap) | No | Yes |
| Full brief content (rendered markdown) | No (that's the paid service) | Yes (this is the whole point) |
| Blog titles + URLs | Yes (already public) | Yes |
| "Last active" per agent | Yes (shows they're running) | Yes |
| Full agent activity log | No | Yes |
| Approve/flag/revision actions | N/A (Phase 2) | N/A (Phase 2) |
| Internal notes / feedback | N/A (Phase 2) | N/A (Phase 2) |

---

## Error Handling & Batching (from Partha's review)

### Error handling
If a curl to Convex fails (network issue, Convex down, rate limit), the agent:
- Logs a one-liner to Slack: "Convex push failed for [item]"
- Moves on — does NOT block main workflow
- Does NOT retry or queue

This keeps agents reliable. Krishna sees failures in Slack. Fix forward, don't over-engineer recovery for MVP.

### Batching
Vibhishana's morning scan finds 50-100 questions at once. Instead of 100 individual curls:
- HTTP Action accepts an **array** of questions
- One curl call, one mutation, all rows inserted
- Simpler for the agent, fewer network calls, well within Convex rate limits (1000 req/min)

The SKILL.md will show both formats: single-item for briefs/blogs, batch for questions.

### API key storage on VPS
Stored as a file at `/home/node/openclaw/credentials/convex-api-key.txt` — matches existing pattern for Google creds. Agents read it via exec in the curl header.

---

## Partha Schema Audit Findings (Feb 15, 2026)

### What Was Missing

Partha compared the proposed Convex schema against what agents actually produce:

**Blog-queue sheet (14 columns):** Original schema captured 6, missed 8. The sheet has slug, primaryKeyword, longTailKeywords, icpProblem, competitiveGap, launchSpaceAngle, suggestedStructure, researchNotes, finalKeywords, blogUrl, rankingNotes — all now added.

**Scanner output (12 fields):** Original schema captured 6, missed 6. The scanner produces questionPain, icpRelevance (as HIGH/MEDIUM/LOW, not boolean), launchSpaceAngle, contentPotential, engagement, notes — all now added.

**Markdown briefs (the visibility problem):** Vibhishana writes rich markdown briefs (~500 lines, ~17KB each) containing SEO foundation, strategic problem translation, competitive gap analysis, positioning, execution blueprint, research notes, and quality checks. These were only accessible via SSH. Now stored as `contentMarkdown` in Convex — rendered as HTML in the admin view.

### Brief Locations (Before → After)

**Before (scattered):**
```
/home/node/openclaw/vibhishana/brief-*.md            ← root level
/home/node/openclaw/vibhishana/briefs/*.md            ← briefs/ folder
/home/node/openclaw/vibhishana/blog-briefs/*.md       ← blog-briefs/ folder
```

**After (standardized — Partha completed Feb 15):**
```
/home/node/openclaw/vibhishana/briefs/YYYY-MM-DD-slug.md
```

Partha consolidated all scattered files, cleaned up empty folders (`blog-briefs/`, `blog-queue/`), and updated Vibhishana's AGENTS.md with the mandatory location rule.

### Brief Inventory Audit (Feb 15)

| Source | Count |
|--------|-------|
| Google Sheet (blog-queue) | 21 entries |
| Markdown files (briefs/) | 12 files |
| Gap | 9 missing files |

**Sheet breakdown:**
| Status | Count | Notes |
|--------|-------|-------|
| Published | 7 | Vyasa wrote + merged these |
| Brief Ready | 6 | Approved, waiting for Vyasa |
| Pending Review | 3 | Awaiting Krishna's review |
| Needs Revision | 3 | Feedback given, needs update |
| Dropped | 2 | Rejected topics |

**12 brief files (consolidated):**

| File | Date | Topic |
|------|------|-------|
| `2026-02-08-mvp-costs-outline.md` | Feb 8 | MVP costs (early draft) |
| `2026-02-10-technical-cofounder-equity.md` | Feb 10 | Cofounder equity split |
| `2026-02-10-agency-mvp-failed.md` | Feb 10 | Why agencies waste money on MVPs |
| `2026-02-11-mvp-cost-revised.md` | Feb 11 | MVP costs (revised, comprehensive) |
| `2026-02-12-ai-code-deployment-anxiety.md` | Feb 12 | AI code deployment fear |
| `2026-02-12-crm-service-business.md` | Feb 12 | CRM for service business |
| `2026-02-12-invoice-automation-decision.md` | Feb 12 | Invoice automation |
| `2026-02-13-developer-hiring.md` | Feb 13 | Non-tech founder hiring devs |
| `2026-02-13-spreadsheet-to-software.md` | Feb 13 | When to stop using spreadsheets |
| `2026-02-14-dev-disappeared.md` | Feb 14 | Developer abandoned project |
| `2026-02-14-invoice-automation-decision-framework.md` | Feb 14 | Invoice automation (framework) |
| `2026-02-15-mvp-burning-money.md` | Feb 15 | MVP burning money |

**Why the gap (9 missing files):**
1. **Published blogs (7)** — Vyasa received brief info from the sheet columns, wrote the blog. Brief was never saved as a standalone markdown file. The sheet WAS the brief.
2. **Sheet-only briefs** — Before the workflow enforcement, Vibhishana sometimes put brief content directly into sheet columns (ICP Problem, Competitive Gap, etc.) without creating a separate markdown file.
3. **Duplicate entries** — Some overlap/versioning confusion (e.g., two MVP cost entries).

**Root cause:** The old workflow didn't mandate "every brief MUST have a markdown file." The sheet columns held brief content, making the file seem optional.

**Fix applied (Feb 15):** Partha updated Vibhishana's AGENTS.md with two new mandatory rules:
1. Every brief MUST be saved as a markdown file in `/vibhishana/briefs/YYYY-MM-DD-slug.md`
2. Every blog-queue sheet entry MUST have a corresponding markdown file — slug column must match filename (minus date prefix)

**Impact on Convex:** Going forward, every brief will have `contentMarkdown` populated. For the 9 historical briefs without markdown files, `contentMarkdown` will be empty — the sheet metadata columns are the only record. This is acceptable for MVP; we don't need to backfill.

### Brief Generation Schedule (Confirmed)

- 11:00 AM IST — SEO Brief #1
- 2:00 PM IST — SEO Brief #2
- 5:00 PM IST — SEO Brief #3

Each cron run = 1 brief created from the questions pool. ~3 briefs/day.

---

## Technical Research Findings (Feb 14, 2026)

### OpenClaw → Convex: How Agents Push Data

- `web_fetch` is GET-only — not suitable for writes
- **Shell/exec tool with curl** is the practical path — agents can run `curl -X POST` with JSON payloads and auth headers
- **SKILL.md** is the recommended approach — a structured instruction file that tells the agent the exact curl format
- Alternative: OpenClaw Plugins (TypeScript extensions in Gateway) for deeper integration
- Sources: [OpenClaw Tools Docs](https://docs.openclaw.ai/tools), [DeepWiki](https://deepwiki.com/openclaw/openclaw/6-tools-and-skills), [LumaDock Guide](https://lumadock.com/tutorials/openclaw-custom-api-integration-guide)

### Convex: Receiving External Writes

- **HTTP Actions** (`httpAction` in `convex/http.ts`) — custom endpoints at `https://[deployment].convex.site/[path]`
- Auth: shared secret via environment variable, checked in the HTTP action handler
- Mutations marked as `internalMutation` — uncallable from public API, only invokable from HTTP actions
- Real-time: `useQuery()` creates WebSocket subscriptions, auto-pushes updates when data changes
- No polling needed — instant frontend updates when agents push data
- Sources: [HTTP Actions](https://docs.convex.dev/functions/http-actions), [Convex HTTP API](https://docs.convex.dev/http-api/), [Auth Best Practices](https://stack.convex.dev/authorization)

### Convex: Two Access Levels

- Public queries: no auth check in handler → anyone can read
- Admin mutations: check `ctx.auth.getUserIdentity()` → only logged-in users
- Frontend: `<Authenticated>` / `<Unauthenticated>` components conditionally render admin features
- Auth providers: Clerk, Auth0, or Convex Auth all supported
- Sources: [Convex Auth](https://docs.convex.dev/auth), [Internal Functions](https://docs.convex.dev/functions/internal-functions)

### Competitive Landscape

- **Bhanu Teja** (@pbteja1998) built Mission Control — 10 OpenClaw agents, shared Convex DB, 3.5M views on X, now building MissionControlHQ.ai as SaaS
- **ClawControl HQ** — $250/month, deploys AI employee teams with live dashboards
- **Open-source:** crshdn/mission-control, clawdeck, openclaw-mission-control on GitHub
- **Key difference:** These are all internal tools or SaaS products. Launch Control is a public-facing marketing asset — the dashboard IS the sales pitch. That's the novel angle.

---

## What This Unlocks for the 30-Day Challenge

- **Post:** "I just built Launch Control — a live dashboard where you can watch my AI team work. Here's the link." → highest-engagement post potential
- **Every future post:** Instead of describing what agents did, link to Launch Control. "Don't take my word for it — thelaunch.space/launch-control"
- **DM conversations:** When someone asks "is this real?" → send Launch Control link. Objection killed.
- **Service sales:** "I built Launch Control for myself. I can build it for your team too." The dashboard IS the case study.

---

## Prompts Needed for Partha

When ready to build, Claude Code will prepare:

1. **SKILL.md for Convex writes** — the instruction file that teaches agents the curl format (endpoint, headers, payload structure for each table)
2. **Agent doc updates** — additions to Vibhishana's, Vyasa's, and Partha's AGENTS.md files telling them to push data after each task
3. **VPS setup prompt** — instructions for Partha to store the AGENT_API_KEY and install the skill file

These will be written as copy-paste prompts Krishna sends to Partha via Slack DM.

---

## Phase 2 (After MVP Ships)

Features explicitly deferred from MVP to keep scope tight:

- **Approve/flag/revision actions** on briefs from the dashboard
- **Two-way agent communication** — send instructions back to OpenClaw agents from Launch Control
- **Internal notes/feedback** — leave comments on briefs within the dashboard
- **Brief diff view** — compare brief versions if agents update them
- **Agent-level pages** on `/my-ai-employees` showing live data instead of static marketing copy
- **Public metrics** — total questions scanned, briefs created, blogs published (counter widgets)

These are all valuable but none are needed for the core value prop: "watch my AI team work live."

---

## Build Progress

### Step 1: Partha Pre-Work (VPS cleanup) — DONE
- [x] Standardized Vibhishana's brief folder to `/vibhishana/briefs/YYYY-MM-DD-slug.md`
- [x] Consolidated 12 files from 3 scattered locations
- [x] Cleaned up empty `blog-briefs/` and `blog-queue/` folders
- [x] Updated Vibhishana's AGENTS.md with mandatory 1:1 mapping rule (every sheet entry = markdown file)
- [x] Audited brief inventory (21 sheet entries vs 12 files, gap documented)
- [x] Confirmed final spec — no blockers

### Step 2: Convex Backend (Workstream 1) — DONE (Feb 15, 2026)
**Where:** `thelaunch-space-tweet-sized-landing-page/` (Convex integrates into existing Next.js app)
- [x] Initialize Convex project — linked to `impartial-pelican-672` deployment
- [x] Installed packages: `convex`, `@clerk/nextjs`
- [x] Define schema (4 tables: questions, briefs, blogs, agentActivity with indexes)
- [x] Write HTTP Actions: `/ingestQuestions` (batch), `/ingestBrief`, `/ingestBlog`, `/ingestActivity`
- [x] Implement shared secret auth (Bearer token validation on all 4 endpoints)
- [x] CORS support (OPTIONS preflight handlers for all endpoints)
- [x] Write public query functions (listRecent for questions/blogs, listMetadata for briefs, agentStatuses + recentFeed)
- [x] Write admin query functions (listFullDetails for questions, getFullBrief + listFull for briefs, fullLog for activity)
- [x] Set up auth — Clerk provider configured (`convex/auth.config.ts`), ClerkProvider + ConvexProviderWithClerk in `app/ConvexClientProvider.tsx`
- [x] Clerk middleware at project root (`middleware.ts`) — permissive, blocks nothing, makes auth available
- [x] Wrapped `app/layout.tsx` with ConvexClientProvider (existing site unchanged)
- [x] ESLint ignores `convex/_generated/`
- [x] Netlify build command updated to `npx convex deploy --cmd 'npm run build'`
- [x] Schema pushed to Convex — all 11 indexes created
- [x] `npm run typecheck` — PASS
- [x] `npm run lint` — PASS
- [x] `npm run build` — PASS (21 pages, all existing routes intact)
- [x] Set `AGENT_API_KEY` environment variable in Convex Dashboard — DONE by Krishna
- [x] Set `CLERK_ISSUER_URL` environment variable in Convex Dashboard — DONE by Krishna
- [x] Schema enriched to match full spec (all 12 scanner fields, all 14 blog-queue columns) — Feb 15
- [x] Test endpoints with curl (enriched data) — all 4 return `{"success":true}`, wrong key returns 401
- [x] 12 indexes active across 4 tables

**Files created:**
| File | Purpose |
|------|---------|
| `convex/schema.ts` | 4 tables with indexes |
| `convex/auth.config.ts` | Clerk identity provider config |
| `convex/questions.ts` | ingestBatch + listRecent + listFullDetails |
| `convex/briefs.ts` | ingest + listMetadata + getFullBrief + listFull |
| `convex/blogs.ts` | ingest + listRecent |
| `convex/agentActivity.ts` | ingest + agentStatuses + recentFeed + fullLog |
| `convex/http.ts` | 4 POST endpoints with Bearer auth + CORS |
| `app/ConvexClientProvider.tsx` | Client component: ClerkProvider + ConvexProviderWithClerk |
| `middleware.ts` | Clerk middleware (permissive) |

**Files modified:**
| File | Change |
|------|--------|
| `app/layout.tsx` | Wrapped body content in `<ConvexClientProvider>` |
| `eslint.config.js` | Added `convex/_generated` to ignores |
| `netlify.toml` | Build command: `npx convex deploy --cmd 'npm run build'` |
| `.env.local` | Convex auto-added `CONVEX_DEPLOYMENT` + `NEXT_PUBLIC_CONVEX_SITE_URL` |
| `package.json` | Added `convex` + `@clerk/nextjs` dependencies |

**HTTP Endpoints (live on dev deployment):**
```
POST https://impartial-pelican-672.convex.site/ingestQuestions   (batch: array or single object)
POST https://impartial-pelican-672.convex.site/ingestBrief
POST https://impartial-pelican-672.convex.site/ingestBlog
POST https://impartial-pelican-672.convex.site/ingestActivity
```
All require header: `Authorization: Bearer <AGENT_API_KEY>`

**Schema status:** Fully enriched to match Partha's audit. All 12 scanner output fields for questions, all 14 blog-queue columns + `contentMarkdown` for briefs. Tested and confirmed working with curl.

**Final Convex Schema (as deployed):**

**`questions` table (15 fields):**
| Field | Type | Required | Source |
|-------|------|----------|--------|
| `title` | string | yes | Reddit post title |
| `subreddit` | string | yes | e.g., "r/smallbusiness" |
| `url` | string | yes | Reddit thread URL |
| `questionPain` | string | yes | Pain point extracted by scanner |
| `icpRelevance` | string | yes | "HIGH" / "MEDIUM" / "LOW" |
| `launchSpaceAngle` | string | yes | How thelaunch.space addresses this |
| `contentPotential` | string | yes | "Strong blog candidate" / "Blog candidate" / "Watch" |
| `engagement` | string | yes | e.g., "15 upvotes, 23 comments" |
| `notes` | string | optional | Scanner notes |
| `postDate` | string | optional | When Reddit post was made |
| `scannedAt` | string | yes | When Vibhishana scanned it |
| `status` | string | yes | "new" / "brief_created" / "skipped" |
| `briefCreated` | boolean | optional | Was a brief created from this? |
| `agentName` | string | yes | Always "Vibhishana" for questions |
| `batchId` | string | optional | Groups questions from same scan |
Indexes: `by_scannedAt`, `by_agentName`, `by_status`

**`briefs` table (20 fields):**
| Field | Type | Required | Source |
|-------|------|----------|--------|
| `title` | string | yes | Brief title (blog-queue col A) |
| `slug` | string | yes | URL slug (blog-queue col B) |
| `primaryKeyword` | string | yes | Target SEO keyword (col C) |
| `longTailKeywords` | string[] | optional | Supporting keywords (col D) |
| `finalKeywords` | string[] | optional | Final keyword list after review (col L) |
| `icpProblem` | string | optional | ICP pain point (col F) |
| `competitiveGap` | string | optional | What's missing in top results (col G) |
| `launchSpaceAngle` | string | optional | Our unique angle (col H) |
| `suggestedStructure` | string | optional | H2/H3 outline (col I) |
| `researchNotes` | string | optional | Research context (col J) |
| `rankingNotes` | string | optional | Post-publish ranking notes (col N) |
| `contentMarkdown` | string | optional | Full brief as markdown (~500 lines, ~17KB) |
| `sourceQuestionId` | string | optional | Link back to questions table |
| `sourceUrls` | string[] | optional | Reddit thread URLs used |
| `blogUrl` | string | optional | Published blog URL (col M) |
| `category` | string | optional | e.g., "Founder-Phase", "Operations" |
| `status` | string | yes | "pending_review" / "approved" / "needs_revision" / "brief_ready" / "writing" / "published" |
| `createdAt` | string | yes | When brief was created |
| `updatedAt` | string | optional | Last modification |
| `agentName` | string | yes | Always "Vibhishana" for briefs |
Indexes: `by_status`, `by_agentName`, `by_createdAt`, `by_category`

**`blogs` table (10 fields):**
| Field | Type | Required | Source |
|-------|------|----------|--------|
| `title` | string | yes | Blog title |
| `slug` | string | yes | URL slug |
| `url` | string | optional | Published URL on thelaunch.space |
| `keyword` | string | yes | Target keyword |
| `status` | string | yes | "writing" / "pr_created" / "published" |
| `agentName` | string | yes | Always "Vyasa" for blogs |
| `wordCount` | number | yes | Word count |
| `publishedAt` | string | optional | When it went live |
| `createdAt` | string | yes | When Vyasa started writing |
| `briefId` | string | optional | Link back to briefs table |
Indexes: `by_status`, `by_agentName`, `by_createdAt`

**`agentActivity` table (6 fields):**
| Field | Type | Required | Source |
|-------|------|----------|--------|
| `agentName` | string | yes | "Parthasarathi" / "Vibhishana" / "Vyasa" |
| `action` | string | yes | "health_check" / "scan_complete" / "brief_created" / "blog_published" |
| `status` | string | yes | "active" / "completed" / "error" |
| `message` | string | yes | One-line description |
| `timestamp` | string | yes | ISO timestamp |
| `metadata` | any | optional | Extra context (flexible object) |
Indexes: `by_agentName`, `by_timestamp`, `by_agentName_timestamp`

### Step 3: SKILL.md + Partha Prompts (Workstream 2) — DONE (Feb 15, 2026)
**Where:** `thelaunch-space-tweet-sized-landing-page/skills/` (3 separate files)

**Decision: 3 separate skill files, not 1 combined.** Rationale:
1. Context window efficiency — each agent only loads instructions it needs
2. Model cost — Vyasa (Opus) pays more per token, so keep its skill minimal
3. Maintenance — schema changes only touch the affected agent's skill
4. Error isolation — debugging 50 lines vs 200 lines

- [x] Write `convex-push-scanner.SKILL.md` — Vibhishana: batch questions + briefs with full markdown
- [x] Write `convex-push-blog.SKILL.md` — Vyasa: blog metadata after PR creation
- [x] Write `convex-push-activity.SKILL.md` — All agents: milestone activity push
- [x] Write Slack message for Partha with setup instructions + rationale
- [x] Krishna sends skill files + instructions to Partha via Slack DM

**Skill files created:**
| File | Agent(s) | Lines | Pushes to |
|------|----------|-------|-----------|
| `skills/convex-push-scanner.SKILL.md` | Vibhishana | ~75 | `/ingestQuestions` (batch) + `/ingestBrief` |
| `skills/convex-push-blog.SKILL.md` | Vyasa | ~50 | `/ingestBlog` |
| `skills/convex-push-activity.SKILL.md` | All 3 | ~65 | `/ingestActivity` |

**Key details in skills:**
- API key read from `/home/node/openclaw/credentials/convex-api-key.txt`
- Brief markdown escaped with `jq -Rs .` (requires `jq` installed on VPS)
- Questions sent as batch array (one curl for 50-100 questions)
- Error handling: log to Slack, move on, never retry, never block
- Activity milestones only (not every small step) — ~10-15 entries/day

### Step 4: Partha Deploys on VPS — DONE (Feb 15, 2026)
- [x] Partha installs 3 SKILL.md files on VPS (`/app/skills/convex-push-scanner/`, `convex-push-blog/`, `convex-push-activity/`)
- [x] Partha stores AGENT_API_KEY at `/home/node/openclaw/credentials/convex-api-key.txt`
- [x] Test push successful — activity milestone sent to Convex, returned `{"success":true}`
- [x] jq workaround: scanner skill uses Node.js `JSON.stringify(fs.readFileSync(...))` instead of `jq -Rs .` (jq not installed on VPS)
- [ ] Agents start dual-writing on scheduled runs (Vibhishana 9 AM scan, briefs 11/2/5 PM, Vyasa 4 PM blog)
- [ ] Verify live agent data flowing into Convex

### Step 5: Frontend (Workstream 3) — DONE (Feb 15, 2026)
**Where:** `thelaunch-space-tweet-sized-landing-page/`
- [x] New route: `/launch-control`
- [x] Public view: agent status, questions, brief titles + status, blogs, live feed
- [x] Admin view: full brief content (markdown → HTML), SEO data, scanner analysis, activity log
- [x] Real-time updates via Convex `useQuery()` subscriptions
- [x] Design matching "Quiet Luxury" aesthetic
- [x] Mobile QA — 12 files fixed for responsive layout
- [x] Public preview tabs — all 4 tabs visible to visitors, top 3 rows + blur + waitlist CTA
- [x] Briefs clickable for public (new `getPublicBrief` query — strips SEO metadata)
- [x] Scoreboard toggle — "This Week" / "All Time" switch
- [x] Dynamic imports to prevent webpack compilation hang

### Step 6: Test, Review, Ship — DONE (Feb 15, 2026)
- [x] End-to-end test with live agent data (605 records backfilled)
- [x] Krishna reviews dashboard, gives feedback
- [x] Iterated: public preview tabs, clickable briefs, scoreboard toggle
- [x] Deployed to production (Netlify + Convex prod)

---

## What Krishna Needs to Do (Feb 15, 2026)

### 1. Set Convex Environment Variables — DONE
- [x] `AGENT_API_KEY` set in Convex Dashboard
- [x] `CLERK_ISSUER_URL` set in Convex Dashboard

### 2. Tell Partha What's Coming — DONE
Krishna informed Partha. Partha confirmed spec is clear, no questions.

---

## Session Notes

**How to resume building:** Open Claude Code in `thelaunch-space-tweet-sized-landing-page/` folder. Tag this file for context:
```
@live-dashboard-convex.md
```

**Next session options (in priority order):**
1. **Frontend dashboard** (Step 5) — build the `/launch-control` page. Can start with test data while waiting for Partha to deploy skills. Open Claude Code in `thelaunch-space-tweet-sized-landing-page/` folder.
2. **Wait for Partha** (Step 4) — once he installs skills + API key on VPS, agents will start pushing live data to Convex. Verify data flowing in Convex Dashboard.
