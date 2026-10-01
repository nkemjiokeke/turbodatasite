import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, Clock, X } from "lucide-react"
import { CtaBand, PageShell } from "@/components/site/page-shell"
import { ButtonLink, Container, IconBadge, Section } from "@/components/site/primitives"
import { getService, services } from "@/lib/services"
import { site } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  // "operations-diagnostic" has its own dedicated route at app/services/operations-diagnostic/.
  return services.filter((s) => s.slug !== "operations-diagnostic").map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = getService(slug)
  if (!s) return {}
  return pageMetadata({ title: `${s.title} for Ontario SMEs`, description: s.summary, path: `/services/${s.slug}` })
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getService(slug)
  if (!s) notFound()

  const others = services.filter((o) => o.slug !== s.slug)

  return (
    <PageShell>
      <section className="border-b border-line bg-paper py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <Link href="/services" className="inline-flex items-center gap-1.5 font-medium text-ink-soft hover:text-ink">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              All services
            </Link>
          </nav>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <IconBadge icon={s.icon} />
              <p className="text-sm font-semibold tracking-wide text-brand">{s.title}</p>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.12] text-ink sm:text-5xl">{s.headline}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">{s.summary}</p>
            <div className="mt-8">
              <ButtonLink href={site.primaryCta.href}>Book a conversation</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink">Who it is for</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{s.audience}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">Problems it addresses</h2>
            <ul className="mt-4 space-y-3">
              {s.symptoms.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink">What the engagement includes</h2>
            <ul className="mt-4 space-y-3">
              {s.examines.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                  <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-ink-soft">{s.expect}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">Deliverables</h2>
            <ul className="mt-4 space-y-3">
              {s.deliverables.map((item) => (
                <li key={item} className="flex gap-3 rounded-lg border border-line bg-white p-4 font-medium text-ink">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink">What is not included</h2>
            <ul className="mt-4 space-y-3">
              {s.notIncluded.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ink-soft">
                  <X aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-ink-soft" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">Typical timeline</h2>
            <p className="mt-4 flex gap-3 leading-relaxed text-ink-soft">
              <Clock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
              {s.timeline} A proposed timeline is agreed before work begins.
            </p>
            <h2 className="mt-10 text-2xl font-bold text-ink">Next step</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{s.nextStep}</p>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="related-title">
        <h2 id="related-title" className="text-2xl font-bold text-ink">
          Related services
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/services/${o.slug}`}
                className="flex h-full items-center gap-3 rounded-lg border border-line bg-white p-4 font-semibold text-ink hover:border-ink/40"
              >
                <IconBadge icon={o.icon} />
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </PageShell>
  )
}
