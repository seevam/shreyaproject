import type { Metadata } from "next";
import clsx from "clsx";
import { CalendarHeart, Heart, Sparkles, Zap } from "lucide-react";
import { cardsPage, site } from "@content/site";
import { cards, instructionCard } from "@content/cards";
import { ButtonLink, Container, DotKey, Section, SectionHeading, Sticker } from "@/components/ui";
import { Copy } from "@/components/Copy";
import { CardDeck } from "@/components/CardDeck";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "The cards",
  description: `The card set behind ${site.name}: what is in the packet, the card fronts, and how to use them.`,
};

/** One icon and tint per how-to section, in content order. Decorative. */
const howToStyle = [
  { icon: Sparkles, bg: "bg-sun-soft" },
  { icon: CalendarHeart, bg: "bg-surface" },
  { icon: Zap, bg: "bg-accent-soft" },
  { icon: Heart, bg: "bg-surface" },
] as const;
const tilts = [-1, 1, 0.75, -0.75] as const;

export default function CardsPage() {
  return (
    <>
      <section className="bg-dots relative overflow-hidden bg-paper pb-24 pt-14 sm:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-0 h-96 w-96 rounded-blob bg-grownup opacity-15 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-blob bg-sun opacity-25 blur-3xl" />
        </div>
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal className="max-w-prose">
              <Sticker color="sun" tilt={-2}>
                {`${cards.length} faces, two decks`}
              </Sticker>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-navy sm:text-6xl">
                {cardsPage.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink sm:text-xl">{cardsPage.lead}</p>
              <nav aria-label="On this page" className="mt-9 flex flex-wrap gap-4">
                <ButtonLink href="#fronts" variant="secondary">
                  The card fronts
                </ButtonLink>
                <ButtonLink href="#how-to-use" arrow>
                  How to use them
                </ButtonLink>
              </nav>
            </Reveal>

            <Reveal className="relative mx-auto w-full max-w-[260px]">
              <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 rounded-blob bg-sun-soft" />
              <figure className="animate-floaty">
                {/* A plain <img>: one hand-placed card image. */}
                <img
                  src={instructionCard.src}
                  alt={instructionCard.alt}
                  width={212}
                  height={310}
                  className="h-auto w-full -rotate-[4deg] drop-shadow-[0_14px_18px_rgba(23,35,63,0.28)]"
                />
              </figure>
            </Reveal>
          </div>

          {/*
            PRD §5.4: images only, no downloadable card files, given the
            copyright caution from the 19 June session. There is deliberately
            no download link anywhere on this page, and only card FRONTS are
            shown. The note below stays on the page until Shreya confirms.
          */}
          <div className="mt-10 max-w-prose">
            <Copy text={cardsPage.note} />
          </div>
        </Container>
      </section>

      <Section id="packet" tone="sun" blobs="a">
        <SectionHeading eyebrow="In the box" sticker="white">
          {cardsPage.packetHeading}
        </SectionHeading>
        <Reveal className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
          <p>{cardsPage.packetIntro}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <DotKey className="mt-10 max-w-4xl" />
        </Reveal>
      </Section>

      <Section id="fronts" tone="paper">
        <SectionHeading eyebrow="The set" sticker="pink">
          {cardsPage.galleryHeading}
        </SectionHeading>
        <Reveal className="mb-10 mt-6 max-w-prose text-lg leading-relaxed text-ink">
          <p>{cardsPage.galleryIntro}</p>
        </Reveal>
        <CardDeck cards={cards} />
      </Section>

      <Section id="how-to-use" tone="secondary" blobs="b">
        <SectionHeading eyebrow="A working guide" sticker="purple">
          {cardsPage.howToHeading}
        </SectionHeading>
        <Reveal className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
          <p>{cardsPage.howToIntro}</p>
        </Reveal>

        <Stagger as="div" className="mt-12 grid gap-8 lg:grid-cols-2">
          {cardsPage.howTo.map((section, i) => {
            const { icon: Icon, bg } = howToStyle[i % howToStyle.length];
            return (
              <StaggerItem
                as="div"
                key={section.id}
                tilt={tilts[i % tilts.length]}
                className={clsx("rounded-card border-2 border-navy p-6 shadow-pop sm:p-8", bg)}
              >
                <article id={section.id} className="scroll-mt-28">
                  <h3 className="flex items-center gap-3 font-display text-2xl font-semibold text-navy">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-navy bg-sun text-navy"
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    {section.heading}
                  </h3>
                  <dl className="mt-6 space-y-5">
                    {section.items.map((item) => (
                      <div key={item.label}>
                        <dt className="text-base font-bold text-accent-strong">{item.label}</dt>
                        <dd className="mt-1 text-base leading-relaxed text-ink">{item.text}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className="mt-12 text-base font-semibold text-muted">
          Words by {site.credits.words}. Design by {site.credits.design}.
        </p>
      </Section>
    </>
  );
}
