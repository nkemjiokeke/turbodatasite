import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { IconBadge, Section, SectionHeading } from "@/components/site/primitives"
import { sectors } from "@/lib/sectors"

export function WhoWeHelp() {
  return (
    <Section tone="white" labelledBy="who-title">
      <SectionHeading
        id="who-title"
        title="Built for businesses that have outgrown guesswork."
        intro="TurboData works with established Ontario businesses of roughly 5 to 100 employees. It is particularly useful for businesses where margins, workflow, capacity, and operational visibility matter."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sectors.map((s) => (
          <li key={s.id} className="flex items-center gap-4 rounded-xl border border-line bg-white p-4">
            <IconBadge icon={s.icon} />
            <span className="font-semibold leading-snug text-ink">{s.shortName}</span>
          </li>
        ))}
        <li className="flex items-center rounded-xl border border-dashed border-line bg-paper p-4 text-ink-soft">
          Other established businesses facing similar challenges
        </li>
      </ul>
      <Link
        href="/who-we-help"
        className="mt-8 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
      >
        See how the work applies to each sector
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </Section>
  )
}
