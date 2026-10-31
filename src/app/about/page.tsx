import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { about, site } from "@content/site";
import { Container, ImageFrameAware, Sticker } from "@/components/ui";
import { Copy } from "@/components/Copy";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "About",
  description: `${site.founder.name} on why she built the cards and where the initiative is headed.`,
};

export default function AboutPage() {
  return (
    <article className="bg-dots relative overflow-hidden pb-24 pt-14 sm:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-20 h-96 w-96 rounded-blob bg-sun opacity-25 blur-3xl" />
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-blob bg-accent opacity-15 blur-3xl" />
      </div>
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_340px] lg:gap-20">
          <div className="max-w-prose">
            <Reveal>
              <Sticker color="pink" tilt={-2}>
                The story so far
              </Sticker>
              <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-navy sm:text-6xl">
                {about.title}
              </h1>
            </Reveal>

            <Reveal className="prose-body mt-8 text-lg text-ink">
              <Copy text={about.lead} />
            </Reveal>

            <Reveal className="mt-10">
              <figure className="relative rotate-[-1deg] rounded-[2rem] rounded-bl-md border-2 border-navy bg-sun-soft p-7 shadow-pop-lg transition-transform hover:rotate-0 sm:p-9">
                <Quote aria-hidden="true" className="mb-3 h-9 w-9 text-accent" strokeWidth={2.5} />
                <blockquote>
                  <p className="font-display text-2xl font-medium leading-snug text-navy sm:text-3xl">
                    {about.principle}
                  </p>
                </blockquote>
              </figure>
            </Reveal>

            <div className="prose-body mt-10 text-ink">
              <Copy text={about.originGap} />
            </div>

            <Reveal>
              <h2 className="mt-14 font-display text-3xl font-semibold text-navy">
                {about.whereItsHeaded.heading}
              </h2>
              <div className="prose-body mt-4 text-ink">
                <Copy text={about.whereItsHeaded.body} />
              </div>
            </Reveal>

            <Reveal>
              <h2 className="mt-14 font-display text-3xl font-semibold text-navy">
                {about.creditsHeading}
              </h2>
              <p className="prose-body mt-4 text-ink">
                Words by {site.credits.words}. Design by {site.credits.design}.
              </p>
            </Reveal>
          </div>

          <aside className="lg:pt-6">
            <Reveal className="relative mx-auto max-w-[340px]">
              <div className="tape relative rotate-[2deg] rounded-md border-2 border-navy bg-surface p-3 pb-5 shadow-pop-lg transition-transform duration-300 hover:rotate-0">
                <ImageFrameAware
                  src={about.photo.src}
                  alt={about.photo.alt}
                  aspect="aspect-[4/5]"
                  placeholderLabel="Photograph of Shreya"
                  className="[&_img]:rounded-sm [&_img]:border-0 [&_img]:shadow-none"
                />
                <p className="mt-3 text-center font-display text-2xl font-semibold text-navy">
                  {site.founder.name}
                </p>
              </div>
              <Sticker color="sun" tilt={-10} className="absolute -left-4 top-8">
                {site.founder.role}
              </Sticker>
            </Reveal>
            <div className="mt-8 text-base leading-relaxed text-muted">
              <Copy text={about.bio} />
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
