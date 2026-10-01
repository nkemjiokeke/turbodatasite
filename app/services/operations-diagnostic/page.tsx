import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Clock,
  HelpCircle,
  ListChecks,
  ListOrdered,
  Receipt,
  RefreshCcw,
  Scissors,
  Workflow,
  Zap,
} from "lucide-react"
import { CtaBand, PageShell } from "@/components/site/page-shell"
import { ButtonLink, Card, Container, Eyebrow, IconBadge, Section, SectionHeading } from "@/components/site/primitives"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Operations Diagnostic Consulting for Ontario SMEs",
  description:
    "TurboData helps Ontario SMEs identify workflow bottlenecks, rework, delays, and unclear handoffs so they can improve operations and decide what to simplify, standardise, or automate first.",
  path: "/services/operations-diagnostic",
})

const CONTACT_URL = "https://www.turbodata.co/contact"

const friction = [
  { icon: Clock, title: "Work waits", body: "Information or approvals arrive late." },
  { icon: RefreshCcw, title: "Work repeats", body: "Errors and rework consume capacity." },
  { icon: HelpCircle, title: "Ownership blurs", body: "Critical steps depend on individual memory." },
  { icon: Receipt, title: "Billing slips", body: "Completed work does not become an invoice quickly enough." },
]

const process = [
  { number: "01", title: "Trace", body: "Follow one workflow from start to finish." },
  { number: "02", title: "Diagnose", body: "Locate waiting, rework, handoff, and ownership problems." },
  { number: "03", title: "Prioritise", body: "Identify what is worth addressing first." },
]

const deliverables = [
  { icon: Workflow, title: "Current workflow", body: "How the process works today." },
  { icon: AlertTriangle, title: "Bottleneck log", body: "Where work waits, repeats, or gets lost." },
  { icon: Calculator, title: "Impact estimate", body: "Time, cost, or capacity implications where the data allows." },
  { icon: ListOrdered, title: "Improvement priorities", body: "What to simplify, standardise, or automate first." },
]

const improvementPath = [
  { icon: Scissors, title: "Simplify", body: "Remove unnecessary steps." },
  { icon: ListChecks, title: "Standardise", body: "Make the process consistent." },
  { icon: Zap, title: "Automate", body: "Connect repetitive work once the process is ready." },
]

export default function OperationsDiagnosticPage() {
  return (
    <PageShell>
      <section className="border-b border-line bg-paper py-14 sm:py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <Link href="/services" className="inline-flex items-center gap-1.5 font-medium text-ink-soft hover:text-ink">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              All services
            </Link>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Operations Diagnostic</Eyebrow>
              <h1 className="text-4xl font-bold leading-[1.12] text-ink sm:text-5xl">
                Find where work slows down. Fix what keeps getting in the way.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">
                TurboData maps one of your critical workflows, identifies delays, rework, and unclear handoffs, and
                shows you what to improve first.
              </p>
              <div className="mt-8">
                <ButtonLink href={CONTACT_URL}>
                  Book a workflow review
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
              </div>
              <p className="mt-4 text-sm text-ink-soft">
                For established businesses where the team is busy but capacity is tight.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white p-3 shadow-[0_8px_30px_rgba(15,27,45,0.08)]">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-paper">
                <Image
                  src="/services/operations-diagnostic-workflow.jpeg"
                  alt="Service job workflow diagram showing six steps from customer request to invoice: customer request, quote or estimate, schedule work, complete job, review and approve, and send invoice, with delay points highlighted for missing information, manual handoffs, and rework."
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white" labelledBy="friction-title">
        <SectionHeading id="friction-title" title="Busy teams can still lose time in the gaps." />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {friction.map((f) => (
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
      </Section>

      <Section tone="paper" labelledBy="review-title">
        <SectionHeading id="review-title" title="We follow the work, not just the spreadsheet." />
        <ol className="mt-10 grid gap-5 sm:grid-cols-3">
          {process.map((p) => (
            <li key={p.number} className="rounded-xl border border-line bg-white p-6">
              <h3 className="text-xl font-bold text-ink">
                <span className="text-brand">{p.number}</span> — {p.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl border-l-4 border-brand pl-4 leading-relaxed text-ink-soft">
          We combine available records with conversations with the people doing the work. The result is written for
          decision-makers, not analysts.
        </p>
      </Section>

      <Section tone="white" labelledBy="receives-title">
        <SectionHeading id="receives-title" title="You leave with a clearer operating picture." />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((d) => (
            <li key={d.title}>
              <Card className="flex h-full gap-4">
                <IconBadge icon={d.icon} />
                <div>
                  <h3 className="text-lg font-bold text-ink">{d.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{d.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" labelledBy="automation-title">
        <SectionHeading
          id="automation-title"
          title="Automation comes after the process is understood."
          intro="Some problems need better ownership or a simpler process. Others are suitable for automation because the work is repetitive, rule-based, and stable."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {improvementPath.map((s) => (
            <li key={s.title}>
              <Card className="flex h-full gap-4">
                <IconBadge icon={s.icon} />
                <div>
                  <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="timeline-title">
        <div className="max-w-3xl">
          <h2 id="timeline-title" className="text-2xl font-bold text-ink">
            Timeline
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            A focused review typically takes two to four weeks. The final scope depends on the workflows selected,
            the people involved, and the information available. A proposed scope and timeline are agreed before work
            begins.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Which workflow is costing you the most time?"
        body="Start with the process where delays, rework, or missed handoffs are affecting the business most."
        cta={{ href: CONTACT_URL, label: "Book a workflow review" }}
      />
    </PageShell>
  )
}
