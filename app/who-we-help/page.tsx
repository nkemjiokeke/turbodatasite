import type { Metadata } from "next"
import { CtaBand, PageHero, PageShell } from "@/components/site/page-shell"
import { IconBadge, Section } from "@/components/site/primitives"
import { sectors } from "@/lib/sectors"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Who We Help: Ontario SMEs by Sector",
  description:
    "How TurboData's analytics and operations work applies to manufacturing, construction, logistics, retail, professional services, healthcare, and agriculture.",
  path: "/who-we-help",
})

export default function WhoWeHelpPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Who we help"
        title="Built for businesses that have outgrown guesswork."
        intro="TurboData works with established Ontario businesses of roughly 5 to 100 employees. The sectors below are where the work is most often relevant, but the same approach applies wherever margins, workflow, capacity, and operational visibility matter."
      />

      <Section tone="white">
        <ul className="grid gap-6 md:grid-cols-2">
          {sectors.map((s) => (
            <li key={s.id} id={s.id} className="rounded-xl border border-line bg-white p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <IconBadge icon={s.icon} />
                <h2 className="text-xl font-bold text-ink">{s.name}</h2>
              </div>
              <p className="mt-4 leading-relaxed text-ink-soft">{s.intro}</p>
              <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-ink">Common problems</h3>
              <ul className="mt-3 space-y-2.5">
                {s.problems.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="rounded-xl border border-dashed border-line bg-paper p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ink">Not on this list?</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              If your business has real operating complexity, and profitability, capacity, or reporting feels harder to
              manage than it should, the same diagnostic approach is likely to apply. Get in touch and describe what is
              happening.
            </p>
          </li>
        </ul>
      </Section>

      <CtaBand />
    </PageShell>
  )
}
