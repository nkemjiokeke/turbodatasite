import type { ReactNode } from "react"
import Link from "next/link"

export type Article = {
  slug: string
  title: string
  category: string
  date: string // ISO date of publication
  summary: string
  readingMinutes: number
  relatedServices: string[]
  body: ReactNode
}

export const insightCategories = [
  "Business analytics",
  "Profitability",
  "Operations",
  "Process improvement",
  "Automation",
  "Small-business reporting",
  "Data-driven decision-making",
]

export const articles: Article[] = [
  {
    slug: "which-jobs-actually-make-money",
    title: "How I work out which jobs actually make money",
    category: "Profitability",
    date: "2026-09-29",
    summary:
      "A walk through the margin-by-job analysis I run first when an owner tells me revenue is up but profit is not, using an illustrative trades business.",
    readingMinutes: 6,
    relatedServices: ["financial-performance-analysis", "business-intelligence-reporting"],
    body: (
      <>
        <p>
          When an owner tells me revenue is growing but the profit is not showing up, the first thing I do is split
          the business into the types of work it sells and calculate the margin on each one separately. A single
          gross margin figure for the whole company hides the answer, because it averages good work and bad work
          together.
        </p>
        <p>
          To show how I do it, I will use an illustrative trades business with $2 million in annual revenue. The
          numbers below are made up for this article, but the steps are the ones I follow.
        </p>

        <h2>Step one: group the revenue by type of work</h2>
        <p>
          I start with twelve months of invoices from the accounting system and tag each one with the type of work it
          belongs to. In this example there are four: service calls, small renovations, large projects, and
          maintenance contracts. If the business already codes jobs this way, this takes an hour. If it does not, I
          sit with the office manager and agree simple rules, because the grouping has to match how the owner thinks
          about the business or the results will not be trusted.
        </p>

        <h2>Step two: attach only the direct costs</h2>
        <p>
          Next I attach the costs that exist only because the job was done: labour hours from timesheets at the loaded
          hourly rate, materials, and subcontractors. I deliberately leave overhead out at this stage. Mixing overhead
          in too early turns the conversation into an argument about allocation before anyone has seen the basic
          picture.
        </p>

        <div className="overflow-x-auto"><table>
          <caption className="sr-only">Illustrative gross margin by job type over twelve months</caption>
          <thead>
            <tr>
              <th scope="col">Job type</th>
              <th scope="col" className="num">Revenue</th>
              <th scope="col" className="num">Direct labour</th>
              <th scope="col" className="num">Materials and subs</th>
              <th scope="col" className="num">Gross margin</th>
              <th scope="col" className="num">Margin %</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Service calls</td><td className="num">$420,000</td><td className="num">$190,000</td><td className="num">$60,000</td><td className="num">$170,000</td><td className="num">40.5%</td></tr>
            <tr><td>Small renovations</td><td className="num">$610,000</td><td className="num">$250,000</td><td className="num">$200,000</td><td className="num">$160,000</td><td className="num">26.2%</td></tr>
            <tr><td>Large projects</td><td className="num">$780,000</td><td className="num">$330,000</td><td className="num">$360,000</td><td className="num">$90,000</td><td className="num">11.5%</td></tr>
            <tr><td>Maintenance contracts</td><td className="num">$190,000</td><td className="num">$70,000</td><td className="num">$20,000</td><td className="num">$100,000</td><td className="num">52.6%</td></tr>
            <tr><th scope="row">Total</th><td className="num">$2,000,000</td><td className="num">$840,000</td><td className="num">$640,000</td><td className="num">$520,000</td><td className="num">26.0%</td></tr>
          </tbody>
        </table></div>
        <p className="text-sm">Illustrative figures for a fictional business.</p>

        <h2>Step three: compare share of revenue with share of margin</h2>
        <p>
          The line I look at first is large projects. They bring in 39% of revenue but only 17% of the gross margin.
          Maintenance contracts are the reverse: under 10% of revenue and almost a fifth of the margin. This is usually
          the moment the owner recognises something they had sensed but could not prove, because large projects are
          the work that feels most important and takes most of their attention.
        </p>

        <h2>Step four: test what overhead does to the picture</h2>
        <p>
          Only now do I bring overhead in. Say the business has $380,000 of overhead: the office, vehicles,
          insurance, and the owner&apos;s time. If I allocate it by share of labour hours, large projects carry about
          $149,000 of it, which turns their $90,000 gross margin into a loss of roughly $59,000. I then run the same
          test allocating by revenue instead. The result is almost identical, which tells me the conclusion does not
          depend on the allocation method I happened to choose. When the two methods disagree, I say so, and the
          finding becomes a question to investigate rather than a recommendation.
        </p>

        <h2>What the owner does with it</h2>
        <p>
          The analysis does not say &ldquo;stop doing large projects.&rdquo; It says that, at current pricing and
          delivery, each large project is likely costing the business money once its share of overhead is included.
          That leads to three concrete options the owner can weigh: reprice the next quotes, change the scope of what
          is included, or compare the original estimate with the actual hours on the last ten projects to find where
          the overrun happens. In most cases I recommend starting with the estimate-versus-actual comparison, because
          it shows whether the problem is the price or the delivery.
        </p>

        <h2>The caveat I always state</h2>
        <p>
          This analysis is only as good as the timesheets. If hours are recorded against the wrong job, or not recorded
          at all, the margin by job type will be wrong in ways that are hard to spot. So before I present any of this,
          I check a sample of jobs against the schedule and speak to the people who filled in the timesheets. If the
          data is weak, I say how weak, and part of the recommendation becomes fixing how hours are captured.
        </p>
      </>
    ),
  },
  {
    slug: "time-between-job-done-and-invoice-sent",
    title: "Measuring the time between a finished job and a sent invoice",
    category: "Operations",
    date: "2026-09-29",
    summary:
      "How I measure invoicing delay, convert it into cash tied up in completed work, and trace the steps that cause it.",
    readingMinutes: 5,
    relatedServices: ["operations-diagnostic", "process-improvement"],
    body: (
      <>
        <p>
          One of the first operational measures I calculate for a service or project business is the number of days
          between a job being finished and the invoice being sent. It is simple to measure, owners rarely know it, and
          it converts directly into cash.
        </p>

        <h2>How I measure it</h2>
        <p>
          I take the completion date for each job from wherever it is recorded, usually the scheduling system, job
          sheets, or the project tracker. Then I take the invoice date for the same job from the accounting system and
          calculate the gap in calendar days. I use at least six months of jobs so that one busy week does not distort
          the result, and I look at the median as well as the average, because a handful of very late invoices can
          pull the average up and hide what normally happens.
        </p>

        <h2>Turning days into dollars</h2>
        <p>
          The number means more to an owner once it is expressed as money. Using an illustrative business with $2.4
          million in annual revenue, each calendar day of revenue is worth about $6,600. If the average gap between
          finishing a job and invoicing it is 14 days, then at any moment roughly $92,000 of completed work is sitting
          uninvoiced. Bringing that gap down to four days would release about $66,000 of cash once. It does not change
          profit, but it changes how much the business has to borrow or hold back to cover wages and suppliers while it
          waits.
        </p>
        <p className="text-sm">Illustrative figures for a fictional business.</p>

        <h2>Finding out why the gap exists</h2>
        <p>
          The measurement tells me how big the problem is. It does not tell me what causes it, so the next step is to
          pick the ten slowest jobs and trace each one back. I ask the office team what they were waiting for before
          they could invoice. The answers tend to fall into a few groups: timesheets not submitted, material receipts
          missing, a customer purchase order number that nobody collected at the start, or the owner wanting to review
          every invoice personally before it goes out.
        </p>
        <p>
          I then map the steps from &ldquo;job complete&rdquo; to &ldquo;invoice sent&rdquo; as they really happen,
          including the workarounds. The map usually shows that most of the delay is waiting time between steps, and
          very little is the actual work of producing the invoice.
        </p>

        <h2>What usually fixes it</h2>
        <p>
          The fixes are rarely technical. A short close-out checklist that the crew completes on the last day of the
          job removes most of the missing-information problems. Collecting the purchase order number when the job is
          booked removes another. When the owner reviews every invoice, I suggest a threshold, so that only invoices
          above a set value or with a variation wait for approval. Once the changes are in, I track the same measure
          monthly so the business can see whether the gap is closing.
        </p>

        <h2>The limitation to keep in mind</h2>
        <p>
          Completion dates are often recorded loosely, and sometimes the job is marked complete only when the invoice is
          raised, which makes the gap look like zero. When I see that, I use a proxy, such as the date of the last
          timesheet entry on the job, and I state that I have done so. The measure is still useful for tracking
          improvement over time, as long as it is calculated the same way every month.
        </p>
      </>
    ),
  },
  {
    slug: "monthly-management-review-five-numbers",
    title: "Setting up a monthly management review around five numbers",
    category: "Small-business reporting",
    date: "2026-09-29",
    summary:
      "How I choose a small set of measures from the decisions an owner makes each month, define them properly, and turn them into a routine that holds.",
    readingMinutes: 5,
    relatedServices: ["business-intelligence-reporting", "fractional-analytics-operations-support"],
    body: (
      <>
        <p>
          When a business asks me for a dashboard, I usually start somewhere else. I ask the owner to list the
          decisions they make every month, and I build the reporting backwards from those decisions. The result is
          normally a one-page review with about five numbers, and a fixed meeting where those numbers are discussed.
        </p>

        <h2>Starting from the decisions</h2>
        <p>
          In a first session I write down the recurring decisions: whether to hire or use overtime, which quotes to
          chase, whether prices need to change, and when to push on unpaid invoices. For each decision I ask what the
          owner currently looks at to make it. Often the honest answer is nothing specific, or a number pulled together
          by hand the night before. That list of decisions is what tells me which measures are worth building.
        </p>

        <h2>Choosing the measures</h2>
        <p>
          For an illustrative trades or service business, the five measures I would typically start with are these:
        </p>
        <div className="overflow-x-auto"><table>
          <caption className="sr-only">Example measures for a monthly management review</caption>
          <thead>
            <tr>
              <th scope="col">Measure</th>
              <th scope="col">Decision it supports</th>
              <th scope="col">Typical source</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Gross margin by job type</td><td>Pricing and which work to pursue</td><td>Accounting system and timesheets</td></tr>
            <tr><td>Days from job completion to invoice</td><td>Cash planning and office workload</td><td>Scheduling and accounting systems</td></tr>
            <tr><td>Billable hours as a share of paid hours</td><td>Hiring, overtime, and scheduling</td><td>Timesheets and payroll</td></tr>
            <tr><td>Quotes won as a share of quotes sent</td><td>Sales focus and pricing</td><td>Quote log or CRM</td></tr>
            <tr><td>Overdue receivables</td><td>Collections and cash</td><td>Accounting system aged receivables report</td></tr>
          </tbody>
        </table></div>
        <p>
          The first two come directly from the analyses I describe in my other articles on{" "}
          <Link href="/insights/which-jobs-actually-make-money">margin by job</Link> and{" "}
          <Link href="/insights/time-between-job-done-and-invoice-sent">invoicing delay</Link>. The point is that every
          measure on the page is there because a specific decision depends on it.
        </p>

        <h2>Writing down the definitions</h2>
        <p>
          Before I build anything, I write a one-line definition for each measure, the exact source it comes from, and
          the person responsible for it. This step feels slow, but it prevents the most common reporting problem I see,
          which is two people quoting different numbers for the same thing and the meeting turning into a debate about
          whose spreadsheet is right.
        </p>

        <h2>Building the page</h2>
        <p>
          The review page shows each measure for the current month, the previous three months, and a target where one
          has been agreed, with a short comment from the person responsible. I build it in whatever tool the business
          already uses, which is often a spreadsheet at first. A dedicated dashboard tool can come later, once the
          measures have proved useful and the data behind them is reliable.
        </p>

        <h2>Making it a routine</h2>
        <p>
          The review only works if it happens. I suggest a fixed day each month, a meeting of about 45 minutes, and a
          simple action log: what we agreed to do, who will do it, and what we expect to see in next month&apos;s
          numbers. The following meeting opens with that log. After three or four months the owner has a record of
          what was tried and whether it moved the numbers, which is more useful than any single report.
        </p>

        <h2>What to expect in the first months</h2>
        <p>
          The first two or three reviews usually expose gaps in the data, such as missing timesheets or jobs coded
          inconsistently. I treat that as part of the result. Fixing how the data is captured is often the first action
          that comes out of the review, and it makes every later decision better informed.
        </p>
      </>
    ),
  },
]

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug)
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}
