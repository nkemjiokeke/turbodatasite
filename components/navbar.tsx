"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

function TurboDataLogo() {
  return (
    <Link href="/" className="flex items-center">
  <img src="/logo-colour.png" alt="TurboData Analytics" style={{height: '122px', width: 'auto'}} />
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
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return

    const sections = ["services", "impact", "resources", "contact"]
    const observers: IntersectionObserver[] = []

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId)
              }
            })
          },
          { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
        )
        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [pathname])

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <TurboDataLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={`text-[15px] font-medium transition-colors hover:text-primary-blue ${
                  activeSection === link.href.replace("/#", "")
                    ? "text-primary-blue"
                    : "text-near-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/#lead-magnet"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-primary-blue text-primary-foreground font-bold text-sm rounded-full hover:bg-primary-blue-hover transition-colors"
          >
            Get Free Audit
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-near-black"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-background z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className={`text-lg font-medium py-2 ${
                activeSection === link.href.replace("/#", "")
                  ? "text-primary-blue"
                  : "text-near-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#lead-magnet"
            onClick={handleNavClick}
            className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-primary-blue text-primary-foreground font-bold text-base rounded-full hover:bg-primary-blue-hover transition-colors"
          >
            Get Free Audit
          </Link>
        </div>
      </div>
    </nav>
  )
}
