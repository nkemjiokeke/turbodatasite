"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { usePulse } from "@/components/pulse/store"
import { buttonStyles } from "@/components/site/primitives"
import { categoryContent, type Category } from "@/lib/pulse"
import { calculateCategoryScores } from "@/lib/pulse-scoring"

export function FindingDetail({ category }: { category: Category }) {
  const { answers, completed } = usePulse()

  if (!completed) {
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center shadow-[0_1px_3px_rgba(15,27,45,0.06)]">
        <h1 className="text-2xl font-bold text-ink">Complete the assessment to see this finding</h1>
        <p className="mt-2 text-ink-soft">This page is generated from your assessment answers.</p>
        <Link href="/pulse/assessment" className={buttonStyles("primary", "mt-6 inline-flex")}>
          Start the assessment
        </Link>
      </div>
    )
  }

  const scores = calculateCategoryScores(answers)
  const score = scores.find((s) => s.category === category)
  const tier = score?.tier ?? "developing"
  const content = categoryContent[category]

  return (
    <>
      <Link href="/pulse/findings" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to findings
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-ink">{category}</h1>
      <p className="mt-4 text-ink-soft">{content.explanation}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6 rounded-xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(15,27,45,0.05)] sm:p-8">
          <section aria-labelledby="suggest-title">
            <h2 id="suggest-title" className="text-lg font-bold text-ink">
              What the answers suggest
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{content.tiers[tier].whatAnswersSuggest}</p>
          </section>
          <section aria-labelledby="matter-title">
            <h2 id="matter-title" className="text-lg font-bold text-ink">
              Why it may matter
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{content.whyItMatters}</p>
          </section>
          <section aria-labelledby="examine-title">
            <h2 id="examine-title" className="text-lg font-bold text-ink">
              What to examine next
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{content.examineNext}</p>
          </section>
        </div>

        <div className="space-y-6 rounded-xl border border-line bg-white p-6 sm:p-8">
          <section aria-labelledby="process-title">
            <h2 id="process-title" className="text-lg font-bold text-ink">
              Where process improvement may help
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{content.processImprovementNote}</p>
          </section>
          <section aria-labelledby="automation-title" className="border-t border-line pt-6">
            <h2 id="automation-title" className="text-lg font-bold text-ink">
              Where automation may help
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{content.automationNote}</p>
          </section>
          <section aria-labelledby="step-title" className="border-t border-line pt-6">
            <h2 id="step-title" className="text-lg font-bold text-ink">
              Suggested first step
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{content.tiers[tier].firstStep}</p>
          </section>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        This is a starting point for discussion, not a definitive diagnosis or a guaranteed financial result.
      </p>

      <Link href="/pulse/findings" className={buttonStyles("secondary", "mt-4")}>
        Back to findings
      </Link>
    </>
  )
}
