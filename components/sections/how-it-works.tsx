import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section, SectionHeading } from "@/components/site/primitives"

export const steps = [
  {
    title: "Diagnose",
    body: "We review the business context, data, workflows, and performance questions that matter most.",
  },
  {
    title: "Prioritise",
    body: "We identify the most important issues, quantify where possible, and separate symptoms from root causes.",
  },
  {
    title: "Improve",
    body: "We create a practical action plan and support implementation, reporting, automation, or ongoing review.",
  },
]

export function StepList({ dark = false }: { dark?: boolean }) {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={dark ? "rounded-xl border border-navy-line bg-navy-2 p-6" : "rounded-xl border border-line bg-white p-6"}
        >
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand font-heading font-bold text-white"
          >
            {i + 1}
          </span>
          <h3 className={`mt-5 text-xl font-bold ${dark ? "text-on-dark" : "text-ink"}`}>
            <span className="sr-only">Step {i + 1}: </span>
            {s.title}
          </h3>
          <p className={`mt-2 leading-relaxed ${dark ? "text-on-dark-muted" : "text-ink-soft"}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

export function HowItWorks() {
  return (
    <Section tone="paper" labelledBy="how-title">
      <SectionHeading id="how-title" title="A practical path from insight to improvement" />
      <div className="mt-12">
        <StepList />
      </div>
      <p className="mt-8 max-w-3xl border-l-4 border-teal pl-4 leading-relaxed text-ink-soft">
        Not every business needs a major software project. Sometimes the highest-value improvement is a clearer process,
        better reporting, or a management routine that happens consistently.
      </p>
      <Link href="/how-it-works" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
        How an engagement works, with FAQs
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </Section>
  )
}
