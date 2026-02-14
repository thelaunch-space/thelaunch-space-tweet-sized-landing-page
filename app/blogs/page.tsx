import type { Metadata } from "next";
import { getBlogCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | thelaunch.space",
  description:
    "Actionable guides for non-technical founders: MVPs, landing pages, AI tools, growth strategy, and more.",
  openGraph: {
    title: "Blog | thelaunch.space",
    description:
      "Actionable guides for non-technical founders: MVPs, landing pages, AI tools, growth strategy, and more.",
    url: "https://thelaunch.space/blogs",
    siteName: "thelaunch.space",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "thelaunch.space Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | thelaunch.space",
    description:
      "Actionable guides for non-technical founders: MVPs, landing pages, AI tools, growth strategy, and more.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://thelaunch.space/blogs" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const categories = getBlogCategories();
  const totalPosts = categories.reduce((n, c) => n + c.posts.length, 0);

  return (
    <div className="min-h-[calc(100dvh-96px)] bg-background text-text-primary">
      {/* ── Content ── */}
      <main className="py-6 md:py-8 space-y-8 md:space-y-10">
        {/* Inline blog header row */}
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl md:text-3xl font-bold leading-none tracking-tight">
              Blog
            </h1>
            <p className="text-text-secondary/50 text-xs md:text-sm">
              Actionable guides for founders who build.{" "}
              <span className="text-text-secondary/30">
                {totalPosts} {totalPosts === 1 ? "post" : "posts"}
              </span>
            </p>
          </div>

          {/* Category pills */}
          <nav className="flex flex-wrap gap-1.5 sm:gap-2 shrink-0">
            {categories.map((category) => (
              <a
                key={category.topic}
                href={`/blogs/${category.topic}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-border-color text-text-secondary hover:border-accent-blue/50 hover:text-text-primary transition-colors"
              >
                {category.label}
                <span className="text-text-secondary/40 text-[10px]">
                  {category.posts.length}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {categories.map((category) => (
          <section key={category.topic}>
            {/* Section header */}
            <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-baseline gap-2">
                <h2 className="text-lg md:text-xl font-bold tracking-tight">
                  {category.label}
                </h2>
                <span className="text-[11px] text-text-secondary/40 font-medium">
                  {category.posts.length}{" "}
                  {category.posts.length === 1 ? "post" : "posts"}
                </span>
              </div>
              <a
                href={`/blogs/${category.topic}`}
                className="text-xs md:text-sm font-semibold text-accent-blue hover:text-accent-purple transition-colors flex items-center gap-1 shrink-0"
              >
                View All
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>

            {/* Horizontal scroll row */}
            <div className="max-w-6xl mx-auto px-5 md:px-10 overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 md:gap-4 pb-1">
                {category.posts.map((post) => (
                  <a
                    key={post.url}
                    href={post.url}
                    className="group relative flex-none w-[260px] md:w-[300px] rounded-xl border border-border-color bg-surface p-4 md:p-5 hover:border-accent-blue/40 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Gradient accent line at top */}
                    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-accent-blue/0 via-accent-blue/20 to-accent-purple/0 group-hover:via-accent-blue/60 group-hover:to-accent-purple/40 transition-all duration-300" />

                    {/* Topic badge */}
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] text-accent-blue/70 bg-accent-blue/10 px-2 py-0.5 rounded mb-3">
                      {category.label}
                    </span>

                    {/* Title */}
                    <h3 className="text-sm md:text-[15px] font-bold leading-snug mb-2 group-hover:text-accent-blue transition-colors line-clamp-2 min-h-[2.5rem]">
                      {post.title}
                    </h3>

                    {/* Description — 2 lines max */}
                    {post.description && (
                      <p className="text-text-secondary text-xs md:text-[13px] leading-relaxed mb-3 line-clamp-2 min-h-[2rem]">
                        {post.description}
                      </p>
                    )}

                    {/* Date + read indicator */}
                    <div className="flex items-center justify-between pt-3 border-t border-border-color/40">
                      <time
                        dateTime={post.publishedTime}
                        className="text-[11px] text-text-secondary/40 font-medium"
                      >
                        {formatDate(post.publishedTime)}
                      </time>
                      <span className="text-[11px] font-semibold text-text-secondary/30 group-hover:text-accent-blue transition-colors flex items-center gap-0.5">
                        Read
                        <svg
                          className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}

        {totalPosts === 0 && (
          <div className="max-w-6xl mx-auto px-5 md:px-10 text-center py-16">
            <p className="text-text-secondary">
              No posts yet. Check back soon.
            </p>
          </div>
        )}
      </main>

    </div>
  );
}
