import type { Metadata } from "next"
import { PulseProvider } from "@/components/pulse/store"
import { PulseAppShell } from "@/components/pulse/app-shell"

export const metadata: Metadata = {
  title: { template: "%s | TurboData Pulse", default: "TurboData Pulse" },
  description: "TurboData Pulse: a guided business-performance assessment for small and medium-sized businesses.",
  robots: { index: false, follow: true },
}

export default function PulseAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PulseProvider>
      <PulseAppShell>{children}</PulseAppShell>
    </PulseProvider>
  )
}
