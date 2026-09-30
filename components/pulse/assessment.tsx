"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react"
import { usePulse } from "@/components/pulse/store"
import { ProgressBar } from "@/components/pulse/ui"
import { buttonStyles } from "@/components/site/primitives"
import { assessmentSections } from "@/lib/pulse"
import { cn } from "@/lib/utils"

export function Assessment() {
  const { answers, setAnswer, step, setStep, completed, setCompleted } = usePulse()
  const [showError, setShowError] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const firstRender = useRef(true)

  const section = assessmentSections[step]
  const total = assessmentSections.length
  const percent = completed ? 100 : Math.round((step / total) * 100)

  // Move focus to the new section heading when the step changes (not on first load)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step, completed])

  useEffect(() => {
    if (showError) errorRef.current?.focus()
  }, [showError])

  function next() {
    const missing = section.questions.some((q) => !answers[q.id])
    if (missing) {
      setShowError(true)
      return
    }
    setShowError(false)
    if (step < total - 1) setStep(step + 1)
    else setCompleted(true)
  }

  function back() {
    setShowError(false)
    if (step > 0) setStep(step - 1)
  }

  function restart() {
    setCompleted(false)
    setStep(0)
  }

  if (completed) {
    return (
      <div className="rounded-xl border border-line bg-white p-8 text-center shadow-[0_1px_3px_rgba(15,27,45,0.06)] sm:p-12">
        <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-brand" />
        <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-3xl font-bold text-ink outline-none">
          Assessment complete
        </h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-soft">
          Thank you for completing the assessment. Your findings are ready to review.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/pulse/findings" className={buttonStyles("primary")}>
            View your findings
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <button type="button" onClick={restart} className={buttonStyles("secondary")}>
            Review my answers
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="rounded-xl border border-line bg-white p-6 shadow-[0_1px_3px_rgba(15,27,45,0.06)] sm:p-8">
        <div className="flex items-center justify-between gap-4 text-sm text-ink-soft">
          <span>
            Section {step + 1} of {total}
          </span>
          <span>{percent}% complete</span>
        </div>
        <div className="mt-2">
          <ProgressBar value={percent} label="Assessment progress" />
        </div>

        <ol aria-label="Assessment sections" className="mt-5 hidden flex-wrap gap-2 sm:flex">
          {assessmentSections.map((s, i) => (
            <li
              key={s.id}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                i === step
                  ? "border-brand bg-brand-soft text-[#0a3f94]"
                  : i < step
                    ? "border-[#bcd3f5] bg-brand-soft text-[#0a3f94]"
                    : "border-line text-ink-soft",
              )}
            >
              {i < step && <span className="sr-only">Completed: </span>}
              {s.title}
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm font-semibold text-brand">Business Performance Assessment</p>
        <h1 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold text-ink outline-none sm:text-3xl">
          {section.title}
        </h1>
        <p className="mt-2 text-ink-soft">{section.intro}</p>

        {showError && (
          <p ref={errorRef} tabIndex={-1} role="alert" className="mt-6 rounded-lg border border-[#f2c1bb] bg-[#fdecea] p-3 text-sm font-medium text-[#9b1c13] outline-none">
            Please answer each question in this section before continuing.
          </p>
        )}

        <div className="mt-6 space-y-8">
          {section.questions.map((q) => {
            const missing = showError && !answers[q.id]
            return (
              <fieldset key={q.id} aria-invalid={missing || undefined}>
                <legend className="text-lg font-semibold text-ink">{q.text}</legend>
                {missing && <p className="mt-1 text-sm text-[#9b1c13]">Please choose an option.</p>}
                <div className="mt-3 space-y-2">
                  {q.options.map((opt) => {
                    const id = `${q.id}-${opt.label}`.replace(/[^a-zA-Z0-9-]/g, "")
                    const checked = answers[q.id] === opt.label
                    return (
                      <label
                        key={opt.label}
                        htmlFor={id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors",
                          checked ? "border-brand bg-brand-soft" : "border-line hover:border-ink/30",
                        )}
                      >
                        <input
                          id={id}
                          type="radio"
                          name={q.id}
                          value={opt.label}
                          checked={checked}
                          onChange={() => setAnswer(q.id, opt.label)}
                          className="h-4 w-4 accent-[#0056d2]"
                        />
                        <span className="text-ink">{opt.label}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={back} disabled={step === 0} className={buttonStyles("secondary", "disabled:cursor-not-allowed disabled:opacity-50")}>
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back
            </button>
            <Link href="/pulse" className={buttonStyles("secondary")}>
              Save and exit
            </Link>
          </div>
          <button type="button" onClick={next} className={buttonStyles("primary")}>
            {step === total - 1 ? "Save and finish" : "Save and continue"}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <aside className="h-fit rounded-xl border border-[#bcd3f5] bg-brand-soft p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <Lightbulb aria-hidden="true" className="h-4 w-4 text-brand" />
          Why we ask this
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          These questions help focus on the areas that will make the biggest difference to the business. Answers are
          kept in this browser tab only.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Please do not enter confidential or personal information. This assessment only asks multiple-choice questions.
        </p>
      </aside>
    </div>
  )
}
