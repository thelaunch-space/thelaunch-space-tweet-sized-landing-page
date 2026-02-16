import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

export interface BlogPost {
  topic: string;
  slug: string;
  title: string;
  description: string;
  publishedTime: string;
  url: string;
}

export interface BlogCategory {
  topic: string;
  label: string;
  posts: BlogPost[];
}

// Re-export from shared file so existing server-side imports still work
import { CATEGORY_LABELS } from "./blog-labels";
export { CATEGORY_LABELS } from "./blog-labels";

export function discoverBlogPosts(): BlogPost[] {
  const blogsDir = join(process.cwd(), "app", "blogs");
  const posts: BlogPost[] = [];

  if (!existsSync(blogsDir)) return posts;

  const topics = readdirSync(blogsDir, { withFileTypes: true }).filter(
    (d) => d.isDirectory() && !d.name.startsWith("[")
  );

  for (const topic of topics) {
    const topicDir = join(blogsDir, topic.name);
    const slugs = readdirSync(topicDir, { withFileTypes: true }).filter(
      (d) => d.isDirectory() && !d.name.startsWith("[")
    );

    for (const slug of slugs) {
      const pagePath = join(topicDir, slug.name, "page.tsx");
      if (!existsSync(pagePath)) continue;

      const content = readFileSync(pagePath, "utf-8");

      const titleMatch = content.match(
        /title:\s*(["'`])((?:(?!\1).)+?)(?:\s*\|(?:(?!\1).)*?)?\1/
      );
      const descMatch = content.match(
        /(?:^|\n)\s*description:\s*(["'`])((?:(?!\1).)+)\1/
      );
      const publishedMatch = content.match(
        /publishedTime:\s*["'`]([^"'`]+)["'`]/
      );

      posts.push({
        topic: topic.name,
        slug: slug.name,
        title: titleMatch?.[2] ?? slug.name.replace(/-/g, " "),
        description: descMatch?.[2] ?? "",
        publishedTime: publishedMatch?.[1] ?? new Date().toISOString(),
        url: `/blogs/${topic.name}/${slug.name}`,
      });
    }
  }

  // Sort newest first
  posts.sort(
    (a, b) =>
      new Date(b.publishedTime).getTime() -
      new Date(a.publishedTime).getTime()
  );

  return posts;
}

export function getBlogCategories(): BlogCategory[] {
  const posts = discoverBlogPosts();
  const grouped = new Map<string, BlogPost[]>();

  for (const post of posts) {
    const existing = grouped.get(post.topic) ?? [];
    existing.push(post);
    grouped.set(post.topic, existing);
  }

  return Array.from(grouped.entries()).map(([topic, topicPosts]) => ({
    topic,
    label: CATEGORY_LABELS[topic] ?? topic.replace(/-/g, " "),
    posts: topicPosts,
  }));
}
