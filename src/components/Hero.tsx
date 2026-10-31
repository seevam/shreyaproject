import Link from "next/link";
import { hero } from "@content/site";
import { card, cardImage } from "@content/cards";
import { Container } from "@/components/ui";

export function Hero() {
  return (
    <section className="border-b border-line bg-paper py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-strong">
              {hero.eyebrow}
            </p>

            <h1 className="mt-4 font-display text-balance text-4xl font-semibold leading-[1.1] text-navy sm:text-5xl lg:text-[3.5rem]">
              {hero.title}
            </h1>

            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={hero.ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                {hero.ctaLabel}
              </Link>
              <Link
                href={hero.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-line-strong bg-surface px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-muted"
              >
                {hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div>
            {hero.photo.src ? (
              // A plain <img>: one hand-placed hero photograph.
              <img
                src={hero.photo.src}
                alt={hero.photo.alt}
                className="aspect-[4/3] w-full rounded-card border border-line object-cover shadow-sm"
              />
            ) : (
              <CardFan />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Three real card fronts fanned out (PRD §5.1: "hero graphic showing the
 * physical cards"). Chosen from content/cards.ts via hero.fan, picked for
 * colour spread: teal, yellow-orange, red. These are renders from the Canva
 * deck rather than photographs of the printed set; set hero.photo.src to
 * replace the whole fan with a photograph.
 *
 * drop-shadow (not box-shadow) so the shadow follows the rounded corners.
 */
function CardFan() {
  const [left, centre, right] = hero.fan.map((slug) => card(slug));

  const base =
    "absolute w-[38%] h-auto drop-shadow-[0_10px_16px_rgba(23,35,63,0.28)]";

  return (
    <div className="relative mx-auto aspect-[6/4.9] w-full max-w-[540px]">
      <img
        src={cardImage(left.slug)}
        alt={left.alt}
        width={212}
        height={310}
        className={`${base} left-0 top-[24%] z-10 -rotate-[8deg]`}
      />
      <img
        src={cardImage(right.slug)}
        alt={right.alt}
        width={212}
        height={310}
        className={`${base} left-[62%] top-[24%] z-10 rotate-[7deg]`}
      />
      <img
        src={cardImage(centre.slug)}
        alt={centre.alt}
        width={212}
        height={310}
        className={`${base} left-[31%] top-0 z-20 -rotate-[1deg]`}
      />
    </div>
  );
}
