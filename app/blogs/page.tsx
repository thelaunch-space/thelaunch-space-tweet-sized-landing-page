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
    <div className="min-h-full bg-background text-text-primary">
      <div className="max-w-[720px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
          Blog
        </h1>
        <p className="text-text-secondary text-base md:text-lg mb-12">
          Actionable guides for founders who build.{" "}
          <span className="text-text-secondary/60">
            {totalPosts} {totalPosts === 1 ? "post" : "posts"}
          </span>
        </p>

        {categories.map((category) => (
          <section key={category.topic} className="mb-12">
            <h2 className="text-lg font-semibold text-text-secondary uppercase tracking-widest mb-6">
              {category.label}
            </h2>
            <div className="space-y-6">
              {category.posts.map((post) => (
                <a
                  key={post.url}
                  href={post.url}
                  className="block group border border-border-color rounded-xl p-6 hover:border-accent-blue/50 transition-colors"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent-blue transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-3">
                      {post.description}
                    </p>
                  )}
                  <time
                    dateTime={post.publishedTime}
                    className="text-xs text-text-secondary/60"
                  >
                    {formatDate(post.publishedTime)}
                  </time>
                </a>
              ))}
            </div>
          </section>
        ))}

        {totalPosts === 0 && (
          <p className="text-text-secondary">No posts yet. Check back soon.</p>
        )}
      </div>

      <footer className="max-w-[720px] mx-auto px-6 md:px-8 pb-16">
        <div className="border-t border-border-color pt-10">
          <p className="text-text-secondary mb-4">
            Ready to build? We ship MVPs in 21 days.
          </p>
          <a
            href="/?cta=open"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-10 text-base font-semibold text-white shadow-[0_20px_35px_rgba(37,99,235,0.35)] transition-transform hover:-translate-y-0.5"
          >
            Get Your Launch Roadmap
          </a>
        </div>
      </footer>
    </div>
  );
}
