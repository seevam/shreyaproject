import type { Metadata } from "next";
import { cardsPage, site } from "@content/site";
import { Container, ImageFrame } from "@/components/ui";
import { Copy } from "@/components/Copy";

export const metadata: Metadata = {
  title: "The cards",
  description: `A look at the printed cue card set behind ${site.name}.`,
};

export default function CardsPage() {
  return (
    <article className="py-16 sm:py-24">
      <Container>
        <div className="max-w-prose">
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {cardsPage.title}
          </h1>
          <div className="mt-6 text-lg leading-relaxed text-ink">
            <Copy text={cardsPage.lead} />
          </div>
        </div>

        {/*
          PRD §5.4: images only, no downloadable card files, given the
          copyright caution raised in the 19 June session. There is deliberately
          no download link anywhere on this page.
        */}
        <div className="mt-10 max-w-prose">
          <Copy text={cardsPage.note} />
        </div>

        {cardsPage.gallery.length === 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <ImageFrame
                key={i}
                alt=""
                aspect="aspect-[3/4]"
                placeholderLabel="Card photograph"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cardsPage.gallery.map((image) => (
              <ImageFrame
                key={image.src}
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                aspect="aspect-[3/4]"
              />
            ))}
          </div>
        )}

        {cardsPage.gallery.length === 0 ? (
          <p className="mt-6 text-base text-muted">
            {cardsPage.galleryEmptyState}
          </p>
        ) : null}
      </Container>
    </article>
  );
}
