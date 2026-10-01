import Image from "next/image"
import { MapPin } from "lucide-react"
import { ButtonLink, Container } from "@/components/site/primitives"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line bg-paper">
      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-semibold tracking-wide text-brand">
              Business analytics and operations improvement for Ontario SMEs
            </p>
            <h1 id="hero-title" className="text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-[3.5rem]">
              Find the profit hidden inside your business.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              TurboData helps established businesses uncover margin leaks, fix inefficient processes, and make better
              operating decisions using the data they already have.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.primaryCta.href}>{site.primaryCta.label}</ButtonLink>
              <ButtonLink href="/#services" variant="secondary">
                See How We Help
              </ButtonLink>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-ink-soft">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              {site.serviceArea}
            </p>
          </div>
          <div className="relative mx-auto aspect-[1597/985] w-full max-w-md overflow-hidden rounded-xl border border-line bg-white lg:max-w-none">
            <Image
              src="/hero-home-page.png"
              alt="Illustration of work flowing through a business from customer request to quote, scheduling, delivery, and invoicing, ending in business growth."
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              priority
              className="object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
