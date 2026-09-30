import type { Metadata } from "next"
import { site } from "@/lib/site"

/** Complete per-page metadata. Next.js replaces (rather than merges) nested openGraph/twitter
 *  objects from the root layout, so every page sets them in full here. */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  type = "website",
  publishedTime,
}: {
  title: string
  description: string
  path: string
  socialTitle?: string
  type?: "website" | "article"
  publishedTime?: string
}): Metadata {
  const ogTitle = socialTitle ?? `${title} | ${site.name}`
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_CA",
      siteName: site.name,
      url: path,
      title: ogTitle,
      description,
      images: [image],
      ...(publishedTime ? { publishedTime, authors: ["Nkemjika (Jude) Okeke"] } : {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [image.url] },
  }
}
