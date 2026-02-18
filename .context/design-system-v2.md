# Design System v2 — thelaunch.space

Last updated: 2026-02-16

---

## 1. Brand Color System

### Primary Palette (Tailwind tokens in `tailwind.config.js`)

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#F9F9F9` | Page base — warm off-white, not sterile |
| `surface` | `#FFFFFF` | Cards, elevated panels — pure white for pop |
| `surface-alt` | `#F5F5F4` | Secondary surfaces, stat boxes, alternating sections |
| `text-primary` | `#1A1A1A` | Headings, body copy — near-black, not pure black |
| `text-secondary` | `#6B7280` | Captions, labels, supporting text |
| `border-color` | `#E5E5E5` | Card borders, dividers |
| `accent-blue` | `#003DA5` | Primary brand accent — CTAs, links, hero highlights |
| `accent-purple` | `#6D28D9` | Secondary brand accent — gradient partner with blue |
| `accent-emerald` | `#5A9A80` | Success states, Vibhishana's color |
| `accent-amber` | `#D97706` | Warning/attention, Sanjaya's color |
| `accent-rose` | `#E11D48` | Energy/urgency, Valmiki's color |

### Shadow System (Tailwind `boxShadow` tokens)

**All shadows use colored tints** (blue-gray `rgba(50,50,93,...)` or navy `rgba(15,23,42,...)` or brand blue `rgba(0,61,165,...)`) instead of pure black `rgba(0,0,0,...)`. This makes shadows feel like real light — a technique borrowed from Stripe. CTA shadows are tinted with accent-blue for brand cohesion.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-card` | `0 1px 2px rgba(15,23,42,0.06), 0 4px 12px rgba(50,50,93,0.08)` | Default card elevation |
| `shadow-card-hover` | `0 2px 4px rgba(15,23,42,0.08), 0 8px 24px rgba(50,50,93,0.12)` | Hovered cards |
| `shadow-nav` | `0 1px 0 rgba(15,23,42,0.04)` | NavBar at rest |
| `shadow-nav-scroll` | `0 1px 2px rgba(15,23,42,0.06), 0 8px 24px rgba(50,50,93,0.06)` | NavBar after scroll |
| `shadow-slab` | `0 1px 2px rgba(15,23,42,0.04), 0 2px 8px rgba(50,50,93,0.06), 0 8px 24px rgba(50,50,93,0.04)` | NavBar container, dropdown menus |
| `shadow-cta` | `0 2px 4px rgba(0,61,165,0.25), 0 8px 20px rgba(0,61,165,0.2), 0 20px 48px rgba(0,61,165,0.15)` | CTA buttons (brand-blue tinted) |
| `shadow-cta-hover` | `0 4px 8px rgba(0,61,165,0.3), 0 12px 28px rgba(0,61,165,0.25), 0 28px 56px rgba(0,61,165,0.18)` | CTA buttons on hover |

### Texture & Atmosphere

- **Noise grain overlay**: SVG feTurbulence on `body::before`, 4% opacity, fixed position, z-9999, pointer-events none. Adds organic warmth to flat surfaces.
- **Hero radial gradient**: `radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,61,165,0.035) 0%, transparent 70%)` — subtle blue atmosphere behind hero content (uses accent-blue #003DA5 at 3.5% opacity).
- **CTA glass effect**: `ring-1 ring-white/20 ring-inset` on gradient buttons for depth.

---

## 2. Typography

### Font Stack

| Role | Font | Variable | Notes |
|------|------|----------|-------|
| Display (headings) | Cormorant Garamond | `--font-display` | Serif. Weights: 400, 500, 600, 700. Editorial luxury feel. |
| Body (sans) | Inter | `--font-sans` | Clean readability for body text. |
| Mono (labels) | JetBrains Mono | `--font-mono` | Used in `.meta-label` utility (10px, 0.12em tracking, uppercase). |

### Spacing Rules

| Element | Letter Spacing |
|---------|---------------|
| `h1` | `-0.03em` |
| `h2`, `h3` | `-0.02em` |
| `.meta-label` / `.label-caps` | `0.12em` (uppercase) |

### Sizing (Hero)

- Headline: `clamp(2.75rem, 7vw, 5.25rem)` — fluid, no breakpoint jumps
- Headline secondary line: `clamp(1.9rem, 4vw, 3.25rem)` — italic, font-normal, text-secondary
- Subheadline: `clamp(1.25rem, 2.5vw, 1.625rem)` — font-normal, leading-relaxed, text-secondary

---

## 3. Design Philosophy — "Quiet Luxury"

The site feels expensive without trying. No neon gradients, no animated borders, no "techy" cliches.

**Principles:**
- **Elevation over borders**: Cards use shadow-card, not heavy borders. Borders are 60% opacity max.
- **Atmosphere over decoration**: Radial gradients and noise grain create depth without adding "stuff."
- **Weight contrast**: One bold element per section. Everything else recedes.
- **Surface hierarchy**: background (#F9F9F9) < surface-alt (#F5F5F4) < surface (#FFFFFF) — three layers of white.
- **Restraint in motion**: Framer Motion used sparingly. Hover states are subtle lift (-translate-y-0.5) + shadow deepening. No bouncing, no spinning.
- **Choreographed entrance**: Hero content uses staggered CSS `heroReveal` animations (translateY 20px → 0, 0.9s with custom ease). Five stages at 100ms intervals: `.hero-entrance-1` through `.hero-entrance-5`. Creates a deliberate, flowing reveal.
- **Section labels**: `.meta-label` utility (JetBrains Mono, 10px, 0.12em tracking, uppercase) used for section identifiers like "Trusted by founders at" and "Services & Pricing."
- **Pills as surface elements**: Credential pills use `bg-surface` + `border-border-color/80` + `shadow-card` — elevated white on warm background, not flat colored badges.

---

## 4. Nano Banana Pro — Avatar Prompts

### Prompting Best Practices (NBP-Specific)

Based on research from [Imagine.art NBP Guide](https://www.imagine.art/blogs/nano-banana-pro-prompt-guide), [Atlabs Ultimate NBP Guide](https://www.atlabs.ai/blog/the-ultimate-nano-banana-pro-prompting-guide-mastering-gemini-3-pro-image), and [Google DeepMind blog](https://blog.google/innovation-and-ai/products/nano-banana-pro/).

**Prompt Structure**: `[Subject + Adjectives] doing [Action], [Style/Media], [Background], [Composition]`

**Key Rules for These Avatars:**
1. Target "adult animated series" style — NOT chibi, NOT baby-face, NOT toy figurine
2. Solid glowing eyes with NO pupils (like the reference art) — pure color glow
3. Mature adult faces with angular features, jawlines, facial hair where specified
4. Normal adult body proportions — NOT exaggerated heads or chibi proportions
5. Rich warm saturated color palette, detailed clothing textures with visible patterns
6. White background with subtle shadow for standalone character presentation
7. Simple confident poses: arms crossed, thumbs up, pointing, etc.
8. **Each prompt is fully self-contained** — copy-paste one at a time into a fresh Gemini NBP session
9. If regenerating one agent, upload a completed avatar as reference and add "match this exact art style"

---

### Prompt 1 of 7: Parthasarathi (Operations Orchestrator)

```
A digital illustration of an Indian man in his mid-30s, drawn in the style of a high-quality adult animated series or modern comic book. This character is inspired by the mythological Parthasarathi (Lord Krishna as Arjuna's charioteer) reimagined as a modern digital operations manager who coordinates a team of AI agents.

Face and body: Adult male with warm dark brown skin, clean-shaven, strong angular jawline, confident knowing smile. His eyes are solid glowing bright blue with no visible pupils — just pure luminous blue glow, like an AI consciousness. Neatly styled dark black hair with a small ornamental peacock feather tucked behind one ear. Adult proportions — tall, broad-shouldered, athletic build. Mature face, not baby-faced or childlike.

Clothing: Deep navy blue blazer over a white Indian kurta. The kurta fabric has faint blue circuit-board trace patterns embroidered on it. Open collar, no tie. A blue corporate lanyard around his neck with a small holographic ID badge that glows faintly blue.

Pose: Standing confidently with arms crossed over his chest, slight knowing head tilt to one side. A small floating holographic status panel hovers beside his right shoulder showing tiny green and amber status dots.

Art style: High-quality digital illustration in the style of an adult animated series like Arcane or a premium Indian comic book. Warm vibrant saturated colors. Detailed clothing textures and fabric folds. Clean bold linework. Rich warm color palette with oranges, blues, and golds. The character should look mature, capable, and authoritative — NOT cute, NOT chibi, NOT like a children's cartoon. This is a grown man who runs operations.

Background: Solid pure white background with no environment or scene. A soft subtle drop shadow beneath his feet so he appears to be standing on the white surface.

Composition: Full body visible from head to feet. Character centered in frame. High detail, 4K resolution.
```

---

### Prompt 2 of 7: Sanjaya (Lead Intelligence Scout)

```
A digital illustration of an Indian man in his late 20s, drawn in the style of a high-quality adult animated series or modern comic book. This character is inspired by the mythological Sanjaya (the narrator in the Mahabharata who was blessed with divine sight — divya drishti — and could see the entire Kurukshetra battlefield from a palace room) reimagined as a modern digital intelligence scout who finds sales leads and prospects before anyone else.

Face and body: Adult male with medium brown skin, sharp angular features, thin well-groomed dark beard, intense focused expression. His eyes are solid glowing amber-gold with no visible pupils — just pure luminous gold glow, like a scanning radar. Dark hair slicked back neatly with a thin gold circlet band across his forehead — a modern tech visor representing his divine sight. Adult proportions — lean, athletic build, alert posture. Mature face with sharp cheekbones.

Clothing: A fitted amber-gold accented vest over a crisp white shirt. The shirt fabric has faint radar-wave concentric line patterns on it. Sleeves rolled up to the elbows — he's working. No tie, no lanyard — he travels light and moves fast.

Pose: Standing in a dynamic confident stance, one hand raised to his forehead shielding his eyes like a scout scanning the horizon. Other hand resting on his hip. Slight forward lean — hawk-like alertness. A small floating golden radar-ping ripple emanates near his gold circlet visor.

Art style: High-quality digital illustration in the style of an adult animated series like Arcane or a premium Indian comic book. Warm vibrant saturated colors. Detailed clothing textures and fabric folds. Clean bold linework. Rich warm color palette with golds, ambers, and warm whites. The character should look sharp, intense, and dangerous in a professional way — NOT cute, NOT chibi, NOT like a children's cartoon. This is a grown man who hunts opportunities.

Background: Solid pure white background with no environment or scene. A soft subtle drop shadow beneath his feet so he appears to be standing on the white surface.

Composition: Full body visible from head to feet. Character centered in frame. High detail, 4K resolution.
```

---

### Prompt 3 of 7: Valmiki (Social Content Strategist)

```
A digital illustration of an Indian sage-figure in his late 50s, drawn in the style of a high-quality adult animated series or modern comic book. This character is inspired by the mythological Valmiki (the Adi Kavi — the first poet — the sage who authored the Ramayana, invented the shloka verse form, and transformed from a bandit into the greatest storyteller in history) reimagined as a modern digital social media content strategist who writes posts in his client's authentic voice.

Face and body: Older adult male with light-medium brown skin, distinguished weathered face with deep expression lines that tell a story, a long well-groomed silver-streaked dark beard (neat and shaped, not wild). Expressive arched eyebrows, a warm knowing half-smile — a man who has seen everything and can put it into words. His eyes are solid glowing rose-crimson with no visible pupils — just pure luminous crimson glow. Long silver-streaked dark hair tied back in a loose knot with a crimson-rose thread. Adult proportions — solid grounded build, relaxed but dignified posture. Mature wise face with deep character.

Clothing: A deep burgundy-rose kurta with faint text, letterforms, and typography patterns subtly woven into the fabric. A cream-colored woven shawl draped across his left shoulder — the sage's traditional garment, modernized with faint social media iconography patterns woven in. No lanyard, no corporate accessories — he carries authority through presence alone.

Pose: Standing in a relaxed wise pose with weight shifted to one hip, grounded and calm. One hand giving a confident thumbs up. Other hand holding a glowing rose-colored digital quill pen at his side. A few small floating text bubbles and social media post cards hover around him — ancient storytelling reimagined for the feed.

Art style: High-quality digital illustration in the style of an adult animated series like Arcane or a premium Indian comic book. Warm vibrant saturated colors. Detailed clothing textures and fabric folds. Clean bold linework. Rich warm color palette with burgundies, roses, creams, and warm tones. The character should look wise, charismatic, and venerable — NOT cute, NOT chibi, NOT like a children's cartoon. This is an ancient sage who now writes for social media.

Background: Solid pure white background with no environment or scene. A soft subtle drop shadow beneath his feet so he appears to be standing on the white surface.

Composition: Full body visible from head to feet. Character centered in frame. High detail, 4K resolution.
```

---

### Prompt 4 of 7: Vibhishana (Research Intelligence Analyst)

```
A digital illustration of an Indian man in his mid-30s, drawn in the style of a high-quality adult animated series or modern comic book. This character is inspired by the mythological Vibhishana (the righteous brother of Ravana in the Ramayana who saw the truth others refused to see, left Lanka, and chose integrity over blind loyalty) reimagined as a modern digital research intelligence analyst who monitors online communities and extracts real pain points hidden beneath surface chatter.

Face and body: Adult male with deep dark brown skin, strong high cheekbones, clean-shaven, calm composed thoughtful expression. His eyes are solid glowing emerald-green with no visible pupils — just pure luminous green glow, like truth-detecting sensors. Close-cropped dark hair with a small gold crown-like headband with a tiny emerald gem in the center — his royal heritage reimagined as a sleek modern tech accessory. Adult proportions — tall, upright, dignified build. Mature face with strong noble features.

Clothing: An emerald green button-up shirt with subtle circuit-trace patterns on the fabric, open collar. A dark structured vest/waistcoat over it. An orange-gold tie for color accent. A professional over-ear headset sitting on one ear, slightly tilted — he's always listening to community signals.

Pose: Standing in a confident upright dignified stance. One hand holding a clipboard/tablet showing colorful data charts and research clusters. Other hand raised to adjust his headset earpiece — actively monitoring. Head slightly tilted with a knowing expression. Small green data stream particles flowing toward him.

Art style: High-quality digital illustration in the style of an adult animated series like Arcane or a premium Indian comic book. Warm vibrant saturated colors. Detailed clothing textures and fabric folds. Clean bold linework. Rich warm color palette with emerald greens, golds, and deep browns. The character should look dignified, intelligent, and quietly powerful — NOT cute, NOT chibi, NOT like a children's cartoon. This is a grown man who sees through noise to find truth.

Background: Solid pure white background with no environment or scene. A soft subtle drop shadow beneath his feet so he appears to be standing on the white surface.

Composition: Full body visible from head to feet. Character centered in frame. High detail, 4K resolution.
```

---

### Prompt 5 of 7: Vyasa (SEO Blog Writer)

```
A digital illustration of an Indian sage-figure in his 50s, drawn in the style of a high-quality adult animated series or modern comic book. This character is inspired by the mythological Vyasa (the legendary compiler of the Mahabharata — the longest epic ever written — who also compiled the Vedas and authored the Puranas, the ultimate long-form content creator) reimagined as a modern digital SEO blog writer who turns raw research into authoritative content that ranks in search engines.

Face and body: Older adult male with light fair-brown skin, distinguished weathered face with deep wisdom lines, long well-groomed silver-white beard (neat, not wild), three horizontal ash marks (tripundra) painted across his forehead — his signature mark. His eyes are solid glowing violet-purple with no visible pupils — just pure luminous violet glow, like ancient knowledge digitized. Long silver-white hair tied in a majestic high bun (jata) secured with a glowing violet hair tie. Adult proportions — broad-shouldered, solid grounded presence. Mature wise face that commands respect.

Clothing: A white Indian kurta with subtle purple circuit-board line patterns on the fabric. An orange-saffron shawl draped across his left shoulder and torso — the sage's traditional garment, modernized with faint digital patterns. A corporate lanyard around his neck with a purple-glowing holographic ID badge. Reading glasses pushed up on his forehead.

Pose: Standing in a wise serene pose with arms crossed and a knowing calm half-smile. Grounded and solid. A few faint floating Sanskrit-like glyphs and ancient script symbols hover near him, some visually transforming into modern HTML code tags — ancient knowledge transcribed across ages.

Art style: High-quality digital illustration in the style of an adult animated series like Arcane or a premium Indian comic book. Warm vibrant saturated colors. Detailed clothing textures and fabric folds. Clean bold linework. Rich warm color palette with purples, saffron-oranges, and warm whites. The character should look wise, powerful, and venerable — NOT cute, NOT chibi, NOT like a children's cartoon. This is an ancient sage who now writes for the internet.

Background: Solid pure white background with no environment or scene. A soft subtle drop shadow beneath his feet so he appears to be standing on the white surface.

Composition: Full body visible from head to feet. Character centered in frame. High detail, 4K resolution.
```

---

### Prompt 6 of 7: Vidura (SEO Intelligence Strategist)

```
A digital illustration of an Indian man in his mid-30s, drawn in the style of a high-quality adult animated series or modern comic book. This character is inspired by the mythological Vidura (the wise counselor of the Kuru court in the Mahabharata — the man who saw the truth when kings were blinded by ego, who gave strategic counsel that could have prevented the entire war, the sharpest political mind in the epic) reimagined as a modern digital SEO intelligence strategist who analyzes data, spots patterns others miss, and tells the content pipeline exactly where to aim for maximum impact.

Face and body: Adult male with medium-dark brown skin, clean-shaven with a sharp jawline, high intelligent forehead, calm calculating expression — the face of a man who has already thought three moves ahead. His eyes are solid glowing deep teal-cyan with no visible pupils — just pure luminous teal glow, like a data visualization rendered in light. Neatly styled dark black hair cropped short on the sides and slightly longer on top — clean, precise, no-nonsense. Adult proportions — lean, composed, upright build. Mature face with sharp observant features. A thin teal-glowing line traces from his temple down his jawline on one side — a subtle neural interface mark, like strategy flows directly through him.

Clothing: A fitted charcoal-gray Nehru jacket (bandhgala) with faint teal data-grid line patterns woven into the fabric — structured, sharp, authoritative. Underneath, a dark navy mandarin-collar shirt, buttoned to the top — precise and deliberate. A thin teal pocket square folded into a crisp triangle in the jacket breast pocket. No lanyard, no shawl, no loose accessories — everything on this man is tight, intentional, and controlled.

Pose: Standing in a deliberate strategist's stance — one hand raised to his chin, thumb along the jawline, index finger resting against his temple in a classic evaluating gesture. His other arm is folded behind his back, resting at the small of his waist — composed, patient, unhurried. Weight shifted slightly to one leg, subtle head tilt as if studying something only he can see. A faint holographic chess-board grid floats at waist level beside him, with a few glowing teal data nodes connected by thin lines — a strategy map being assembled in real time.

Art style: High-quality digital illustration in the style of an adult animated series like Arcane or a premium Indian comic book. Warm vibrant saturated colors. Detailed clothing textures and fabric folds. Clean bold linework. Rich warm color palette with deep teals, charcoal grays, and dark navies accented by warm skin tones. The character should look sharp, calculated, and quietly commanding — NOT cute, NOT chibi, NOT like a children's cartoon. This is a grown man who sees the entire board while everyone else is staring at one piece.

Background: Solid pure white background with no environment or scene. A soft subtle drop shadow beneath his feet so he appears to be standing on the white surface.

Composition: Full body visible from head to feet. Character centered in frame. High detail, 4K resolution.
```

---

## 5. Avatar Usage Guidelines

### On the Website
- **Agent index page** (`/build-your-ai-team`): Show all 5 avatars at card size (~280px wide). Current fallback is initials — replace with these renders.
- **Agent detail pages** (`/build-your-ai-team/[agent]`): Hero-size avatar (~400-500px) alongside agent name and role.
- **File naming**: Two avatar directories exist:
  - `public/agents/{agent-id}.png` — referenced by `lib/agents.ts` → `avatarPath` (used by AgentCard, detail pages)
  - `public/agent-avatars/{agent-id}.png` — referenced by LiveFeed in Launch Control dashboard
  - Both directories contain the same 5 agent PNGs. Keep both in sync when updating avatars.
- **Background**: All avatars should be on transparent or white background. The drop shadow in the prompt ensures they look "placed" on the white card surfaces.

### For Social Media
- Crop to square (1:1) for profile-style usage in LinkedIn/X posts
- Can use as standalone character cards with name + role text overlay

### Style Consistency Tips
- Generate all 5 in one session if possible to maintain style coherence
- If generating across separate sessions, upload a completed avatar as a reference image and add "match this exact art style" to the next prompt
- If NBP drifts toward photorealism, add "NOT photorealistic, NOT realistic rendering" to the prompt

---

## 6. Page Layout Patterns

### Content Widths

| Page | Container | Notes |
|------|-----------|-------|
| NavBar | `max-w-[1200px]` | Consistent across all pages |
| Blog index (`/blogs`) | `max-w-6xl` (1152px) | Inline title row + category pills, horizontal card rows |
| Blog posts | `max-w-6xl` (1152px) | Article wrapper — matches blog index width for consistency |
| Blog category pages | `max-w-6xl` (1152px) | Same as blog posts |
| AI Employees index | varies | Card grid layout |

### NavBar CTA Behavior
- On `/blogs/*` pages, a CTA button ("Get Your Launch Roadmap") appears in the NavBar after scrolling 100px
- Button uses `rounded-xl` to match the NavBar container's border radius (NOT `rounded-full`)
- Gradient: `from-accent-blue to-accent-purple` (same as all CTAs site-wide)
- On mobile: social icons (X, LinkedIn) hide to make room; on desktop: both coexist
- Animation: fade-in + slide from right on appear

### CTA Button Style (Site-Wide)
- Corner radius: `rounded-xl` (matching container radius, NOT pill-shaped `rounded-full`)
- Gradient: `bg-gradient-to-r from-accent-blue to-accent-purple`
- Shadow: `shadow-cta` at rest, `shadow-cta-hover` on hover
- Hover: `-translate-y-0.5` subtle lift

---

## 7. Logo Reference

The thelaunch.space logo is a **diamond/rhombus shape** with a **cyan-to-royal-blue gradient** (light blue at top → deep blue at bottom). It represents speed, precision, and launch trajectory. The brand colors (accent-blue #003DA5, accent-purple #6D28D9) are derived from this gradient range.

---

## 8. Team Hero Image — Avatar Group Shot

### Usage
- Hero image for `/hire-your-24x7-team` pitch page
- File: `public/agents/team-hero.png`
- Should sit on the page's `#F9F9F9` background with no visible edge — pure white blends in

### How to Generate
1. Upload all 5 individual agent avatar PNGs as reference images
2. Tell the model: "Use these exact characters — preserve their faces, clothing, colors, accessories, and art style exactly as shown. Generate a new group image with all five together."
3. Then paste the prompt below

### Prompt 7 of 7: Team Hero (Group Shot)

```
Using the five uploaded character reference images exactly as they are — same faces, same clothing, same colors, same accessories, same art style — create a new group illustration of all five standing together as a team.

They are standing on a minimal pure white circular disc platform — like a subtle elevated stage. The disc has a very faint blue-gray gradient edge to give it depth. Below the disc, soft diffused drop shadows from each character fall on the white ground — natural and grounded, not harsh.

Character placement from left to right:

1. SANJAYA (gold eyes, gold circlet visor, amber vest, scout pose with hand at forehead) — far left, alert forward lean

2. VIBHISHANA (green eyes, emerald shirt, dark vest, gold crown headband, holding clipboard tablet) — left of center, upright dignified stance

3. PARTHASARATHI (blue eyes, navy blazer, white kurta, peacock feather, blue lanyard) — CENTER, standing slightly forward of the group as the leader, arms crossed, confident knowing smile

4. VYASA (purple eyes, silver-white beard, tripundra forehead marks, white kurta, saffron shawl) — right of center, arms crossed, serene calm presence

5. VALMIKI (crimson eyes, silver-streaked beard, burgundy-rose kurta, cream shawl, thumbs up, holding rose quill) — far right, relaxed wise stance

Group composition: Parthasarathi is center and slightly forward as the leader. The other four flank him in a loose confident V-formation. They are spaced naturally — not shoulder-to-shoulder cramped, but close enough to feel like a tight team. Each character has their distinct pose and energy but they all face forward toward the viewer.

Platform: Minimal pure white circular disc. Very faint blue-gray gradient edge for depth. Soft diffused shadows falling below — like real people standing under soft overhead lighting.

Art style: Match the exact art style of the uploaded reference images. High-quality adult animated series style. Warm vibrant saturated colors. Detailed clothing textures. Clean bold linework. All characters look mature, capable, professional — NOT cute, NOT chibi, NOT cartoon for children.

Background: Solid pure white. No environment, no scene, no gradient, no decorative elements. Only the five characters, the white disc platform, and their soft shadows.

Composition: Wide horizontal format (roughly 16:9 or 2:1 aspect ratio). All five characters fully visible from head to feet. Group centered in frame. High detail, 4K resolution.
```

### Troubleshooting
- If the model changes character faces or clothing, re-upload the individual avatars and emphasize "preserve these exact characters, do not change any details"
- If it drifts toward photorealism, add "NOT photorealistic, NOT realistic rendering — match the uploaded art style exactly"
- If proportions go chibi/cute, add "Adult proportions only, mature faces, NOT exaggerated heads"
- If the white disc doesn't appear, try "standing on a circular white pedestal platform with a soft shadow beneath"
