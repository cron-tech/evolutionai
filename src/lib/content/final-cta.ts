import type { HeroContent } from "./hero"

export const finalCtaContent: HeroContent = {
  titleParts: [
    { text: "Pronto para tirar", tone: "dimmed" },
    { text: "o operacional das suas mãos?", tone: "foreground" },
  ],
  paragraph:
    "Leve o Evolution para o seu time em minutos e deixe os agentes de IA " +
    "cuidarem do resto — sem esperar fila de TI.",
  cta: {
    label: "Começar agora",
    href: "#comecar-agora",
    variant: "primary",
  },
}
