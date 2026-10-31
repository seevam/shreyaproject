import Link from "next/link";
import clsx from "clsx";
import {
  BookOpen,
  Brain,
  Eye,
  HandHeart,
  Layers,
  MessageCircleHeart,
  Puzzle,
  Quote,
  Smile,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  closingCta,
  impact,
  isTodo,
  problem,
  solution,
  testimonials,
  testimonialsSection,
} from "@content/site";
import { instructionCard } from "@content/cards";
import {
  ButtonLink,
  Container,
  DotKey,
  ImageFrame,
  Section,
  SectionHeading,
  Sticker,
  Wave,
} from "@/components/ui";
import { Copy, Placeholder } from "@/components/Copy";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

type Item = { title: string; body: string };

/** Resting tilts for hand-placed cards; they straighten on hover. */
const tilts = [-1.5, 1, -0.75, 1.25] as const;

/** Icon tile colours, cycled. Icons are decorative; the heading carries meaning. */
const iconTiles = [
  "bg-sun text-navy",
  "bg-accent-soft text-accent-strong",
  "bg-secondary-soft text-secondary",
  "bg-surface text-navy",
] as const;

/** A titled point. Renders one placeholder for the pair when neither is written. */
function PointCard({
  item,
  index,
  icon: Icon,
}: {
  item: Item;
  index: number;
  icon?: LucideIcon;
}) {
  const unwritten = isTodo(item.title) && isTodo(item.body);

  return (
    <StaggerItem
      tilt={tilts[index % tilts.length]}
      className="rounded-card border-2 border-navy bg-surface p-6 shadow-pop"
    >
      {Icon ? (
        <span
          aria-hidden="true"
          className={clsx(
            "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-navy",
            iconTiles[index % iconTiles.length],
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={2.25} />
        </span>
      ) : null}
      {unwritten ? (
        <Placeholder note="a short heading and one or two sentences" />
      ) : (
        <>
          <Copy
            as="h3"
            text={item.title}
            className="font-display text-xl font-semibold leading-snug text-navy"
          />
          <div className="mt-2 text-base leading-relaxed text-muted">
            <Copy text={item.body} />
          </div>
        </>
      )}
    </StaggerItem>
  );
}

export function ProblemSection() {
  const icons = [Eye, MessageCircleHeart, Brain];
  return (
    // No wave: the card-name ribbon above already divides it from the hero.
    <Section id="problem" tone="sun" wave={false} blobs="a" className="pt-28 sm:pt-36">
      <SectionHeading eyebrow="Why this exists" sticker="white">
        {problem.heading}
      </SectionHeading>

      <Reveal className="mt-6 max-w-prose text-lg leading-relaxed text-ink sm:text-xl">
        <Copy text={problem.lead} />
      </Reveal>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {problem.points.map((point, i) => (
          <PointCard key={i} item={point} index={i} icon={icons[i]} />
        ))}
      </Stagger>
    </Section>
  );
}

export function SolutionSection() {
  const featureIcons = [Layers, HandHeart, Smile, Puzzle];
  const stepColors = ["bg-accent-strong", "bg-secondary", "bg-navy"] as const;

  return (
    <Section id="solution" tone="paper">
      <SectionHeading eyebrow="What they are" sticker="sun">
        {solution.heading}
      </SectionHeading>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
        <div>
          <Reveal className="max-w-prose text-lg leading-relaxed text-ink">
            <Copy text={solution.lead} />
          </Reveal>
          <Reveal delay={0.1}>
            <DotKey className="mt-8" />
          </Reveal>
        </div>

        <Reveal className="relative mx-auto w-full max-w-[280px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-110 rounded-blob bg-sun-soft"
          />
          <figure className="animate-floaty">
            {/* A plain <img>: one hand-placed card image. */}
            <img
              src={instructionCard.src}
              alt={instructionCard.alt}
              width={212}
              height={310}
              className="h-auto w-full rotate-[4deg] drop-shadow-[0_14px_18px_rgba(23,35,63,0.28)]"
            />
          </figure>
          <p className="mt-5 text-center text-sm font-semibold text-muted">
            One of six instruction cards at the front of every packet.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <h3 className="mt-20 font-display text-3xl font-semibold text-navy">
          {solution.stepsHeading}
        </h3>
      </Reveal>
      <Stagger as="ol" className="mt-6 grid gap-6 md:grid-cols-3">
        {solution.steps.map((step, i) => (
          <StaggerItem
            key={step.title}
            tilt={tilts[i]}
            className="relative rounded-card border-2 border-navy bg-surface p-6 pt-9 shadow-pop"
          >
            <span
              aria-hidden="true"
              className={clsx(
                "absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy font-display text-2xl font-semibold text-white shadow-pop-sm",
                stepColors[i % stepColors.length],
              )}
            >
              {i + 1}
            </span>
            <h4 className="font-display text-xl font-semibold text-navy">{step.title}</h4>
            <p className="mt-2 text-base leading-relaxed text-muted">{step.body}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2">
        {solution.features.map((feature, i) => (
          <PointCard key={i} item={feature} index={i} icon={featureIcons[i]} />
        ))}
      </Stagger>

      <Reveal className="mt-12 flex flex-wrap gap-4">
        <ButtonLink href="/cards/" arrow>
          See the card set
        </ButtonLink>
        <ButtonLink href="/cards/#how-to-use" variant="secondary">
          How to use them
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

export function ImpactSection() {
  const icons = [Users, Trophy, BookOpen];
  const polaroidTilts = [-2.5, 1.75, -1.25, 2.25, -1.75];

  return (
    <Section id="impact" tone="secondary" blobs="b">
      <SectionHeading eyebrow="Proof it is real" sticker="purple">
        {impact.heading}
      </SectionHeading>

      <Reveal className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
        <p>{impact.lead}</p>
      </Reveal>

      <Stagger as="div" className="mt-12 grid gap-6 lg:grid-cols-3">
        {impact.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem
              as="div"
              key={item.title}
              tilt={tilts[i]}
              className="flex flex-col rounded-card border-2 border-navy bg-surface p-6 shadow-pop"
            >
              <article className="flex flex-1 flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-accent-strong">
                    {Icon ? <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2.25} /> : null}
                    {item.label}
                  </span>
                  <span className="rounded-full border-2 border-navy bg-sun px-3 py-0.5 text-xs font-bold text-navy">
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-navy">
                  {item.title}
                </h3>

                <div className="mt-2 flex-1 text-base leading-relaxed text-muted">
                  <Copy text={item.body} />
                </div>

                {item.photos.length > 0 ? (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {item.photos.map((photo) => (
                      <ImageFrame key={photo.src} src={photo.src} alt={photo.alt} aspect="aspect-square" />
                    ))}
                  </div>
                ) : null}

                {"link" in item && item.link.href ? (
                  <Link
                    href={item.link.href}
                    className="mt-4 inline-block text-base font-bold text-accent-strong underline underline-offset-2"
                  >
                    {item.link.label}
                  </Link>
                ) : null}
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div className="mt-24">
        <Reveal>
          <h3 className="max-w-prose font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            {impact.fieldGallery.heading}
          </h3>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink">
            {impact.fieldGallery.intro}
          </p>
        </Reveal>

        {/* Columns, not a grid: photos are a mix of portrait and landscape and
            this shows each one uncropped, so nobody's face is cut off. */}
        <Stagger className="mt-12 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {impact.fieldGallery.photos.map((photo, i) => (
            <StaggerItem
              key={photo.src}
              tilt={polaroidTilts[i % polaroidTilts.length]}
              className="relative mb-10 break-inside-avoid pt-4"
            >
              <figure className="tape relative rounded-md border-2 border-navy bg-surface p-3 pb-4 shadow-pop">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="h-auto w-full rounded-sm"
                />
                <figcaption className="mt-3 text-center font-display text-lg font-medium text-navy">
                  {photo.caption}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

export function TestimonialsSection() {
  const bubbleColors = ["bg-surface", "bg-sun-soft", "bg-secondary-soft"] as const;

  return (
    <Section id="testimonials" tone="soft" blobs="a">
      <SectionHeading eyebrow="From people who used them" sticker="pink">
        {testimonialsSection.heading}
      </SectionHeading>

      <Reveal className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
        <p>{testimonialsSection.lead}</p>
      </Reveal>

      {testimonials.length === 0 ? (
        <Reveal className="mt-10 max-w-xl">
          <div className="relative rounded-[2rem] rounded-bl-md border-2 border-navy bg-surface p-7 shadow-pop">
            <Quote aria-hidden="true" className="mb-3 h-8 w-8 text-accent" strokeWidth={2.5} />
            <p className="text-lg leading-relaxed text-ink">{testimonialsSection.emptyState}</p>
          </div>
        </Reveal>
      ) : (
        <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <StaggerItem
              key={i}
              tilt={tilts[i % tilts.length]}
              className={clsx(
                "rounded-[2rem] rounded-bl-md border-2 border-navy p-7 shadow-pop",
                bubbleColors[i % bubbleColors.length],
              )}
            >
              <Quote aria-hidden="true" className="mb-3 h-7 w-7 text-accent" strokeWidth={2.5} />
              <blockquote className="text-lg leading-relaxed text-ink">
                <p>{testimonial.quote}</p>
              </blockquote>
              <p className="mt-4 text-sm font-bold uppercase tracking-wide text-muted">
                {testimonial.attribution}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <Reveal className="mt-10">
        <ButtonLink href="/feedback/" variant="secondary" arrow>
          Add your own
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-28">
      <Wave tone="navy" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-10 h-72 w-72 rounded-blob bg-grownup opacity-30 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-blob bg-sun opacity-20 blur-3xl" />
        <span className="animate-floaty absolute right-[12%] top-[22%] h-8 w-8 rounded-full border-[3px] border-white bg-sun" />
        <span className="animate-floaty absolute bottom-[20%] right-[28%] h-5 w-5 rounded-full border-[3px] border-white bg-grownup [animation-delay:-3s]" />
      </div>
      <Container className="relative">
        <Reveal className="max-w-prose">
          <Sticker color="sun" tilt={-3} className="mb-5">
            Anonymous · about a minute
          </Sticker>
          <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {closingCta.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-on-dark sm:text-xl">{closingCta.body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={closingCta.primary.href} variant="sun" arrow>
              {closingCta.primary.label}
            </ButtonLink>
            <ButtonLink href={closingCta.secondary.href} variant="secondary">
              {closingCta.secondary.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
