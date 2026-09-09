import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categorySlug, getAllPosts, getPost } from "@/lib/blog";
import { Container } from "@/components/ui";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.isoDate,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-prose">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <time dateTime={post.isoDate}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <Link
              href={`/blog/category/${categorySlug(post.category)}/`}
              className="font-medium text-accent-strong hover:underline"
            >
              {post.category}
            </Link>
          </p>

          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base text-muted">By {post.author}</p>

          <div
            className="prose-body mt-10 text-ink"
            // Content is Markdown authored in this repository, not user input.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <p className="mt-12 border-t border-line pt-8">
            <Link
              href="/blog/"
              className="text-base font-semibold text-accent-strong hover:underline"
            >
              ← All posts
            </Link>
          </p>
        </div>
      </Container>
    </article>
  );
}
