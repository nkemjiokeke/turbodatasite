import { PieChart, Shuffle, TrendingUp, CalendarClock } from "lucide-react"
import { Card, IconBadge, Section, SectionHeading } from "@/components/site/primitives"

const problems = [
  {
    icon: PieChart,
    title: "Unclear profitability",
    body: "Revenue looks healthy, but it is hard to say which products, services, customers, or jobs are actually making money.",
  },
  {
    icon: Shuffle,
    title: "Inefficient workflows",
    body: "Work waits between steps, gets redone, or is typed into more than one system, and the team absorbs the cost in extra hours.",
  },
  {
    icon: TrendingUp,
    title: "Rising operating costs",
    body: "Costs are climbing faster than prices, and the reasons are spread across suppliers, labour, overtime, and small daily decisions.",
  },
  {
    icon: CalendarClock,
    title: "Decisions based on outdated information",
    body: "Reports arrive weeks after the month closes, or pull different numbers from different places, so decisions rely on memory and instinct.",
  },
]

export function Problems() {
  return (
    <Section tone="white" labelledBy="problems-title">
      <SectionHeading
        id="problems-title"
        title="Busy does not always mean profitable."
        intro="Many businesses have enough data to make better decisions, but the information is scattered across spreadsheets, systems, teams, and processes. TurboData helps connect the numbers to the operational reality behind them."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {problems.map((p) => (
          <li key={p.title}>
            <Card className="flex h-full gap-4">
              <IconBadge icon={p.icon} />
              <div>
                <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
