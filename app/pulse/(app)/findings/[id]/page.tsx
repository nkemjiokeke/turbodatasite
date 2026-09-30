import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FindingDetail } from "@/components/pulse/finding-detail"
import { categories, categoryFromSlug, categorySlug } from "@/lib/pulse"

export const dynamicParams = false

export function generateStaticParams() {
  return categories.map((category) => ({ id: categorySlug(category) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const category = categoryFromSlug(id)
  return { title: category ?? "Finding" }
}

export default async function FindingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = categoryFromSlug(id)
  if (!category) notFound()

  return <FindingDetail category={category} />
}
