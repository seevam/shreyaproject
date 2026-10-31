import Link from "next/link";
import { footer, isTodo, site } from "@content/site";
import { Container } from "@/components/ui";
import { Placeholder } from "@/components/Copy";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold text-navy">
              {site.name}
            </p>
            <p className="mt-2 text-base text-muted">{footer.blurb}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-ink hover:text-accent-strong"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-xs">
            <h2 className="text-base font-semibold text-ink">Contact</h2>
            {isTodo(site.contactEmail) ? (
              <Placeholder note="contact email for the footer" />
            ) : (
              <a
                href={`mailto:${site.contactEmail}`}
                className="mt-2 inline-block text-base text-accent-strong underline underline-offset-2"
              >
                {site.contactEmail}
              </a>
            )}
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
          © {year} {site.founder.name}. Words by {site.credits.words}, design by{" "}
          {site.credits.design}. The cards and their contents remain the work of
          their authors.
        </p>
      </Container>
    </footer>
  );
}
