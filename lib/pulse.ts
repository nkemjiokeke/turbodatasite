// Sample data for the TurboData Pulse front-end prototype.
// Everything here is illustrative. Nothing is connected to real business systems.

export type Question = { id: string; text: string; options: string[] }
export type AssessmentSection = { id: string; title: string; intro: string; questions: Question[] }

export const assessmentSections: AssessmentSection[] = [
  {
    id: "profile",
    title: "Business profile",
    intro: "A little context about the business helps focus the rest of the assessment.",
    questions: [
      {
        id: "challenge",
        text: "What is the greatest challenge facing the business right now?",
        options: [
          "Profitability is unclear.",
          "Costs are rising.",
          "Workflows are slow or inconsistent.",
          "Reports are difficult to prepare.",
          "Too much work depends on one person.",
          "We do not know what to automate.",
        ],
      },
      {
        id: "size",
        text: "Approximately how many people work in the business?",
        options: ["1–4", "5–19", "20–49", "50–100", "More than 100"],
      },
    ],
  },
  {
    id: "financial",
    title: "Financial visibility",
    intro: "How clearly the business can see where money is made and lost.",
    questions: [
      {
        id: "profitability",
        text: "How clearly can you see profitability by product, service, job, or customer?",
        options: ["Very clearly", "Somewhat clearly", "Not very clearly", "We currently cannot separate profitability"],
      },
      {
        id: "month-end",
        text: "How soon after month-end do you usually know your results?",
        options: ["Within a week", "Two to three weeks", "More than a month", "Only at year-end"],
      },
    ],
  },
  {
    id: "workflow",
    title: "Workflow efficiency",
    intro: "How smoothly work moves from one step to the next.",
    questions: [
      {
        id: "waiting",
        text: "How often does work wait on missing information or approvals?",
        options: ["Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "documented",
        text: "Are your main workflows documented?",
        options: ["Yes, and they are followed", "Partly", "No, they rely on experience"],
      },
    ],
  },
  {
    id: "labour",
    title: "Labour and capacity",
    intro: "How well the business understands where staff time goes.",
    questions: [
      {
        id: "time-tracking",
        text: "How well do you know how staff time is spent?",
        options: ["Tracked by job or task", "Rough estimates", "Not tracked"],
      },
      {
        id: "key-person",
        text: "How much important work depends on one person?",
        options: ["Very little", "Some", "A lot"],
      },
    ],
  },
  {
    id: "reporting",
    title: "Reporting maturity",
    intro: "How management information is prepared and used.",
    questions: [
      {
        id: "review",
        text: "How often does management review key business performance information?",
        options: ["Daily", "Weekly", "Monthly", "Irregularly", "We do not have a consistent review process"],
      },
      {
        id: "preparation",
        text: "How are management reports usually prepared?",
        options: ["Automatically from our systems", "Partly manual", "Mostly manual, from several sources"],
      },
    ],
  },
  {
    id: "automation",
    title: "Automation readiness",
    intro: "How much repetitive work could be simplified with the tools you already have.",
    questions: [
      {
        id: "re-entry",
        text: "How much time is spent re-entering the same information into different systems?",
        options: ["Almost none", "A few hours a week", "Many hours a week", "Not sure"],
      },
      {
        id: "tools",
        text: "How fully are your current software tools used?",
        options: ["Fully", "Partly", "Mostly for the basics", "Not sure"],
      },
    ],
  },
]

export type Tone = "amber" | "blue" | "red" | "teal" | "slate"

export const sampleMetrics: { area: string; score: number; label: string; tone: Tone }[] = [
  { area: "Financial visibility", score: 42, label: "Needs attention", tone: "amber" },
  { area: "Workflow efficiency", score: 58, label: "Developing", tone: "blue" },
  { area: "Reporting maturity", score: 31, label: "Priority area", tone: "red" },
  { area: "Automation readiness", score: 67, label: "Good opportunity", tone: "teal" },
]

export type Finding = {
  slug: string
  title: string
  category: string
  priority: "High" | "Medium"
  status: string
  summary: string
}

export const sampleFindings: Finding[] = [
  {
    slug: "weekly-reporting",
    title: "Improve weekly management reporting",
    category: "Reporting maturity",
    priority: "High",
    status: "Not started",
    summary: "Management information is reviewed monthly and assembled manually, which may delay decisions.",
  },
  {
    slug: "service-line-margins",
    title: "Review service-line margins",
    category: "Profitability",
    priority: "High",
    status: "Backlog",
    summary: "Profitability is not currently separated by service line, so low-margin work may be hidden.",
  },
  {
    slug: "manual-reporting",
    title: "Reduce manual reporting and data gathering",
    category: "Automation readiness",
    priority: "Medium",
    status: "In progress",
    summary: "Several hours a week are spent collecting and re-entering information from different systems.",
  },
]

export const actionStatuses = ["Backlog", "In progress", "Blocked", "Complete"] as const
export type ActionStatus = (typeof actionStatuses)[number]

export type Action = {
  id: string
  title: string
  description?: string
  owner: string
  due: string // ISO date
  status: ActionStatus
  measure: string
}

export const sampleActions: Action[] = [
  {
    id: "a1",
    title: "Review service-line margins",
    description: "Understand profitability by service line and identify low-margin work.",
    owner: "Jude",
    due: "2026-02-12",
    status: "Backlog",
    measure: "Margin report by service line",
  },
  {
    id: "a2",
    title: "Build weekly scorecard",
    description: "Create and distribute a weekly management report.",
    owner: "Alex",
    due: "2026-02-16",
    status: "In progress",
    measure: "Report sent by Friday noon",
  },
  {
    id: "a3",
    title: "Waiting for accounting export",
    description: "Get the monthly export from the accounting system.",
    owner: "Alex",
    due: "2026-02-18",
    status: "Blocked",
    measure: "Data received and validated",
  },
  {
    id: "a4",
    title: "Review automation options",
    description: "Look at tools to reduce manual reporting and data gathering.",
    owner: "Jude",
    due: "2026-02-25",
    status: "Complete",
    measure: "Options list and next steps",
  },
]

export type FindingDetail = {
  slug: string
  title: string
  category: string
  priority: "High" | "Medium"
  status: string
  observed: string
  impacts: string[]
  recommendedIntro: string
  indicators: string[]
  target: string
  planAction: Omit<Action, "id">
}

export const findingDetails: Record<string, FindingDetail> = {
  "weekly-reporting": {
    slug: "weekly-reporting",
    title: "Improve weekly management reporting",
    category: "Reporting maturity",
    priority: "High",
    status: "Not started",
    observed:
      "Management information is currently reviewed monthly and assembled manually from multiple sources. This may delay decisions about profitability, costs, and operational capacity.",
    impacts: [
      "Slower response to cost changes.",
      "Limited visibility into service-line margins.",
      "More time spent preparing reports.",
      "Greater reliance on informal updates.",
    ],
    recommendedIntro: "Create a weekly management scorecard containing:",
    indicators: ["Revenue.", "Gross margin.", "Outstanding invoices.", "Jobs completed.", "Labour hours or utilisation."],
    target: "Produce a consistent weekly report by Friday at noon.",
    planAction: {
      title: "Improve weekly management reporting",
      description: "Create a weekly management scorecard with five core indicators.",
      owner: "Unassigned",
      due: "2026-03-02",
      status: "Backlog",
      measure: "Consistent weekly report by Friday at noon",
    },
  },
  "service-line-margins": {
    slug: "service-line-margins",
    title: "Review service-line margins",
    category: "Profitability",
    priority: "High",
    status: "Backlog",
    observed:
      "Profitability is currently reviewed at the overall business level rather than by service line. This can hide individual services or jobs that are running at a low margin or a loss.",
    impacts: [
      "Low-margin work may be priced the same as high-margin work.",
      "Pricing decisions are made without a clear view of true cost.",
      "Staff and equipment may be allocated to lower-value work.",
      "Overall margin can decline gradually with no obvious single cause.",
    ],
    recommendedIntro: "Build a service-line margin report that separates:",
    indicators: [
      "Revenue by service line.",
      "Direct cost by service line.",
      "Resulting gross margin by service line.",
      "Volume or hours delivered by service line.",
    ],
    target: "Produce a first service-line margin report within 30 days.",
    planAction: {
      title: "Review service-line margins",
      description: "Understand profitability by service line and identify low-margin work.",
      owner: "Unassigned",
      due: "2026-03-09",
      status: "Backlog",
      measure: "Margin report by service line",
    },
  },
  "manual-reporting": {
    slug: "manual-reporting",
    title: "Reduce manual reporting and data gathering",
    category: "Automation readiness",
    priority: "Medium",
    status: "In progress",
    observed:
      "Several hours a week are spent collecting and re-entering information from different systems to prepare reports and reconcile records.",
    impacts: [
      "Staff time is spent on data entry rather than analysis.",
      "Manual re-entry increases the chance of errors.",
      "Reporting is delayed until data gathering is complete.",
      "Existing software tools may be underused.",
    ],
    recommendedIntro: "Review automation options that could reduce manual work, such as:",
    indicators: [
      "Connecting systems that already support data export or import.",
      "Using existing report or export features more fully.",
      "Standardising a single source for each type of information.",
      "Automating recurring, repetitive steps.",
    ],
    target: "Identify at least one manual process to automate or simplify within 30 days.",
    planAction: {
      title: "Reduce manual reporting and data gathering",
      description: "Review automation options to cut down manual data gathering and re-entry.",
      owner: "Unassigned",
      due: "2026-03-09",
      status: "Backlog",
      measure: "Automation options list and one process automated",
    },
  },
}

export const statusTone: Record<string, Tone> = {
  Backlog: "slate",
  "Not started": "slate",
  "In progress": "blue",
  Blocked: "red",
  Complete: "teal",
  High: "red",
  Medium: "amber",
}

export function formatDue(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}
