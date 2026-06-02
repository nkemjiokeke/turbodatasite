"use client"

import Link from "next/link"
import { Linkedin } from "lucide-react"

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#impact", label: "Impact" },
  { href: "/#resources", label: "Resources" },
  { href: "/#contact", label: "Book a Call" },
  { href: "/privacy", label: "Privacy Policy" },
]

export function Footer() {
  return (
    <footer className="bg-[#08102B] border-t border-[#1C2E5A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <img src="/logo-white.png" alt="TurboData Analytics" style={{height: '54px', width: 'auto'}} />
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              We find the money your business is leaving on the table.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-sm text-white/70 md:text-right">
            <p>turbodata.co</p>
            <p className="mt-1">Sarnia, Ontario, Canada</p>
            <div className="mt-3 flex md:justify-end">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#1C2E5A] text-center text-xs text-white/40">
          © 2025 TurboData Analytics. All rights reserved.
        </div>
      </div>
    </footer>
  )
}