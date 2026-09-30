import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/pulse/ui"
import { sampleFindings, statusTone } from "@/lib/pulse"

export const metadata: Metadata = { title: "Findings" }

export default function FindingsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-ink">Findings</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Illustrative findings based on sample information, ordered by priority.
      </p>

      <ol className="mt-8 space-y-4">
        {sampleFindings.map((f, i) => (
          <li key={f.title}>
            <article className="relative rounded-xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(15,27,45,0.05)] focus-within:ring-3 focus-within:ring-brand sm:flex sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <p className="text-sm text-ink-soft">
                  Priority {String(i + 1).padStart(2, "0")} of {String(sampleFindings.length).padStart(2, "0")}
                </p>
                <h2 className="mt-1 text-xl font-bold text-ink">
                  <Link
                    href={`/pulse/app/findings/${f.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-none"
                  >
                    {f.title}
                  </Link>
                </h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{f.summary}</p>
                <dl className="mt-4 flex flex-wrap gap-2">
                  <div>
                    <dt className="sr-only">Priority</dt>
                    <dd>
                      <Badge tone={statusTone[f.priority]}>{f.priority} priority</Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Category</dt>
                    <dd>
                      <Badge tone="blue">{f.category}</Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Status</dt>
                    <dd>
                      <Badge tone={statusTone[f.status]}>{f.status}</Badge>
                    </dd>
                  </div>
                </dl>
              </div>
              <span aria-hidden="true" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand sm:mt-1">
                View finding <ArrowRight className="h-4 w-4" />
              </span>
            </article>
          </li>
        ))}
      </ol>
    </>
  )
}
