import Link from "next/link";
import { getArchive, getCategories } from "@/lib/blog";

/** Categories and a working archive — both required by PRD §6.1. */
export function BlogSidebar() {
  const categories = getCategories();
  const archive = getArchive();

  if (categories.length === 0) return null;

  return (
    <aside className="space-y-10">
      <nav aria-labelledby="categories-heading">
        <h2
          id="categories-heading"
          className="text-sm font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Categories
        </h2>
        <ul className="mt-3 space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}/`}
                className="text-base text-ink hover:text-accent-strong"
              >
                {category.name}{" "}
                <span className="text-muted">({category.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-labelledby="archive-heading">
        <h2
          id="archive-heading"
          className="text-sm font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Archive
        </h2>
        <div className="mt-3 space-y-4">
          {archive.map((group) => (
            <div key={group.year}>
              <h3 className="text-base font-semibold text-ink">{group.year}</h3>
              <ul className="mt-1 space-y-1">
                {group.posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="text-base text-muted hover:text-accent-strong"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
