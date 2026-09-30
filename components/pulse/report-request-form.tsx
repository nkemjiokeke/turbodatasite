"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AlertCircle, Loader2 } from "lucide-react"
import { buttonStyles } from "@/components/site/primitives"
import { cn } from "@/lib/utils"

type Status = "idle" | "submitting" | "emailed" | "downloaded" | "error" | "incomplete"

const inputClass =
  "block w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-[#6b7280] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-destructive"

export function ReportRequestForm({ answers }: { answers: Record<string, string> }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [consent, setConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [website, setWebsite] = useState("")
  const [errors, setErrors] = useState<{ name?: string; email?: string; consent?: string }>({})
  const [status, setStatus] = useState<Status>("idle")
  const [sentTo, setSentTo] = useState("")
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === "emailed" || status === "downloaded" || status === "error" || status === "incomplete") {
      resultRef.current?.focus()
    }
  }, [status])

  function validate() {
    const next: typeof errors = {}
    if (name.trim().length < 2) next.name = "Please enter your name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Please enter a valid business email address."
    if (!consent) next.consent = "Please confirm you agree to receive your report by email."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus("submitting")
    try {
      const res = await fetch("/api/pulse-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          businessName: businessName.trim(),
          consent,
          marketingConsent,
          answers,
          website,
        }),
      })

      if ((res.headers.get("Content-Type") || "").includes("application/pdf")) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "turbodata-business-performance-report.pdf"
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        setStatus("downloaded")
        return
      }

      const json = await res.json().catch(() => ({}))
      if (res.ok && json.ok) {
        setSentTo(json.email || email)
        setStatus("emailed")
      } else if (json.error === "incomplete") {
        setStatus("incomplete")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "emailed") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-xl border border-line bg-white p-8 text-center outline-none">
        <h2 className="text-xl font-bold text-ink">Your detailed report has been sent to your email.</h2>
        <p className="mt-2 text-ink-soft">
          We sent it to {sentTo}. Please check your inbox and junk folder if you do not see it shortly.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-medium text-brand hover:underline">
          Return to TurboData
        </Link>
      </div>
    )
  }

  if (status === "downloaded") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-xl border border-line bg-white p-8 text-center outline-none">
        <h2 className="text-xl font-bold text-ink">Your report has been downloaded.</h2>
        <p className="mt-2 text-ink-soft">
          Email delivery is not yet configured for this site, so your report was downloaded directly to your device
          instead of being emailed.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-medium text-brand hover:underline">
          Return to TurboData
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-xl border border-line bg-white p-6 sm:p-8">
      <h2 className="text-xl font-bold text-ink">Your assessment is complete.</h2>
      <p className="mt-2 text-ink-soft">Enter your details and we will send your business performance report by email.</p>

      {(status === "error" || status === "incomplete") && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-lg border border-destructive/40 bg-[#fdf2f1] p-4 text-sm text-ink outline-none"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p>
            {status === "incomplete"
              ? "Please complete every question in the assessment before requesting your report."
              : "Sorry, we could not send your report. Please try again in a moment."}
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="report-name" className="block text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="report-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            className={cn(inputClass, "mt-2")}
          />
          {errors.name && <p className="mt-1.5 text-sm text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="report-email" className="block text-sm font-semibold text-ink">
            Business email
          </label>
          <input
            id="report-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            className={cn(inputClass, "mt-2")}
          />
          {errors.email && <p className="mt-1.5 text-sm text-destructive">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="report-business" className="block text-sm font-semibold text-ink">
            Business name <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input id="report-business" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className={cn(inputClass, "mt-2")} />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="report-website">Leave this field empty</label>
        <input id="report-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className="mt-5 space-y-3">
        <label className="flex items-start gap-2.5 text-sm text-ink">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            className="mt-0.5 h-4 w-4 accent-[#0056d2]"
          />
          I agree to receive my TurboData assessment report at the email address provided.
        </label>
        {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

        <label className="flex items-start gap-2.5 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#0056d2]"
          />
          I would also like to receive occasional updates from TurboData Analytics. (optional)
        </label>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink-soft">
        Please do not submit passwords, banking information, customer lists, employee records, or other sensitive
        personal information.
      </p>

      <button type="submit" disabled={status === "submitting"} className={buttonStyles("primary", "mt-6 disabled:opacity-70")}>
        {status === "submitting" && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {status === "submitting" ? "Sending…" : "Send my report"}
      </button>
    </form>
  )
}
