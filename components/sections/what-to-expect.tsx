import { Check } from "lucide-react"
import { Section, SectionHeading } from "@/components/site/primitives"

const expectations = [
  {
    title: "Clear business questions before analysis",
    body: "We agree what you need to know, and what decision it supports, before any data work starts.",
  },
  {
    title: "Practical findings, not dashboards for their own sake",
    body: "Findings are written in plain language and tied to how the business actually runs.",
  },
  {
    title: "Recommendations tied to measurable outcomes",
    body: "Each recommendation states what it should change and how you will know whether it worked.",
  },
  {
    title: "A focus on implementation",
    body: "The work does not stop at a report. Support with rollout, reporting, and follow-up is available.",
  },
  {
    title: "Transparent assumptions and limitations",
    body: "Where data is incomplete or estimates are used, we say so, and explain how that affects the conclusions.",
  },
]

export function WhatToExpect() {
  return (
    <Section tone="white" labelledBy="expect-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          id="expect-title"
          title="What to expect when you work with TurboData"
          intro="Every engagement follows the same principles, whatever its size."
        />
        <ul className="divide-y divide-line border-y border-line">
          {expectations.map((e) => (
            <li key={e.title} className="flex gap-4 py-5">
              <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <h3 className="font-bold text-ink">{e.title}</h3>
                <p className="mt-1 leading-relaxed text-ink-soft">{e.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
