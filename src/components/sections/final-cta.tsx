import { SectionTitle } from "@/components/common/section-title"
import { GlowButton } from "@/components/common/glow-button"
import { Reveal } from "@/components/common/reveal"
import type { HeroContent } from "@/lib/content/hero"

interface FinalCtaProps {
  content: HeroContent
}

export function FinalCta({ content }: FinalCtaProps) {
  return (
    <section className="bg-bg-page px-6 py-[var(--spacing-section)] text-center">
      <Reveal className="mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-6">
        <SectionTitle as="h2" parts={content.titleParts} />
        <p className="max-w-2xl text-body-lg text-text-muted">{content.paragraph}</p>
        <GlowButton href={content.cta.href}>{content.cta.label}</GlowButton>
      </Reveal>
    </section>
  )
}
