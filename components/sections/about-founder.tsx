import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/site/primitives"

export function AboutFounder() {
  return (
    <Section tone="paper" labelledBy="founder-title">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
        <Image
          src="/founder.png"
          alt="Nkemjika (Jude) Okeke, founder of TurboData Analytics"
          width={420}
          height={560}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 80vw"
          loading="lazy"
          className="mx-auto aspect-[3/4] w-full max-w-[320px] rounded-xl object-cover lg:max-w-none"
        />
        <div>
          <p className="mb-3 text-sm font-semibold tracking-wide text-teal">About TurboData</p>
          <h2 id="founder-title" className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Analytics that connect the numbers to the way the business actually works.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            TurboData combines business analysis, financial thinking, operational observation, and practical data work.
            The goal is not to produce more reports. It is to help business leaders understand what the numbers are
            saying and decide what to do next.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            TurboData was founded by Nkemjika (Jude) Okeke, a business analyst with experience across logistics,
            manufacturing, banking, and consumer goods, an MBA, and training in financial modelling.
          </p>
          <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
            About TurboData and its founder
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  )
}
