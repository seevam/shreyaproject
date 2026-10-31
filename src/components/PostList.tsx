import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { categorySlug } from "@/lib/blog";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-card border-2 border-dashed border-navy bg-surface p-6 text-base text-muted">
        No posts here yet.
      </p>
    );
  }

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug} className="rounded-card border-2 border-navy bg-surface p-6 shadow-pop transition-transform hover:-translate-y-1">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <time dateTime={post.isoDate}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <Link
              href={`/blog/category/${categorySlug(post.category)}/`}
              className="rounded-full bg-accent-soft px-2.5 py-0.5 font-bold text-accent-strong hover:underline"
            >
              {post.category}
            </Link>
          </p>

          <h2 className="mt-2 font-display text-2xl font-semibold leading-snug text-navy">
            <Link href={`/blog/${post.slug}/`} className="hover:text-accent-strong">
              {post.title}
            </Link>
          </h2>

          <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
            {post.summary}
          </p>

          <p className="mt-3 text-sm text-muted">By {post.author}</p>
        </li>
      ))}
    </ul>
  );
}
