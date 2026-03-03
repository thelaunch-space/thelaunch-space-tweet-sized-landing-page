# /your-ai-team — Landing Page v2

## Build Reference Document

**Status:** Approved for implementation
**Last updated:** 2026-03-03
**Route:** `/your-ai-team`
**Goal:** Increase qualified meeting bookings from domain-expert founders (ICP below)

---

## 1. Why We're Revamping

The current page has strong raw material — live stats, agent cards, real output. But three things kill conversion:

1. **The hero CTA sends ready buyers away** (`#how-it-works` instead of `#contact`). A founder who wants to book has no path from the fold.
2. **The headline sells a tactic** ("Your SEO team that never clocks out") not a transformation. The ICP doesn't want an SEO team — they want to stop being invisible without managing anything.
3. **The page reads like modules, not a story.** Each section exists independently. Nothing pulls the reader forward. The ICP's time is the conversion currency — the page has to earn each next second.

Structural issue: the team cards appear *before* any proof. The ICP is introduced to people they don't know yet, before they've decided whether the system works. Proof must come first.

**What stays the same:** Design system, colors, fonts, component styles, animations, live Convex data. This is a copy and structure change only.

---

## 2. Who This Page Talks To

**The ICP in one line:**
Domain-expert founders, 35–50, ex-corporate (consulting, finance, healthcare, legal, education). Running a premium services business ($100K–$2M revenue). Known in their network. Not findable online.

**How they think:**

- Operators and strategists first. They see AI as a tool, not an identity.
- They've used ChatGPT. They know generic output when they see it.
- They process information efficiently. They don't need drama — they need to understand.
- They've been burned by agencies. Skepticism is the default state.
- They trust specificity over claims. Precise description builds more confidence than vivid imagery.

**What they feel when they land on this page:**

- Curiosity mixed with "I've seen this before"
- The underlying frustration: *"I have the expertise. I just don't show up online."*
- The emerging fear (2025): *"My clients are asking ChatGPT and I'm not in the answer."*
- The core objection: *"Will it actually sound like me — or will it embarrass me?"*

**Language they use (not ours):**

- "feast or famine" — when referral pipeline dries up
- "I publish and nothing happens"
- "doesn't sound like me"
- "I paid them for months and nothing changed"
- "I don't have the bandwidth"
- "my clients are sophisticated — they'd notice"

**What they need to believe before they'll book:**

1. This understands my specific problem (not generic content marketing)
2. The output won't embarrass me in front of sophisticated clients
3. I won't have to manage a system or write prompts
4. The person behind this is real and stakes their own reputation on it

---

## 3. Psychological Investment Map

The ICP decides whether to keep reading every 10 seconds. This is how each section earns the next.

**0–3 sec (fold):**
*Trigger:* Recognition — "this is about me"
*Mechanism:* H1 names the identity gap precisely. Live stats animate as they load — real numbers moving can't be looked away from.
*Risk:* If the subhead sounds like agency copy, they're gone.

**3–10 sec (still at fold):**
*Trigger:* Separation — "this might be different"
*Mechanism:* The quality guarantee line: *"Not AI replacing your thinking. Your thinking, working while you work."* — this either creates "wait, explain that" or doesn't. No middle ground.
*Risk:* If the hero image signals "AI tech product," it undercuts the human-first promise.

**10–30 sec (scan):**
*Trigger:* Credibility signals — headlines, proof elements, structure
*Mechanism:* They scroll fast. Section headlines must each carry a full idea. The blog post preview in the hero shows output quality before a word is read. The live stats prove activity.
*Risk:* Any section that looks like filler gets scrolled past and breaks the story.

**30–60 sec (commit to reading):**
*Trigger:* Mechanism clarity — "I understand how this works"
*Mechanism:* How It Works section. This is where language precision matters most. Drama is detected and penalised. Plain description of the mechanism earns trust.
*Risk:* Overwritten body copy signals "marketing," not "operator."

**60–90 sec (evaluating):**
*Trigger:* Output proof — "show me what this produces"
*Mechanism:* Proof section. Real blog post link. Citation discipline (honest framing). Krishna trust block — a real person staking their reputation.
*Risk:* Overclaiming on citations destroys trust. Honest framing of non-determinism is more credible than a strong claim.

**90+ sec (considering):**
*Trigger:* Objection resolution — the FAQ answers the exact questions forming in their head
*Mechanism:* Pricing anchors the value. FAQ handles the AI quality fear directly. "No refunds" signals selectivity, not aggression.
*Risk:* Pressure at this stage loses them. The CTA must feel like permission, not a close.

---

## 4. Design System (Keep As-Is)

All visual decisions carry forward from the existing design system. **No design changes.** Copy change only.


| Element        | Current Spec                                                               | Status                      |
| -------------- | -------------------------------------------------------------------------- | --------------------------- |
| Background     | Off-white base, surface elevation                                          | Keep                        |
| Accent colours | Blue (`accent-blue`), Purple (`accent-purple`), Emerald (`accent-emerald`) | Keep                        |
| Heading font   | Cormorant Garamond (`font-display`)                                        | Keep                        |
| Body font      | Inter                                                                      | Keep                        |
| Mono labels    | JetBrains Mono                                                             | Keep                        |
| Animations     | Framer Motion — fadeIn, whileInView, countUp                               | Keep                        |
| Stats strip    | Live Convex data, count-up animation, pulsing green dot                    | Keep                        |
| Agent cards    | Existing Pokemon/stat card design                                          | Keep — moved to after proof |
| Shadows        | `shadow-card`, `shadow-cta`, `shadow-cta-hover`                            | Keep                        |
| Buttons        | Gradient primary, border secondary                                         | Keep                        |
| Border radius  | `rounded-xl`, `rounded-2xl`                                                | Keep                        |


---

## 5. Hero Image — Recommendation

**Current:** Agent team illustration (Sanjaya, Vibhishana, Parthasarathi, Vyasa, Valmiki)

**Problem with current in the hero:**
The agent characters belong in the Team section — where they're introduced *after* the reader has decided the system works. In the hero, they're strangers. The ICP doesn't know these characters yet. The image communicates "AI product" before the copy has landed "built on your thinking."

**Recommended replacement:**
A styled preview of a **real published blog post** — an actual article card from thelaunch.space: clean title, first line of the article, author byline, category tag, date.

**Why this works psychologically:**

- The reader evaluates it immediately without instruction: *"That title is actually specific. The writing looks real. Is this AI? It doesn't look like slop."*
- That thought sequence is exactly what we need — and the image triggers it before a word of copy is read
- It answers the ICP's core fear ("will it embarrass me?") *visually*, in the first 3 seconds
- It shows the output, not the mechanism — which is what builds desire, not understanding

**Implementation note:**
Pull a real high-performing blog post from `/blogs`. Style it as a clean card — matching the existing blog card design. The realness of the actual content is the proof. Do not create a mock article.

**Fallback if above is too much build:**
Keep the agent team image but reduce its visual prominence — make it secondary to the copy column. The copy should dominate the fold, not the image.

---

## 6. Full Page Copy

### Positioning anchor (internal — not on the page)

> "Content and SEO built around how you think — you review, it runs."
> Every copy decision returns to this sentence.

---

### SECTION 1 — HERO

**Eyebrow (mono label, small caps):**

```
For founders known in their field — but not yet findable online
```

*Why this version: describes the gap (the situation), not the business model. Works for service founders, product founders, any domain expert with an online presence problem. Qualifies the ICP without locking out anyone who fits.*

**H1 (display font, large):**

```
You're the expert in the room.
Your website doesn't show it.
```

**Subhead:**

```
Your clients search for expertise in your field before they hire anyone.
This team makes sure yours is what they find — researched, written,
published in your voice, every day.

You review. Everything else runs.
```

*Why this version: "before they hire anyone" is specific and complete — it names the moment (pre-hire search) without being vague. No negation. No comparison.*

**Quality guarantee (single line, below subhead — positioning statement, not microcopy):**

```
Your thinking, working while you work.
```

*Why this version: removes the negation. "Your thinking, working while you work" says the same thing as "Not AI replacing your thinking. Your thinking..." — but cleaner, more confident. Negation removed.*

**Live stats strip:**

```
● LIVE  What this team has built for thelaunch.space:

[blogs published]  ·  [questions researched]  ·  [hours saved]  ·  [cost saved]

Real numbers. Updated automatically.
```

**Bridge line (small body text, below stats):**

```
That's actual output — running right now.
```

*Why this version: "Not a demo." removed. The positive statement is strong enough on its own.*

**Dashboard nudge (italic, xs, text link — NOT a button):**

```
Watch it work live →
```

*Link: `/launch-control` — whisper level. No agency comparison. The live dashboard is the differentiator — it doesn't need a contrast to land.*

**Primary CTA:**

```
Get my AI team →
```

*href: `#contact` — full gradient button*

**Secondary CTA:**

```
See how it works ↓
```

*href: `#how-it-works` — text link only, no border, no button*

---

### SECTION 2 — HOW IT WORKS

**Section anchor:** `id="how-it-works"`

**Headline:**

```
While you're with clients, they're working on your next one.
```

**Body:**

```
Research starts with what your clients are actually asking — in the communities where they look for help, not in a keyword tool.

Every brief maps what already exists and what's missing from it. The piece is written to fill that gap — your domain, your angle, the depth your clients expect.

You review before anything goes live. That's the only step on your plate.
```

**Scannable mechanism (arrow bullets):**

```
→  Scan real questions your ICP is asking in professional communities right now
→  Map what's already published — and what's shallow or wrong about it
→  Write the piece that fills the gap, built on your domain depth
→  Publish under your name. Monitor. Track every signal it's working.
```

**Closing line:**

```
Your judgment stays in. Everything else runs.
```

**Bridge line:**

```
Here's what that's already produced.
```

---

### SECTION 3 — PROOF

*Three layers in sequence: output quality → citation discipline → the person behind it*

#### 3a — Blog Quality

**Headline:**

```
The writing is the proof.
```

**Body:**

```
Read a post. You'll know within two paragraphs whether it was written by
someone who understood the problem — or by someone who Googled it.

Every piece is built around one question: what would a domain expert say
here that nothing currently out there does? That question is the brief.
That's what separates it from generic output.
```

**CTA:** `Read the blog →` *(links to `/blogs`)*

---

#### 3b — Citation Discipline

**Headline:**

```
Built to be cited. Tracked when it happens.
```

**Body:**

```
Every brief is structured to answer a specific question completely — the kind of depth that AI tools pull from when they respond to queries in your space.

Whether a piece gets cited in Perplexity or ChatGPT is non-deterministic. No one controls that. But the standard we hold every brief to is: if someone asks this question in an AI search tool, is this the best available answer?

We monitor when citations happen. It's the signal, not the guarantee.
```

**[INSERT: Vidura Slack screenshot — citation notification]**

```
A real citation notification. Raw signal, unedited.
```

**Bridge line:**

```
Here's who does this every day.
```

---

#### 3c — Trust Block

**Quote:**

```
"I run this on my own business first.

These agents produce the content on thelaunch.space every day — the same system, the same process, the same review loop I'd run for yours.
I wouldn't put my name on content I didn't stand behind."
```

**Attribution:**

```
— Krishna
```

*Small photo here. The ICP hires people, not products.*

---

### SECTION 4 — MEET YOUR TEAM

**Headline:**

```
Meet your team.
```

**Intro:**

```
Trained on your domain and your ICP. Running every day. Everything surfaces for your review before it goes live.
```

*Agent cards follow — existing component, no changes needed.*

**Bridge line:**

```
Here's what the first four weeks look like.
```

---

### SECTION 5 — TIMELINE

**Headline:**

```
Week 1 to 4 — from call to running.
```


| Week       | What Happens                                                                                                                   | What You See                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| **Week 1** | We learn your domain, your clients, and how you think. Agents configured around your actual business — not a default template. | Your team knows your world.  |
| **Week 2** | First content live under your name. Real research, your voice. You approve before it goes out.                                 | You watch real work happen.  |
| **Week 3** | Output gets sharper as your feedback is built in. Starts sounding like you.                                                    | You review. We calibrate.    |
| **Week 4** | Running independently. You review weekly. Everything else: handled.                                                            | Your content engine is live. |


---

### SECTION 6 — PRICING

**Headline:**

```
Pick your starting point.
```

**Subhead:**

```
Two ways to work together. Both start with a conversation.
```

---

**Tier 1 — Foundation** *(replaces "DIY Kickstart")*

Price: `$299 · one-time`

**Pick this if:** You're hands-on, comfortable following documented systems, and want to own the infrastructure completely. You've built things before and you know how to operate a process once it's set up. You want to start without a monthly commitment and prove it works first.

Description:

```
We configure your entire team — VPS setup, agent wiring, Slack integration,
full documentation. Then it's yours to run.
```

Includes:

- Full VPS setup and configuration
- Agent wiring and Slack channel integration
- Initial agent training on your brand, domain, and ICP
- Complete handoff documentation
- You own and run the system

CTA: `Set up my Foundation →` → `#contact`

---

**Tier 2 — Founder's Partnership**

Price: `$750 first month · then $1,500/mo`
Launch label: `First month $750 · then $1,500/mo`

**Pick this if:** Your time is your scarcest resource. You want the output without managing the system that produces it. You'd rather spend your hours on client work and have someone actively running the quality and strategy loop with you every month.

Description:

```
We work with you actively — reviewing output, updating agent behaviour,
running monthly strategy calls. You run your business. We run the team.
```

Includes:

- Everything in Foundation
- Weekly agent output reviews and updates
- Monthly strategy calls with Krishna
- Pattern analysis and output optimisation
- Direct communication — you talk to the person who built this
- Month 2: your own performance dashboard

CTA: `Talk to us →` → `#contact`

---

**Pricing footnote:**

```
No refunds. We work with founders who've thought this through.
Not sure yet? Book a conversation — that's what it's for.
```

---

### SECTION 7 — CONTACT

**Section anchor:** `id="contact"`

**Headline:**

```
One conversation. No commitment.
```

**Body:**

```
Tell us about your domain and your ideal client. We'll map out what a
content operation looks like for your business — before you've paid anything.
```

**Form fields:**


| Field     | Label                                  | Placeholder                                |
| --------- | -------------------------------------- | ------------------------------------------ |
| Company   | Your firm                              | "Consulting firm, practice, or solo brand" |
| Website   | Website                                | "yoursite.com"                             |
| Challenge | What's your biggest content challenge? | *(dropdown)*                               |
| Contact   | How to reach you                       | *(email / WhatsApp toggle)*                |


**Dropdown options:**

1. "I know I need content. I never make time for it."
2. "I've tried it. The output didn't reflect my expertise."
3. "I haven't started. I don't know where to begin."
4. "I'm already doing content. I need it to do more."

**Submit button:** `Book 20 minutes →`

**Below submit:**

```
20 minutes. No deck. No pressure. You'll know either way.
```

**Confirmation (after submit):**

```
You're in. We'll send a calendar link within 24 hours.
In the meantime — thelaunch.space/launch-control →
```

---

## 7. Objection Handling — FAQ

*Placed as accordion between Pricing and Contact. 6 Q&As.*

---

**Q: Will it actually sound like me — or will it sound like AI?**

Most AI content tools produce the most statistically probable version of your topic. That's generic by design — they average across everything they've seen.

This works differently. The brief for every article is built around how you'd approach the problem — your domain, your ICP, the specific gap in what already exists. Not a template. Your analytical framework, applied to a specific question your prospective clients are actually asking.

You review everything before it goes live. If it doesn't sound right, you say so. That feedback sharpens the output over time.

---

**Q: I'm not technical. Will I actually be able to use this?**

You won't write prompts. You won't touch a server. You won't configure anything.

Your interaction is reviewing what the team surfaces — approving it or giving feedback in Slack. If it's Foundation, we handle the setup completely and hand you a documented system. If it's Founder's Partnership, we handle the ongoing work. Either way, your job is the editorial judgment, not the system.

---

**Q: What if I want to change how it works?**

That's built into the process.

When you give feedback on a piece, it gets incorporated into how future briefs are built. The system is designed to get sharper as you interact with it. In Founder's Partnership, we actively update agent behaviour based on what you're seeing in the output. In Foundation, the documentation maps exactly what controls each outcome. It's not a black box.

---

**Q: What if I become dependent on this forever?**

The content published to your site is yours. Blog posts that go live keep working whether we're engaged or not. The moat you build compounds over time — it doesn't evaporate if we stop.

Dependency is a fair concern when you're locked into an agency's tools or relationships. What gets built here lives on your domain.

---

**Q: How is this different from a content agency?**

Agencies use generalist writers who spend a week on your industry, then move on. Monthly PDFs. Six to twelve months before anything shows. Content that reads like they Googled your topic and summarised the top three results. And $2,000–$5,000/month for the privilege.

This runs every day. Research starts from what your actual ICP is asking in communities right now. Your judgment is in the loop before anything goes live. And you can watch the work happen at /launch-control — not in a report you receive 30 days later.

---

**Q: There are no testimonials. No case studies. Why should I trust this?**

The output is live: thelaunch.space/blogs — researched, written, and published by these agents every day. The dashboard at /launch-control shows the work in real time. The citation monitoring is running. And I run this on my own business before running it on anyone else's.

If you need six months of attribution data from a named client — this isn't the right moment. Come back then. But if you can read the output and evaluate the thinking behind it, that's what's on the table right now.

---

## 8. CTA + UI Copy

### Hero


|                 | Text                                                                       | href              | Style                 |
| --------------- | -------------------------------------------------------------------------- | ----------------- | --------------------- |
| Primary         | `Get my AI team →`                                                         | `#contact`        | Gradient button       |
| Secondary       | `See how it works ↓`                                                       | `#how-it-works`   | Text link, no border  |
| Dashboard nudge | `Most agencies send a monthly report. You can watch this one work live. →` | `/launch-control` | Italic, xs, text link |


### Floating Bar


|           | Text               | Style                              |
| --------- | ------------------ | ---------------------------------- |
| Primary   | `Get my AI team →` | Gradient button                    |
| Secondary | `Watch live`       | Ghost / plain text — de-emphasised |


### Pricing


| Tier                  | Button                   | href       |
| --------------------- | ------------------------ | ---------- |
| Foundation            | `Set up my Foundation →` | `#contact` |
| Founder's Partnership | `Talk to us →`           | `#contact` |


---

## 9. Implementation Checklist

*Copy and structure changes only. In priority order.*

### No structural changes required

- `HookSection.tsx` — primary CTA: `href="#how-it-works"` → `href="#contact"`
- `HookSection.tsx` — secondary CTA: outlined button → text link only
- `HookSection.tsx` — add quality guarantee line below subhead: *"Your thinking, working while you work."*
- `HookSection.tsx` — add text link below stats: *"Watch it work live →"* (links to `/launch-control`)
- `HookSection.tsx` — update eyebrow from `"YOUR AI CONTENT TEAM"` → `"For founders known in their field — but not yet findable online"`
- `HookSection.tsx` — update H1 from `"Your SEO team that never clocks out"` → `"You're the expert in the room. / Your website doesn't show it."`
- `HookSection.tsx` — update subhead with Section 1 version above
- `HookSection.tsx` — update bridge line below stats: `"That's actual output — running right now."`
- `PitchPage.tsx` — floating CTA: demote "Watch live" to ghost/text, one primary action only
- `lib/pitch-data.ts` — `PRICING_TIERS[0].name`: `"DIY Kickstart"` → `"Foundation"`
- `lib/pitch-data.ts` — `PRICING_TIERS[0].cta`: `"Set up my team — $299"` → `"Set up my Foundation →"`
- `lib/pitch-data.ts` — `PRICING_TIERS[0].description`: update with Section 6 Foundation copy above
- `lib/pitch-data.ts` — `CHALLENGE_OPTIONS`: replace with updated 4-option list above
- `HowItWorksSection.tsx` — update headline: `"While you're with clients, they're working on your next one."`
- `HowItWorksSection.tsx` — replace body copy with Section 2 version above (plain, no drama)
- `HowItWorksSection.tsx` — replace closing line: `"Your judgment stays in. Everything else runs."`
- `TimelineSection.tsx` — update headline: `"Week 1 to 4 — from call to running."`
- `TimelineSection.tsx` — update all four week descriptions with Section 5 copy above
- `lib/pitch-data.ts` — update `TIMELINE_STEPS` with new descriptions
- `PricingSection.tsx` — update headline: `"Simple Pricing"` → `"Pick your starting point."`
- `LeadCaptureSection.tsx` — update headline: `"One conversation. No commitment."`
- `LeadCaptureSection.tsx` — update body and submit button copy

### Require new components or reordering

- `PitchPage.tsx` — move `RecentWorkSection` before `TeamSection`
- **New component:** `CitationProofBlock` — Section 3b copy + screenshot placeholder + bridge line. *Requires Vidura screenshot before going live.*
- **Update:** `TrustNudge.tsx` — updated quote + photo slot (Section 3c)
- **New component:** `BlogQualityBlock` — Section 3a copy + "Read the blog →" link
- **New component:** `FaqSection` — 6-item accordion, placed between `PricingSection` and `LeadCaptureSection`
- **Hero image:** Replace agent team illustration with styled blog post card preview (see Section 5 above for rationale and spec)

### Proof assets needed before full launch

- **Required:** Vidura Slack screenshot — citation notification from #vidura-seo-strategy → for `CitationProofBlock`
- **Recommended:** Krishna headshot → for `TrustNudge`
- **Verify:** "7 spots left" urgency ribbon — confirm count is accurate before keeping

---

## 10. Alternate Headlines (A/B)

**A — Identity gap (chosen):**
*"You're the expert in the room. Your website doesn't show it."*
Immediate recognition for all ICP archetypes.

**B — Voice-first:**
*"Content that sounds like you wrote it — because it's built on how you think."*
Leads with the quality fear. More effective if AI-slop anxiety is the primary objection.

**C — Referral trap:**
*"You built your reputation client by client. Online, you're starting from zero."*
More emotional. Better for cold LinkedIn traffic where the referral anxiety is the entry point.

## Alternate CTAs

**A:** `Get my AI team →` *(chosen — ownership framing)*
**B:** `Book 20 minutes →` *(lower friction, sets expectations)*
**C:** `Start with a conversation →` *(soft close — for skeptical ICP)*