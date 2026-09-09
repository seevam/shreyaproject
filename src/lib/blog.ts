import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  /** ISO yyyy-mm-dd, used for sorting and <time datetime>. */
  isoDate: string;
  author: string;
  category: string;
  summary: string;
};

export type Post = PostMeta & { html: string };

function requireString(
  value: unknown,
  field: string,
  file: string,
  fallback?: string,
): string {
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  if (fallback !== undefined) return fallback;
  throw new Error(
    `content/blog/${file}: front matter is missing a "${field}" field. ` +
      `Every post needs title, date, author, category and summary.`,
  );
}

/**
 * Dates are written as `date: 2026-07-14` in front matter. gray-matter's YAML
 * parser turns that into a Date at UTC midnight, so format it in UTC — using
 * the local timezone would shift the day backwards west of Greenwich.
 */
function normaliseDate(value: unknown, file: string): { iso: string; display: string } {
  const date =
    value instanceof Date
      ? value
      : typeof value === "string"
        ? new Date(value)
        : null;

  if (!date || Number.isNaN(date.getTime())) {
    throw new Error(
      `content/blog/${file}: "date" is missing or not a valid date. Use date: 2026-07-14`,
    );
  }

  return {
    iso: date.toISOString().slice(0, 10),
    display: date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }),
  };
}

/**
 * Reads one post file. Returns null for drafts *before* validating anything
 * else, so an unfinished stub sitting in the repository can never break the
 * build for the published site.
 */
function readPostFile(fileName: string): { meta: PostMeta; body: string } | null {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  if (data.draft === true) return null;

  const { iso, display } = normaliseDate(data.date, fileName);

  return {
    meta: {
      slug: fileName.replace(/\.mdx?$/, ""),
      title: requireString(data.title, "title", fileName),
      date: display,
      isoDate: iso,
      author: requireString(data.author, "author", fileName),
      category: requireString(data.category, "category", fileName, "Uncategorised"),
      summary: requireString(data.summary, "summary", fileName),
    },
    body: content,
  };
}

function postFileNames(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    // README.md documents how to add a post; it is not one.
    .filter((f) => f.toLowerCase() !== "readme.md");
}

/** Published posts, newest first. Drafts are excluded. */
export function getAllPosts(): PostMeta[] {
  return postFileNames()
    .map((f) => readPostFile(f)?.meta)
    .filter((meta): meta is PostMeta => meta !== undefined)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}

export function getPost(slug: string): Post | null {
  const fileName = postFileNames().find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!fileName) return null;

  const post = readPostFile(fileName);
  if (!post) return null;
  const { meta, body } = post;

  const html = remark().use(remarkGfm).use(remarkHtml).processSync(body).toString();
  return { ...meta, html };
}

export type Category = { name: string; slug: string; count: number };

export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategories(): Category[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Posts grouped by year, newest year first — the blog archive (PRD §6.1). */
export function getArchive(): { year: string; posts: PostMeta[] }[] {
  const byYear = new Map<string, PostMeta[]>();
  for (const post of getAllPosts()) {
    const year = post.isoDate.slice(0, 4);
    const bucket = byYear.get(year);
    if (bucket) bucket.push(post);
    else byYear.set(year, [post]);
  }
  return [...byYear.entries()]
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => b.year.localeCompare(a.year));
}
