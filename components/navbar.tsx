"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

function TurboDataLogo() {
  return (
    <Link href="/" className="flex items-center">
      <img src="/logo-colour.png" alt="TurboData Analytics" style={{height: '72px', width: 'auto'}} />
    </Link>
  )
}

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#impact", label: "Impact" },
  { href: "/#resources", label: "Resources" },
  { href: "/#contact", label: "Book a Call" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-white"} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <TurboDataLogo />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Get Free Audit
            </Link>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-sm font-medium text-gray-600 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="block mt-4 bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Free Audit
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}