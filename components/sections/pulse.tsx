import { ButtonLink, Section } from "@/components/site/primitives"

export function Pulse() {
  return (
    <Section tone="white" labelledBy="pulse-title">
      <div className="rounded-2xl border border-line bg-paper p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 id="pulse-title" className="text-2xl font-bold leading-tight text-ink sm:text-3xl">
            Get a clear view of business performance.
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            TurboData Pulse is a guided business-performance assessment for small and medium-sized businesses.
            Answer a short set of questions and we will email you a detailed report with the areas most likely to
            deserve attention first.
          </p>
        </div>
        <div className="mt-6 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0">
          <ButtonLink href="/pulse">Take the Pulse assessment</ButtonLink>
          <ButtonLink href="/contact?topic=pulse" variant="secondary">
            Book a TurboData conversation
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
