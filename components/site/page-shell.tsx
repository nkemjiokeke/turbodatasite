import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ButtonLink, Container, Eyebrow } from "@/components/site/primitives"
import { site } from "@/lib/site"

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="border-b border-line bg-paper py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl font-bold leading-[1.12] text-ink sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}

export function CtaBand({
  title = "Start with a clearer view of the problem.",
  body = "Tell us what is happening in the business and what you want to improve. We will help you decide whether a diagnostic, analysis, process review, or ongoing support is the right starting point.",
}: {
  title?: string
  body?: string
}) {
  return (
    <section aria-labelledby="cta-band-title" className="on-dark bg-navy py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="cta-band-title" className="text-3xl font-bold leading-tight text-on-dark">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-on-dark-muted">{body}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.primaryCta.href} variant="light">
              {site.primaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
