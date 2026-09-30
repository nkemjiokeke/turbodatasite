"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { usePulse } from "@/components/pulse/store"
import { ReportRequestForm } from "@/components/pulse/report-request-form"
import { buttonStyles } from "@/components/site/primitives"
import { categoryContent, categorySlug } from "@/lib/pulse"
import { buildPulseReport } from "@/lib/pulse-scoring"

export function FindingsSummary() {
  const { answers, completed } = usePulse()

  if (!completed) {
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center shadow-[0_1px_3px_rgba(15,27,45,0.06)]">
        <h1 className="text-2xl font-bold text-ink">Complete the assessment to see your findings</h1>
        <p className="mt-2 text-ink-soft">Your findings are generated from your assessment answers.</p>
        <Link href="/pulse/assessment" className={buttonStyles("primary", "mt-6 inline-flex")}>
          Start the assessment
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  const report = buildPulseReport(answers)

  return (
    <>
      <h1 className="text-3xl font-bold text-ink">Your business performance findings</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">Based on your answers, these areas may deserve attention first.</p>

      {report.topAreas.length === 0 ? (
        <p className="mt-8 text-ink-soft">There was not enough information in your answers to identify priority areas.</p>
      ) : (
        <ol className="mt-8 space-y-6">
          {report.topAreas.map((area) => {
            const content = categoryContent[area.category]
            const tier = area.tier ?? "developing"
            const href = `/pulse/findings/${categorySlug(area.category)}`
            return (
              <li key={area.category} className="border-b border-line pb-6 last:border-0">
                <h2 className="text-xl font-bold text-ink">
                  <Link href={href} className="hover:underline">
                    {area.category}
                  </Link>
                </h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{content.tiers[tier].whatAnswersSuggest}</p>
                <p className="mt-2 leading-relaxed text-ink-soft">{content.whyItMatters}</p>
                <Link href={href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                  View finding
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </li>
            )
          })}
        </ol>
      )}

      <div className="mt-10 border-t border-line pt-10">
        <ReportRequestForm answers={answers} />
      </div>
    </>
  )
}
