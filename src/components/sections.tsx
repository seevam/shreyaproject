import Link from "next/link";
import {
  closingCta,
  impact,
  isTodo,
  problem,
  solution,
  testimonials,
  testimonialsSection,
} from "@content/site";
import { ButtonLink, Container, ImageFrame, Section, SectionHeading } from "@/components/ui";
import { Copy, Placeholder } from "@/components/Copy";

type Item = { title: string; body: string };

/** A titled point. Renders one placeholder for the pair when neither is written. */
function PointCard({ item, index }: { item: Item; index: number }) {
  const unwritten = isTodo(item.title) && isTodo(item.body);

  if (unwritten) {
    return (
      <li className="rounded-card border border-line bg-surface p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">
          Point {index + 1}
        </p>
        <Placeholder note="a short heading and one or two sentences" />
      </li>
    );
  }

  return (
    <li className="rounded-card border border-line bg-surface p-6">
      <Copy
        as="h3"
        text={item.title}
        className="font-display text-xl font-semibold text-ink"
      />
      <div className="mt-2 text-base leading-relaxed text-muted">
        <Copy text={item.body} />
      </div>
    </li>
  );
}

export function ProblemSection() {
  return (
    <Section id="problem" tone="soft">
      <SectionHeading eyebrow="Why this exists">{problem.heading}</SectionHeading>

      <div className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
        <Copy text={problem.lead} />
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {problem.points.map((point, i) => (
          <PointCard key={i} item={point} index={i} />
        ))}
      </ul>
    </Section>
  );
}

export function SolutionSection() {
  return (
    <Section id="solution">
      <SectionHeading eyebrow="What they are">{solution.heading}</SectionHeading>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div className="max-w-prose text-lg leading-relaxed text-ink">
          <Copy text={solution.lead} />
        </div>
        <ImageFrame
          alt="The printed cue card set"
          aspect="aspect-[4/3]"
          placeholderLabel="Photograph of the printed set"
        />
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {solution.features.map((feature, i) => (
          <PointCard key={i} item={feature} index={i} />
        ))}
      </ul>

      <div className="mt-8">
        <ButtonLink href="/cards/" variant="secondary">
          See the card set
        </ButtonLink>
      </div>
    </Section>
  );
}

export function ImpactSection() {
  return (
    <Section id="impact" tone="secondary">
      <SectionHeading eyebrow="Proof it is real">{impact.heading}</SectionHeading>

      <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
        {impact.lead}
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {impact.items.map((item) => (
          <article
            key={item.title}
            className="flex flex-col rounded-card border border-line bg-surface p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.12em] text-accent-strong">
                {item.label}
              </span>
              <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-muted">
                {item.status}
              </span>
            </div>

            <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
              {item.title}
            </h3>

            <div className="mt-2 flex-1 text-base leading-relaxed text-muted">
              <Copy text={item.body} />
            </div>

            {item.photos.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {item.photos.map((photo) => (
                  <ImageFrame
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    aspect="aspect-square"
                  />
                ))}
              </div>
            ) : null}

            {"link" in item && item.link.href ? (
              <Link
                href={item.link.href}
                className="mt-4 inline-block text-base font-semibold text-accent-strong underline underline-offset-2"
              >
                {item.link.label}
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}

export function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <SectionHeading eyebrow="From people who used them">
        {testimonialsSection.heading}
      </SectionHeading>

      <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
        {testimonialsSection.lead}
      </p>

      {testimonials.length === 0 ? (
        <p className="mt-8 max-w-prose rounded-card border border-dashed border-line bg-surface p-6 text-base text-muted">
          {testimonialsSection.emptyState}
        </p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <li key={i} className="rounded-card border border-line bg-surface p-6">
              <blockquote className="text-lg leading-relaxed text-ink">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">
                {testimonial.attribution}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <ButtonLink href="/feedback/" variant="secondary">
          Add your own
        </ButtonLink>
      </div>
    </Section>
  );
}

export function ClosingCta() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <Container>
        <div className="max-w-prose">
          <h2 className="font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
            {closingCta.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-on-ink">
            {closingCta.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={closingCta.primary.href}
              className="inline-flex items-center justify-center rounded-full bg-paper px-6 py-3 text-base font-semibold text-ink transition-colors hover:bg-accent-soft"
            >
              {closingCta.primary.label}
            </Link>
            <Link
              href={closingCta.secondary.href}
              className="inline-flex items-center justify-center rounded-full border border-on-ink-line px-6 py-3 text-base font-semibold text-paper transition-colors hover:border-paper"
            >
              {closingCta.secondary.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
