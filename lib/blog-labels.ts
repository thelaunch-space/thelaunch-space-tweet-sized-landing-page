// Shared category labels — safe for both server and client components
// Extracted from lib/blog.ts so client components can import without pulling in `fs`

export const CATEGORY_LABELS: Record<string, string> = {
  "startup-mvps": "Startup MVPs",
  "landing-pages": "Landing Pages",
  "ai-tools": "AI Tools",
  "founder-advice": "Founder Advice",
  "growth-strategy": "Growth Strategy",
  "technical-guides": "Technical Guides",
};
