import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, IconBadge, Section, SectionHeading } from "@/components/site/primitives"
import { services } from "@/lib/services"

export function Services() {
  return (
    <Section id="services" tone="paper" labelledBy="services-title">
      <SectionHeading
        id="services-title"
        title="Where TurboData can help"
        intro="Start with the problem you most need to understand. Each service can stand alone or lead into the next."
      />
      <ServiceGrid />
    </Section>
  )
}

export function ServiceGrid({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" | "h4" }) {
  const Heading = headingLevel
  return (
    <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <li key={s.slug}>
          <Card className="flex h-full flex-col">
            <IconBadge icon={s.icon} />
            <Heading className="mt-5 text-lg font-bold text-ink">{s.title}</Heading>
            <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{s.summary}</p>
            <Link
              href={`/services/${s.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 self-start text-[0.95rem] font-semibold text-brand hover:underline"
            >
              Learn more<span className="sr-only"> about {s.title}</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  )
}
