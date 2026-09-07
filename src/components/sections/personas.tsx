import { SectionTitle } from "@/components/common/section-title"
import { Reveal } from "@/components/common/reveal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PersonaCardContent } from "@/lib/content/personas"

interface PersonasProps {
  content: PersonaCardContent[]
}

const ctaVariant: Record<PersonaCardContent["cta"]["variant"], "default" | "outline"> = {
  primary: "default",
  secondary: "outline",
}

export function Personas({ content }: PersonasProps) {
  return (
    <section
      id="solucoes"
      className="scroll-mt-[var(--header-height)] px-6 py-[var(--spacing-section)] text-center"
    >
      <SectionTitle
        as="h2"
        parts={[
          { text: "Para quem é o", tone: "dimmed" },
          { text: "Evolution", tone: "foreground" },
        ]}
      />

      <div className="mx-auto mt-12 grid max-w-[var(--container-max)] gap-6 md:grid-cols-2">
        {content.map((card, cardIndex) => (
          <Reveal key={card.id} index={cardIndex}>
            <div
              className={cn(
                "surface-dark flex h-full flex-col gap-6 rounded-2xl bg-surface p-8 text-left",
                "shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-[var(--duration-hover)] ease-[var(--ease-hover)]",
                "hover:-translate-y-1 hover:shadow-[var(--shadow-card-overlap)]",
                "focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-card-overlap)]"
              )}
            >
              <h3 className="text-h2 font-medium text-foreground">{card.title}</h3>
              <p className="text-body text-text-muted">{card.description}</p>

              <ul className="flex flex-col gap-3">
                {card.bullets.map((bullet, bulletIndex) => (
                  <Reveal
                    key={bullet}
                    as="li"
                    index={bulletIndex}
                    className="flex gap-3 text-body text-text-muted"
                  >
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500" />
                    {bullet}
                  </Reveal>
                ))}
              </ul>

              <Button asChild variant={ctaVariant[card.cta.variant]} className="mt-auto self-start">
                <a href={card.cta.href}>{card.cta.label}</a>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
