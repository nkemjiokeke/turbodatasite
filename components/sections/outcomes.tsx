import { Section, SectionHeading } from "@/components/site/primitives"

const outcomes = [
  {
    title: "Understand where margin is being lost.",
    body: "See profitability by product, service, customer, or job, so you know what to protect, reprice, or stop doing.",
  },
  {
    title: "See which processes are slowing the business down.",
    body: "Find the handoffs, delays, and rework that consume capacity, and understand what they cost in time and money.",
  },
  {
    title: "Prioritise the improvements most likely to matter.",
    body: "Get a short, ranked list of actions based on likely impact and effort, rather than a long list of everything that could be better.",
  },
  {
    title: "Build better reporting and operating routines.",
    body: "Put a small set of reliable measures and a regular review in place, so problems are caught early and decisions are easier to make.",
  },
]

export function Outcomes() {
  return (
    <Section tone="navy" labelledBy="outcomes-title">
      <SectionHeading id="outcomes-title" dark title="From scattered information to practical action." />
      <ol className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {outcomes.map((o, i) => (
          <li key={o.title} className="flex gap-5 border-t border-navy-line pt-6">
            <span aria-hidden="true" className="font-heading text-sm font-bold text-[#8fd3c9]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-xl font-bold text-on-dark">{o.title}</h3>
              <p className="mt-2 leading-relaxed text-on-dark-muted">{o.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
