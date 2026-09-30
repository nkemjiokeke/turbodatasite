import type { Metadata } from "next"

export const metadata: Metadata = { title: "Enrol in the Data Analytics Cohort" }

export default function EnrolPage() {
  return (
    <iframe
      src="/enrol.html"
      title="Enrol in the TurboData Data Analytics Cohort"
      className="fixed inset-0 h-full w-full border-0"
    />
  )
}
