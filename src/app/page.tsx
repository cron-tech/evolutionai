import { LightSheet } from "@/components/common/light-sheet"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Personas } from "@/components/sections/personas"
import { NarrativeSteps } from "@/components/sections/narrative-steps"
import { Delegate } from "@/components/sections/delegate"
import { SocialProof } from "@/components/sections/social-proof"
import { Pricing } from "@/components/sections/pricing"
import { Faq } from "@/components/sections/faq"
import { FinalCta } from "@/components/sections/final-cta"
import { Footer } from "@/components/sections/footer"
import { headerContent } from "@/lib/content/header"
import { heroContent } from "@/lib/content/hero"
import { personaCards } from "@/lib/content/personas"
import { narrativeSteps } from "@/lib/content/narrative"
import { delegateContent } from "@/lib/content/delegate"
import { socialProofContent } from "@/lib/content/social-proof"
import { pricingPlans } from "@/lib/content/pricing"
import { faqItems } from "@/lib/content/faq"
import { finalCtaContent } from "@/lib/content/final-cta"
import { footerContent } from "@/lib/content/footer"

export default function Home() {
  return (
    <>
      <Header nav={headerContent.nav} cta={headerContent.cta} />
      <Hero content={heroContent} />

      <LightSheet>
        <Personas content={personaCards} />
        <NarrativeSteps steps={narrativeSteps} />
      </LightSheet>

      <Delegate content={delegateContent} />

      <LightSheet>
        <SocialProof content={socialProofContent} />
        <Pricing plans={pricingPlans} />
        <Faq items={faqItems} />
      </LightSheet>

      <FinalCta content={finalCtaContent} />
      <Footer content={footerContent} />
    </>
  )
}
