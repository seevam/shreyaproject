import { hero } from "@content/site";
import { card } from "@content/cards";
import { ButtonLink, Container, Sticker } from "@/components/ui";
import { HeroFan } from "@/components/HeroFan";
import { Reveal } from "@/components/motion";
import { blogIsLive } from "@/lib/visibility";

/** Splits the title so `titleHighlight` gets the marker-pen treatment. */
function Title() {
  const { title, titleHighlight } = hero;
  const at = title.indexOf(titleHighlight);
  if (at === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="marker">{titleHighlight}</span>
      {title.slice(at + titleHighlight.length)}
    </>
  );
}

export function Hero() {
  const [left, centre, right] = hero.fan.map((slug) => card(slug));
  const secondary = blogIsLive()
    ? { href: hero.secondaryCtaHref, label: hero.secondaryCtaLabel }
    : { href: "/about/", label: "Meet Shreya" };

  return (
    <section className="bg-dots relative overflow-hidden bg-paper pb-24 pt-14 sm:pb-32 sm:pt-20">
      {/* Decorative blobs and floating dots: the purple and yellow dot from every card. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-blob bg-sun opacity-30 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-blob bg-accent opacity-15 blur-3xl" />
        <span className="animate-floaty absolute left-[6%] top-[18%] hidden h-6 w-6 lg:block rounded-full border-[3px] border-navy bg-grownup" />
        <span className="animate-floaty absolute bottom-[14%] left-[44%] h-4 w-4 rounded-full border-[3px] border-navy bg-sun [animation-delay:-2s]" />
        <span className="animate-floaty absolute right-[8%] top-[8%] h-5 w-5 rounded-full border-[3px] border-navy bg-accent [animation-delay:-4s]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <Reveal>
            <Sticker color="pink" tilt={-2}>
              {hero.eyebrow}
            </Sticker>

            <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
              <Title />
            </h1>

            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink sm:text-xl">
              {hero.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href={hero.ctaHref} arrow>
                {hero.ctaLabel}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="secondary">
                {secondary.label}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="relative">
            {hero.photo.src ? (
              // A plain <img>: one hand-placed hero photograph.
              <img
                src={hero.photo.src}
                alt={hero.photo.alt}
                className="aspect-[4/3] w-full rounded-card border-2 border-navy object-cover shadow-pop-lg"
              />
            ) : (
              <HeroFan cards={[left, centre, right]} />
            )}

            {/* Fact stickers around the fan. */}
            <div className="pointer-events-none mt-4 flex flex-wrap justify-center gap-3 lg:absolute lg:inset-0 lg:mt-0 lg:block">
              <Sticker color="sun" tilt={-8} className="lg:absolute lg:-left-4 lg:top-2">
                {hero.stickers[0]}
              </Sticker>
              <Sticker color="purple" tilt={6} className="lg:absolute lg:-bottom-6 lg:left-2">
                {hero.stickers[1]}
              </Sticker>
              <Sticker color="white" tilt={-4} className="lg:absolute lg:-bottom-10 lg:right-0">
                {hero.stickers[2]}
              </Sticker>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
