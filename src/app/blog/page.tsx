import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { Container } from "@/components/ui";
import { PostList } from "@/components/PostList";
import { BlogSidebar } from "@/components/BlogSidebar";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "First-person writing on designing the cue cards, testing them, and taking them into the field.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <article className="py-16 sm:py-24">
      <Container>
        <div className="max-w-prose">
          <h1 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
            Blog
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink">
            Notes on building the cards — what the idea started as, what changed
            once real people used them, and what came next.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_240px] lg:gap-16">
          <PostList posts={posts} />
          <BlogSidebar />
        </div>
      </Container>
    </article>
  );
}
