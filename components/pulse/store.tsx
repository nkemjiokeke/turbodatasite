"use client"

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { totalQuestionCount } from "@/lib/pulse-scoring"

// Assessment state is persisted to sessionStorage so it survives a reload within
// the same browser tab, and clears automatically when the tab closes.
const STORAGE_KEY = "turbodata-pulse-state"

type Snapshot = {
  answers: Record<string, string>
  step: number
  completed: boolean
}

const defaultSnapshot: Snapshot = { answers: {}, step: 0, completed: false }

function readStoredSnapshot(): Snapshot | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Snapshot> | null
    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.answers &&
      typeof parsed.answers === "object" &&
      typeof parsed.step === "number" &&
      typeof parsed.completed === "boolean"
    ) {
      return { answers: parsed.answers, step: parsed.step, completed: parsed.completed }
    }
    return null
  } catch {
    return null
  }
}

function writeStoredSnapshot(snapshot: Snapshot) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  } catch {
    // Ignore write failures (private browsing, storage disabled, storage full).
  }
}

function clearStoredSnapshot() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore.
  }
}

type PulseState = {
  answers: Record<string, string>
  setAnswer: (questionId: string, option: string) => void
  step: number
  setStep: (step: number) => void
  completed: boolean
  setCompleted: (done: boolean) => void
  progress: number
  resetAll: () => void
}

const PulseContext = createContext<PulseState | null>(null)

export function PulseProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, string>>(defaultSnapshot.answers)
  const [step, setStep] = useState(defaultSnapshot.step)
  const [completed, setCompleted] = useState(defaultSnapshot.completed)
  const hydratedRef = useRef(false)

  // Load any saved state once after mount, so the first client render matches
  // the server render and there is no hydration mismatch.
  useEffect(() => {
    const stored = readStoredSnapshot()
    if (stored) {
      /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from sessionStorage after mount, needed to avoid an SSR/CSR mismatch */
      setAnswers(stored.answers)
      setStep(stored.step)
      setCompleted(stored.completed)
      /* eslint-enable react-hooks/set-state-in-effect */
    }
    hydratedRef.current = true
  }, [])

  useEffect(() => {
    if (!hydratedRef.current) return
    writeStoredSnapshot({ answers, step, completed })
  }, [answers, step, completed])

  const value = useMemo<PulseState>(
    () => ({
      answers,
      setAnswer: (questionId, option) => setAnswers((a) => ({ ...a, [questionId]: option })),
      step,
      setStep,
      completed,
      setCompleted,
      progress: completed ? 100 : Math.round((Object.keys(answers).length / totalQuestionCount) * 100),
      resetAll: () => {
        setAnswers(defaultSnapshot.answers)
        setStep(defaultSnapshot.step)
        setCompleted(defaultSnapshot.completed)
        clearStoredSnapshot()
      },
    }),
    [answers, step, completed],
  )

  return <PulseContext.Provider value={value}>{children}</PulseContext.Provider>
}

export function usePulse() {
  const ctx = useContext(PulseContext)
  if (!ctx) throw new Error("usePulse must be used inside PulseProvider")
  return ctx
}
