import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Every page here is prerendered at build time — there is no server-side
   * data. Deploys to Vercel, Netlify or Cloudflare Pages as-is.
   *
   * Adding `output: "export"` would emit a plain folder of HTML for hosts like
   * GitHub Pages. It is left off deliberately: static export requires at least
   * one published blog post to exist, and the blog is empty until Shreya
   * writes it. Once the first post is live, that line can be added safely.
   */
  trailingSlash: true,
};

export default nextConfig;
