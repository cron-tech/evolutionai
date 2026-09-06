import type { CtaContent, NavLink } from "./types"

export const headerContent: {
  nav: NavLink[]
  cta: { secondary: CtaContent; primary: CtaContent }
} = {
  nav: [
    { label: "Produto", href: "#produto" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Recursos", href: "#recursos" },
    { label: "Preços", href: "#precos" },
  ],
  cta: {
    secondary: {
      label: "Fale com vendas",
      href: "#fale-com-vendas",
      variant: "secondary",
    },
    primary: {
      label: "Começar agora",
      href: "#comecar-agora",
      variant: "primary",
    },
  },
}
