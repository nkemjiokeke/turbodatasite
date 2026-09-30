// Configuration for the TurboData Pulse assessment: questions, categories, scoring
// tiers, and the content used to build both the in-app findings pages and the
// emailed PDF report from a single source.

export type Category =
  | "Financial visibility"
  | "Profitability and margin"
  | "Workflow efficiency"
  | "Labour and capacity"
  | "Reporting maturity"
  | "Automation readiness"

export const categories: Category[] = [
  "Financial visibility",
  "Profitability and margin",
  "Workflow efficiency",
  "Labour and capacity",
  "Reporting maturity",
  "Automation readiness",
]

export function categorySlug(category: Category): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function categoryFromSlug(slug: string): Category | undefined {
  return categories.find((c) => categorySlug(c) === slug)
}

export type QuestionOption = { label: string; score: number }
export type Question = {
  id: string
  category: Category | null
  text: string
  options: QuestionOption[]
}
export type AssessmentSection = { id: string; title: string; intro: string; questions: Question[] }

export const assessmentSections: AssessmentSection[] = [
  {
    id: "profile",
    title: "Business profile",
    intro: "A little context about the business helps focus the rest of the assessment.",
    questions: [
      {
        id: "challenge",
        category: null,
        text: "What is the greatest challenge facing the business right now?",
        options: [
          "Profitability is unclear.",
          "Costs are rising.",
          "Workflows are slow or inconsistent.",
          "Reports are difficult to prepare.",
          "Too much work depends on one person.",
          "We do not know what to automate.",
        ].map((label) => ({ label, score: 0 })),
      },
      {
        id: "size",
        category: null,
        text: "Approximately how many people work in the business?",
        options: ["1–4", "5–19", "20–49", "50–100", "More than 100"].map((label) => ({ label, score: 0 })),
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
        category: "Financial visibility",
        text: "How clearly can you see profitability by product, service, job, or customer?",
        options: [
          { label: "Very clearly", score: 90 },
          { label: "Somewhat clearly", score: 65 },
          { label: "Not very clearly", score: 35 },
          { label: "We currently cannot separate profitability", score: 10 },
        ],
      },
      {
        id: "month-end",
        category: "Financial visibility",
        text: "How soon after month-end do you usually know your results?",
        options: [
          { label: "Within a week", score: 90 },
          { label: "Two to three weeks", score: 65 },
          { label: "More than a month", score: 35 },
          { label: "Only at year-end", score: 10 },
        ],
      },
    ],
  },
  {
    id: "margin",
    title: "Profitability and margin",
    intro: "Whether profit can be seen and is holding up by service or product line.",
    questions: [
      {
        id: "margin-visibility",
        category: "Profitability and margin",
        text: "How clearly can you see profit margin by service line or product line?",
        options: [
          { label: "Very clearly", score: 90 },
          { label: "Somewhat clearly", score: 65 },
          { label: "Not very clearly", score: 35 },
          { label: "We do not track this", score: 10 },
        ],
      },
      {
        id: "pricing-review",
        category: "Profitability and margin",
        text: "Have you reviewed pricing against true cost in the last 12 months?",
        options: [
          { label: "Yes, thoroughly", score: 90 },
          { label: "Yes, partly", score: 60 },
          { label: "Not recently", score: 30 },
          { label: "Never", score: 10 },
        ],
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
        category: "Workflow efficiency",
        text: "How often does work wait on missing information or approvals?",
        options: [
          { label: "Rarely", score: 90 },
          { label: "Sometimes", score: 60 },
          { label: "Often", score: 30 },
          { label: "Almost always", score: 10 },
        ],
      },
      {
        id: "documented",
        category: "Workflow efficiency",
        text: "Are your main workflows documented?",
        options: [
          { label: "Yes, and they are followed", score: 90 },
          { label: "Partly", score: 55 },
          { label: "No, they rely on experience", score: 20 },
        ],
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
        category: "Labour and capacity",
        text: "How well do you know how staff time is spent?",
        options: [
          { label: "Tracked by job or task", score: 90 },
          { label: "Rough estimates", score: 50 },
          { label: "Not tracked", score: 15 },
        ],
      },
      {
        id: "key-person",
        category: "Labour and capacity",
        text: "How much important work depends on one person?",
        options: [
          { label: "Very little", score: 90 },
          { label: "Some", score: 50 },
          { label: "A lot", score: 15 },
        ],
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
        category: "Reporting maturity",
        text: "How often does management review key business performance information?",
        options: [
          { label: "Daily", score: 95 },
          { label: "Weekly", score: 80 },
          { label: "Monthly", score: 50 },
          { label: "Irregularly", score: 25 },
          { label: "We do not have a consistent review process", score: 5 },
        ],
      },
      {
        id: "preparation",
        category: "Reporting maturity",
        text: "How are management reports usually prepared?",
        options: [
          { label: "Automatically from our systems", score: 90 },
          { label: "Partly manual", score: 50 },
          { label: "Mostly manual, from several sources", score: 15 },
        ],
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
        category: "Automation readiness",
        text: "How much time is spent re-entering the same information into different systems?",
        options: [
          { label: "Almost none", score: 90 },
          { label: "A few hours a week", score: 55 },
          { label: "Many hours a week", score: 20 },
          { label: "Not sure", score: 40 },
        ],
      },
      {
        id: "tools",
        category: "Automation readiness",
        text: "How fully are your current software tools used?",
        options: [
          { label: "Fully", score: 90 },
          { label: "Partly", score: 55 },
          { label: "Mostly for the basics", score: 30 },
          { label: "Not sure", score: 40 },
        ],
      },
    ],
  },
]

export type Tier = "attention" | "developing" | "strong"

export function scoreToTier(score: number): Tier {
  if (score < 45) return "attention"
  if (score < 75) return "developing"
  return "strong"
}

export type CategoryContent = {
  explanation: string
  whyItMatters: string
  examineNext: string
  processImprovementNote: string
  automationNote: string
  tiers: Record<Tier, { whatAnswersSuggest: string; firstStep: string }>
}

export const categoryContent: Record<Category, CategoryContent> = {
  "Financial visibility": {
    explanation: "Financial visibility is how quickly and clearly you can see where the business is making and losing money.",
    whyItMatters:
      "Without clear, timely financial information, pricing, staffing, and spending decisions are often made on instinct rather than evidence.",
    examineNext: "Look at how long it currently takes from month-end close to having usable financial reports in hand.",
    processImprovementNote:
      "A monthly close checklist and a standard month-end reporting pack can shorten the time between month-end and knowing your results.",
    automationNote:
      "Connecting your accounting system to a simple reporting tool can remove manual copy-and-paste work from monthly reporting.",
    tiers: {
      attention: {
        whatAnswersSuggest:
          "Your answers suggest profitability is difficult to see clearly, and results may take a long time to reach you after month-end.",
        firstStep: "A useful next step could be agreeing a short list of numbers to review every month, even before full financials are ready.",
      },
      developing: {
        whatAnswersSuggest:
          "Your answers suggest some financial visibility exists, but results may still take longer than ideal to reach decision-makers.",
        firstStep: "A useful next step could be tightening the month-end process so results are available within a week.",
      },
      strong: {
        whatAnswersSuggest: "Your answers suggest financial visibility is already a relative strength for the business.",
        firstStep: "A useful next step could be documenting the current process so it stays reliable as the business grows.",
      },
    },
  },
  "Profitability and margin": {
    explanation: "Profitability and margin is whether you can see which products, services, jobs, or customers are actually making money.",
    whyItMatters: "Without this, low-margin or loss-making work can continue unnoticed, quietly reducing overall profitability.",
    examineNext: "Look at whether revenue and direct cost can currently be separated for your top few services or products.",
    processImprovementNote: "Building a simple margin report by service or product line is often the fastest way to see where profit is being made or lost.",
    automationNote: "Job-costing or project-tracking software already in use may be able to produce this breakdown with minimal extra setup.",
    tiers: {
      attention: {
        whatAnswersSuggest: "Your answers suggest margin is not currently visible by service or product line, so low-margin work may be hidden.",
        firstStep: "A useful next step could be separating revenue and direct cost for your largest service or product lines first.",
      },
      developing: {
        whatAnswersSuggest: "Your answers suggest some margin visibility exists, but pricing may not have been reviewed against true cost recently.",
        firstStep: "A useful next step could be a focused review comparing current pricing to updated cost information.",
      },
      strong: {
        whatAnswersSuggest: "Your answers suggest margin visibility is already a relative strength for the business.",
        firstStep: "A useful next step could be reviewing pricing on a regular schedule to keep it aligned with cost.",
      },
    },
  },
  "Workflow efficiency": {
    explanation: "Workflow efficiency is how smoothly work moves from one step to the next without waiting or repetition.",
    whyItMatters: "Work that stalls on missing information or undocumented steps tends to take longer and depend heavily on specific people.",
    examineNext: "Look at the workflow that most often causes delay or rework, from start to finish.",
    processImprovementNote: "Mapping the two or three workflows that cause the most delay is often enough to find where approvals or information are missing.",
    automationNote: "Simple automated reminders or approval routing may reduce the time work spends waiting.",
    tiers: {
      attention: {
        whatAnswersSuggest: "Your answers suggest work often waits on missing information or approvals, and workflows may not be documented.",
        firstStep: "A useful next step could be documenting your single most time-consuming workflow, start to finish.",
      },
      developing: {
        whatAnswersSuggest: "Your answers suggest workflows are partly documented, with occasional delays waiting on information.",
        firstStep: "A useful next step could be reviewing where approvals most often cause delay.",
      },
      strong: {
        whatAnswersSuggest: "Your answers suggest workflow efficiency is already a relative strength for the business.",
        firstStep: "A useful next step could be revisiting documented workflows periodically as the business changes.",
      },
    },
  },
  "Labour and capacity": {
    explanation: "Labour and capacity is how well the business understands where staff time goes, and how dependent it is on any one person.",
    whyItMatters: "Without this visibility, it is hard to plan staffing, and the business may be exposed if a key person is unavailable.",
    examineNext: "Look at which tasks depend on a single person, and what would happen if they were unavailable for a week.",
    processImprovementNote: "Simple timesheets by job or task, even at a rough level, can reveal where hours are really being spent.",
    automationNote: "Existing scheduling or job-management software may already capture time data that is not yet being used for reporting.",
    tiers: {
      attention: {
        whatAnswersSuggest: "Your answers suggest staff time is not closely tracked, and a lot of important work may depend on one person.",
        firstStep: "A useful next step could be documenting what a key person does day-to-day, as a starting point for cross-training.",
      },
      developing: {
        whatAnswersSuggest: "Your answers suggest a general sense of where time goes, though tracking is still rough.",
        firstStep: "A useful next step could be tracking time by job for a two-week sample period.",
      },
      strong: {
        whatAnswersSuggest: "Your answers suggest labour and capacity visibility is already a relative strength for the business.",
        firstStep: "A useful next step could be using existing time data to plan capacity ahead of busy periods.",
      },
    },
  },
  "Reporting maturity": {
    explanation: "Reporting maturity is how consistently management information is prepared, reviewed, and used to make decisions.",
    whyItMatters: "Reporting that is irregular or heavily manual tends to arrive too late to influence the decisions it should inform.",
    examineNext: "Look at who currently prepares management reports, and how long that takes each month.",
    processImprovementNote: "A short, standard weekly or monthly reporting pack, reviewed on a fixed schedule, is often the single highest-leverage change available.",
    automationNote: "Reports assembled manually from several sources are often good candidates for a simple automated export or dashboard.",
    tiers: {
      attention: {
        whatAnswersSuggest: "Your answers suggest there is not yet a consistent process for reviewing business performance information.",
        firstStep: "A useful next step could be agreeing five numbers to review at a fixed time each week.",
      },
      developing: {
        whatAnswersSuggest: "Your answers suggest reporting happens, but it may still be irregular or partly manual.",
        firstStep: "A useful next step could be moving reporting onto a fixed weekly or monthly schedule.",
      },
      strong: {
        whatAnswersSuggest: "Your answers suggest reporting maturity is already a relative strength for the business.",
        firstStep: "A useful next step could be reviewing whether the current report still covers what matters most.",
      },
    },
  },
  "Automation readiness": {
    explanation: "Automation readiness is how much repetitive, manual work could be reduced using tools the business already has or could easily add.",
    whyItMatters: "Manual re-entry and underused software tend to quietly consume hours every week that could go toward higher-value work.",
    examineNext: "Look at where the same information is currently typed into more than one system.",
    processImprovementNote: "Listing the two or three most repetitive tasks in the business is a practical starting point for identifying what to automate first.",
    automationNote: "Reviewing whether existing systems already support the export or import features you need can often remove manual re-entry without new software.",
    tiers: {
      attention: {
        whatAnswersSuggest: "Your answers suggest a meaningful amount of time is spent re-entering the same information across systems.",
        firstStep: "A useful next step could be identifying the single most repeated manual task and mapping where the information comes from.",
      },
      developing: {
        whatAnswersSuggest: "Your answers suggest some manual re-entry remains, alongside tools that may not be fully used.",
        firstStep: "A useful next step could be reviewing the features of your current software before considering anything new.",
      },
      strong: {
        whatAnswersSuggest: "Your answers suggest automation readiness is already a relative strength for the business.",
        firstStep: "A useful next step could be revisiting this area periodically as new tools become available.",
      },
    },
  },
}
