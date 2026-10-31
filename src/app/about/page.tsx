import type { Metadata } from "next";
import { about, site } from "@content/site";
import { Container, ImageFrameAware } from "@/components/ui";
import { Copy } from "@/components/Copy";

export const metadata: Metadata = {
  title: "About",
  description: `${site.founder.name} on why she built the cue cards and where the initiative is headed.`,
};

export default function AboutPage() {
  return (
    <article className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="max-w-prose">
            <h1 className="font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">
              {about.title}
            </h1>

            <div className="prose-body mt-8 text-ink">
              <Copy text={about.lead} />
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold text-navy">
              {about.whereItsHeaded.heading}
            </h2>
            <div className="prose-body mt-4 text-ink">
              <Copy text={about.whereItsHeaded.body} />
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold text-navy">
              {about.creditsHeading}
            </h2>
            <p className="prose-body mt-4 text-ink">
              Words by {site.credits.words}. Design by {site.credits.design}.
            </p>
          </div>

          <aside className="lg:pt-4">
            <ImageFrameAware
              src={about.photo.src}
              alt={about.photo.alt}
              aspect="aspect-[4/5]"
              placeholderLabel="Photograph of Shreya"
            />
            <h2 className="mt-6 text-base font-semibold uppercase tracking-wide text-muted">
              {site.founder.name}
            </h2>
            <div className="mt-2 text-base leading-relaxed text-muted">
              <Copy text={about.bio} />
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
