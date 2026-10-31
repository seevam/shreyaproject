"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Shuffle } from "lucide-react";
import clsx from "clsx";
import type { Card } from "@content/cards";
import { cardImage } from "@content/cards";
import { Dot } from "@/components/ui";

type Filter = "all" | "child" | "grownup-only";

/** Fisher–Yates, on a copy. */
function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Small, stable per-card tilt so the deck looks hand-laid, not gridded. */
const tiltFor = (slug: string) => {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return ((Math.abs(h) % 7) - 3) * 0.8; // -2.4deg … +2.4deg
};

/**
 * The card gallery, playable: filter by which deck a card belongs to, or
 * shuffle the whole set. Cards slide to their new places (motion `layout`).
 *
 * Starts in the canonical order from content/cards.ts, so the first render
 * matches the server HTML exactly; shuffling only happens on a click.
 */
export function CardDeck({ cards }: { cards: Card[] }) {
  const [order, setOrder] = useState(cards);
  const [filter, setFilter] = useState<Filter>("all");

  const visible = order.filter((c) =>
    filter === "all" ? true : filter === "child" ? c.childVersion : !c.childVersion,
  );

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All cards", count: cards.length },
    { id: "child", label: "With a child's card", count: cards.filter((c) => c.childVersion).length },
    { id: "grownup-only", label: "Grown-up only", count: cards.filter((c) => !c.childVersion).length },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Filter the cards" className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              aria-pressed={filter === chip.id}
              onClick={() => setFilter(chip.id)}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border-2 border-navy px-4 py-2 text-base font-bold transition-all",
                filter === chip.id
                  ? "bg-navy text-white shadow-none"
                  : "bg-surface text-navy shadow-pop-sm hover:-translate-y-0.5",
              )}
            >
              {chip.id === "child" ? <Dot kind="child" className="h-3.5 w-3.5" /> : null}
              {chip.id === "grownup-only" ? <Dot kind="grownup" className="h-3.5 w-3.5" /> : null}
              {chip.label}
              <span
                className={clsx(
                  "rounded-full px-2 text-sm",
                  filter === chip.id ? "bg-white/20" : "bg-sun-soft",
                )}
              >
                {chip.count}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOrder((o) => shuffled(o))}
          className="group ml-auto inline-flex items-center gap-2 rounded-full border-2 border-navy bg-sun px-5 py-2 text-base font-bold text-navy shadow-pop-sm transition-all hover:-translate-y-0.5 hover:shadow-pop active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Shuffle
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
          />
          Shuffle the deck
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} cards.
      </p>

      <LayoutGroup>
        <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {visible.map((card) => (
              <motion.li
                key={card.slug}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: tiltFor(card.slug) }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ rotate: 0, y: -10, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="mx-auto w-full max-w-[212px]"
              >
                <figure>
                  <img
                    src={cardImage(card.slug)}
                    alt={card.alt}
                    width={212}
                    height={310}
                    loading="lazy"
                    draggable={false}
                    className="h-auto w-full drop-shadow-[0_10px_14px_rgba(23,35,63,0.25)]"
                  />
                  <figcaption className="mt-3 text-center">
                    <span className="block font-display text-lg font-semibold leading-snug text-navy">
                      {card.headline}
                    </span>
                    <span className="block text-sm font-semibold text-muted">{card.subline}</span>
                    <span className="mt-1.5 flex items-center justify-center gap-1.5">
                      <Dot kind="grownup" />
                      {card.childVersion ? <Dot kind="child" /> : null}
                      <span className="sr-only">
                        {card.childVersion
                          ? "Comes as a grown-up card and a child's card"
                          : "Grown-up card"}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </div>
  );
}
