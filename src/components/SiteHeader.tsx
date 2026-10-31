"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { site } from "@content/site";

/** "/about/" and "/about" are the same page. */
const norm = (path: string) => path.replace(/\/+$/, "") || "/";

/** Two overlapping cards with their dots: the site's mark. */
function LogoMark() {
  return (
    <span aria-hidden="true" className="relative inline-block h-9 w-9 shrink-0">
      <span className="absolute left-0 top-1 h-7 w-5 -rotate-12 rounded-md border-2 border-navy bg-sun-soft">
        <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-sun ring-1 ring-navy" />
      </span>
      <span className="absolute right-0 top-0 h-7 w-5 rotate-12 rounded-md border-2 border-navy bg-surface">
        <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-grownup ring-1 ring-navy" />
      </span>
    </span>
  );
}

type NavItem = { href: string; label: string };

export function SiteHeader({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation, otherwise it stays open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-navy bg-paper">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-xl font-semibold leading-tight text-navy sm:text-2xl"
        >
          <span className="transition-transform duration-300 group-hover:rotate-12">
            <LogoMark />
          </span>
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const active = norm(pathname) === norm(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "rounded-full px-4 py-2 text-base font-bold text-navy transition-colors hover:bg-sun-soft",
                  active && "bg-sun-soft",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/feedback/"
            className="ml-2 rounded-full border-2 border-navy bg-accent-strong px-5 py-2 text-base font-bold text-white shadow-pop-sm transition-all hover:-translate-y-0.5 hover:shadow-pop active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Share feedback
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex items-center gap-2 rounded-full border-2 border-navy bg-surface px-4 py-2 text-base font-bold text-navy shadow-pop-sm md:hidden"
        >
          {open ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          Menu
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="overflow-hidden border-t-2 border-navy bg-paper md:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-4 sm:px-8">
              {[...items, { href: "/feedback/", label: "Share feedback" }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    className="block rounded-2xl border-2 border-navy bg-surface px-4 py-3 text-lg font-bold text-navy shadow-pop-sm"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
