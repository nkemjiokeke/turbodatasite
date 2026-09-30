import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
}

type Tone = "white" | "paper" | "navy"

const toneClasses: Record<Tone, string> = {
  white: "bg-white text-ink",
  paper: "bg-paper text-ink",
  navy: "on-dark bg-navy text-on-dark",
}

export function Section({
  id,
  tone = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string
  tone?: Tone
  className?: string
  children: React.ReactNode
  labelledBy?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "mb-3 text-sm font-semibold tracking-wide",
        dark ? "text-[#8fb8ff]" : "text-brand",
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
  align = "left",
  className,
}: {
  id?: string
  eyebrow?: string
  title: React.ReactNode
  intro?: React.ReactNode
  dark?: boolean
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "text-3xl font-bold leading-tight sm:text-4xl",
          dark ? "text-on-dark" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-on-dark-muted" : "text-ink-soft")}>
          {intro}
        </p>
      )}
    </div>
  )
}

type ButtonVariant = "primary" | "secondary" | "secondaryDark" | "light"

const buttonClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  secondary: "border border-ink/20 bg-white text-ink hover:border-ink/40 hover:bg-paper",
  secondaryDark: "border border-white/35 text-on-dark hover:border-white/70 hover:bg-white/5",
  light: "bg-white text-navy hover:bg-paper",
}

export function buttonStyles(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[0.95rem] font-semibold transition-colors",
    buttonClasses[variant],
    className,
  )
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string
  variant?: ButtonVariant
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={buttonStyles(variant, className)}>
      {children}
    </Link>
  )
}

export function IconBadge({ icon: Icon, dark = false }: { icon: LucideIcon; dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
        dark ? "bg-white/10 text-[#8fb8ff]" : "bg-brand-soft text-brand",
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  )
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(15,27,45,0.04)]", className)}>
      {children}
    </div>
  )
}
