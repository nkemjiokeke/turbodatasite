import {
  Factory,
  HardHat,
  Truck,
  Store,
  Briefcase,
  HeartPulse,
  Wheat,
  type LucideIcon,
} from "lucide-react"

export type Sector = {
  id: string
  name: string
  shortName: string
  icon: LucideIcon
  intro: string
  problems: string[]
}

export const sectors: Sector[] = [
  {
    id: "manufacturing",
    name: "Manufacturing and industrial services",
    shortName: "Manufacturing and industrial services",
    icon: Factory,
    intro: "Margins depend on throughput, scrap, labour efficiency, and knowing the true cost of each product or job.",
    problems: [
      "Product or job costing is based on estimates that have not been checked against actual labour, material, and downtime.",
      "Bottlenecks and changeovers limit output, but the constraint is not measured consistently.",
      "Production, inventory, and financial data sit in separate systems and are reconciled by hand.",
    ],
  },
  {
    id: "construction",
    name: "Construction and trades",
    shortName: "Construction and trades",
    icon: HardHat,
    intro: "Profit is won or lost job by job, and it is often only visible after the job has closed.",
    problems: [
      "Job profitability is only known after completion, too late to correct overruns.",
      "Quoting relies on experience rather than a comparison of past estimates against actual costs.",
      "Invoicing and progress billing are delayed by paperwork and missing information from site.",
    ],
  },
  {
    id: "logistics",
    name: "Logistics and transportation",
    shortName: "Logistics and transportation",
    icon: Truck,
    intro: "Small inefficiencies in routing, utilisation, and billing repeat thousands of times a year.",
    problems: [
      "Profitability by customer, lane, or route is not measured, so unprofitable work continues.",
      "Vehicle, driver, or warehouse utilisation is tracked loosely or not at all.",
      "Accessorial charges and extra work are not consistently captured and billed.",
    ],
  },
  {
    id: "retail",
    name: "Retail and wholesale",
    shortName: "Retail and wholesale",
    icon: Store,
    intro: "Inventory, pricing, and staffing decisions tie up cash and shape margin every week.",
    problems: [
      "Margin by product, category, or customer is unclear once discounts and freight are included.",
      "Slow-moving inventory ties up cash while fast movers run out.",
      "Staff scheduling does not follow sales patterns.",
    ],
  },
  {
    id: "professional-services",
    name: "Professional services",
    shortName: "Professional services",
    icon: Briefcase,
    intro: "Time is the product, so utilisation, scope control, and pricing decide profitability.",
    problems: [
      "Revenue grows with headcount, but profit per person does not.",
      "Scope creep and unbilled time are not tracked against fees.",
      "It is unclear which services and client types are the most profitable.",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare and social services",
    shortName: "Healthcare and social services",
    icon: HeartPulse,
    intro: "High fixed costs and funding or billing rules make capacity and scheduling decisions critical.",
    problems: [
      "Staff schedules and appointment capacity are not aligned with demand.",
      "Billing, claims, or funding reporting takes significant administrative time.",
      "Leaders lack a simple view of service volumes, costs, and outcomes together.",
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture and related businesses",
    shortName: "Agriculture and related businesses",
    icon: Wheat,
    intro: "Seasonal cash flow, input costs, and equipment use need planning well ahead of the season.",
    problems: [
      "Cost per unit, acre, or contract is not calculated consistently across seasons.",
      "Equipment and labour utilisation is hard to see during peak periods.",
      "Records are spread across paper, spreadsheets, and supplier portals.",
    ],
  },
]
