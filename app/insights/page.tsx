import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CtaBand, PageHero, PageShell } from "@/components/site/page-shell"
import { Section } from "@/components/site/primitives"
import { articles, formatDate, insightCategories } from "@/lib/insights"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Insights on Profit, Operations and Reporting",
  description:
    "Practical articles from TurboData Analytics on profitability analysis, operations, process improvement, and reporting for small and medium-sized businesses.",
  path: "/insights",
})

export default function InsightsPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        title="Practical notes on profit, operations, and reporting"
        intro="Articles explaining how TurboData approaches common business questions, with the methods and caveats written out in full."
      />
      <Section tone="white" labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">
          Articles
        </h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((a) => (
            <li key={a.slug}>
              <article className="relative flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-colors focus-within:ring-3 focus-within:ring-brand hover:border-ink/30">
                <p className="text-sm font-semibold text-brand">{a.category}</p>
                <h3 className="mt-3 text-xl font-bold leading-snug text-ink">
                  <Link href={`/insights/${a.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{a.summary}</p>
                <p className="mt-5 flex items-center justify-between text-sm text-ink-soft">
                  <span>
                    <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readingMinutes} min read
                  </span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-brand" />
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-t border-line pt-8">
          <h2 className="text-lg font-bold text-ink">Topics covered</h2>
          <p className="mt-3 flex flex-wrap gap-2">
            {insightCategories.map((c) => (
              <span key={c} className="rounded-full border border-line bg-paper px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </p>
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  )
}
