"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import {
  challengeOptions,
  contactMethodOptions,
  contactSchema,
  industryOptions,
  sizeOptions,
  type ContactInput,
} from "@/lib/contact"
import { site } from "@/lib/site"
import { buttonStyles } from "@/components/site/primitives"
import { cn } from "@/lib/utils"

type Field = Exclude<keyof ContactInput, "website" | "startedAt">
type Errors = Partial<Record<Field, string>>
type Status = "idle" | "submitting" | "success" | "error" | "not_configured"

const empty = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  industry: "",
  companySize: "",
  challenge: "",
  contactMethod: "",
  message: "",
  website: "",
}

const inputClass =
  "block w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-[#6b7280] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-destructive"

export function ContactForm({ idPrefix = "contact", initialChallenge = "" }: { idPrefix?: string; initialChallenge?: string }) {
  const [values, setValues] = useState({ ...empty, challenge: initialChallenge })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>("idle")
  const startedAt = useRef<number>(0)
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status === "success" || status === "error" || status === "not_configured") resultRef.current?.focus()
  }, [status])

  // Move focus to the error summary after each failed submit attempt
  const [failedAttempts, setFailedAttempts] = useState(0)
  useEffect(() => {
    if (failedAttempts > 0) summaryRef.current?.focus()
  }, [failedAttempts])

  const id = (f: string) => `${idPrefix}-${f}`

  function update(field: keyof typeof empty, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field as Field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const payload = { ...values, startedAt: startedAt.current }
    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      const next: Errors = {}
      for (const [k, v] of Object.entries(fieldErrors)) if (v?.[0]) next[k as Field] = v[0]
      setErrors(next)
      setFailedAttempts((n) => n + 1)
      return
    }

    setErrors({})
    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.ok) {
        setStatus("success")
        setValues(empty)
      } else if (json.error === "not_configured") {
        setStatus("not_configured")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-xl border border-line bg-white p-8 text-center outline-none">
        <CheckCircle2 aria-hidden="true" className="mx-auto h-10 w-10 text-brand" />
        <h3 className="mt-4 text-xl font-bold text-ink">Thank you. Your enquiry has been sent.</h3>
        <p className="mt-2 text-ink-soft">
          We will reply using your preferred contact method to arrange a short conversation.
        </p>
      </div>
    )
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [Field, string][]
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Profit Leak Audit enquiry")}`

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-xl border border-line bg-white p-6 sm:p-8" aria-describedby={id("privacy")}>
      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-6 rounded-lg border border-destructive/40 bg-[#fdf2f1] p-4 text-sm text-destructive outline-none">
          <p className="font-semibold">Please correct the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map(([field, msg]) => (
              <li key={field}>
                <a href={`#${id(field)}`} className="underline">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(status === "error" || status === "not_configured") && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="mb-6 flex gap-3 rounded-lg border border-destructive/40 bg-[#fdf2f1] p-4 text-sm text-ink outline-none">
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p>
            {status === "not_configured"
              ? "Online enquiries are temporarily unavailable."
              : "Sorry, your enquiry could not be sent. Please try again in a moment."}{" "}
            You can also email us directly at{" "}
            <a href={mailto} className="font-semibold text-brand underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" field="name" autoComplete="name" {...{ id, values, errors, update }} />
        <TextField label="Business name" field="businessName" autoComplete="organization" {...{ id, values, errors, update }} />
        <TextField label="Business email" field="email" type="email" autoComplete="email" {...{ id, values, errors, update }} />
        <TextField
          label="Phone"
          field="phone"
          type="tel"
          autoComplete="tel"
          optional
          hint="Needed only if you prefer a phone call."
          {...{ id, values, errors, update }}
        />
        <SelectField label="Industry" field="industry" options={industryOptions} {...{ id, values, errors, update }} />
        <SelectField label="Approximate company size" field="companySize" options={sizeOptions} {...{ id, values, errors, update }} />
        <SelectField label="Main challenge" field="challenge" options={challengeOptions} {...{ id, values, errors, update }} />
        <SelectField label="Preferred contact method" field="contactMethod" options={contactMethodOptions} {...{ id, values, errors, update }} />
      </div>

      <div className="mt-5">
        <label htmlFor={id("message")} className="block text-sm font-semibold text-ink">
          Message <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <p id={id("message-hint")} className="mt-1 text-sm text-ink-soft">
          What is happening in the business, and what would you like to improve?
        </p>
        <textarea
          id={id("message")}
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={cn(id("message-hint"), errors.message && id("message-error"))}
          className={cn(inputClass, "mt-2 resize-y")}
        />
        {errors.message && (
          <p id={id("message-error")} className="mt-1.5 text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input
          id={id("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <p id={id("privacy")} className="mt-6 rounded-lg bg-paper p-4 text-sm leading-relaxed text-ink-soft">
        Please do not submit passwords, banking information, customer lists, employee records, or other sensitive
        personal information through this form.
      </p>

      <button type="submit" disabled={status === "submitting"} className={buttonStyles("primary", "mt-6 w-full sm:w-auto disabled:opacity-70")}>
        {status === "submitting" && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending…" : "Book a Profit Leak Audit"}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {status === "submitting" ? "Sending your enquiry" : ""}
      </p>
    </form>
  )
}

type FieldProps = {
  id: (f: string) => string
  values: typeof empty
  errors: Errors
  update: (field: keyof typeof empty, value: string) => void
  label: string
  field: Field
  optional?: boolean
  hint?: string
}

function Label({ id, field, label, optional }: Pick<FieldProps, "id" | "field" | "label" | "optional">) {
  return (
    <label htmlFor={id(field)} className="block text-sm font-semibold text-ink">
      {label} {optional && <span className="font-normal text-ink-soft">(optional)</span>}
    </label>
  )
}

function TextField({
  id,
  values,
  errors,
  update,
  label,
  field,
  optional,
  hint,
  type = "text",
  autoComplete,
}: FieldProps & { type?: string; autoComplete?: string }) {
  const err = errors[field]
  return (
    <div>
      <Label {...{ id, field, label, optional }} />
      {hint && (
        <p id={id(`${field}-hint`)} className="mt-1 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      <input
        id={id(field)}
        type={type}
        autoComplete={autoComplete}
        required={!optional}
        value={values[field]}
        onChange={(e) => update(field, e.target.value)}
        aria-invalid={err ? true : undefined}
        aria-describedby={cn(hint && id(`${field}-hint`), err && id(`${field}-error`)) || undefined}
        className={cn(inputClass, "mt-2")}
      />
      {err && (
        <p id={id(`${field}-error`)} className="mt-1.5 text-sm text-destructive">
          {err}
        </p>
      )}
    </div>
  )
}

function SelectField({ id, values, errors, update, label, field, options }: FieldProps & { options: string[] }) {
  const err = errors[field]
  return (
    <div>
      <Label {...{ id, field, label }} />
      <select
        id={id(field)}
        required
        value={values[field]}
        onChange={(e) => update(field, e.target.value)}
        aria-invalid={err ? true : undefined}
        aria-describedby={err ? id(`${field}-error`) : undefined}
        className={cn(inputClass, "mt-2")}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {err && (
        <p id={id(`${field}-error`)} className="mt-1.5 text-sm text-destructive">
          {err}
        </p>
      )}
    </div>
  )
}
