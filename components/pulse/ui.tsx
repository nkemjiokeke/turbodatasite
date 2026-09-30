import { Info } from "lucide-react"
import type { Tone } from "@/lib/pulse"
import { cn } from "@/lib/utils"

const toneClasses: Record<Tone, string> = {
  amber: "border-[#f3d28a] bg-[#fdf3dc] text-[#7a4a00]",
  blue: "border-[#bcd3f5] bg-brand-soft text-[#0a3f94]",
  red: "border-[#f2c1bb] bg-[#fdecea] text-[#9b1c13]",
  teal: "border-[#b5ddd6] bg-teal-soft text-[#0b5a53]",
  slate: "border-line bg-paper text-ink-soft",
}

export function Badge({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function PulseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-6 w-6", className)}>
      <rect x="3" y="12" width="4.5" height="9" rx="1" fill="#f2b01e" />
      <rect x="9.75" y="7" width="4.5" height="14" rx="1" fill="#f2b01e" />
      <rect x="16.5" y="3" width="4.5" height="18" rx="1" fill="#f2b01e" />
    </svg>
  )
}

export function PulseWordmark({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-heading font-bold", className)}>
      <PulseMark />
      <span className={dark ? "text-white" : "text-ink"}>
        TurboData <span className={dark ? "text-[#8fb8ff]" : "text-brand"}>Pulse</span>
      </span>
      <span
        className={cn(
          "rounded-full border px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide",
          dark ? "border-white/25 text-on-dark-muted" : "border-line text-ink-soft",
        )}
      >
        V1
      </span>
    </span>
  )
}

export function SampleNotice({ children = "Illustrative V1 prototype using sample data.", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-lg border border-[#f3d28a] bg-[#fdf3dc] px-3 py-1.5 text-sm font-medium text-[#7a4a00]", className)}>
      <Info aria-hidden="true" className="h-4 w-4 shrink-0" />
      {children}
    </p>
  )
}

export function ProgressBar({ value, label, dark = false }: { value: number; label: string; dark?: boolean }) {
  return (
    <div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        className={cn("h-2 w-full overflow-hidden rounded-full", dark ? "bg-white/15" : "bg-paper-2")}
      >
        <div className="h-full rounded-full bg-teal transition-[width] duration-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
