import type { Metadata } from "next"
import Image from "next/image"
import {
  ArrowRight,
  ClipboardList,
  Clock,
  FileSearch,
  FileText,
  Info,
  LayoutDashboard,
  ListChecks,
  PieChart,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react"
import { CtaBand, PageShell } from "@/components/site/page-shell"
import { ButtonLink, Card, Container, IconBadge, Section, SectionHeading } from "@/components/site/primitives"
import { PulseMark } from "@/components/pulse/ui"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "TurboData Pulse: Business Performance Diagnostic Prototype",
  description:
    "TurboData Pulse is a guided business-performance diagnostic and action-planning workspace for small and medium-sized businesses. Explore the prototype.",
  path: "/pulse",
})

const steps = [
  { title: "Assess", body: "Answer practical questions about the business." },
  { title: "Understand", body: "See a clear overview of key performance areas." },
  { title: "Prioritise", body: "Identify the issue that deserves attention first." },
  { title: "Improve", body: "Turn the priority into a measurable action plan." },
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
  { title: "Guided assessment", icon: ClipboardList, body: "Six short sections of multiple-choice questions, with a progress indicator throughout." },
  { title: "Executive overview", icon: LayoutDashboard, body: "A summary of key areas and the single highest-priority opportunity, with your full report emailed to you in the finished product." },
  { title: "Priority findings", icon: FileSearch, body: "What was observed, the potential business impact, the recommended action, and a 30-day target." },
  { title: "Action-plan tracker", icon: ListChecks, body: "Actions with owners, due dates, status, and the measure that shows progress." },
]

export default function PulsePage() {
  return (
    <PageShell>
      <section aria-labelledby="pulse-hero-title" className="border-b border-line bg-paper">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-teal">
              <PulseMark className="h-5 w-5" />
              TurboData Pulse
              <span className="rounded-full border border-teal/30 bg-teal-soft px-2 py-0.5 text-xs font-semibold text-teal">
                V1
              </span>
            </p>
            <h1 id="pulse-hero-title" className="text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              Know what to improve before you invest in fixing everything.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
              TurboData Pulse is a guided business-performance diagnostic and action-planning workspace for small and
              medium-sized businesses.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/pulse/app">
                Explore the prototype
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact?topic=pulse" variant="secondary">
                Book a TurboData conversation
              </ButtonLink>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#f3d28a] bg-[#fdf3dc] px-3 py-1.5 text-sm font-medium text-[#7a4a00]">
              <Info aria-hidden="true" className="h-4 w-4" />
              Illustrative V1 prototype using sample data.
            </p>
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

      <Section tone="white" labelledBy="preview-title">
        <SectionHeading id="preview-title" title="Product preview" />
        <figure className="mt-10">
          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_8px_30px_rgba(15,27,45,0.08)]">
            <Image
              src="/pulse/turbodata-pulse-mockup.webp"
              alt="Four TurboData Pulse screens: a business performance assessment question, an executive overview with four sample area scores and a highest-priority opportunity, a priority finding about weekly management reporting, and an improvement action plan with owners, due dates, and statuses."
              width={1536}
              height={1024}
              sizes="(min-width: 1152px) 1088px, 100vw"
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 text-center text-sm text-ink-soft">
            Illustrative TurboData Pulse interface showing assessment, business overview, priority findings, and action
            planning.
          </figcaption>
        </figure>
      </Section>

      <Section tone="paper" labelledBy="features-title">
        <SectionHeading id="features-title" title="What the prototype includes" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
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
        <div className="mt-10 flex max-w-3xl gap-3 rounded-xl border border-line bg-white p-5">
          <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-ink-soft" />
          <p className="leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">Current limitation: </span>
            TurboData Pulse is currently a guided prototype using sample information. It is not connected to
            accounting, banking, payroll, CRM, or operational systems.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Start with a clearer view of the problem."
        body="Walk through the prototype to see how an assessment becomes a prioritised, measurable action plan."
        cta={{ href: "/pulse/app", label: "Explore the prototype" }}
      />
    </PageShell>
  )
}
