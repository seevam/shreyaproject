import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

/**
 * PRD §7: two typefaces maximum, one for headings and one for body.
 * Fraunces for display, Inter for body. Both are loaded through next/font, so
 * they are self-hosted at build time — no request to Google from the browser.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-base focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
