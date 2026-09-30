import type { Metadata } from "next"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import { CtaBand, PageHero, PageShell } from "@/components/site/page-shell"
import { ButtonLink, Section } from "@/components/site/primitives"
import { site } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "About TurboData and Its Founder",
  description:
    "TurboData Analytics is a Sarnia-Lambton business analytics and operations improvement practice founded by Nkemjika (Jude) Okeke, serving Ontario SMEs.",
  path: "/about",
})

const credentials = [
  "MBA, Quantic School of Business",
  "Financial Modeling certificate, Corporate Finance Institute",
  "Marketing Analytics certification",
]

const principles = [
  {
    title: "Start with the decision",
    body: "Analysis begins with the question the business needs answered and the decision it will support, not with the data that happens to be available.",
  },
  {
    title: "Look at the work, not only the numbers",
    body: "Financial results are the outcome of how work moves through the business. Understanding both is how you find the cause rather than the symptom.",
  },
  {
    title: "Use what the business already has",
    body: "Most businesses already hold enough data in their accounting system, spreadsheets, and job records to answer their most important questions.",
  },
  {
    title: "Be clear about what the data can and cannot show",
    body: "Assumptions, estimates, and gaps in the data are stated openly, so owners can judge how much weight to put on each finding.",
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="Analytics that connect the numbers to the way the business actually works."
        intro="TurboData combines business analysis, financial thinking, operational observation, and practical data work. The goal is not to produce more reports. It is to help business leaders understand what the numbers are saying and decide what to do next."
      />

      <Section tone="white" labelledBy="founder-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
          <div>
            <Image
              src="/founder.png"
              alt="Nkemjika (Jude) Okeke, founder of TurboData Analytics"
              width={420}
              height={560}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 80vw"
              priority
              className="mx-auto aspect-[3/4] w-full max-w-[320px] rounded-xl object-cover lg:max-w-none"
            />
            <p id="credentials-label" className="mt-6 text-sm font-bold uppercase tracking-wide text-ink">
              Education and training
            </p>
            <ul aria-labelledby="credentials-label" className="mt-3 space-y-2 text-ink-soft">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="founder-title" className="text-3xl font-bold leading-tight text-ink">
              Founder: Nkemjika (Jude) Okeke
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                I am a business analyst, and my career has been spent inside operating businesses in logistics,
                manufacturing, banking, and consumer goods, including First Aluminum Nigeria, a Rio Tinto Alcan
                subsidiary. Most of that work was in demanding operating environments where cost, capacity, and cash
                had to be managed closely.
              </p>
              <p>
                Working across those industries, I kept seeing the same pattern. The businesses that improved fastest
                were not always the ones with the best products or the hardest-working teams. They were the ones that
                could see their own numbers clearly, understand what was driving them, and act on that quickly.
              </p>
              <p>
                I started TurboData in Sarnia to bring that discipline to established small and medium-sized businesses
                in Ontario. My approach is to look at what is actually happening in the numbers and in the operation,
                explain it plainly, and then work with the owner on what to fix first.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Talk about your business</ButtonLink>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ink/20 px-5 py-2.5 font-semibold text-ink hover:bg-paper"
                >
                  <Linkedin aria-hidden="true" className="h-4 w-4" />
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="approach-title">
        <h2 id="approach-title" className="text-3xl font-bold leading-tight text-ink">
          How TurboData approaches the work
        </h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="rounded-xl border border-line bg-white p-6">
              <h3 className="text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="purpose-title">
        <div className="max-w-3xl">
          <h2 id="purpose-title" className="text-3xl font-bold leading-tight text-ink">
            Why TurboData exists
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {site.positioning} It is based in Sarnia-Lambton, works on site with local businesses, and supports
            businesses elsewhere in Ontario remotely.
          </p>
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  )
}
