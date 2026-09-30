import type { Metadata } from "next"
import { FindingsSummary } from "@/components/pulse/findings-summary"

export const metadata: Metadata = { title: "Findings" }

export default function FindingsPage() {
  return <FindingsSummary />
}
