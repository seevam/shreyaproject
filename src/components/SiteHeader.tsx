"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation, otherwise it stays open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold leading-tight text-ink sm:text-xl"
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-ink transition-colors hover:text-accent-strong"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/feedback/"
            className="rounded-full bg-accent-strong px-5 py-2 text-base font-semibold text-white transition-colors hover:bg-ink"
          >
            Share feedback
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-base font-medium text-ink md:hidden"
        >
          Menu
          <span aria-hidden="true" className="text-sm">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-2 sm:px-8">
          {[...nav, { href: "/feedback/", label: "Share feedback" }].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block border-b border-line py-3 text-base font-medium text-ink last:border-b-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
