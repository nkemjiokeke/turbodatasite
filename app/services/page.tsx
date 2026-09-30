import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CtaBand, PageHero, PageShell } from "@/components/site/page-shell"
import { IconBadge, Section } from "@/components/site/primitives"
import { services } from "@/lib/services"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Business Analytics and Operations Services",
  description:
    "Operations diagnostics, profitability analysis, process improvement, reporting, automation advisory, and fractional analytics support for Ontario SMEs.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title="Practical analysis and improvement for established businesses"
        intro="TurboData helps businesses understand performance, identify operational friction, and make improvements that can be measured."
      >
        <nav aria-label="Services on this page" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink hover:border-ink/40"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {services.map((s, i) => (
        <Section key={s.slug} id={s.slug} tone={i % 2 === 0 ? "white" : "paper"} labelledBy={`${s.slug}-title`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <IconBadge icon={s.icon} />
              <h2 id={`${s.slug}-title`} className="mt-5 text-3xl font-bold leading-tight text-ink">
                {s.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{s.summary}</p>
              <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-ink">Who it is for</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.audience}</p>
              <Link
                href={`/services/${s.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
              >
                Full details<span className="sr-only"> for {s.title}</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <dl className="grid gap-8 sm:grid-cols-2">
              <DetailList term="Business symptoms" items={s.symptoms} />
              <DetailList term="What TurboData examines" items={s.examines} />
              <DetailList term="Typical deliverables" items={s.deliverables} />
              <div>
                <dt className="font-bold text-ink">What to expect</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">{s.expect}</dd>
                <dt className="mt-6 font-bold text-ink">Suggested next step</dt>
                <dd className="mt-2 leading-relaxed text-ink-soft">{s.nextStep}</dd>
              </div>
            </dl>
          </div>
        </Section>
      ))}

      <CtaBand />
    </PageShell>
  )
}

function DetailList({ term, items }: { term: string; items: string[] }) {
  return (
    <div>
      <dt className="font-bold text-ink">{term}</dt>
      <dd className="mt-2">
        <ul className="list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-brand">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  )
}
