import type { Metadata } from "next";
import { cardsPage, site } from "@content/site";
import { cardImage, cards, instructionCard } from "@content/cards";
import { Container, Dot, DotKey, Section, SectionHeading } from "@/components/ui";
import { Copy } from "@/components/Copy";

export const metadata: Metadata = {
  title: "The cards",
  description: `The card set behind ${site.name}: what is in the packet, the card fronts, and how to use them.`,
};

export default function CardsPage() {
  return (
    <>
      <section className="border-b border-line bg-paper py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="max-w-prose">
              <h1 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
                {cardsPage.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink">
                {cardsPage.lead}
              </p>
              <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#fronts"
                  className="inline-flex items-center justify-center rounded-full border border-line-strong bg-surface px-5 py-2 text-base font-semibold text-ink transition-colors hover:border-muted"
                >
                  The card fronts
                </a>
                <a
                  href="#how-to-use"
                  className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2 text-base font-semibold text-white transition-colors hover:bg-accent-strong"
                >
                  How to use them
                </a>
              </nav>
            </div>

            <figure className="mx-auto w-full max-w-[240px]">
              {/* A plain <img>: one hand-placed card image. */}
              <img
                src={instructionCard.src}
                alt={instructionCard.alt}
                width={212}
                height={310}
                className="h-auto w-full drop-shadow-[0_10px_16px_rgba(23,35,63,0.22)]"
              />
            </figure>
          </div>

          {/*
            PRD §5.4: images only, no downloadable card files, given the
            copyright caution from the 19 June session. There is deliberately
            no download link anywhere on this page, and only card FRONTS are
            shown. The note below stays on the page until Shreya confirms.
          */}
          <div className="mt-8 max-w-prose">
            <Copy text={cardsPage.note} />
          </div>
        </Container>
      </section>

      <Section id="packet" tone="sun">
        <SectionHeading eyebrow="In the box">{cardsPage.packetHeading}</SectionHeading>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
          {cardsPage.packetIntro}
        </p>
        <DotKey className="mt-8 max-w-4xl" />
      </Section>

      <Section id="fronts">
        <SectionHeading eyebrow="The set">{cardsPage.galleryHeading}</SectionHeading>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
          {cardsPage.galleryIntro}
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
          {cards.map((card) => (
            <li key={card.slug} className="mx-auto w-full max-w-[212px]">
              <figure>
                <img
                  src={cardImage(card.slug)}
                  alt={card.alt}
                  width={212}
                  height={310}
                  loading="lazy"
                  className="h-auto w-full drop-shadow-[0_8px_12px_rgba(23,35,63,0.22)]"
                />
                <figcaption className="mt-3 text-center">
                  <span className="block text-base font-semibold leading-snug text-navy">
                    {card.headline}
                  </span>
                  <span className="block text-sm text-muted">{card.subline}</span>
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
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how-to-use" tone="secondary">
        <SectionHeading eyebrow="A working guide">{cardsPage.howToHeading}</SectionHeading>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
          {cardsPage.howToIntro}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {cardsPage.howTo.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-card border border-line bg-surface p-6 sm:p-8"
            >
              <h3 className="font-display text-2xl font-semibold text-navy">
                {section.heading}
              </h3>
              <dl className="mt-5 space-y-5">
                {section.items.map((item) => (
                  <div key={item.label}>
                    <dt className="text-base font-semibold text-accent-strong">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-base leading-relaxed text-ink">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-10 text-base text-muted">
          Words by {site.credits.words}. Design by {site.credits.design}.
        </p>
      </Section>
    </>
  );
}
