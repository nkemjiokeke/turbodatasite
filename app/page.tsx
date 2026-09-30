import type { Metadata } from "next"
import { PageShell } from "@/components/site/page-shell"
import { pageMetadata } from "@/lib/seo"
import { Hero } from "@/components/sections/hero"
import { Problems } from "@/components/sections/problems"
import { Outcomes } from "@/components/sections/outcomes"
import { Services } from "@/components/sections/services"
import { WhoWeHelp } from "@/components/sections/who-we-help"
import { HowItWorks } from "@/components/sections/how-it-works"
import { WhatToExpect } from "@/components/sections/what-to-expect"
import { AboutFounder } from "@/components/sections/about-founder"
import { Pulse } from "@/components/sections/pulse"
import { ContactSection } from "@/components/sections/contact-section"

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Business Analytics Consulting for Ontario SMEs",
    description:
      "TurboData helps Ontario SMEs uncover profit leaks, improve inefficient processes, analyse business performance, and make better operating decisions.",
    path: "/",
    socialTitle: "TurboData Analytics | Find the profit hidden inside your business",
  }),
  title: { absolute: "Business Analytics Consulting for Ontario SMEs | TurboData Analytics" },
}

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Problems />
      <Outcomes />
      <Services />
      <WhoWeHelp />
      <HowItWorks />
      <WhatToExpect />
      <AboutFounder />
      <Pulse />
      <ContactSection />
    </PageShell>
  )
}
