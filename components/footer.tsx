import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail, MapPin } from "lucide-react"
import { mainNav, site } from "@/lib/site"
import { services } from "@/lib/services"

export function Footer() {
  return (
    <footer className="on-dark bg-navy text-on-dark-muted">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image src="/logo-horizontal-white.png" alt="TurboData Analytics" width={365} height={107} className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Business analytics and operations improvement for established Ontario SMEs.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-on-dark">Company</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-on-dark hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="hover:text-on-dark hover:underline">
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-sm font-semibold text-on-dark">Services</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-on-dark hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-on-dark">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-on-dark hover:underline">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {site.location}
                  <br />
                  Remote support across Ontario
                </span>
              </li>
              {site.linkedin && (
                <li className="flex gap-2">
                  <Linkedin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-on-dark hover:underline">
                    LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-line pt-6 text-xs">
          © {new Date().getFullYear()} TurboData Analytics. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
