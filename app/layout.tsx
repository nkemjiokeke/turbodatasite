import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { site } from "@/lib/site"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-manrope", display: "swap" })

const description =
  "TurboData helps Ontario SMEs uncover profit leaks, improve inefficient processes, analyse business performance, and make better operating decisions."

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Business Analytics Consulting for Ontario SMEs | TurboData Analytics",
    template: "%s | TurboData Analytics",
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "TurboData Analytics | Find the profit hidden inside your business",
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TurboData Analytics | Find the profit hidden inside your business",
    description,
  },
}

export const viewport: Viewport = {
  themeColor: "#0b1d33",
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.positioning,
  founder: { "@type": "Person", name: "Nkemjika (Jude) Okeke" },
  address: { "@type": "PostalAddress", addressLocality: "Sarnia", addressRegion: "ON", addressCountry: "CA" },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Sarnia-Lambton" },
    { "@type": "AdministrativeArea", name: "Ontario" },
  ],
  knowsAbout: [
    "Business analytics",
    "Profitability analysis",
    "Process improvement",
    "Business intelligence and reporting",
    "Workflow automation advisory",
  ],
  ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
