import type { Metadata } from "next"
import { Assessment } from "@/components/pulse/assessment"

export const metadata: Metadata = { title: "Assessment" }

export default function AssessmentPage() {
  return <Assessment />
}
