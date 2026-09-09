import { hero, isTodo } from "@content/site";
import { Container } from "@/components/ui";
import { Copy, Placeholder } from "@/components/Copy";
import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b border-line bg-paper py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-strong">
              {hero.eyebrow}
            </p>

            {isTodo(hero.title) ? (
              <div className="mt-4">
                <Placeholder note="hero title, 5 to 7 words (PRD §5.1)" />
              </div>
            ) : (
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
            )}

            <div className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
              <Copy text={hero.description} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {isTodo(hero.ctaLabel) ? (
                <Placeholder note='hero CTA label, e.g. "See how the cards work"' />
              ) : (
                <Link
                  href={hero.ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-accent-strong px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-ink"
                >
                  {hero.ctaLabel}
                </Link>
              )}
              <Link
                href={hero.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-line-strong bg-surface px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-muted"
              >
                {hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div>
            {hero.image.src ? (
              // A plain <img>: these are hand-placed photographs, not a gallery
        // needing next/image's layout machinery.
              <img
                src={hero.image.src}
                alt={isTodo(hero.image.alt) ? "" : hero.image.alt}
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
 * Stand-in hero graphic: three cards fanned out, drawn in the site palette.
 * PRD §7 prefers photographs of the real printed cards — replace this by
 * setting hero.image.src in content/site.ts once a photo exists.
 */
function CardFan() {
  return (
    <div className="relative aspect-[4/3] w-full">
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label="Illustration of three cue cards fanned out"
        className="h-full w-full"
      >
        <g transform="rotate(-14 120 170)">
          <rect
            x="42"
            y="72"
            width="150"
            height="200"
            rx="12"
            fill="var(--color-secondary-soft)"
            stroke="var(--color-line)"
          />
          <rect x="66" y="104" width="102" height="8" rx="4" fill="var(--color-secondary)" opacity="0.35" />
          <rect x="66" y="126" width="78" height="8" rx="4" fill="var(--color-secondary)" opacity="0.22" />
        </g>

        <g transform="rotate(-2 200 160)">
          <rect
            x="126"
            y="52"
            width="150"
            height="200"
            rx="12"
            fill="var(--color-accent-soft)"
            stroke="var(--color-line)"
          />
          <rect x="150" y="84" width="102" height="8" rx="4" fill="var(--color-accent)" opacity="0.45" />
          <rect x="150" y="106" width="66" height="8" rx="4" fill="var(--color-accent)" opacity="0.28" />
        </g>

        <g transform="rotate(11 280 170)">
          <rect
            x="212"
            y="72"
            width="150"
            height="200"
            rx="12"
            fill="var(--color-surface)"
            stroke="var(--color-line)"
          />
          <rect x="236" y="104" width="102" height="8" rx="4" fill="var(--color-ink)" opacity="0.25" />
          <rect x="236" y="126" width="84" height="8" rx="4" fill="var(--color-ink)" opacity="0.15" />
          <rect x="236" y="148" width="52" height="8" rx="4" fill="var(--color-ink)" opacity="0.15" />
        </g>
      </svg>
      <p className="mt-2 text-center text-sm text-muted">
        Placeholder illustration — replace with a photograph of the printed set.
      </p>
    </div>
  );
}
