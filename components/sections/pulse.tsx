import { ButtonLink, Section } from "@/components/site/primitives"

export function Pulse() {
  return (
    <Section tone="white" labelledBy="pulse-title">
      <div className="rounded-2xl border border-line bg-paper p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex rounded-full border border-teal/30 bg-teal-soft px-3 py-1 text-xs font-semibold text-teal">
            In development
          </p>
          <h2 id="pulse-title" className="text-2xl font-bold leading-tight text-ink sm:text-3xl">
            A clearer operating view is coming.
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            TurboData is developing a practical business performance diagnostic and action-planning approach to help
            SMEs see where time, money, and capacity are being lost. The first version will focus on structured
            assessment, prioritisation, and practical improvement planning.
          </p>
        </div>
        <ButtonLink href="/contact?topic=pulse" variant="secondary" className="mt-6 shrink-0 lg:mt-0">
          Ask to hear about updates
        </ButtonLink>
      </div>
    </Section>
  )
}
