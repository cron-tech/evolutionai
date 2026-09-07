import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Pricing } from "./pricing"
import type { PricingPlan } from "@/lib/content/pricing"

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 490/mês",
    features: ["2 integrações"],
    cta: { label: "Começar agora", href: "#starter", variant: "secondary" },
  },
  {
    id: "growth",
    name: "Growth",
    price: "R$ 1.290/mês",
    recommended: true,
    features: ["Integrações ilimitadas"],
    cta: { label: "Começar agora", href: "#growth", variant: "primary" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sob consulta",
    features: ["Volume negociado"],
    cta: { label: "Fale com vendas", href: "#enterprise", variant: "secondary" },
  },
]

describe("Pricing", () => {
  it("renders a visible 'Recomendado' badge on the plan flagged recommended (PRICING-04)", () => {
    render(<Pricing plans={plans} />)

    const growthCard = screen.getByText("Growth").closest("[data-plan-id]") as HTMLElement
    expect(growthCard).not.toBeNull()
    expect(within(growthCard).getByText("Recomendado")).toBeInTheDocument()
    // border-accent-on-light (not border-accent-500): accent-500 fails the
    // 3:1 UI-component contrast floor against the white sheet (1.71:1).
    expect(growthCard.className).toMatch(/border-accent-on-light/)
  })

  it("renders no 'Recomendado' badge and no highlight border on a plan without recommended (PRICING-04)", () => {
    render(<Pricing plans={plans} />)

    const starterCard = screen.getByText("Starter").closest("[data-plan-id]") as HTMLElement
    expect(starterCard).not.toBeNull()
    expect(within(starterCard).queryByText("Recomendado")).not.toBeInTheDocument()
    expect(starterCard.className).not.toMatch(/border-accent-on-light/)
  })

  it("renders 'Sob consulta' in place of a price for the Enterprise plan (PRICING-02)", () => {
    render(<Pricing plans={plans} />)
    expect(screen.getByText("Sob consulta")).toBeInTheDocument()
  })

  it("gives the Enterprise CTA a visual treatment distinct from the self-serve plans' CTA (PRICING-02)", () => {
    render(<Pricing plans={plans} />)

    const enterpriseCta = screen.getByRole("link", { name: "Fale com vendas" })
    const [starterCta, growthCta] = screen.getAllByRole("link", { name: "Começar agora" })

    // Marker class applied only to the Enterprise CTA treatment.
    expect(enterpriseCta.className).toMatch(/border-2 border-text-on-light/)
    expect(starterCta.className).not.toMatch(/border-2 border-text-on-light/)
    expect(growthCta.className).not.toMatch(/border-2 border-text-on-light/)
  })
})
