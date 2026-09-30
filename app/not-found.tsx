import type { Metadata } from "next"
import { PageShell } from "@/components/site/page-shell"
import { ButtonLink, Container } from "@/components/site/primitives"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <PageShell>
      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-teal">Error 404</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">This page could not be found.</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              The page may have moved, or the link may be out of date. These pages are a good place to start.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/">Go to the home page</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                View services
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact TurboData
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  )
}
