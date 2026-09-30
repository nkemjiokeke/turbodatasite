"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="multiple" className="rounded-xl border border-line bg-white px-5 sm:px-6">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`faq-${i}`} className="border-line">
          <AccordionTrigger className="py-5 text-base font-semibold text-ink hover:no-underline focus-visible:ring-brand/40">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-base leading-relaxed text-ink-soft">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
