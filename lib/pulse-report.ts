import { z } from "zod"

export const pulseReportSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Please keep your name under 100 characters."),
  email: z.string().trim().email("Please enter a valid business email address.").max(200),
  businessName: z.string().trim().max(150, "Please keep this under 150 characters.").optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you agree to receive your report by email." }),
  }),
  marketingConsent: z.boolean().optional().default(false),
  answers: z.record(z.string(), z.string()),
  // Spam protection: hidden field that people never fill in.
  website: z.string().optional().default(""),
})

export type PulseReportInput = z.input<typeof pulseReportSchema>
export type PulseReportFormData = z.output<typeof pulseReportSchema>
