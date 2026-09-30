import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact"

export const runtime = "nodejs"

// Best-effort rate limit. On serverless hosting each instance keeps its own map,
// so this slows down bursts from one address rather than guaranteeing a hard cap.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const data = parsed.data

  // Honeypot filled, or submitted faster than a person could: accept silently, send nothing.
  if (data.website || (data.startedAt && Date.now() - data.startedAt < 3000)) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || "TurboData Website <onboarding@resend.dev>"

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.")
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 })
  }

  const text = [
    "New enquiry from turbodata.co",
    "",
    `Name: ${data.name}`,
    `Business: ${data.businessName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Industry: ${data.industry}`,
    `Company size: ${data.companySize}`,
    `Main challenge: ${data.challenge}`,
    `Preferred contact method: ${data.contactMethod}`,
    "",
    "Message:",
    data.message || "(none)",
  ].join("\n")

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject: `Website enquiry: ${data.challenge} (${data.businessName})`.slice(0, 200),
        text,
      }),
    })
    if (!res.ok) {
      console.error("Contact form: Resend returned", res.status, await res.text())
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
    }
  } catch (err) {
    console.error("Contact form: request to Resend failed", err)
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
