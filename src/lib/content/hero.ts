import type { CtaContent, TitlePart } from "./types"

export interface HeroContent {
  titleParts: TitlePart[]
  paragraph: string
  cta: CtaContent
}

export const heroContent: HeroContent = {
  titleParts: [
    { text: "Sua operação", tone: "dimmed" },
    { text: "no piloto automático", tone: "foreground" },
    { text: "sem depender da TI", tone: "dimmed" },
  ],
  paragraph:
    "Conecte planilhas, CRM, ERP e e-mail e deixe agentes de IA cuidarem do " +
    "operacional repetitivo — de semanas de configuração para minutos.",
  cta: {
    label: "Começar agora",
    href: "#comecar-agora",
    variant: "primary",
  },
}
