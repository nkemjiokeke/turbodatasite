import { Mail, MapPin } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { Section } from "@/components/site/primitives"
import { site } from "@/lib/site"

export function ContactSection() {
  return (
    <Section id="contact" tone="paper" labelledBy="contact-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <div>
          <h2 id="contact-title" className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Start with a clearer view of the problem.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Tell us what is happening in the business, where decisions feel difficult, and what you want to improve. We
            will help determine whether a diagnostic, analysis, process review, or ongoing support is the right starting
            point.
          </p>
          <ul className="mt-8 space-y-3 text-ink-soft">
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal" />
              <span>
                Prefer email? Write to{" "}
                <a href={`mailto:${site.email}`} className="break-all font-semibold text-brand hover:underline">
                  {site.email}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal" />
              <span>{site.serviceArea}</span>
            </li>
          </ul>
        </div>
        <ContactForm idPrefix="home-contact" />
      </div>
    </Section>
  )
}
