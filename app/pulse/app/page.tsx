import Link from "next/link"
import { ArrowRight, ClipboardList, FileSearch, LayoutDashboard, ListChecks } from "lucide-react"
import { buttonStyles } from "@/components/site/primitives"

const cards = [
  {
    href: "/pulse/app/assessment",
    title: "Assessment",
    body: "Answer practical questions across six areas of the business.",
    icon: ClipboardList,
  },
  {
    href: "/pulse/app/overview",
    title: "Overview",
    body: "See a summary of key performance areas and the top opportunity.",
    icon: LayoutDashboard,
  },
  {
    href: "/pulse/app/findings",
    title: "Findings",
    body: "Review prioritised findings with observations and recommended actions.",
    icon: FileSearch,
  },
  {
    href: "/pulse/app/action-plan",
    title: "Action plan",
    body: "Track improvements with owners, due dates, and expected measures.",
    icon: ListChecks,
  },
]

export default function PulseAppHome() {
  return (
    <>
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">TurboData Pulse prototype</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        A guided view of where a business may be losing time, money, and capacity.
      </p>
      <Link href="/pulse/app/assessment" className={buttonStyles("primary", "mt-6")}>
        Start assessment
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {cards.map(({ href, title, body, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full gap-4 rounded-xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(15,27,45,0.06)] transition-colors hover:border-brand/50"
            >
              <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-lg font-bold text-ink group-hover:underline">{title}</span>
                <span className="mt-1 block leading-relaxed text-ink-soft">{body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
