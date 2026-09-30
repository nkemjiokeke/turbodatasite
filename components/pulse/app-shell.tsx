"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ClipboardList, FileSearch, Menu, RotateCcw, X } from "lucide-react"
import { PulseWordmark, ProgressBar } from "@/components/pulse/ui"
import { usePulse } from "@/components/pulse/store"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/pulse/assessment", label: "Assessment", icon: ClipboardList },
  { href: "/pulse/findings", label: "Findings", icon: FileSearch },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <ul className="space-y-1">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`)
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] font-medium transition-colors",
                active ? "bg-brand text-white" : "text-on-dark-muted hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon aria-hidden="true" className="h-4.5 w-4.5" />
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  const { progress, resetAll } = usePulse()
  const [confirming, setConfirming] = useState(false)

  function handleReset() {
    resetAll()
    setConfirming(false)
    onNavigate?.()
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm text-on-dark-muted">Assessment progress</p>
        <ProgressBar value={progress} label="Assessment progress" dark />
        <p className="mt-2 text-xs text-on-dark-muted">{progress}% complete</p>
      </div>
      <div className="border-t border-navy-line pt-5">
        {confirming ? (
          <div role="alertdialog" aria-label="Confirm reset" className="rounded-lg border border-white/15 bg-white/5 p-3">
            <p className="text-xs leading-relaxed text-on-dark-muted">
              Start over? Your answers will be cleared. This cannot be undone.
            </p>
            <div className="mt-2.5 flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-md bg-white/15 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-white/25"
              >
                Yes, start over
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-md px-2.5 py-1.5 text-xs font-medium text-on-dark-muted hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex items-center gap-2 text-sm font-medium text-on-dark-muted hover:text-white hover:underline"
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
            Start over
          </button>
        )}
      </div>
      <Link
        href="/"
        onClick={onNavigate}
        className="inline-flex items-center gap-2 text-sm font-medium text-on-dark-muted hover:text-white hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to TurboData website
      </Link>
    </div>
  )
}

export function PulseAppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="min-h-screen bg-[#f4f6fa] lg:flex">
      <a
        href="#pulse-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="on-dark hidden w-64 shrink-0 flex-col justify-between bg-navy px-4 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div>
          <Link href="/pulse/assessment" className="block px-2">
            <PulseWordmark dark className="text-lg" />
          </Link>
          <nav aria-label="Pulse" className="mt-8">
            <NavLinks />
          </nav>
        </div>
        <SidebarFooter />
      </aside>

      {/* Mobile top bar */}
      <div className="on-dark sticky top-0 z-40 bg-navy lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/pulse/assessment" onClick={close}>
            <PulseWordmark dark />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="pulse-mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <div id="pulse-mobile-nav" hidden={!open} className="border-t border-navy-line px-4 pb-5 pt-3">
          <nav aria-label="Pulse mobile">
            <NavLinks onNavigate={close} />
          </nav>
          <div className="mt-5 border-t border-navy-line pt-5">
            <SidebarFooter onNavigate={close} />
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <main id="pulse-main" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-8 outline-none sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
