import type { Metadata } from "next"

export const metadata: Metadata = { title: "Data Analytics Skills Assessment" }

export default function AssessmentPage() {
  return (
    <iframe
      src="/assessment.html"
      title="TurboData data analytics skills assessment"
      className="fixed inset-0 h-full w-full border-0"
    />
  )
}
