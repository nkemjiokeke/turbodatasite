import { cn } from "@/lib/utils"

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
    </span>
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
