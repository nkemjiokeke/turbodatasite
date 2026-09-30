import type { Metadata } from "next"
import { ActionPlan } from "@/components/pulse/action-plan"

export const metadata: Metadata = { title: "Action plan" }

export default function ActionPlanPage() {
  return <ActionPlan />
}
