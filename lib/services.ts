import {
  Workflow,
  LineChart,
  RefreshCcw,
  LayoutDashboard,
  Cog,
  UserCheck,
  type LucideIcon,
} from "lucide-react"

export type Service = {
  slug: string
  title: string
  icon: LucideIcon
  summary: string
  headline: string
  audience: string
  symptoms: string[]
  examines: string[]
  deliverables: string[]
  expect: string
  notIncluded: string[]
  timeline: string
  nextStep: string
  heroImage?: { src: string; alt: string; width: number; height: number }
}

export const services: Service[] = [
  {
    slug: "operations-diagnostic",
    title: "Operations Diagnostic",
    icon: Workflow,
    summary:
      "Map how work actually moves through the business, identify bottlenecks and rework, and prioritise operational improvements.",
    headline: "See how work really moves through your business, and where it gets stuck.",
    audience:
      "Owners and operations managers of established businesses where the team is busy, capacity feels tight, and nobody can say with confidence where the time goes.",
    symptoms: [
      "Jobs or orders take longer than they should, and the reasons change depending on who you ask.",
      "The same problems come back every month: rework, missed handoffs, chasing information.",
      "Key workflows depend on one or two people who hold the process in their heads.",
      "Overtime or subcontracting is rising without a clear increase in output.",
    ],
    examines: [
      "How a job, order, or request moves from first contact to invoice.",
      "Where work waits, gets repeated, or is re-entered by hand.",
      "Who owns each step, and where responsibility is unclear.",
      "The operational data you already have: schedules, job records, timesheets, system exports.",
    ],
    deliverables: [
      "Diagnostic findings in plain language",
      "Current-state process maps for the workflows reviewed",
      "Bottleneck and rework log with estimated cost or time impact where the data allows",
      "Prioritised action plan",
    ],
    expect:
      "A focused review of the workflows that matter most, conversations with the people doing the work, and a short list of improvements ranked by likely impact and effort. The output is written for decision-makers, not analysts.",
    notIncluded: [
      "Software implementation or system replacement",
      "Staff performance reviews or HR decisions",
      "Guaranteed savings figures",
    ],
    timeline: "Indicative: two to four weeks, depending on the number of workflows and data availability.",
    nextStep: "Book a Profit Leak Audit conversation to agree which workflows to examine first.",
  },
  {
    slug: "financial-performance-analysis",
    title: "Financial Performance Analysis",
    icon: LineChart,
    summary:
      "Examine revenue, cost structures, margins, pricing, and performance by product, service, customer, or business line.",
    headline: "Know which products, services, customers, and jobs actually make you money.",
    audience:
      "Businesses where revenue is growing or steady but profit is not keeping up, and the owner cannot see which parts of the business are carrying the rest.",
    symptoms: [
      "Revenue is up but the bank balance does not reflect it.",
      "Costs are rising faster than prices, and it is unclear where.",
      "Some customers or jobs feel unprofitable, but there is no clear way to prove it.",
      "Pricing has not been reviewed against actual cost to deliver.",
    ],
    examines: [
      "Revenue and gross margin by product, service, customer, or job type.",
      "Direct and indirect cost structure, and how overhead is allocated.",
      "Pricing against actual cost to serve.",
      "Trends over time, using accounting exports and operational records you already hold.",
    ],
    deliverables: [
      "Margin analysis by the dimensions that matter to your business",
      "Cost structure summary with the main cost drivers identified",
      "Pricing and profitability observations",
      "Prioritised action plan",
    ],
    expect:
      "Clear business questions agreed at the start, analysis built from your existing financial and operational data, and findings that state their assumptions and limitations openly.",
    notIncluded: [
      "Bookkeeping, tax preparation, or audited financial statements",
      "Investment or lending advice",
      "Guaranteed profit improvement",
    ],
    timeline: "Indicative: two to four weeks, depending on data quality and the number of business lines.",
    nextStep: "Start with a conversation about the profitability question you most need answered.",
    heroImage: {
      src: "/services/financial-performance-analysis.jpeg",
      alt: "Profitability and performance dashboard showing revenue, cost of goods sold, and gross profit, with profitability broken down by product, customer, and job.",
      width: 1408,
      height: 768,
    },
  },
  {
    slug: "process-improvement",
    title: "Process Improvement",
    icon: RefreshCcw,
    summary:
      "Redesign inefficient workflows, clarify responsibilities, reduce duplication, and create more reliable ways of working.",
    headline: "Redesign the workflows that slow the business down.",
    audience:
      "Businesses that already know which process is causing trouble, or have completed a diagnostic, and now need a better way of working that the team will actually use.",
    symptoms: [
      "Information is entered into more than one system or spreadsheet.",
      "Invoicing, quoting, or scheduling is delayed because a step waits on someone.",
      "New staff take a long time to learn how things are done.",
      "Errors are caught late, after the customer has noticed.",
    ],
    examines: [
      "The current workflow step by step, including informal workarounds.",
      "Handoffs, approvals, and the information each step needs.",
      "Duplication, waiting time, and error points.",
      "What a simpler, more reliable version would look like with your existing people and tools.",
    ],
    deliverables: [
      "Current and future-state process maps",
      "Workflow redesign with clear roles and responsibilities",
      "Simple standard operating procedures or checklists where useful",
      "Implementation plan and support for the rollout",
    ],
    expect:
      "Practical redesign done with your team rather than handed to them, tested against how the work is really done, and introduced in manageable steps.",
    notIncluded: [
      "Custom software development",
      "Formal certification programmes (for example ISO certification)",
    ],
    timeline: "Indicative: three to six weeks per workflow, including rollout support.",
    nextStep: "Tell us which process is causing the most friction and we will suggest a starting scope.",
    heroImage: {
      src: "/services/process-improvement.jpeg",
      alt: "Diagram comparing an inefficient workflow with bottlenecks, manual data entry, and late delivery against a streamlined workflow with automated approval, centralised data, and on-time delivery.",
      width: 1408,
      height: 768,
    },
  },
  {
    slug: "business-intelligence-reporting",
    title: "Business Intelligence and Reporting",
    icon: LayoutDashboard,
    summary:
      "Turn scattered operational and financial data into practical dashboards, KPIs, and management reporting.",
    headline: "Reporting that tells leaders what to look at, and what to do next.",
    audience:
      "Owners and managers who receive reports but still find it hard to see what is going well, what is slipping, and where to act.",
    symptoms: [
      "Month-end reporting takes days of manual spreadsheet work.",
      "Different people quote different numbers for the same thing.",
      "Reports describe what happened but do not point to a decision.",
      "Data sits in several systems that do not talk to each other.",
    ],
    examines: [
      "The decisions leaders make regularly and the information those decisions need.",
      "Available data sources, their quality, and how often they update.",
      "Existing reports and which ones are actually used.",
      "Which KPIs are meaningful for your business model.",
    ],
    deliverables: [
      "KPI framework with clear definitions and owners",
      "Management dashboard built on tools you already have or can adopt at low cost",
      "Reporting routine: what is reviewed, when, and by whom",
      "Documentation so the reporting can be maintained",
    ],
    expect:
      "A small number of well-defined measures rather than a dashboard for its own sake, built around a management routine that happens consistently.",
    notIncluded: [
      "Enterprise data warehouse projects",
      "Ongoing IT or system administration",
    ],
    timeline: "Indicative: three to six weeks for a first management dashboard and KPI set.",
    nextStep: "Share which decisions feel hardest to make with your current reporting.",
    heroImage: {
      src: "/services/business-intelligence-reporting.jpeg",
      alt: "Executive performance dashboard showing total revenue, gross margin, operating profit, revenue trends, regional sales, and top accounts in one view.",
      width: 1408,
      height: 768,
    },
  },
  {
    slug: "automation-advisory",
    title: "Automation Advisory",
    icon: Cog,
    summary:
      "Identify repetitive, rule-based work that can be simplified or automated using the tools the business already has.",
    headline: "Find the repetitive work your tools could already be doing.",
    audience:
      "Businesses where staff spend hours on copying, reconciling, chasing, or re-keying information, and leaders want to know what is realistic to automate before spending on new software.",
    symptoms: [
      "The same data is typed into several places.",
      "Staff spend time producing routine reports or reminders by hand.",
      "Software subscriptions are underused.",
      "Previous automation attempts stalled or created new problems.",
    ],
    examines: [
      "Repetitive, rule-based tasks and how much time they take.",
      "The tools you already pay for and what they can do.",
      "Whether a process should be simplified before it is automated.",
      "Risks, dependencies, and who would maintain an automation.",
    ],
    deliverables: [
      "Automation opportunity map ranked by effort, value, and risk",
      "Recommendations on simplification before automation",
      "Implementation guidance or support for selected quick wins",
    ],
    expect:
      "An honest view of what is worth automating. Sometimes the answer is a simpler process rather than new technology.",
    notIncluded: [
      "Reselling software licences",
      "Building or maintaining complex custom integrations",
    ],
    timeline: "Indicative: two to three weeks for an opportunity map.",
    nextStep: "Tell us which tasks take the most repetitive effort today.",
    heroImage: {
      src: "/services/automation-advisory.jpeg",
      alt: "An operations team member reviewing automated production and performance data on a handheld tablet on a factory floor.",
      width: 1408,
      height: 768,
    },
  },
  {
    slug: "fractional-analytics-operations-support",
    title: "Fractional Analytics or Operations Support",
    icon: UserCheck,
    summary:
      "Provide ongoing analysis, reporting, prioritisation, and implementation support for businesses that need additional capacity.",
    headline: "Ongoing analytical and operational capacity, without a full-time hire.",
    audience:
      "Growing businesses that need regular analysis, reporting, and follow-through on improvements, but are not ready to hire a full-time analyst or operations lead.",
    symptoms: [
      "Improvement plans stall because nobody has time to follow through.",
      "The owner is the only person looking at the numbers.",
      "Reporting and analysis happen irregularly, usually in a crisis.",
      "The business has outgrown informal management routines.",
    ],
    examines: [
      "Priorities for the period and the measures that track them.",
      "Regular performance reviews against agreed KPIs.",
      "Progress on improvement actions and what is blocking them.",
      "New questions as they arise.",
    ],
    deliverables: [
      "Regular performance reporting and review sessions",
      "Ongoing analysis for specific business questions",
      "Implementation support for agreed improvements",
      "Prioritised action list maintained over time",
    ],
    expect:
      "A defined number of days or hours per month, agreed priorities, and regular check-ins, with scope adjusted as the business changes.",
    notIncluded: [
      "Full-time executive responsibilities or legal officer duties",
      "Employment of your staff or direct line management without agreement",
    ],
    timeline: "Ongoing, typically reviewed every three months.",
    nextStep: "Book a conversation to discuss the capacity and focus areas you need.",
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}
