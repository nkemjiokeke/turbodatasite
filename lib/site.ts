export const site = {
  name: "TurboData Analytics",
  shortName: "TurboData",
  url: "https://turbodata.co",
  email: "TurboData.td@gmail.com",
  // Set to the verified LinkedIn profile/company URL. The link is hidden while empty.
  linkedin: "",
  location: "Sarnia-Lambton, Ontario, Canada",
  serviceArea: "Serving Sarnia-Lambton and Ontario businesses, with remote support available.",
  tagline: "Find the profit hidden inside your business.",
  positioning:
    "TurboData helps established Ontario SMEs find hidden profit leaks, improve inefficient operations, and build a clearer system for making business decisions.",
  primaryCta: { href: "/contact", label: "Book a Profit Leak Audit" },
} as const

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/who-we-help", label: "Who We Help" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const
