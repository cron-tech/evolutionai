import type { CtaContent } from "./types"

export interface PricingPlan {
  id: string
  name: string
  price: string | "Sob consulta"
  recommended?: boolean
  features: string[]
  cta: CtaContent
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 490/mês",
    features: [
      "Até 3 agentes ativos",
      "2 integrações (CRM, e-mail ou planilhas)",
      "Triagem e resposta automática",
      "Suporte por e-mail",
    ],
    cta: {
      label: "Começar agora",
      href: "#comecar-agora",
      variant: "secondary",
    },
  },
  {
    id: "growth",
    name: "Growth",
    price: "R$ 1.290/mês",
    recommended: true,
    features: [
      "Até 10 agentes ativos",
      "Integrações ilimitadas (CRM, ERP, planilhas, e-mail)",
      "Regras de triagem e escalonamento personalizadas",
      "Trilha de auditoria completa",
      "Suporte prioritário por chat",
    ],
    cta: {
      label: "Começar agora",
      href: "#comecar-agora",
      variant: "primary",
    },
  },
  {
    id: "scale",
    name: "Scale",
    price: "R$ 2.990/mês",
    features: [
      "Agentes ilimitados",
      "Ambientes separados por departamento",
      "Permissões e governança avançadas",
      "SLA de suporte dedicado",
    ],
    cta: {
      label: "Começar agora",
      href: "#comecar-agora",
      variant: "secondary",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sob consulta",
    features: [
      "Volume e SLA negociados sob medida",
      "Integrações e agentes personalizados",
      "Revisão de segurança e conformidade dedicada",
      "Gerente de conta dedicado",
    ],
    cta: {
      label: "Fale com vendas",
      href: "#fale-com-vendas",
      variant: "secondary",
    },
  },
]
