import "server-only"
import fs from "node:fs/promises"
import path from "node:path"
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb, type RGB } from "pdf-lib"
import { categoryContent } from "@/lib/pulse"
import type { PulseReportData } from "@/lib/pulse-scoring"
import { site } from "@/lib/site"

const NAVY = rgb(0x0b / 255, 0x1d / 255, 0x33 / 255)
const YELLOW = rgb(0xf2 / 255, 0xb0 / 255, 0x1e / 255)
const INK = rgb(0x0f / 255, 0x1b / 255, 0x2d / 255)
const INK_SOFT = rgb(0x3d / 255, 0x4a / 255, 0x5c / 255)
const LINE = rgb(0xdd / 255, 0xe1 / 255, 0xe8 / 255)

const PAGE_WIDTH = 595.28 // A4, points
const PAGE_HEIGHT = 841.89
const MARGIN = 56
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const FOOTER_Y = 34

class PdfWriter {
  private constructor(
    public doc: PDFDocument,
    public font: PDFFont,
    public bold: PDFFont,
  ) {
    this.page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
    this.pages.push(this.page)
    this.y = PAGE_HEIGHT - MARGIN
  }

  page: PDFPage
  pages: PDFPage[] = []
  y: number

  static async create() {
    const doc = await PDFDocument.create()
    doc.setTitle("TurboData Business Performance Report")
    doc.setAuthor("TurboData Analytics")
    const font = await doc.embedFont(StandardFonts.Helvetica)
    const bold = await doc.embedFont(StandardFonts.HelveticaBold)
    return new PdfWriter(doc, font, bold)
  }

  newPage() {
    this.page = this.doc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
    this.pages.push(this.page)
    this.y = PAGE_HEIGHT - MARGIN
  }

  private ensureSpace(height: number) {
    if (this.y - height < MARGIN + 24) this.newPage()
  }

  private wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
    const words = text.split(/\s+/).filter(Boolean)
    const lines: string[] = []
    let line = ""
    for (const word of words) {
      const test = line ? `${line} ${word}` : word
      if (line && font.widthOfTextAtSize(test, size) > maxWidth) {
        lines.push(line)
        line = word
      } else {
        line = test
      }
    }
    if (line) lines.push(line)
    return lines
  }

  heading(text: string) {
    this.ensureSpace(40)
    this.y -= 4
    this.page.drawText(text, { x: MARGIN, y: this.y - 16, size: 16, font: this.bold, color: NAVY })
    this.y -= 24
    this.page.drawRectangle({ x: MARGIN, y: this.y, width: 40, height: 3, color: YELLOW })
    this.y -= 16
  }

  subheading(text: string) {
    this.ensureSpace(22)
    this.page.drawText(text, { x: MARGIN, y: this.y - 12, size: 12, font: this.bold, color: NAVY })
    this.y -= 22
  }

  label(text: string) {
    this.ensureSpace(16)
    this.page.drawText(text.toUpperCase(), { x: MARGIN, y: this.y - 9, size: 8.5, font: this.bold, color: INK_SOFT })
    this.y -= 16
  }

  body(text: string, opts: { size?: number; color?: RGB; bold?: boolean } = {}) {
    const size = opts.size ?? 10.5
    const color = opts.color ?? INK_SOFT
    const font = opts.bold ? this.bold : this.font
    const lines = this.wrapText(text, font, size, CONTENT_WIDTH)
    for (const line of lines) {
      this.ensureSpace(size + 4)
      this.page.drawText(line, { x: MARGIN, y: this.y - size, size, font, color })
      this.y -= size + 5
    }
    this.y -= 6
  }

  bullet(text: string, opts: { size?: number } = {}) {
    const size = opts.size ?? 10.5
    const indent = 14
    const lines = this.wrapText(text, this.font, size, CONTENT_WIDTH - indent)
    lines.forEach((line, i) => {
      this.ensureSpace(size + 4)
      if (i === 0) this.page.drawText("–", { x: MARGIN, y: this.y - size, size, font: this.font, color: INK_SOFT })
      this.page.drawText(line, { x: MARGIN + indent, y: this.y - size, size, font: this.font, color: INK_SOFT })
      this.y -= size + 4
    })
    this.y -= 4
  }

  rule() {
    this.ensureSpace(14)
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: PAGE_WIDTH - MARGIN, y: this.y },
      thickness: 0.75,
      color: LINE,
    })
    this.y -= 16
  }

  spacer(height = 10) {
    this.y -= height
  }

  async finish() {
    const total = this.pages.length
    this.pages.forEach((p, i) => {
      p.drawLine({
        start: { x: MARGIN, y: FOOTER_Y + 12 },
        end: { x: PAGE_WIDTH - MARGIN, y: FOOTER_Y + 12 },
        thickness: 0.5,
        color: LINE,
      })
      p.drawText("TurboData Analytics", { x: MARGIN, y: FOOTER_Y, size: 8, font: this.font, color: INK_SOFT })
      const pageLabel = `Page ${i + 1} of ${total}`
      const width = this.font.widthOfTextAtSize(pageLabel, 8)
      p.drawText(pageLabel, { x: PAGE_WIDTH - MARGIN - width, y: FOOTER_Y, size: 8, font: this.font, color: INK_SOFT })
    })
    return this.doc.save()
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
}

export async function generatePulseReportPdf(input: {
  name: string
  businessName?: string
  date: Date
  report: PulseReportData
}): Promise<Uint8Array> {
  const w = await PdfWriter.create()

  // Cover page
  try {
    const logoBytes = await fs.readFile(path.join(process.cwd(), "public", "logo-horizontal.png"))
    const logoImage = await w.doc.embedPng(logoBytes)
    const scale = 130 / logoImage.width
    const dims = { width: logoImage.width * scale, height: logoImage.height * scale }
    w.page.drawImage(logoImage, { x: MARGIN, y: PAGE_HEIGHT - MARGIN - dims.height, width: dims.width, height: dims.height })
    w.y = PAGE_HEIGHT - MARGIN - dims.height - 50
  } catch {
    w.page.drawText("TurboData Analytics", { x: MARGIN, y: PAGE_HEIGHT - MARGIN - 20, size: 18, font: w.bold, color: NAVY })
    w.y = PAGE_HEIGHT - MARGIN - 80
  }

  w.page.drawRectangle({ x: MARGIN, y: w.y, width: 60, height: 4, color: YELLOW })
  w.y -= 22
  w.page.drawText("Business Performance Report", { x: MARGIN, y: w.y, size: 24, font: w.bold, color: NAVY })
  w.y -= 70

  w.label("Prepared for")
  w.body(input.name, { size: 13, color: INK })
  w.spacer(6)
  if (input.businessName) {
    w.label("Business")
    w.body(input.businessName, { size: 13, color: INK })
    w.spacer(6)
  }
  w.label("Date")
  w.body(formatDate(input.date), { size: 13, color: INK })

  // Executive summary
  w.newPage()
  w.heading("Your report at a glance")
  w.body(input.report.overallInterpretation)
  for (const area of input.report.topAreas) {
    const content = categoryContent[area.category]
    const tier = area.tier ?? "developing"
    w.subheading(area.category)
    w.body(content.tiers[tier].whatAnswersSuggest)
  }
  w.body("This report is a starting point for discussion, and does not guarantee a specific financial result.", { size: 9.5 })

  // Category breakdown
  w.heading("Category breakdown")
  for (const cs of input.report.categoryScores) {
    const content = categoryContent[cs.category]
    const tier = cs.tier ?? "developing"
    w.subheading(cs.category)
    w.body(content.explanation)
    w.body(content.tiers[tier].whatAnswersSuggest)
    w.body(`Why it matters: ${content.whyItMatters}`)
    w.body(`Practical next step: ${content.tiers[tier].firstStep}`)
    w.rule()
  }

  // Top three findings
  w.heading("Top three findings")
  if (input.report.topAreas.length === 0) {
    w.body("There was not enough information in the answers provided to identify priority findings.")
  }
  for (const area of input.report.topAreas) {
    const content = categoryContent[area.category]
    const tier = area.tier ?? "developing"
    w.subheading(area.category)
    w.body(content.tiers[tier].whatAnswersSuggest)
    w.body(`Why it may matter: ${content.whyItMatters}`)
    w.body(`What to examine next: ${content.examineNext}`)
    w.body(`Suggested first step: ${content.tiers[tier].firstStep}`)
    w.rule()
  }

  // Process improvement opportunities
  w.heading("Process-improvement opportunities")
  for (const area of input.report.topAreas) {
    w.bullet(`${area.category}: ${categoryContent[area.category].processImprovementNote}`)
  }

  // Automation opportunities
  w.spacer(6)
  w.heading("Automation opportunities")
  for (const area of input.report.topAreas) {
    w.bullet(`${area.category}: ${categoryContent[area.category].automationNote}`)
  }

  // Recommended next steps
  w.spacer(6)
  w.heading("Recommended next steps")
  input.report.recommendedActions.forEach((action, i) => {
    w.subheading(`${i + 1}. ${action.title}`)
    w.body(`Why it may help: ${action.why}`)
    w.body(`Practical first step: ${action.firstStep}`)
  })

  // 30-day action plan
  w.heading("A practical 30-day plan")
  input.report.planItems.forEach((item) => {
    w.bullet(`${item.timeframe}: ${item.action}`)
  })

  // Closing
  w.heading("Want to discuss what this means for your business?")
  w.body(
    "TurboData Analytics helps SMEs understand business performance, improve workflows, and make better operating decisions.",
  )
  w.body(`Email: ${site.email}`)
  w.body(`Website: ${site.url}`)

  return w.finish()
}
