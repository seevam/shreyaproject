import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getCategories } from "@/lib/blog";
import { Container } from "@/components/ui";
import { PostList } from "@/components/PostList";
import { BlogSidebar } from "@/components/BlogSidebar";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return getCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const match = getCategories().find((c) => c.slug === category);
  if (!match) return {};

  return {
    title: `${match.name} — Blog`,
    description: `Posts filed under ${match.name}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const match = getCategories().find((c) => c.slug === category);
  if (!match) notFound();

  const posts = getAllPosts().filter((post) => post.category === match.name);

  return (
    <article className="bg-dots relative overflow-hidden pb-24 pt-14 sm:pt-20">
      <Container>
        <div className="max-w-prose">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-strong">
            Category
          </p>
          <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.05] text-navy sm:text-6xl">
            {match.name}
          </h1>
          <p className="mt-4 text-base text-muted">
            {match.count} {match.count === 1 ? "post" : "posts"} ·{" "}
            <Link href="/blog/" className="text-accent-strong hover:underline">
              All posts
            </Link>
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
