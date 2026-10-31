import clsx from "clsx";
import { cards } from "@content/cards";

const pillColors = [
  "bg-sun text-navy",
  "bg-surface text-navy",
  "bg-accent-strong text-white",
  "bg-secondary text-white",
] as const;

/**
 * An endless ribbon of the card names, tilted across the page between the
 * hero and the first section. The list is rendered twice and slid by half its
 * width, so the loop is seamless. Stops for "reduce motion" (globals.css).
 *
 * aria-hidden: it repeats names the card gallery already lists properly, and a
 * screen reader reading the doubled ribbon would just be noise.
 */
export function Marquee() {
  const items = [...cards, ...cards];
  return (
    <div aria-hidden="true" className="relative z-10 -my-10 overflow-hidden py-4">
      <div className="-mx-4 -rotate-[1.5deg] border-y-[3px] border-navy bg-navy py-3">
      <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
        {items.map((card, i) => (
          <span
            key={`${card.slug}-${i}`}
            className={clsx(
              "whitespace-nowrap rounded-full border-2 border-navy px-4 py-1.5 font-display text-lg font-semibold",
              pillColors[i % pillColors.length],
            )}
          >
            {card.headline} · {card.subline}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}
