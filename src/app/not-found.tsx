import { ButtonLink, Container, Sticker } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="bg-dots py-24 sm:py-32">
      <Container>
        <div className="max-w-prose">
          <Sticker color="sun" tilt={-3}>404</Sticker>
          <h1 className="mt-5 font-display text-5xl font-semibold text-navy sm:text-6xl">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-muted">
            That page does not exist, or it has moved.
          </p>
          <p className="mt-8">
            <ButtonLink href="/" arrow>
              Back to the home page
            </ButtonLink>
          </p>
        </div>
      </Container>
    </div>
  );
}
