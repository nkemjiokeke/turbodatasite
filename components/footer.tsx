import Link from "next/link"
import { Linkedin } from "lucide-react"

function TurboDataLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Logo icon - three ascending bars */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="20" width="8" height="10" rx="2" fill="#00C8FF" />
        <rect x="12" y="12" width="8" height="18" rx="2" fill="#00C8FF" />
        <rect x="22" y="4" width="8" height="26" rx="2" fill="#6B2FD9" />
      </svg>
      {/* Wordmark */}
      <span className="text-lg font-bold">
        <span className="text-cyan-accent">Turbo</span>
        <span className="text-purple-accent">Data</span>
      </span>
    </div>
  )
}

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/impact", label: "Impact" },
  { href: "/#resources", label: "Resources" },
  { href: "/#contact", label: "Book a Call" },
  { href: "#", label: "Privacy Policy" },
]

export function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo & Tagline */}
          <div>
            <TurboDataLogo />
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-xs">
              We find the money your business is leaving on the table.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-sm text-primary-foreground/70 md:text-right">
            <p>turbodata.co</p>
            <p className="mt-1">Sarnia, Ontario, Canada</p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-primary-foreground/70 hover:text-cyan-accent transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-dark-border">
          <p className="text-xs text-center text-primary-foreground/50">
            © 2025 TurboData Analytics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
