# Blog Style Reference

> Code template, design tokens, and complete example for blog pages on thelaunch.space.

---

## What's Fixed vs Flexible

**FIXED (use exactly as shown — required for SEO and deployment):**
- The `metadata` export structure (Section: Page Template, Part 1)
- The `jsonLd` object structure (Section: Page Template, Part 2)
- The `import type { Metadata } from "next"` import
- The `<script type="application/ld+json">` tag in the component
- The outer page wrapper: `<div className="min-h-screen bg-background text-text-primary">`
- The back link header: `← thelaunch.space` linking to `/`
- A footer CTA linking to `/`
- Design tokens (colors, fonts) listed below

**FLEXIBLE (adapt to fit the content):**
- Blog length — short or long, whatever the content needs
- Number of sections, headings, lists, callouts — compose freely
- Order of content blocks — arrange however reads best
- Number and placement of internal links — link to `/`, other blog posts, external sites
- Footer CTA wording — tailor to the post topic (but always link to `/`)
- Tone — technical, conversational, listicle, narrative. Match the content.

The building blocks below are your toolkit. Compose them in any order and combination.

---

## Design Tokens (Tailwind CSS)

### Colors
| Class | Hex | Use |
|-------|-----|-----|
| `bg-background` | `#101018` | Page background |
| `text-text-primary` | `#F0F0F0` | Main text, headings |
| `text-text-secondary` | `#a1a1aa` | Body text, secondary info |
| `text-accent-blue` | `#2563EB` | Links, accents |
| `bg-border-color` | `#27272a` | Borders, dividers, callout backgrounds |
| `from-accent-blue` | `#2563EB` | CTA button gradient start |
| `to-accent-purple` | `#7C3AED` | CTA button gradient end |

### Fonts
| Class | Font | Applied to |
|-------|------|-----------|
| `font-sans` | Sora | Body text (default, no class needed) |
| `font-display` | Syne | Headings h1/h2/h3 (auto-applied via CSS) |

### Typography Sizes
| Element | Classes |
|---------|---------|
| h1 | `text-3xl md:text-5xl font-bold leading-tight` |
| h2 | `text-2xl md:text-3xl font-bold mt-12 mb-4` |
| h3 | `text-xl md:text-2xl font-bold mt-8 mb-3` |
| Body paragraph | `text-base md:text-lg text-text-secondary leading-relaxed mb-6` |
| Opening paragraph | `text-lg text-text-secondary leading-relaxed mb-6` |
| Meta/small text | `text-sm text-text-secondary` |

---

## Page Template

Every blog `page.tsx` follows this exact structure:

```tsx
import type { Metadata } from "next";

// ─── 1. METADATA (SEO) ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "POST_TITLE | thelaunch.space",
  description: "POST_DESCRIPTION_150_TO_160_CHARS",
  openGraph: {
    title: "POST_TITLE | thelaunch.space",
    description: "POST_DESCRIPTION_150_TO_160_CHARS",
    url: "https://thelaunch.space/blogs/TOPIC_SLUG/POST_SLUG",
    siteName: "thelaunch.space",
    type: "article",
    publishedTime: "YYYY-MM-DDT00:00:00.000Z",
    authors: ["thelaunch.space"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "POST_TITLE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "POST_TITLE | thelaunch.space",
    description: "POST_DESCRIPTION_150_TO_160_CHARS",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://thelaunch.space/blogs/TOPIC_SLUG/POST_SLUG",
  },
};

// ─── 2. JSON-LD STRUCTURED DATA ────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "POST_TITLE",
  description: "POST_DESCRIPTION_150_TO_160_CHARS",
  url: "https://thelaunch.space/blogs/TOPIC_SLUG/POST_SLUG",
  datePublished: "YYYY-MM-DDT00:00:00.000Z",
  dateModified: "YYYY-MM-DDT00:00:00.000Z",
  author: {
    "@type": "Organization",
    name: "thelaunch.space",
    url: "https://thelaunch.space",
  },
  publisher: {
    "@type": "Organization",
    name: "thelaunch.space",
    url: "https://thelaunch.space",
    logo: {
      "@type": "ImageObject",
      url: "https://thelaunch.space/logo.png",
    },
  },
  image: "https://thelaunch.space/og-image.png",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://thelaunch.space/blogs/TOPIC_SLUG/POST_SLUG",
  },
};

// ─── 3. PAGE COMPONENT ─────────────────────────────────────────────
export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background text-text-primary">
        {/* Back link */}
        <header className="max-w-6xl mx-auto px-6 md:px-8 pt-8 md:pt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm font-medium transition-colors"
          >
            ← thelaunch.space
          </a>
        </header>

        {/* Article */}
        <article className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            POST_TITLE
          </h1>

          <div className="flex items-center gap-3 text-sm text-text-secondary mb-10">
            <span>thelaunch.space</span>
            <span>·</span>
            <time dateTime="YYYY-MM-DD">Mon DD, YYYY</time>
            <span>·</span>
            <span>X min read</span>
          </div>

          {/* === BLOG CONTENT STARTS HERE === */}

          {/* Opening paragraph (slightly larger) */}
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            ...
          </p>

          {/* Section heading */}
          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">
            ...
          </h2>

          {/* Body paragraph */}
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            ...
          </p>

          {/* Subsection heading */}
          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            ...
          </h3>

          {/* Bullet list */}
          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li>...</li>
          </ul>

          {/* Numbered list */}
          <ol className="list-decimal list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li>...</li>
          </ol>

          {/* Callout / highlight box */}
          <div className="bg-border-color/30 border border-border-color rounded-xl p-6 my-8">
            <p className="text-text-primary font-medium">
              Key takeaway or quote here.
            </p>
          </div>

          {/* Inline link (must link to / at least once) */}
          <a href="/" className="text-accent-blue hover:underline">
            thelaunch.space
          </a>

          {/* === BLOG CONTENT ENDS HERE === */}
        </article>

        {/* Footer CTA (always include) */}
        <footer className="max-w-6xl mx-auto px-6 md:px-8 pb-16">
          <div className="border-t border-border-color pt-10">
            <p className="text-text-secondary mb-4">
              Have an idea? We ship MVPs in 21 days.
            </p>
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-10 text-base font-semibold text-white shadow-[0_20px_35px_rgba(37,99,235,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Get Your Launch Roadmap
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
```

Replace all `POST_TITLE`, `POST_DESCRIPTION_150_TO_160_CHARS`, `TOPIC_SLUG`, `POST_SLUG`, and `YYYY-MM-DD` placeholders with actual values.

**Note:** The template above shows a typical layout. The header (back link), outer wrapper, and footer CTA are fixed. Everything between `=== BLOG CONTENT STARTS HERE ===` and `=== BLOG CONTENT ENDS HERE ===` is flexible — compose it using the building blocks below in whatever order and quantity the content needs.

---

## Content Building Blocks

These are your composable pieces. Mix, match, and repeat as needed. Copy the Tailwind classes exactly.

### Paragraph
```tsx
<p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
  Text here.
</p>
```

### Bold text within paragraphs
```tsx
<span className="text-text-primary font-semibold">bold text</span>
```

### Inline link
```tsx
<a href="/" className="text-accent-blue hover:underline">link text</a>
```

### External link
```tsx
<a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">link text</a>
```

### Bullet list
```tsx
<ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
  <li>Item one</li>
  <li>Item two</li>
</ul>
```

### Numbered list
```tsx
<ol className="list-decimal list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
  <li>Step one</li>
  <li>Step two</li>
</ol>
```

### Callout box
```tsx
<div className="bg-border-color/30 border border-border-color rounded-xl p-6 my-8">
  <p className="text-text-primary font-medium">
    Important point or quote here.
  </p>
</div>
```

### Horizontal divider
```tsx
<hr className="border-border-color my-10" />
```

### Link to another blog post (cross-linking)
```tsx
<p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
  Related:{" "}
  <a href="/blogs/topic-slug/other-post-slug" className="text-accent-blue hover:underline">
    Title of the Other Post
  </a>
</p>
```

### Mid-post CTA (use when it fits the content naturally)
```tsx
<div className="bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-6 my-8 text-center">
  <p className="text-text-primary font-medium mb-3">
    Custom CTA message tailored to this post.
  </p>
  <a
    href="/"
    className="inline-flex h-10 items-center justify-center rounded-full bg-accent-blue px-8 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
  >
    Get Your Launch Roadmap
  </a>
</div>
```

---

## Complete Example

File: `app/blogs/startup-mvps/why-founders-fail-at-mvps/page.tsx`

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Founders Fail at MVPs (And How to Fix It) | thelaunch.space",
  description:
    "Most founders over-build their MVP. Here are the 5 most common mistakes and how to ship a lean MVP in 21 days that actually validates your idea.",
  openGraph: {
    title: "Why Founders Fail at MVPs (And How to Fix It) | thelaunch.space",
    description:
      "Most founders over-build their MVP. Here are the 5 most common mistakes and how to ship a lean MVP in 21 days that actually validates your idea.",
    url: "https://thelaunch.space/blogs/startup-mvps/why-founders-fail-at-mvps",
    siteName: "thelaunch.space",
    type: "article",
    publishedTime: "2026-02-07T00:00:00.000Z",
    authors: ["thelaunch.space"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Why Founders Fail at MVPs (And How to Fix It)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Founders Fail at MVPs (And How to Fix It) | thelaunch.space",
    description:
      "Most founders over-build their MVP. Here are the 5 most common mistakes and how to ship a lean MVP in 21 days that actually validates your idea.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical:
      "https://thelaunch.space/blogs/startup-mvps/why-founders-fail-at-mvps",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Founders Fail at MVPs (And How to Fix It)",
  description:
    "Most founders over-build their MVP. Here are the 5 most common mistakes and how to ship a lean MVP in 21 days that actually validates your idea.",
  url: "https://thelaunch.space/blogs/startup-mvps/why-founders-fail-at-mvps",
  datePublished: "2026-02-07T00:00:00.000Z",
  dateModified: "2026-02-07T00:00:00.000Z",
  author: {
    "@type": "Organization",
    name: "thelaunch.space",
    url: "https://thelaunch.space",
  },
  publisher: {
    "@type": "Organization",
    name: "thelaunch.space",
    url: "https://thelaunch.space",
    logo: {
      "@type": "ImageObject",
      url: "https://thelaunch.space/logo.png",
    },
  },
  image: "https://thelaunch.space/og-image.png",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://thelaunch.space/blogs/startup-mvps/why-founders-fail-at-mvps",
  },
};

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background text-text-primary">
        <header className="max-w-6xl mx-auto px-6 md:px-8 pt-8 md:pt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-blue text-sm font-medium transition-colors"
          >
            ← thelaunch.space
          </a>
        </header>

        <article className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Why Founders Fail at MVPs (And How to Fix It)
          </h1>

          <div className="flex items-center gap-3 text-sm text-text-secondary mb-10">
            <span>thelaunch.space</span>
            <span>·</span>
            <time dateTime="2026-02-07">Feb 7, 2026</time>
            <span>·</span>
            <span>5 min read</span>
          </div>

          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            You have a brilliant idea. You spend 3 months building it. You
            launch. Crickets. Sound familiar? You are not alone — 90% of
            startups fail, and most of them fail because they built too much,
            too soon.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">
            The 5 MVP Mistakes That Kill Startups
          </h2>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            1. Building Features Nobody Asked For
          </h3>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The biggest trap is assuming you know what users want. An MVP is
            not a scaled-down version of your grand vision — it is the
            smallest thing you can build to test whether anyone cares.
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            2. Perfectionism Over Progress
          </h3>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Your MVP does not need to be beautiful. It needs to work. Ship
            ugly, get feedback, iterate. Every week you spend polishing is a
            week you are not learning from real users.
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            3. No Clear Validation Metric
          </h3>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Before you write a single line of code, define what success looks
            like. Is it 10 signups? 5 paying customers? A specific conversion
            rate? Without a metric, you are just building in the dark.
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            4. Choosing the Wrong Tech Stack
          </h3>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Your MVP does not need microservices, Kubernetes, or a custom
            design system. Pick boring, proven tools. Ship fast. Refactor
            later when you have revenue.
          </p>

          <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3">
            5. Going Solo for Too Long
          </h3>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            Building alone is slow and isolating. Whether it is a cofounder,
            a freelancer, or an agency — get help early. The cost of speed is
            almost always worth it.
          </p>

          <div className="bg-border-color/30 border border-border-color rounded-xl p-6 my-8">
            <p className="text-text-primary font-medium">
              The best MVP is one that exists. Ship in 21 days, learn in 22.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">
            How to Actually Ship in 21 Days
          </h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            At{" "}
            <a href="/" className="text-accent-blue hover:underline">
              thelaunch.space
            </a>
            , we have shipped 15+ MVPs in 8 months. Here is the framework:
          </p>

          <ul className="list-disc list-inside space-y-2 text-text-secondary text-base md:text-lg mb-6">
            <li>Week 1: Define the core loop. One user, one action, one outcome.</li>
            <li>Week 2: Build the core. No extras. No admin panel. No analytics.</li>
            <li>Week 3: Polish the edges, deploy, and launch to real users.</li>
          </ul>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-6">
            The goal is not to build a product. The goal is to build
            something that tells you whether to keep going or pivot.
          </p>
        </article>

        <footer className="max-w-6xl mx-auto px-6 md:px-8 pb-16">
          <div className="border-t border-border-color pt-10">
            <p className="text-text-secondary mb-4">
              Have an idea? We ship MVPs in 21 days.
            </p>
            <a
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-10 text-base font-semibold text-white shadow-[0_20px_35px_rgba(37,99,235,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Get Your Launch Roadmap
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
```
