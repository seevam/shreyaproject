import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32">
      <Container>
        <div className="max-w-prose">
          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-muted">
            That page does not exist, or it has moved.
          </p>
          <p className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-accent-strong px-6 py-3 text-base font-semibold text-white hover:bg-ink"
            >
              Back to the home page
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
