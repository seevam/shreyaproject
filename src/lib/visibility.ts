import { footer, nav, testimonials } from "@content/site";
import { getAllPosts } from "@/lib/blog";

/**
 * Parts of the site that only appear once there is real content behind them,
 * so a visitor never lands on an empty blog or an empty testimonials section.
 * They switch themselves on: publish a post (draft: false) and the blog links
 * come back; add an approved quote to `testimonials` and that section does.
 *
 * Server-only: reads the blog folder at build time.
 */
export function blogIsLive(): boolean {
  return getAllPosts().length > 0;
}

export function testimonialsAreLive(): boolean {
  return testimonials.length > 0;
}

function isHidden(href: string): boolean {
  if (href.startsWith("/blog")) return !blogIsLive();
  if (href === "/#testimonials") return !testimonialsAreLive();
  return false;
}

export function liveNav() {
  return nav.filter((item) => !isHidden(item.href));
}

export function liveFooterLinks() {
  return footer.links.filter((item) => !isHidden(item.href));
}
