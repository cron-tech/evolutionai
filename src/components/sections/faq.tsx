"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionTitle } from "@/components/common/section-title"
import type { FaqItem } from "@/lib/content/faq"

interface FaqProps {
  items: FaqItem[]
}

export function Faq({ items }: FaqProps) {
  return (
    <section className="px-6 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          as="h2"
          parts={[
            { text: "Perguntas", tone: "dimmed" },
            { text: "frequentes", tone: "foreground" },
          ]}
        />

        <Accordion type="single" collapsible className="mt-10">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-body-lg text-text-on-light">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-body text-text-on-light-muted">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
