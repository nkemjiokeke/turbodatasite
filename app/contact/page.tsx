import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MapPin, Video } from "lucide-react"
import { PageHero, PageShell } from "@/components/site/page-shell"
import { Section } from "@/components/site/primitives"
import { ContactForm } from "@/components/contact-form"
import { site } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Contact: Book a Profit Leak Audit",
  description:
    "Contact TurboData Analytics in Sarnia-Lambton about profitability, operations, reporting, or process improvement for your Ontario business. Remote support available.",
  path: "/contact",
})

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  // Pre-select a topic when arriving from a specific call to action, e.g. /contact?topic=pulse
  const { topic } = await searchParams
  const initialChallenge = topic === "pulse" ? "Updates on TurboData Pulse" : ""

  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Book a Profit Leak Audit"
        intro="Tell us what is happening in the business, where decisions feel difficult, and what you want to improve. We will use a short conversation to understand the problem and suggest whether a diagnostic, analysis, process review, or ongoing support is the right starting point."
      />
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-ink">Send an enquiry</h2>
            <ContactForm idPrefix="contact-page" initialChallenge={initialChallenge} />
          </div>
          <aside aria-labelledby="details-title" className="space-y-8">
            <div>
              <h2 id="details-title" className="text-2xl font-bold text-ink">
                Contact details
              </h2>
              <ul className="mt-5 space-y-4 text-ink-soft">
                <li className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold text-ink">Email</span>
                    <a href={`mailto:${site.email}`} className="break-all text-brand hover:underline">
                      {site.email}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold text-ink">Based in</span>
                    {site.location}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Video aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
                  <span>
                    <span className="block font-semibold text-ink">Service area</span>
                    On-site support in Sarnia-Lambton. Remote support for businesses elsewhere in Ontario.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-paper p-6">
              <h2 className="text-lg font-bold text-ink">What happens next</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-ink-soft">
                <li>We read your enquiry and reply by your preferred contact method.</li>
                <li>We arrange a short conversation to understand the problem.</li>
                <li>If there is a good fit, we suggest a starting point and scope. There is no obligation to proceed.</li>
              </ol>
            </div>
            <div className="rounded-xl border border-line p-6">
              <h2 className="text-lg font-bold text-ink">About your information</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Information you send is used only to respond to your enquiry. Please do not submit confidential personal
                information or passwords through this form.{" "}
                <Link href="/privacy" className="font-semibold text-brand hover:underline">
                  Read the privacy notice
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </PageShell>
  )
}
