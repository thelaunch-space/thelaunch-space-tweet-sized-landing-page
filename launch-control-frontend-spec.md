# Launch Control — Frontend Spec

Status: LIVE IN PRODUCTION
Created: 2026-02-15
Last updated: 2026-02-15 (v3 — public preview tabs, scoreboard toggle, clickable briefs)

---

## Design Philosophy

Launch Control is a **public storefront window**, not an admin panel. Visitors from LinkedIn press their face against the glass and watch Krishna's AI team work. The design matches thelaunch.space's "Quiet Luxury" aesthetic — off-white base, clean typography, layered shadows, subtle micro-interactions.

**Visual reference:** Bhanu Teja's Mission Control HQ (3-column layout with agents sidebar, central content, live feed). We borrow the layout structure but replace the Trello-style kanban with an ICP-focused output + impact view.

**One rule:** Everything on the public view answers one question: **"Is this real?"**

**ICP context:** Domain-expert founders (35-50), running $100K-$2M services businesses. They think in dollars and time. They're skeptical but AI-curious. They need to see: (1) this is real, (2) these agents produce tangible output, (3) this would save them money. See `.context/thelaunch-space-icp.md` for full profile.

---

## URL

`thelaunch.space/launch-control`

---

## Layout: 3-Column Dashboard

Inspired by Mission Control HQ. Three persistent columns on desktop.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                 │
│  "Launch Control"  |  3 AGENTS ACTIVE  ·  47 QUESTIONS  |  Date  Login │
├──────────┬──────────────────────────────────────────────┬───────────────┤
│          │                                              │               │
│  AGENTS  │           CENTER CONTENT                     │  LIVE FEED    │
│  SIDEBAR │                                              │               │
│          │  [Public: Scoreboard + Daily Timeline]        │  Real-time    │
│  Agent 1 │  [Admin: Tabs — Overview | Communities |     │  activity     │
│  Agent 2 │           Questions | Briefs]                │  log          │
│  Agent 3 │                                              │               │
│  Agent 4 │                                              │               │
│  Agent 5 │                                              │               │
│          │                                              │               │
└──────────┴──────────────────────────────────────────────┴───────────────┘
```

### Column Widths (Desktop)
- **Left (Agents Sidebar):** ~240px fixed
- **Center (Main Content):** flexible, fills remaining space
- **Right (Live Feed):** ~320px fixed

---

## Header Bar

Full-width top bar. Clean, information-dense but not cluttered.

### Layout (left → right)
```
[Logo/Icon] Launch Control     3 AGENTS ACTIVE  ·  127 QUESTIONS SCANNED     Sat, Feb 15 2026     [Login Icon]
```

### Content
- **Left:** "Launch Control" in display font (Cormorant Garamond), bold. Small rocket/diamond icon optional.
- **Center:** Key stats in mono font (JetBrains Mono, uppercase, small). Examples:
  - `3 AGENTS ACTIVE` — count of agents with status "working" or "idle" (not paused)
  - `127 QUESTIONS SCANNED` — total from questions table (all time or rolling 7-day — TBD)
  - Stats update in real-time via Convex subscriptions
- **Right:** Current date + time (IST). Clerk login icon — subtle lock/user icon. When logged in: small avatar or checkmark. Clicking opens Clerk sign-in.

### Style
- Background: `surface` (#FFFFFF) with `shadow-nav` beneath
- Height: ~56px
- Sticky top (z-50)
- Border-bottom: `border-color` at 60% opacity

---

## Left Column: Agents Sidebar

### Layout
Vertical list of agent entries, similar to Bhanu's agent sidebar. Each agent is a clickable row.

### Agent Row (Default State)
```
[Avatar circle 36px] [Status dot] Agent Name
                                   Role (one line)
```

- **Avatar:** Small circular crop of agent portrait from `/public/agents/`
- **Status dot:** Colored pulse indicator next to the name
  - Green + gentle pulse animation = **working** (currently executing)
  - Orange + static = **idle** (between scheduled runs)
  - Red + slow blink = **paused / coming soon / error**
- **Name:** Agent name in body font (Inter), semi-bold
- **Role:** One-line role in `text-secondary`, small size (e.g., "SEO Scanner & Brief Writer")

### Agent List (Current)
| Agent | Status | Dot Color |
|-------|--------|-----------|
| Parthasarathi | Active (orchestrator) | Green/Orange |
| Vibhishana | Active (scanner + briefs) | Green/Orange |
| Vyasa | Active (blog writer) | Green/Orange |
| Sanjaya | Coming Soon | Red (muted) |
| Valmiki | Coming Soon | Red (muted) |

"Coming Soon" agents: same row style but muted opacity (~60%). Red dot with no pulse. Still clickable but expanded view just shows "Coming Soon" + avatar + role description.

**Future-proof:** This sidebar will hold more agents as the team grows. The list scrolls vertically if needed.

### Agent Row: Click → Expanded Panel

When you click an agent row, a **detail panel slides out** (overlay/modal or expands inline within the sidebar — whichever looks cleaner). This is the "agent profile card."

**Design goal:** Minimal info but maximum WOW factor. This should feel like opening a character profile in a premium game or app.

#### Expanded Panel Content

```
┌─────────────────────────────────┐
│  [Full avatar image — large]    │
│                                 │
│  Vibhishana                     │
│  Research Intelligence Analyst  │
│  ● Working — Scanning Reddit    │
│                                 │
│  ─── Today ───                  │
│  ✓ Scanned 52 questions (9 AM) │
│  ✓ Created brief: "MVP..." (11)│
│  ◌ Brief #2 queued (2 PM)      │
│  ◌ Brief #3 queued (5 PM)      │
│                                 │
│  ─── This Week ───              │
│  127 questions · 9 briefs       │
│                                 │
│  [View Full Profile →]          │
│  (links to /build-your-ai-team) │
└─────────────────────────────────┘
```

**Sections:**
1. **Avatar** — Full agent portrait, large (200-280px). The hero moment. Beautiful rendering against clean background.
2. **Name + Role** — Display font for name, body font for role
3. **Current Status** — Status dot + text. "Working — Scanning Reddit" or "Idle — Next run in 47 min" or "Paused — Coming Soon"
4. **Today's Activity** — What the agent did today + what's queued. Completed items have checkmarks, upcoming items have open circles. Shows scheduled times.
5. **This Week Summary** — One-line stat rollup (e.g., "127 questions · 9 briefs · 3 blogs")
6. **Link** — "View Full Profile →" links to `/build-your-ai-team/[agent]`

**For "Coming Soon" agents:** Avatar + name + role + "This agent is in training. Coming soon." No activity sections.

**Animation:** Panel slides in from the left (or expands smoothly). Content fades in with staggered entrance. Framer Motion.

**Close:** Click outside, click X, or click the agent row again.

---

## Right Column: Live Feed

Real-time activity log. The "proof" column. Visitors see entries appearing as agents work.

### Style
- Header: "LIVE FEED" with a small red recording dot (pulsing)
- Clean log format — factual, concise entries
- Each entry: small agent avatar circle + agent name + action + relative timestamp
- Most recent on top
- Scrollable (vertical), contained within the column

### Filter Tabs (top of feed)
```
[All] [Tasks] [Milestones]
```
- **All:** Everything
- **Tasks:** scan_complete, brief_created, blog_published
- **Milestones:** health_check, agent started/stopped

### Example Entries
```
● Vibhishana                              2h ago
  Scanned 52 questions from 5 subreddits

● Vibhishana                              5h ago
  Created brief: "Why Your MVP Is Burning Money"

● Vyasa                                   Yesterday
  Published: "Should You Hire a Developer?"

● Parthasarathi                           Yesterday
  Health check: all agents operational
```

### Data Source
- `agentActivity` table via Convex `useQuery()` subscription
- Default: last 7 days, sorted by timestamp descending
- Real-time: new entries slide in from top with fade animation when WebSocket pushes data
- Admin view: click any entry to see full metadata (which subreddits, how many HIGH relevance, etc.)

---

## Center Column: Main Content

This is the largest area. It changes based on whether the visitor is logged in or not.

### Public View (No Login)

All 4 tabs are visible to visitors (Overview, Communities, Questions, Briefs). Non-admin tabs show **preview components** — top rows of real data with progressive blur overlay and waitlist CTA. This replaces the original plan of only showing Scoreboard + Timeline to public visitors.

Three sections stacked vertically in Overview, plus preview components in other tabs:

#### Section 1: Scoreboard (Impact Strip)

A horizontal row of key metrics — the aggregate impact of the AI team. This is the "wow" moment for the ICP.

```
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│     127      │      12      │       3      │    ~108      │   ~$5,600    │
│  Questions   │    Briefs    │    Blogs     │ Human Hours  │    Saved     │
│  Analyzed    │   Written    │  Published   │  Replaced    │  This Week   │
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
        Rolling 7 Days                              + small "all time" totals below
```

**Metrics:**

| Metric | Example | Source |
|--------|---------|--------|
| Reddit questions analyzed | 127 | `questions` table count (last 7 days) |
| SEO briefs written | 12 | `briefs` table count (last 7 days) |
| Blogs published | 3 | `blogs` table count (last 7 days) |
| Human hours replaced | ~108 hrs | Calculated (see formula below) |
| Cost savings | ~$5,600 | Calculated (see formula below) |

**Toggle: "This Week" / "All Time":** Two toggle buttons above the stat cards let visitors switch between rolling 7-day numbers and all-time totals. Default: "This Week". Active button gets `bg-surface-alt text-text-primary` styling. The toggle replaces the original design of static "all time" totals below each number.

**Animation:**
- Numbers **count up from 0** to real value on page load (Framer Motion)
- Smooth easing, ~1.5 second duration
- Staggered start per metric (left to right, 200ms delay each)
- Easing: ease-out (fast start, gentle land)

**Cost Savings Formula (Hardcoded for MVP):**

Based on research (Upwork, Glassdoor, ZipRecruiter — Feb 2026 rates):

| Agent Task | Human Time | Hourly Rate | Cost Per Task |
|-----------|-----------|-------------|--------------|
| Vibhishana: Reddit scan (1 run, ~50-100 questions) | 2.5 hrs | $45/hr | $112.50 |
| Vibhishana: SEO brief (1 brief) | 4 hrs | $45/hr | $180 |
| Vyasa: Blog post (1 post, ~2000 words from brief) | 4 hrs | $75/hr | $300 |
| Parthasarathi: Daily orchestration | 3 hrs | $60/hr | $180 |

Rate sources:
- $45/hr (Vibhishana) — blended SEO specialist + content strategist + market researcher. Upwork experienced: $35-55/hr.
- $75/hr (Vyasa) — mid-tier SEO copywriter. Upwork intermediate: $50-75/hr.
- $60/hr (Parthasarathi) — content operations manager. ZipRecruiter: $43-75/hr.

Calculation logic:
```
weeklyHumanHours =
  (questionsScanned / 50) * 2.5     // 2.5 hrs per scan run (~50 questions each)
  + briefsWritten * 4                // 4 hrs per brief
  + blogsPublished * 4               // 4 hrs per blog post
  + 5 * 3                            // 3 hrs/day orchestration × 5 days

weeklyCostSavings =
  (questionsScanned / 50) * 112.50
  + briefsWritten * 180
  + blogsPublished * 300
  + 5 * 180
```

#### Section 2: Daily Timeline (Today's Pipeline)

A chronological view of what the AI team is doing **today**. Not a kanban — a timeline showing completed/active/upcoming work.

```
TODAY — Saturday, Feb 15

  ✓  9:00 AM   Vibhishana    Scanned 52 questions from r/smallbusiness, r/startups...
  ✓  11:00 AM  Vibhishana    Created brief: "Why Your MVP Is Burning Money"
  ●  2:00 PM   Vibhishana    Creating brief #2...                              [ACTIVE]
  ◌  4:00 PM   Vyasa         Blog writing queued
  ◌  5:00 PM   Vibhishana    Brief #3 scheduled
  ◌  7:00 PM   Parthasarathi Due diligence review
```

- **Completed items (✓):** Muted, with green checkmark
- **Active item (●):** Highlighted row, green pulse dot, slightly elevated card
- **Upcoming items (◌):** Lighter opacity, shows scheduled time
- **Empty state:** "No tasks scheduled for today" (or friendly message about next working day)

This gives visitors a real-time sense of the pipeline moving. The ICP sees: "These agents have a daily rhythm. This is a system, not a hack."

#### Section 3: Footer CTA

```
"Want an AI team like this? Let's talk."
[Get Your Launch Roadmap →]
```

Links to `/?cta=open` (opens lead capture modal on homepage).

### Tab Bar (Visible to Everyone)

```
[Overview]  [Communities]  [Questions]  [Briefs]
```

Tabs appear at the top of the center column for ALL visitors. Clean, minimal tab design. Active tab has accent-blue underline. Tab order is fixed: Overview → Communities → Questions → Briefs.

**Public vs Admin:** Each tab renders either a preview component (public) or full component (admin) based on `isSignedIn`. All tab panel components use `next/dynamic` for lazy loading.

### Admin View (Krishna Logged In)

When authenticated, tab panels show full data with scroll, sort, and filter capabilities.

---

### Tab 1: Overview (Default)

Same content as the public view — Scoreboard + Daily Timeline. Krishna sees the same "storefront" his audience sees, so he can verify it looks right. No additional admin data here — that's what the other tabs are for.

---

### Tab 2: Communities

Shows which subreddits/communities Vibhishana monitors. This is the "reach" view.

**Content:**
- List of subreddits Vibhishana has scanned
- For each: subreddit name, member count (if available), questions found, last scanned date
- Derived from `questions` table — group by `subreddit`, count per subreddit

**Layout:** Clean card grid or list. Each community card shows the subreddit name prominently + stats below.

**Note:** This tab may be sparse initially. If data is thin, combine with the Questions tab or show as a filter/sidebar within Questions.

---

### Tab 3: Questions

Vibhishana's full scanner output. The raw intelligence feed.

**Layout: Scrollable data table** with frozen headers and frozen left column.

#### Table Columns

| Column | Frozen? | Width | Content |
|--------|---------|-------|---------|
| Title | Yes (frozen left) | ~300px | Reddit post title (clickable → opens Reddit URL) |
| Subreddit | No | ~140px | e.g., "r/smallbusiness" |
| ICP Relevance | No | ~100px | HIGH (green) / MEDIUM (amber) / LOW (gray) badge |
| Content Potential | No | ~140px | "Strong blog candidate" / "Blog candidate" / "Watch" |
| Pain Point | No | ~250px | Extracted pain point |
| thelaunch.space Angle | No | ~250px | How we address this |
| Engagement | No | ~120px | "15 upvotes, 23 comments" |
| Status | No | ~120px | "new" / "brief_created" / "skipped" badge |
| Brief Created | No | ~80px | Yes/No indicator |
| Scanned At | No | ~120px | Date |

#### Table UX

**Frozen header row:** Column headers stick to the top of the table viewport as you scroll vertically. Always visible — you never lose context of which column you're reading.

**Frozen left column (Title):** The first column (Title) sticks to the left edge as you scroll horizontally. When the table is wider than the viewport, you scroll right to see more columns but the Title column stays pinned — so you always know which question you're looking at.

**Visual indicators for frozen areas:**
- Frozen header: subtle bottom border + slight background tint (`surface-alt`)
- Frozen left column: subtle right shadow (drop shadow on the right edge of the pinned column) — this gives a "lifted" effect that visually separates the frozen column from the scrollable area

**Scrolling:**
- Vertical: scrolls within the center column area (header bar + tabs stay fixed above)
- Horizontal: scrolls to reveal additional columns. Smooth scroll. Optional: horizontal scroll indicator or fade gradient on the right edge to hint "more columns →"
- Scroll container has a defined max-height (e.g., `calc(100vh - header - tabs)`) so it doesn't make the page infinitely tall

**Row interactions:**
- Hover: subtle row highlight
- Click: could expand to show full details inline (optional — table already shows most fields)

**Sorting:** Click column headers to sort (ascending/descending). Default: sorted by `scannedAt` descending (newest first).

**Filtering:** Simple filter bar above table — filter by status, ICP relevance, date range.

**Pagination / infinite scroll:** For 100s of rows, use infinite scroll (load more as you scroll down) or paginated (50 rows per page with next/prev). Infinite scroll preferred for smooth review experience.

---

### Tab 4: Briefs

The main reason Launch Control exists for Krishna. Full list of all briefs with status tracking and click-to-read.

**Layout:** Card list (not table — briefs are richer content that benefits from card layout).

#### Brief Card

```
┌──────────────────────────────────────────────────────────────────┐
│  Why Your MVP Is Burning Money                                    │
│  mvp-burning-money · Founder-Phase · Feb 15, 2026                │
│                                                                   │
│  Primary keyword: mvp burning money                               │
│  ICP Problem: Founders spending $50K+ on MVPs that don't...       │
│                                                                   │
│  [PENDING REVIEW]                                    [Read Brief →]│
└──────────────────────────────────────────────────────────────────┘
```

**Card content:**
- **Title** (display font, prominent)
- **Metadata line:** slug · category · date created
- **Primary keyword** (mono font, small)
- **ICP Problem** (truncated to 1-2 lines)
- **Status tag:** Color-coded badge
  - `pending_review` → Yellow/amber
  - `approved` → Green
  - `needs_revision` → Red
  - `brief_ready` → Blue
  - `writing` → Purple
  - `published` → Green (different shade or with checkmark)
- **"Read Brief →" button** → Opens full brief modal

**Filtering:** Filter bar at top — filter by status (dropdown or pill toggles), category, date range.

**Sorting:** Newest first by default. Option to sort by status.

#### Brief Reader Modal (Near-Fullscreen)

When "Read Brief →" is clicked, a **near-fullscreen modal** opens with the full brief rendered from markdown to HTML.

**Modal design:**
- Takes up ~90% of viewport width and ~95% of viewport height
- Centered overlay with dark backdrop (rgba(0,0,0,0.5))
- Clean white interior with generous padding
- Top bar: Brief title (left) + [X] close button (right) + status tag
- Content area: Full markdown rendered as HTML with proper typography
  - Headings (h2, h3) in Cormorant Garamond
  - Body text in Inter, comfortable reading width (~680px max, centered)
  - Code blocks styled
  - Lists, tables, blockquotes all properly styled
- Scroll: Content scrolls within the modal (body scroll locked)
- Close: Click X, click backdrop, or press Escape

**SEO Metadata sidebar (inside modal):**
On the right side of the modal (or as a collapsible panel), show brief metadata:
- Primary keyword
- Long-tail keywords
- Competitive gap
- ICP problem
- thelaunch.space angle
- Suggested structure
- Research notes
- Final keywords
- Ranking notes (if any)
- Source URLs

This lets Krishna read the full brief AND see all the strategic context without switching views.

**Typography for rendered markdown:**
- Max content width: ~680px (optimal reading width)
- Line height: 1.7 for body text
- Heading spacing: generous top margin (2rem+ before h2)
- Font sizes: h2 at 1.5rem, h3 at 1.25rem, body at 1rem

---

## Agent Status Logic

### Status Determination
- **Working (green):** Agent pushed a `status: "active"` activity entry within the last N minutes:
  - Vibhishana scanning: 30 min window
  - Vibhishana briefs: 20 min window
  - Vyasa writing: 60 min window
  - Parthasarathi: 15 min window
- **Idle (orange):** Default state. Agent has reported recently but not currently active.
- **Paused/Coming Soon (red):** Agent marked as paused, or hasn't reported in 24+ hours, or is a "coming soon" agent (Sanjaya, Valmiki).

### Agent Schedules (for "Today's Timeline" + expanded panel)
| Agent | Schedule (IST) | Task |
|-------|---------------|------|
| Vibhishana | 9:00 AM | Reddit scan (~50-100 questions) |
| Vibhishana | 11:00 AM | SEO Brief #1 |
| Vibhishana | 2:00 PM | SEO Brief #2 |
| Vibhishana | 5:00 PM | SEO Brief #3 |
| Vyasa | 4:00 PM | Blog writing |
| Parthasarathi | 7:00 PM | Due diligence review |
| Parthasarathi | Continuous | Health checks, orchestration |

For Parthasarathi (no strict fixed schedule beyond 7 PM): show "Last active X ago" instead of countdown.

---

## Responsive Design

### Desktop (1280px+)
Full 3-column layout as designed. All columns visible simultaneously.

### Desktop Small (1024px-1279px)
- Left sidebar collapses to icon-only mode (avatars only, no text)
- Click avatar → expanded panel still works
- Center + Right columns fill remaining space

### Tablet (768px-1023px)
- Left sidebar hidden (accessible via hamburger or slide-out drawer)
- Right column (live feed) moves below center content OR becomes a slide-out drawer from right edge
- Center column goes full width
- Scoreboard wraps to 2 rows (3 + 2)

### Mobile (< 768px)
- **Single column layout**
- Header: simplified — "Launch Control" + login icon only. Stats move into scoreboard.
- Agents: horizontal scroll strip at top (small circular avatars, tap to open expanded panel as bottom sheet)
- Scoreboard: 2×2 grid or vertical stack with count-up animation
- Daily timeline: full width, compact entries
- Live feed: collapsible section below timeline (or separate "Feed" tab)
- Admin tabs: horizontal scrollable tab bar
- Tables (Questions): card-based layout instead of table (one card per question, stacked vertically). No frozen columns needed — cards show key info with "Show more" expand.
- Brief modal: takes full screen on mobile (100vw × 100vh)

**Mobile is the primary design target** — LinkedIn audience clicks from their phone.

---

## Micro-Interactions & Polish

### Status Dot Animations
- **Green (working):** Gentle pulse animation — scale 1 → 1.4 → 1, 2s loop, ease-in-out. Like a heartbeat.
- **Orange (idle):** Static dot, no animation.
- **Red (paused):** Slow blink — opacity 1 → 0.3 → 1, 3s loop.

### Scoreboard Count-Up
- Numbers roll from 0 → real value over ~1.5s
- Staggered: each metric starts 200ms after the previous
- Easing: ease-out (fast start, gentle land)
- Trigger: intersection observer (animate when scrolled into view, not on page load if below fold)

### Agent Expanded Panel
- Slides in smoothly (from left if sidebar panel, from bottom if mobile sheet)
- Content fades in with staggered entrance (avatar first, then name, then stats)
- Backdrop blur on overlay if modal style
- Close with smooth slide-out

### Live Feed
- New entries slide in from top with fade
- Subtle entrance animation when WebSocket pushes new data
- Green flash on the "LIVE FEED" dot when new entry arrives

### Daily Timeline
- Active task row has subtle glow/highlight
- Completed tasks fade slightly
- Upcoming tasks pulse gently at their scheduled time

### Brief Modal
- Opens with scale-up animation (0.95 → 1) + fade
- Backdrop fades in simultaneously
- Close: scale down + fade out
- Scroll position resets to top on open

### Table Scrolling
- Horizontal scroll: smooth, with momentum on trackpad
- Frozen column shadow appears/disappears based on scroll position (shadow only visible when scrolled right)
- Fade gradient on right edge when more content exists horizontally

---

## Data Requirements (Convex Queries)

### Public Queries (built and deployed)
| Query | Table | Returns |
|-------|-------|---------|
| `agentStatuses()` | agentActivity | Latest status per agent |
| `recentFeed(limit)` | agentActivity | Recent activity entries |
| `listRecent(limit)` | questions | Recent questions (titles, subreddits, urls) — used by QuestionsPreview |
| `listRecent(limit)` | blogs | Recent published blogs |
| `listMetadata(limit)` | briefs | Brief titles + status (no content) — used by BriefsPreview |
| `getPublicBrief(briefId)` | briefs | Single brief with limited fields (title, primaryKeyword, category, status, contentMarkdown, createdAt). Strips sensitive SEO fields (competitiveGap, launchSpaceAngle, finalKeywords, longTailKeywords, icpProblem, suggestedStructure, researchNotes, rankingNotes, sourceUrls). Used by public brief reader modal. |

### Admin Queries (already built)
| Query | Table | Returns |
|-------|-------|---------|
| `fullLog(limit, agentName)` | agentActivity | Full activity log with filter |
| `listFullDetails(limit)` | questions | Questions with scanner analysis |
| `getFullBrief(briefId)` | briefs | Full brief with markdown content |
| `listFull(limit)` | briefs | All briefs with full details |

### New Queries Needed
| Query | Table | Purpose |
|-------|-------|---------|
| `weeklyStats()` | questions, briefs, blogs | Counts for last 7 days (for scoreboard) |
| `allTimeStats()` | questions, briefs, blogs | Total counts (for "all time" below scoreboard) |
| `agentWeeklySummary(agentName)` | questions, briefs, blogs, agentActivity | Per-agent 7-day stats (for expanded panel) |
| `agentTodayActivity(agentName)` | agentActivity | Today's completed + active items (for expanded panel) |
| `communityBreakdown()` | questions | Subreddit grouping with counts (for Communities tab) |

---

## Component Breakdown

```
app/launch-control/
├── page.tsx                           — Server component, route entry
└── layout.tsx                         — Optional layout wrapper

components/launch-control/
├── LaunchControlPage.tsx              — Main client component (3-column orchestrator)
├── HeaderBar.tsx                      — Top bar: title, stats, date, login
│
├── AgentSidebar.tsx                   — Left column: agent list
├── AgentRow.tsx                       — Single agent row in sidebar (avatar, dot, name)
├── AgentExpandedPanel.tsx             — Click-to-open agent detail (modal/panel)
│
├── CenterContent.tsx                  — Center column wrapper (public vs admin routing)
├── Scoreboard.tsx                     — Impact metrics with count-up animation
├── ScoreboardNumber.tsx               — Single animated number with label
├── DailyTimeline.tsx                  — Today's pipeline chronological view
├── TimelineItem.tsx                   — Single timeline entry (completed/active/upcoming)
│
├── CenterTabs.tsx                     — Tab bar (Overview | Communities | Questions | Briefs) — visible to all visitors
├── CommunitiesPanel.tsx               — Admin: subreddit breakdown view
├── CommunitiesPreview.tsx             — Public: placeholder communities with blur overlay
├── QuestionsTable.tsx                 — Admin: scrollable table with frozen header + left column
├── QuestionsPreview.tsx               — Public: top rows with clickable Reddit links + blur overlay
├── BriefsPanel.tsx                    — Admin: brief cards list with filters
├── BriefsPreview.tsx                  — Public: top 3 clickable briefs + blur overlay + public reader modal
├── PreviewGate.tsx                    — Blur overlay wrapper with waitlist CTA form (shared by all preview components)
├── BriefCard.tsx                      — Individual brief card (title, status, metadata)
├── BriefReaderModal.tsx               — Admin: near-fullscreen markdown reader with SEO metadata sidebar
│
├── LiveFeed.tsx                       — Right column: real-time activity log
├── LiveFeedEntry.tsx                  — Single feed entry
├── LiveFeedFilters.tsx                — All/Tasks/Milestones filter tabs
│
├── StatusDot.tsx                      — Green/orange/red animated dot
├── StatusBadge.tsx                    — Status tag badges (pending_review, approved, etc.)
├── CountdownTimer.tsx                 — Live countdown to next agent run
└── FooterCTA.tsx                      — "Want an AI team like this?" CTA
```

---

## Decisions Made

| Question | Decision |
|----------|----------|
| Layout | 3-column: agents sidebar (left), main content (center), live feed (right) |
| Layout reference | Bhanu Teja's Mission Control HQ structure |
| Center content (public) | Scoreboard (impact metrics) + daily timeline (not kanban) |
| Center content (admin) | Tabbed: Overview / Communities / Questions / Briefs |
| Agent sidebar click | Expanded panel (modal/slide-out) with avatar, status, today's work, weekly stats |
| Agent sidebar style | Avatar + status dot + name + role. Minimal but premium feel |
| Brief reader | Near-fullscreen modal with rendered markdown + SEO metadata sidebar |
| Table scrolling | Frozen header row + frozen left column + horizontal/vertical scroll + shadow indicators |
| Scoreboard | Rolling 7-day numbers + smaller "all time" totals below |
| Cost framing | Show both human hours + dollar savings |
| Feed style | Clean log with agent avatars, filter tabs (All/Tasks/Milestones) |
| Header | Product name + key stats + date + login (similar to Mission Control HQ) |
| Admin login | Clerk icon in header, subtle |
| Mobile | Single column, agents as horizontal avatar strip, tables become card layout |
| Data freshness | WebSocket only (Convex subscriptions, no polling) |
| Empty states | Friendly messages referencing next scheduled run time |
| "Coming soon" agents | Same sidebar rows but muted, red dot, no pulse, minimal expanded view |
| Partha's status | "Last active X ago" (no fixed schedule except 7 PM review) |
| Public preview tabs | All 4 tabs visible to non-authenticated visitors. Preview components show top rows of real data with progressive blur + waitlist CTA. Decided Feb 15. |
| Scoreboard toggle | "This Week" / "All Time" toggle replaces static "all time" text below numbers. Decided Feb 15. |
| Public brief reading | Top 3 briefs clickable in preview. Opens public reader modal using `getPublicBrief` (strips sensitive SEO fields). Decided Feb 15. |
| Clickable question titles | Question titles in preview link to original Reddit posts (`target="_blank"`). Proves data is real. Decided Feb 15. |
| Preview blur security | CSS blur is visual only, but backend queries limit to 6 items max. Full tables require authentication. Acceptable risk. Decided Feb 15. |
| Communities preview data | Uses placeholder subreddit names (not real monitored communities) to avoid exposing competitive intelligence. Decided Feb 15. |
| Tab component loading | All tab panel components use `next/dynamic` for lazy loading — prevents webpack compilation hang from static imports. Decided Feb 15. |
| Waitlist in preview gate | PreviewGate includes inline email form posting to `/api/lead` with source `"launch-control-preview-gate"`. Same webhook as homepage modal. Decided Feb 15. |

## Open Questions (Resolved)

1. ~~Partha's schedule~~ → "Last active X ago" + 7 PM due diligence shown in timeline. **Resolved.**
2. ~~Brief teaser for public~~ → Top 3 briefs visible and clickable via `getPublicBrief` (strips SEO metadata). Full brief list + SEO sidebar require admin auth. **Resolved (updated Feb 15).**
3. ~~Public tab visibility~~ → All 4 tabs visible to everyone. Preview vs full components based on auth state. **Resolved Feb 15.**

---

## What's Public vs Private

| Data | Public? | Notes |
|------|---------|-------|
| Questions (titles, subreddits, URLs) | Top 6 rows | Via `listRecent({limit: 6})`. Titles link to Reddit. |
| Brief metadata (titles, status) | Top 6 rows | Via `listMetadata({limit: 6})`. |
| Brief content (markdown) | Top 3 only | Via `getPublicBrief`. Strips: competitiveGap, launchSpaceAngle, finalKeywords, longTailKeywords, icpProblem, suggestedStructure, researchNotes, rankingNotes, sourceUrls. |
| Communities (subreddits monitored) | Placeholder only | CommunitiesPreview uses hardcoded fake subreddit names. Real monitored subreddits are admin-only. |
| Agent statuses | Yes | Public query. |
| Activity feed | Yes | Public query. |
| Scoreboard stats | Yes | Public query (weekly + all-time counts). |
| Full question details (pain points, angles, ICP relevance) | Admin only | Requires Clerk auth. |
| Full brief list + SEO metadata sidebar | Admin only | Requires Clerk auth. |
| Sort/filter/scroll on tables | Admin only | Preview components have no scroll, max 320px height. |

---

## What We're NOT Building (MVP Scope)

- No approve/flag/revision actions on briefs (Phase 2)
- No two-way communication with agents (Phase 2)
- No internal notes/comments on briefs (Phase 2)
- No brief diff/version comparison (Phase 2)
- No editable agent schedules (hardcoded for now)
- No notification system (Krishna checks manually)
- No dark mode toggle (matches site-wide light theme)
- No chat/messaging feature (unlike Mission Control HQ)
- No task assignment/kanban board (agents run on schedules, not task queues)

---

## References

- Backend spec: `live-dashboard-convex.md` (in project root)
- Design system: `.context/design-system-v2.md`
- ICP profile: `.context/thelaunch-space-icp.md`
- Agent data: `lib/agents.ts`
- Convex schema: `convex/schema.ts`
- Convex queries: `convex/questions.ts`, `convex/briefs.ts`, `convex/blogs.ts`, `convex/agentActivity.ts`
- Visual reference: Bhanu Teja's Mission Control HQ (screenshot in conversation, Feb 15 2026)
