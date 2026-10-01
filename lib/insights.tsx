import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart, CHART_BRAND, CHART_BRAND_LIGHT, LineChart } from "@/components/insights/charts"

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
  {
    slug: "key-person-dependency",
    title: "How I size up how much the business depends on one person",
    category: "Operations",
    date: "2026-09-30",
    summary:
      "Turning the feeling of 'if they were away for two weeks, I don't know what we'd do' into a number, using an illustrative trades business.",
    readingMinutes: 5,
    relatedServices: ["operations-diagnostic", "fractional-analytics-operations-support"],
    body: (
      <>
        <p>
          Almost every owner I sit down with says some version of the same thing: there is one person who, if they
          were away for two weeks, would leave the business genuinely stuck. It is usually said half as a joke. I take
          it seriously, because it is a measurable risk, not just a feeling, and it is one of the first things I look
          at in an operations review.
        </p>
        <p>
          To show how, I will use an illustrative business with fourteen staff. The figures below are made up for this
          article, but the method is the one I use.
        </p>

        <h2>Listing the recurring work that keeps things running</h2>
        <p>
          I start by listing the tasks that happen every week and would cause a visible problem if they did not get
          done: preparing quotes, scheduling crews, approving purchases, running payroll, handling equipment
          breakdowns, and dealing with customer complaints. For each one I ask two questions: how many hours a week
          does it take, and how many people in the business could do it today without help?
        </p>

        <BarChart
          title="Hours of critical work per week, by how many people can do it"
          bars={[
            { label: "Preparing and sending quotes", segments: [{ value: 9, color: CHART_BRAND, label: "Known by one person" }] },
            { label: "Scheduling crews and equipment", segments: [{ value: 7, color: CHART_BRAND, label: "Known by one person" }] },
            { label: "Responding to equipment breakdowns", segments: [{ value: 5, color: CHART_BRAND_LIGHT, label: "Known by two or more" }] },
            { label: "Customer complaint handling", segments: [{ value: 4, color: CHART_BRAND_LIGHT, label: "Known by two or more" }] },
            { label: "Approving purchase orders", segments: [{ value: 3, color: CHART_BRAND, label: "Known by one person" }] },
            { label: "Payroll and remittances", segments: [{ value: 2, color: CHART_BRAND, label: "Known by one person" }] },
          ]}
          caption="Illustrative figures for a fictional business."
        />

        <div className="overflow-x-auto">
          <table>
            <caption className="sr-only">Critical tasks, hours per week, and how many people can do each one</caption>
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col" className="num">Hours per week</th>
                <th scope="col">People who can do it without help</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Preparing and sending quotes</td><td className="num">9</td><td>One</td></tr>
              <tr><td>Scheduling crews and equipment</td><td className="num">7</td><td>One</td></tr>
              <tr><td>Responding to equipment breakdowns</td><td className="num">5</td><td>Two or more</td></tr>
              <tr><td>Customer complaint handling</td><td className="num">4</td><td>Two or more</td></tr>
              <tr><td>Approving purchase orders</td><td className="num">3</td><td>One</td></tr>
              <tr><td>Payroll and remittances</td><td className="num">2</td><td>One</td></tr>
            </tbody>
          </table>
        </div>

        <h2>What the total tells you</h2>
        <p>
          In this example, thirty hours a week of work keeps the business running, and twenty-one of those hours, about
          seven in ten, sit with a single person across four different tasks. It is rarely one dramatic task. It is
          usually several ordinary ones that have quietly ended up with the same person, because they were the one who
          picked each one up first and nobody got around to showing anyone else.
        </p>

        <h2>What I recommend first</h2>
        <p>
          I do not usually recommend hiring to fix this. The first step is cheaper: document the task, in plain steps,
          with the person who currently does it, and have a second person shadow it once and then do it themselves
          while the first person watches. I start with the task that is both high in hours and held by one person,
          since that is where two weeks of absence would hurt most. Quotes and scheduling are usually the first
          candidates, because the business visibly stalls without them.
        </p>

        <h2>The caveat I always add</h2>
        <p>
          This measures who <em>can</em> do a task, not who is willing to, and it says nothing about tasks people are
          quietly unable to do but have not admitted to. I ask the question directly, person by person and task by
          task, rather than relying on the owner&apos;s impression of who covers what, because the two answers are
          often different.
        </p>
      </>
    ),
  },
  {
    slug: "is-it-worth-automating",
    title: "Working out whether a repetitive task is worth automating",
    category: "Automation",
    date: "2026-09-30",
    summary:
      "The payback calculation I run before recommending automation, and the two conditions I check before trusting it.",
    readingMinutes: 6,
    relatedServices: ["automation-advisory", "process-improvement"],
    body: (
      <>
        <p>
          When someone asks me whether a repetitive task is worth automating, I do not start from the view that
          automation is automatically good. I start by costing the current manual way of doing it and comparing that
          to the cost of automating it, including the parts that are easy to forget.
        </p>
        <p>
          Here is the calculation using an illustrative example: a business that reconciles supplier invoices against
          purchase orders by hand. The figures are made up for this article, but the steps are the ones I follow.
        </p>

        <h2>Costing the manual way</h2>
        <p>
          The task takes six hours a week at a loaded cost of $38 an hour, including wages, benefits, and overhead
          attributable to that person&apos;s time. Over a year, that is roughly $11,900. That number alone is often
          enough to get a conversation started, but it is only half the comparison.
        </p>

        <h2>Costing the automated way</h2>
        <p>
          I price three things separately: the one-time cost to build or configure the automation, the ongoing
          subscription or hosting cost, and the hours still needed for exceptions the automation cannot handle, because
          there are almost always some. In this example: a $4,500 one-time setup, $85 a month ongoing, and one hour a
          week of exception handling at the same $38 loaded rate.
        </p>

        <LineChart
          title="Cumulative cost over 24 months: staying manual vs. automating"
          xLabels={["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24"]}
          series={[
            {
              label: "Automating",
              color: CHART_BRAND,
              values: [4500, 4999, 5499, 5998, 6497, 6997, 7496, 7995, 8495, 8994, 9493, 9993, 10492],
            },
            {
              label: "Staying manual",
              color: CHART_BRAND_LIGHT,
              dashed: true,
              values: [0, 1976, 3952, 5928, 7904, 9880, 11856, 13832, 15808, 17784, 19760, 21736, 23712],
            },
          ]}
          valueFormat={(v) => `$${v.toLocaleString()}`}
          annotation={{ index: 3, label: "Breakeven: about month 6" }}
          caption="Illustrative figures for a fictional business. Months 0, 2, 4… on the horizontal axis."
        />

        <div className="overflow-x-auto">
          <table>
            <caption className="sr-only">Cost comparison between the manual and automated options</caption>
            <thead>
              <tr>
                <th scope="col">Option</th>
                <th scope="col" className="num">One-time cost</th>
                <th scope="col" className="num">Ongoing cost per year</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Staying manual</td><td className="num">$0</td><td className="num">$11,856</td></tr>
              <tr><td>Automating</td><td className="num">$4,500</td><td className="num">$2,996</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Why the setup cost is not the end of the story</h2>
        <p>
          The automated option costs more in month one. Owners sometimes stop there and conclude it is not worth it.
          The useful question is not which option costs more today, but when the lines cross. In this example, the
          ongoing saving pays back the setup cost by around month six, and every month after that is cheaper than
          staying manual.
        </p>

        <h2>The two things I check before recommending it</h2>
        <p>
          A payback calculation only holds if two conditions are true. First, the process has to be stable: if the
          rules for matching invoices to purchase orders change every few months, the automation needs rebuilding and
          the real cost is higher than the spreadsheet shows. Second, it has to be genuinely rule-based: if a third of
          the cases need human judgement, that hour of exception handling I budgeted for will not be enough. When
          either condition fails, I usually recommend simplifying and standardising the process first, and revisiting
          automation once it has settled down.
        </p>

        <h2>The caveat I always add</h2>
        <p>
          The ongoing cost of automation is almost never zero, and I treat any estimate that assumes it is with
          suspicion. Someone has to watch for failures, update it when a supplier changes their invoice format, and
          handle the exceptions. I build that into the comparison from the start rather than discovering it a year in.
        </p>
      </>
    ),
  },
  {
    slug: "trend-not-one-bad-month",
    title: "Why I look at the trend before I react to one bad month",
    category: "Data-driven decision-making",
    date: "2026-09-30",
    summary:
      "How a moving average separates a genuine decline from ordinary month-to-month noise, using an illustrative margin series.",
    readingMinutes: 5,
    relatedServices: ["business-intelligence-reporting", "financial-performance-analysis"],
    body: (
      <>
        <p>
          I often get a call that starts the same way: this month&apos;s number dropped sharply, and the owner wants
          to know what went wrong. My first move is almost never to answer that question directly. It is to pull the
          last several months and look at the trend, because a single month in a small business moves around for
          ordinary reasons: a large job landing late, a slow week of weather, a one-off cost.
        </p>
        <p>
          To show the method, here is an illustrative gross margin series for a fictional business. The figures are
          made up, but the calculation is the one I actually run.
        </p>

        <h2>Smoothing the line before reading it</h2>
        <p>
          Alongside the raw monthly figure, I calculate a trailing three-month average: the average of the current
          month and the two before it. A single month can jump around; the average moves more slowly, so a change in
          its direction is a better signal than a change in any one point.
        </p>

        <LineChart
          title="Monthly gross margin vs. three-month average"
          xLabels={["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
          series={[
            { label: "Three-month average", color: CHART_BRAND, values: [23.3, 21.7, 22.7, 19.7, 20.0, 17.3, 17.7, 15.3, 15.7, 13.3] },
            { label: "Raw monthly figure", color: CHART_BRAND_LIGHT, dashed: true, values: [26, 19, 23, 17, 20, 15, 18, 13, 16, 11] },
          ]}
          valueFormat={(v) => `${v}%`}
          caption="Illustrative figures for a fictional business."
        />

        <div className="overflow-x-auto">
          <table>
            <caption className="sr-only">Monthly gross margin and three-month average, illustrative figures</caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col" className="num">Raw margin</th>
                <th scope="col" className="num">Three-month average</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>March</td><td className="num">26%</td><td className="num">23.3%</td></tr>
              <tr><td>April</td><td className="num">19%</td><td className="num">21.7%</td></tr>
              <tr><td>May</td><td className="num">23%</td><td className="num">22.7%</td></tr>
              <tr><td>June</td><td className="num">17%</td><td className="num">19.7%</td></tr>
              <tr><td>July</td><td className="num">20%</td><td className="num">20.0%</td></tr>
              <tr><td>August</td><td className="num">15%</td><td className="num">17.3%</td></tr>
              <tr><td>September</td><td className="num">18%</td><td className="num">17.7%</td></tr>
              <tr><td>October</td><td className="num">13%</td><td className="num">15.3%</td></tr>
              <tr><td>November</td><td className="num">16%</td><td className="num">15.7%</td></tr>
              <tr><td>December</td><td className="num">11%</td><td className="num">13.3%</td></tr>
            </tbody>
          </table>
        </div>

        <h2>What this example actually shows</h2>
        <p>
          October&apos;s raw figure of 13% looks like a cliff after September&apos;s 18%, and that is the kind of
          month that prompts the phone call. But the three-month average for October is 15.3%, only modestly below
          September&apos;s 17.7%. On its own, October is not the emergency it feels like.
        </p>
        <p>
          The more important finding is the one that is easy to miss in the panic over a single month: the average has
          drifted from 23.3% in March down to 13.3% by December. That is a genuine, gradual decline, not a one-month
          event, and it is the kind of pattern I would raise even if no single month had looked alarming at all.
        </p>

        <h2>The threshold I use</h2>
        <p>
          I do not treat every wobble in the average as meaningful. What makes me say something is a sustained drift
          over several months in the same direction, as in this example, rather than a single point moving against an
          otherwise flat average. One month is a question. Several months in a row moving the same way is a finding.
        </p>

        <h2>The caveat I always add</h2>
        <p>
          This only works if the measure is defined and calculated the same way every month. If the business changed
          how it allocates a cost partway through the year, or started including a new revenue line, the trend can
          look real when it is actually an artefact of the change. I check for that before I trust any trend line,
          including this one.
        </p>
      </>
    ),
  },
  {
    slug: "where-the-time-actually-goes",
    title: "Mapping a workflow to find out where the time actually goes",
    category: "Process improvement",
    date: "2026-09-30",
    summary:
      "Separating time spent working from time spent waiting at each step of a workflow, using an illustrative quote-to-job process.",
    readingMinutes: 6,
    relatedServices: ["operations-diagnostic", "process-improvement"],
    body: (
      <>
        <p>
          When a process feels slow, the step people blame is usually the one that is most visible or most annoying to
          wait on. When I actually map the time spent at each step, the real bottleneck is often somewhere else
          entirely, because almost all of the elapsed time in most workflows is waiting, not working.
        </p>
        <p>
          To show the method, here is an illustrative quote-to-job workflow for a fictional business. The figures are
          made up, but the approach is the one I use on an operations review.
        </p>

        <h2>Separating work time from wait time</h2>
        <p>
          For a sample of recent cases, I record two numbers at each step: how long the actual work took, and how long
          the item sat waiting before the next step picked it up. I leave out the step where the business is waiting on
          the customer to respond, since that time is not within the business&apos;s control and including it would
          distort where the business should focus its own effort.
        </p>

        <BarChart
          title="Days of work vs. days of waiting, by step"
          bars={[
            {
              label: "Request logged → site visit scheduled",
              segments: [
                { value: 0.1, color: CHART_BRAND, label: "Time working" },
                { value: 2.0, color: CHART_BRAND_LIGHT, label: "Time waiting" },
              ],
              valueLabel: "2.1 days",
            },
            {
              label: "Site visit → quote drafted",
              segments: [
                { value: 0.5, color: CHART_BRAND, label: "Time working" },
                { value: 3.0, color: CHART_BRAND_LIGHT, label: "Time waiting" },
              ],
              valueLabel: "3.5 days",
            },
            {
              label: "Quote drafted → quote sent",
              segments: [
                { value: 0.2, color: CHART_BRAND, label: "Time working" },
                { value: 1.5, color: CHART_BRAND_LIGHT, label: "Time waiting" },
              ],
              valueLabel: "1.7 days",
            },
            {
              label: "Customer approves → job scheduled",
              segments: [
                { value: 0.3, color: CHART_BRAND, label: "Time working" },
                { value: 4.0, color: CHART_BRAND_LIGHT, label: "Time waiting" },
              ],
              valueLabel: "4.3 days",
            },
          ]}
          caption="Illustrative figures for a fictional business. Excludes time waiting on the customer to respond."
        />

        <div className="overflow-x-auto">
          <table>
            <caption className="sr-only">Work and wait time by step, illustrative figures</caption>
            <thead>
              <tr>
                <th scope="col">Step</th>
                <th scope="col" className="num">Work (days)</th>
                <th scope="col" className="num">Wait (days)</th>
                <th scope="col" className="num">Total (days)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Request logged → site visit scheduled</td><td className="num">0.1</td><td className="num">2.0</td><td className="num">2.1</td></tr>
              <tr><td>Site visit → quote drafted</td><td className="num">0.5</td><td className="num">3.0</td><td className="num">3.5</td></tr>
              <tr><td>Quote drafted → quote sent</td><td className="num">0.2</td><td className="num">1.5</td><td className="num">1.7</td></tr>
              <tr><td>Customer approves → job scheduled</td><td className="num">0.3</td><td className="num">4.0</td><td className="num">4.3</td></tr>
              <tr><th scope="row">Total</th><td className="num">1.1</td><td className="num">10.5</td><td className="num">11.6</td></tr>
            </tbody>
          </table>
        </div>

        <h2>What the totals show</h2>
        <p>
          Of eleven and a half days from a request coming in to the job being scheduled, only about one day is spent
          actually doing anything. The rest, over ninety percent of the elapsed time, is the request sitting in a
          queue. That ratio surprises most owners, who tend to assume the work itself is the slow part.
        </p>
        <p>
          It also points at a different step than the one people usually complain about. The step between the site
          visit and the quote being drafted gets the most attention, because customers chase the office for it. But the
          largest single wait, four days, sits after the customer has already approved the quote, waiting for a
          scheduling slot. That is the step with the most room for improvement, even though nobody was complaining
          about it.
        </p>

        <h2>What I recommend first</h2>
        <p>
          I target the step with the largest wait segment, not the step people are loudest about. In this example that
          means looking at why approved jobs sit for four days before being scheduled: is it a crew availability
          problem, a scheduling tool that is only checked once a day, or a backlog that has built up because nobody
          owns clearing it. The fix is usually smaller than it looks once the real bottleneck is identified correctly.
        </p>

        <h2>The caveat I always add</h2>
        <p>
          This only works if the business records when something moves from one step to the next. Many do not, which
          means the first useful change is often just adding a timestamp at each handoff, even in a simple spreadsheet,
          before trying to fix anything. Without that, every conversation about where the time goes stays a guess.
        </p>
      </>
    ),
  },
  {
    slug: "utilisation-vs-billable-hours",
    title: "What utilisation tells you that billable hours alone do not",
    category: "Business analytics",
    date: "2026-09-30",
    summary:
      "Why a healthy total of billable hours can still hide a real capacity problem, using an illustrative five-person team.",
    readingMinutes: 5,
    relatedServices: ["business-intelligence-reporting", "fractional-analytics-operations-support"],
    body: (
      <>
        <p>
          Billable hours as a single total can look perfectly fine while hiding a real problem underneath. Utilisation,
          billable hours as a share of hours paid, calculated person by person, usually tells a more useful story than
          the team total on its own.
        </p>
        <p>
          Here is an illustrative five-person team for a fictional business. The figures are made up, but the
          calculation is the one I run on a reporting engagement.
        </p>

        <h2>How I calculate it</h2>
        <p>
          For each person, I take paid hours for the month from payroll and billable or productive hours from
          timesheets or job records, then divide one by the other. I agree the definition of &ldquo;billable&rdquo;
          with the owner first, because travel time, training, and administrative work are sometimes included and
          sometimes not, and the number only means something if everyone is measured the same way.
        </p>

        <BarChart
          title="Utilisation by role, against a 70% target"
          bars={[
            { label: "Senior technician", segments: [{ value: 82.7, color: CHART_BRAND, label: "Utilisation" }], valueLabel: "82.7%" },
            { label: "Technician A", segments: [{ value: 74.7, color: CHART_BRAND, label: "Utilisation" }], valueLabel: "74.7%" },
            { label: "Project lead", segments: [{ value: 61.6, color: CHART_BRAND, label: "Utilisation" }], valueLabel: "61.6%" },
            { label: "Technician B", segments: [{ value: 60.0, color: CHART_BRAND, label: "Utilisation" }], valueLabel: "60.0%" },
            { label: "Apprentice", segments: [{ value: 56.8, color: CHART_BRAND, label: "Utilisation" }], valueLabel: "56.8%" },
          ]}
          referenceLine={{ value: 70, label: "Target: 70%" }}
          caption="Illustrative figures for a fictional business."
        />

        <div className="overflow-x-auto">
          <table>
            <caption className="sr-only">Paid hours, billable hours, and utilisation by role</caption>
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col" className="num">Paid hours</th>
                <th scope="col" className="num">Billable hours</th>
                <th scope="col" className="num">Utilisation</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Senior technician</td><td className="num">162</td><td className="num">134</td><td className="num">82.7%</td></tr>
              <tr><td>Technician A</td><td className="num">158</td><td className="num">118</td><td className="num">74.7%</td></tr>
              <tr><td>Technician B</td><td className="num">160</td><td className="num">96</td><td className="num">60.0%</td></tr>
              <tr><td>Apprentice</td><td className="num">155</td><td className="num">88</td><td className="num">56.8%</td></tr>
              <tr><td>Project lead</td><td className="num">164</td><td className="num">101</td><td className="num">61.6%</td></tr>
              <tr><th scope="row">Team total</th><td className="num">799</td><td className="num">537</td><td className="num">67.2%</td></tr>
            </tbody>
          </table>
        </div>

        <h2>What the team total hides</h2>
        <p>
          The team utilisation of 67.2% looks close enough to a 70% target that an owner glancing at one number might
          not think twice. Underneath it, two people are comfortably above target and three are meaningfully below,
          including one more than thirteen points under. A single combined figure averages away exactly the pattern
          that matters.
        </p>

        <h2>What I do with the spread</h2>
        <p>
          I look at each person&apos;s utilisation over several months before concluding anything, because one low
          month is often a scheduling gap rather than a sign of a problem with the person. If someone is consistently
          below target over a quarter, I treat it first as a workload and scheduling question: are they being booked
          onto enough jobs, is work being routed to a favoured few, or is there simply not enough demand for that
          role right now. Performance is the last explanation I check, not the first.
        </p>

        <h2>The caveat I always add</h2>
        <p>
          Utilisation is only as good as the definition behind it. If travel time counts as billable for one person and
          not another, or if training weeks are excluded for some roles and not others, the comparison between people
          becomes unfair before a single hour is counted. I write the definition down and confirm it with the owner
          before I calculate anything.
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
