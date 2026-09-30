import { NextResponse } from "next/server"
import { pulseReportSchema } from "@/lib/pulse-report"
import { buildPulseReport, totalQuestionCount } from "@/lib/pulse-scoring"
import { generatePulseReportPdf } from "@/lib/pulse-pdf"

export const runtime = "nodejs"

// Best-effort rate limit, matching the contact form's approach: each serverless
// instance keeps its own map, so this slows down bursts rather than guaranteeing a hard cap.
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

  const parsed = pulseReportSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid", fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const data = parsed.data

  // Honeypot filled: accept silently, generate and send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true, email: data.email })
  }

  if (Object.keys(data.answers).length < totalQuestionCount) {
    return NextResponse.json({ ok: false, error: "incomplete" }, { status: 400 })
  }

  // Recalculated here, server-side, from the raw answers — the client never sends scores.
  const report = buildPulseReport(data.answers)

  let pdfBytes: Uint8Array
  try {
    pdfBytes = await generatePulseReportPdf({
      name: data.name,
      businessName: data.businessName || undefined,
      date: new Date(),
      report,
    })
  } catch (err) {
    console.error("Pulse report: PDF generation failed", err)
    return NextResponse.json({ ok: false, error: "generation_failed" }, { status: 500 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL || "TurboData Website <onboarding@resend.dev>"

  if (!apiKey) {
    console.error("Pulse report: RESEND_API_KEY is not set. Returning the PDF as a direct download instead of emailing it.")
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="turbodata-business-performance-report.pdf"',
        "X-Pulse-Report-Mode": "download",
      },
    })
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [data.email],
        subject: "Your TurboData business performance report",
        text: [
          `Hello ${data.name},`,
          "",
          "Thank you for completing the TurboData business performance assessment.",
          "",
          "Your report is attached. It provides a simple summary of the areas that may deserve attention and practical next steps to consider.",
          "",
          "If you would like to discuss the report, you can contact TurboData Analytics through the website.",
          "",
          "Regards,",
          "TurboData Analytics",
        ].join("\n"),
        attachments: [
          {
            filename: "turbodata-business-performance-report.pdf",
            content: Buffer.from(pdfBytes).toString("base64"),
          },
        ],
      }),
    })
    if (!res.ok) {
      console.error("Pulse report: Resend returned", res.status, await res.text())
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
    }
  } catch (err) {
    console.error("Pulse report: request to Resend failed", err)
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true, email: data.email })
}
