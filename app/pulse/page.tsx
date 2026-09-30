import type { Metadata } from "next"
import { ArrowRight, ClipboardList, Clock, FileSearch, FileText, Mail, PieChart, Wallet, Workflow, Zap } from "lucide-react"
import { CtaBand, PageShell } from "@/components/site/page-shell"
import { ButtonLink, Card, Container, IconBadge, Section, SectionHeading } from "@/components/site/primitives"
import { PulseMark } from "@/components/pulse/ui"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "TurboData Pulse: Business Performance Assessment",
  description:
    "TurboData Pulse is a guided business-performance assessment for small and medium-sized businesses. Answer a short set of questions and get a detailed report by email.",
  path: "/pulse",
})

const steps = [
  { title: "Assess", body: "Answer practical questions about the business." },
  { title: "Understand", body: "See which areas may deserve attention first." },
  { title: "Prioritise", body: "Focus on the issues most likely to matter." },
  { title: "Improve", body: "Get a detailed report with practical next steps." },
]

const areas = [
  { title: "Financial visibility", icon: Wallet, body: "How quickly and clearly the business can see its financial results." },
  { title: "Profitability and margin", icon: PieChart, body: "Whether profit can be seen by product, service, job, or customer." },
  { title: "Workflow efficiency", icon: Workflow, body: "Where work waits, repeats, or depends on missing information." },
  { title: "Labour and capacity", icon: Clock, body: "How well staff time is understood, and how much depends on one person." },
  { title: "Reporting maturity", icon: FileText, body: "How management information is prepared, reviewed, and acted on." },
  { title: "Automation readiness", icon: Zap, body: "How much repetitive work could be simplified with existing tools." },
]

const features = [
  { title: "Guided assessment", icon: ClipboardList, body: "Questions across six areas of business performance, with clear progress throughout." },
  { title: "Findings summary", icon: FileSearch, body: "A concise summary of the areas that may deserve attention first, based on your answers." },
  { title: "Emailed report", icon: Mail, body: "A detailed report emailed to you, covering every category, recommended actions, and a 30-day plan." },
]

export default function PulsePage() {
  return (
    <PageShell>
      <section aria-labelledby="pulse-hero-title" className="border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand">
              <PulseMark className="h-5 w-5" />
              TurboData Pulse
            </p>
            <h1 id="pulse-hero-title" className="text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              Know what to improve before you invest in fixing everything.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
              TurboData Pulse is a guided business-performance assessment for small and medium-sized businesses.
              Answer a short set of questions and we will email you a detailed report with practical next steps.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pulse/assessment">
                Start your assessment
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact?topic=pulse" variant="secondary">
                Book a TurboData conversation
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white" labelledBy="steps-title">
        <SectionHeading id="steps-title" title="From assessment to action" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-line bg-white p-6">
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand font-heading font-bold text-white"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper" labelledBy="areas-title">
        <SectionHeading id="areas-title" title="What Pulse examines" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <li key={a.title}>
              <Card className="flex h-full gap-4">
                <IconBadge icon={a.icon} />
                <div>
                  <h3 className="text-lg font-bold text-ink">{a.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{a.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="features-title">
        <SectionHeading id="features-title" title="What's included" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {features.map((f) => (
            <li key={f.title}>
              <Card className="flex h-full gap-4">
                <IconBadge icon={f.icon} />
                <div>
                  <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl leading-relaxed text-ink-soft">
          Pulse is a guided self-assessment. It is not connected to your accounting, banking, payroll, CRM, or other
          operational systems.
        </p>
      </Section>

      <CtaBand
        title="Start with a clearer view of the problem."
        body="Answer a short set of questions and get a detailed report emailed to you, with the areas most likely to deserve attention first."
        cta={{ href: "/pulse/assessment", label: "Start your assessment" }}
      />
    </PageShell>
  )
}
