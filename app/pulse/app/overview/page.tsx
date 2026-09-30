import type { Metadata } from "next"
import Link from "next/link"
import { CircleDollarSign, FileText, Settings2, Star, Zap } from "lucide-react"
import { AddFindingToPlan } from "@/components/pulse/add-to-plan"
import { Badge } from "@/components/pulse/ui"
import { buttonStyles } from "@/components/site/primitives"
import { findingDetails, sampleMetrics, type Tone } from "@/lib/pulse"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Overview" }

const icons = [CircleDollarSign, Settings2, FileText, Zap]

const cardTone: Record<Tone, string> = {
  amber: "border-[#f3d28a] bg-[#fffaf0]",
  blue: "border-[#bcd3f5] bg-[#f5f9ff]",
  red: "border-[#f2c1bb] bg-[#fff7f6]",
  teal: "border-[#b5ddd6] bg-[#f3fbf9]",
  slate: "border-line bg-white",
}

const iconTone: Record<Tone, string> = {
  amber: "bg-pulse-yellow text-ink",
  blue: "bg-brand text-white",
  red: "bg-[#d64533] text-white",
  teal: "bg-teal text-white",
  slate: "bg-paper text-ink",
}

export default function OverviewPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-ink">Executive overview</h1>
          <p className="mt-2 text-ink-soft">Illustrative assessment for a sample business.</p>
        </div>
        <Badge tone="amber">Illustrative sample data</Badge>
      </div>

      <section aria-labelledby="scores-title" className="mt-8">
        <h2 id="scores-title" className="sr-only">
          Performance area scores
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {sampleMetrics.map((m, i) => {
            const Icon = icons[i]
            return (
              <li key={m.area} className={cn("rounded-xl border p-5 shadow-[0_1px_3px_rgba(15,27,45,0.05)]", cardTone[m.tone])}>
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className={cn("inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full", iconTone[m.tone])}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-ink">{m.area}</h3>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-ink-soft">
                        <span className="font-heading text-3xl font-bold text-ink">{m.score}</span> / 100
                        <span className="sr-only"> (sample score)</span>
                      </p>
                      <Badge tone={m.tone}>{m.label}</Badge>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-sm text-ink-soft">
          Scores are illustrative sample data and are not calculated from your assessment answers.
        </p>
      </section>

      <section aria-labelledby="priority-title" className="mt-8 rounded-xl border border-[#bcd3f5] bg-white p-6 shadow-[0_1px_3px_rgba(15,27,45,0.06)] sm:p-8">
        <div className="flex gap-4">
          <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pulse-yellow text-ink">
            <Star className="h-5 w-5" />
          </span>
          <div className="min-w-0">
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
          </div>
        </div>
      </section>
    </>
  )
}
