import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CtaBand, PageShell } from "@/components/site/page-shell"
import { Container, IconBadge } from "@/components/site/primitives"
import { articles, formatDate, getArticle } from "@/lib/insights"
import { getService } from "@/lib/services"
import { site } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) return {}
  return pageMetadata({
    title: a.title,
    description: a.summary,
    path: `/insights/${a.slug}`,
    socialTitle: a.title,
    type: "article",
    publishedTime: a.date,
  })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getArticle(slug)
  if (!a) notFound()

  const related = a.relatedServices.map(getService).filter((s) => s !== undefined)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.summary,
    datePublished: a.date,
    author: { "@type": "Person", name: "Nkemjika (Jude) Okeke" },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/insights/${a.slug}`,
  }

  return (
    <PageShell>
      <article>
        <header className="border-b border-line bg-paper py-12 sm:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-8 text-sm">
                <Link href="/insights" className="inline-flex items-center gap-1.5 font-medium text-ink-soft hover:text-ink">
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                  All insights
                </Link>
              </nav>
              <p className="text-sm font-semibold text-brand">{a.category}</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">{a.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{a.summary}</p>
              <p className="mt-6 text-sm text-ink-soft">
                By Nkemjika (Jude) Okeke · <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readingMinutes} min
                read
              </p>
            </div>
          </Container>
        </header>

        <Container className="py-12 sm:py-16">
          <div className="prose-td mx-auto max-w-3xl">{a.body}</div>

          {related.length > 0 && (
            <aside aria-labelledby="related-services" className="mx-auto mt-14 max-w-3xl rounded-xl border border-line bg-paper p-6 sm:p-8">
              <h2 id="related-services" className="text-lg font-bold text-ink">
                Related services
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group flex items-center gap-3 font-semibold text-ink">
                      <IconBadge icon={s.icon} />
                      <span className="group-hover:underline">{s.title}</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4 text-brand" />
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </Container>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CtaBand />
    </PageShell>
  )
}
