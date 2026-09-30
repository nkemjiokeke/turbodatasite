import type { Metadata } from "next"
import Link from "next/link"
import { AddFindingToPlan } from "@/components/pulse/add-to-plan"
import { Badge } from "@/components/pulse/ui"
import { buttonStyles } from "@/components/site/primitives"
import { findingDetails, overviewAreas } from "@/lib/pulse"

export const metadata: Metadata = { title: "Overview" }

export default function OverviewPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-ink">Executive overview</h1>
          <p className="mt-2 text-ink-soft">Illustrative overview for a sample business.</p>
        </div>
        <Badge tone="slate">V1 · Illustrative sample data</Badge>
      </div>

      <p className="mt-6 max-w-2xl rounded-lg border border-line bg-white p-4 leading-relaxed text-ink-soft">
        In the finished product, completing the assessment calculates a score and emails a report with priority
        areas for improvement. This V1 prototype does not calculate or send anything — the notes below are
        illustrative sample write-ups, not results from your answers.
      </p>

      <section aria-labelledby="areas-title" className="mt-8">
        <h2 id="areas-title" className="text-lg font-bold text-ink">
          Areas Pulse looks at
        </h2>
        <ul className="mt-4 space-y-5">
          {overviewAreas.map((a) => (
            <li key={a.area} className="border-l-2 border-teal py-0.5 pl-4">
              <h3 className="font-semibold text-ink">{a.area}</h3>
              <p className="mt-1 leading-relaxed text-ink-soft">{a.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="priority-title" className="mt-10 rounded-xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(15,27,45,0.06)] sm:p-8">
        <h2 id="priority-title" className="text-sm font-semibold text-teal">
          Your highest-priority opportunity
        </h2>
        <p className="mt-1 font-heading text-2xl font-bold text-ink">Improve weekly management reporting</p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Current reporting may not provide timely information for decisions about profitability, costs, and
          operational capacity.
        </p>
        <p className="mt-3 leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Recommended first step:</span> Create a weekly management
          scorecard with five core indicators.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
          <Link href="/pulse/app/findings/weekly-reporting" className={buttonStyles("secondary")}>
            View finding
          </Link>
          <AddFindingToPlan action={findingDetails["weekly-reporting"].planAction} />
        </div>
      </section>
    </>
  )
}
