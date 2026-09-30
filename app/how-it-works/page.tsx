import type { Metadata } from "next"
import { CtaBand, PageHero, PageShell } from "@/components/site/page-shell"
import { Section, SectionHeading } from "@/components/site/primitives"
import { StepList } from "@/components/sections/how-it-works"
import { WhatToExpect } from "@/components/sections/what-to-expect"
import { Faq } from "@/components/faq"
import { faqs } from "@/lib/faqs"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "How It Works: Diagnose, Prioritise, Improve",
  description:
    "How a TurboData engagement works, from diagnosing the problem to prioritising improvements and supporting implementation, with answers to common questions.",
  path: "/how-it-works",
})

const stageDetail = [
  {
    title: "Diagnose",
    points: [
      "A conversation to understand the business, the question you need answered, and the decision it supports.",
      "A review of the data you already have, such as accounting exports, job or order records, schedules, and reports.",
      "Observation and conversations with the people who do the work, where the question involves operations.",
    ],
  },
  {
    title: "Prioritise",
    points: [
      "Analysis that separates symptoms from root causes.",
      "Estimates of time or money impact where the data supports it, with assumptions stated.",
      "A short, ranked list of improvements based on likely impact, effort, and risk.",
    ],
  },
  {
    title: "Improve",
    points: [
      "A practical action plan with owners and measures.",
      "Optional support with process redesign, reporting, automation, or rollout.",
      "Follow-up reviews to check whether the changes are working, and adjust if they are not.",
    ],
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
}

export default function HowItWorksPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="How it works"
        title="A practical path from insight to improvement"
        intro="Every engagement follows three stages. The depth of each stage depends on the question, the data available, and how much support you want with implementation."
      />

      <Section tone="white" labelledBy="stages-title">
        <h2 id="stages-title" className="sr-only">
          The three stages
        </h2>
        <StepList />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {stageDetail.map((s) => (
            <div key={s.title}>
              <h3 className="text-lg font-bold text-ink">In the {s.title.toLowerCase()} stage</h3>
              <ul className="mt-3 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-3xl border-l-4 border-brand pl-4 leading-relaxed text-ink-soft">
          Not every business needs a major software project. Sometimes the highest-value improvement is a clearer
          process, better reporting, or a management routine that happens consistently.
        </p>
      </Section>

      <WhatToExpect />

      <Section tone="paper" labelledBy="faq-title">
        <SectionHeading id="faq-title" title="Frequently asked questions" />
        <div className="mt-8 max-w-3xl">
          <Faq items={faqs} />
        </div>
      </Section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CtaBand />
    </PageShell>
  )
}
