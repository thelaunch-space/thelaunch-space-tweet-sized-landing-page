import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { discoverBlogPosts, CATEGORY_LABELS } from "@/lib/blog";

interface Props {
  params: { topic: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const label = CATEGORY_LABELS[params.topic];
  if (!label) return {};

  const title = `${label} | thelaunch.space Blog`;
  const description = `Guides and insights on ${label.toLowerCase()} for non-technical founders.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://thelaunch.space/blogs/${params.topic}`,
      siteName: "thelaunch.space",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${label} — thelaunch.space Blog`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    alternates: { canonical: `https://thelaunch.space/blogs/${params.topic}` },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TopicIndex({ params }: Props) {
  const posts = discoverBlogPosts().filter((p) => p.topic === params.topic);

  if (posts.length === 0) notFound();

  const label =
    CATEGORY_LABELS[params.topic] ?? params.topic.replace(/-/g, " ");

  return (
    <div className="min-h-full bg-background text-text-primary">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
          {label}
        </h1>
        <p className="text-text-secondary text-base md:text-lg mb-12">
          {posts.length} {posts.length === 1 ? "post" : "posts"} ·{" "}
          <a
            href="/blogs"
            className="text-accent-blue hover:underline transition-colors"
          >
            ← All posts
          </a>
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
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
      </div>

      <footer className="max-w-6xl mx-auto px-6 md:px-8 pb-16">
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
