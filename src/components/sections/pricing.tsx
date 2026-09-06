import { SectionTitle } from "@/components/common/section-title"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PricingPlan } from "@/lib/content/pricing"

interface PricingProps {
  plans: PricingPlan[]
}

const selfServeCtaVariant: Record<PricingPlan["cta"]["variant"], "default" | "outline"> = {
  primary: "default",
  secondary: "outline",
}

function isEnterprise(plan: PricingPlan) {
  return plan.price === "Sob consulta"
}

export function Pricing({ plans }: PricingProps) {
  return (
    <section className="px-6 py-[var(--spacing-section)] text-center">
      <SectionTitle
        as="h2"
        parts={[
          { text: "Um plano para", tone: "dimmed" },
          { text: "cada porte de operação", tone: "foreground" },
        ]}
      />

      <div className="mx-auto mt-12 grid max-w-[var(--container-max)] gap-6 md:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            data-plan-id={plan.id}
            data-recommended={Boolean(plan.recommended)}
            className={cn(
              "relative flex flex-col gap-6 rounded-2xl bg-background p-6 text-left shadow-[0_8px_24px_-8px_rgb(0_0_0_/_0.15)] transition-shadow duration-200",
              "hover:shadow-[0_16px_40px_-12px_rgb(0_0_0_/_0.25)] focus-within:shadow-[0_16px_40px_-12px_rgb(0_0_0_/_0.25)]",
              plan.recommended ? "border-2 border-accent-on-light" : "border border-border"
            )}
          >
            {plan.recommended ? (
              <span className="absolute -top-3 left-6 rounded-full bg-accent-500 px-3 py-1 text-caption font-medium text-text-on-light">
                Recomendado
              </span>
            ) : null}

            <h3 className="text-h2 font-medium text-text-on-light">{plan.name}</h3>
            <p className="text-h1 font-medium text-text-on-light">{plan.price}</p>

            <ul className="flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="text-body text-text-on-light-muted">
                  {feature}
                </li>
              ))}
            </ul>

            {isEnterprise(plan) ? (
              <Button
                asChild
                variant="outline"
                className="mt-auto border-2 border-text-on-light bg-transparent text-text-on-light hover:bg-text-on-light hover:text-background"
              >
                <a href={plan.cta.href}>{plan.cta.label}</a>
              </Button>
            ) : (
              <Button asChild variant={selfServeCtaVariant[plan.cta.variant]} className="mt-auto">
                <a href={plan.cta.href}>{plan.cta.label}</a>
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
