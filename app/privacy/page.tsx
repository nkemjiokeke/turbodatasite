import type { Metadata } from "next"
import { PageHero, PageShell } from "@/components/site/page-shell"
import { Section } from "@/components/site/primitives"
import { site } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How TurboData Analytics handles information submitted through this website.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero title="Privacy" intro="How information submitted through this website is handled." />
      <Section tone="white">
        <div className="prose-td max-w-3xl">
          <h2>Information you send us</h2>
          <p>
            When you submit the enquiry form, we receive the details you enter: your name, business name, business
            email, optional phone number, industry, approximate company size, main challenge, preferred contact method,
            and any message. The form is delivered to TurboData by email through an email delivery service.
          </p>
          <p>
            We use this information only to respond to your enquiry and to discuss whether TurboData can help. We do
            not sell it.
          </p>
          <h2>Please do not send sensitive information</h2>
          <p>
            This website is not a secure data portal. Please do not submit passwords, banking information, customer
            lists, employee records, or other sensitive personal information through the website. If an engagement goes
            ahead, we agree separately what information is needed and how it will be shared, and we prefer summary or
            anonymised information wherever possible.
          </p>
          <h2>Website analytics</h2>
          <p>
            This website uses Vercel Web Analytics to count page views in aggregate. It is designed not to use cookies
            and does not identify individual visitors.
          </p>
          <h2>Contact</h2>
          <p>
            To ask about or request deletion of information you have sent us, email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand hover:underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </PageShell>
  )
}
