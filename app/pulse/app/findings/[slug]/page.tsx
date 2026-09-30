import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarClock, Check, Info } from "lucide-react"
import { AddFindingToPlan } from "@/components/pulse/add-to-plan"
import { Badge } from "@/components/pulse/ui"
import { buttonStyles } from "@/components/site/primitives"
import { findingDetails, statusTone } from "@/lib/pulse"

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(findingDetails).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const detail = findingDetails[slug]
  if (!detail) return {}
  return { title: detail.title }
}

export default async function FindingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const detail = findingDetails[slug]
  if (!detail) notFound()

  return (
    <>
      <Link href="/pulse/app/findings" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to findings
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-ink">{detail.title}</h1>
      <ul aria-label="Finding details" className="mt-4 flex flex-wrap gap-2">
        <li>
          <Badge tone={statusTone[detail.priority]}>{detail.priority} priority</Badge>
        </li>
        <li>
          <Badge tone="blue">{detail.category}</Badge>
        </li>
        <li>
          <Badge tone={statusTone[detail.status]}>{detail.status}</Badge>
        </li>
      </ul>

      <p className="mt-6 flex gap-2 rounded-lg border border-[#f3d28a] bg-[#fdf3dc] px-4 py-3 text-sm font-medium text-[#7a4a00]">
        <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        This is an illustrative finding based on sample information.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6 rounded-xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(15,27,45,0.05)] sm:p-8">
          <section aria-labelledby="observed-title">
            <h2 id="observed-title" className="text-lg font-bold text-ink">
              What we observed
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{detail.observed}</p>
          </section>
          <section aria-labelledby="impact-title">
            <h2 id="impact-title" className="text-lg font-bold text-ink">
              Potential business impact
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft marker:text-teal">
              {detail.impacts.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6 rounded-xl border border-[#bcd3f5] bg-[#f5f9ff] p-6 sm:p-8">
          <section aria-labelledby="action-title">
            <h2 id="action-title" className="text-lg font-bold text-ink">
              Recommended action
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{detail.recommendedIntro}</p>
            <ul className="mt-3 space-y-2">
              {detail.indicators.map((i) => (
                <li key={i} className="flex gap-2 text-ink">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-teal" />
                  {i}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="target-title" className="border-t border-[#bcd3f5] pt-6">
            <h2 id="target-title" className="flex items-center gap-2 text-lg font-bold text-ink">
              <CalendarClock aria-hidden="true" className="h-5 w-5 text-brand" />
              30-day target
            </h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{detail.target}</p>
          </section>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
        <AddFindingToPlan action={detail.planAction} />
        <Link href="/pulse/app/findings" className={buttonStyles("secondary")}>
          Back to findings
        </Link>
      </div>
    </>
  )
}
