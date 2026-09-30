import { z } from "zod"
import { sectors } from "@/lib/sectors"

export const industryOptions = [...sectors.map((s) => s.name), "Other"]

export const sizeOptions = ["1–4 employees", "5–19 employees", "20–49 employees", "50–100 employees", "More than 100 employees"]

export const challengeOptions = [
  "Unclear profitability",
  "Inefficient workflows or processes",
  "Rising operating costs",
  "Reporting and visibility",
  "Automation opportunities",
  "Ongoing analytics or operations support",
  "Updates on TurboData Pulse",
  "Something else",
]

export const contactMethodOptions = ["Email", "Phone call", "Video call"]

const oneOf = (options: string[], message: string) =>
  z.string().refine((v) => options.includes(v), { message })

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please keep your name under 100 characters."),
  businessName: z.string().trim().min(2, "Please enter your business name.").max(150, "Please keep this under 150 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(40, "Please keep the phone number under 40 characters.")
    .regex(/^[0-9+().\-\s]*$/, "Please use digits and + ( ) - only.")
    .optional()
    .default(""),
  industry: oneOf(industryOptions, "Please choose an industry."),
  companySize: oneOf(sizeOptions, "Please choose an approximate company size."),
  challenge: oneOf(challengeOptions, "Please choose your main challenge."),
  contactMethod: oneOf(contactMethodOptions, "Please choose how you would like us to contact you."),
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters.").optional().default(""),
  // Spam protection: hidden field that people never fill in, and time the form was rendered.
  website: z.string().optional().default(""),
  startedAt: z.number().optional(),
})
  .superRefine((data, ctx) => {
    if (data.contactMethod === "Phone call" && data.phone.replace(/\D/g, "").length < 7) {
      ctx.addIssue({ path: ["phone"], code: z.ZodIssueCode.custom, message: "Please add a phone number so we can call you." })
    }
  })

export type ContactInput = z.input<typeof contactSchema>
export type ContactData = z.output<typeof contactSchema>
