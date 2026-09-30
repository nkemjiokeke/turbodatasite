import type { Metadata } from "next"
import { PulseProvider } from "@/components/pulse/store"
import { PulseAppShell } from "@/components/pulse/app-shell"

export const metadata: Metadata = {
  title: { template: "%s | TurboData Pulse prototype", default: "TurboData Pulse prototype" },
  description: "An illustrative front-end prototype of TurboData Pulse using sample data.",
  robots: { index: false, follow: true },
}

export default function PulseAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PulseProvider>
      <PulseAppShell>{children}</PulseAppShell>
    </PulseProvider>
  )
}
