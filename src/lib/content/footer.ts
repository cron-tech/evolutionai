import type { NavLink } from "./types"

// lucide-react (versão instalada) não inclui ícones de marca (Linkedin,
// Instagram, Youtube, etc. foram removidos a favor do pacote `simple-icons`),
// então usamos identificadores literais próprios em vez de
// `keyof typeof import("lucide-react")` — a seção que renderiza o footer
// resolve cada um para o ícone/SVG visual escolhido.
export type SocialIconName = "linkedin" | "instagram" | "youtube"

export interface NewsletterContent {
  label: string
  placeholder: string
  ctaLabel: string
  confirmation: string
}

export interface DevelopmentCreditContent {
  prefix: string
  label: string
  href: string
}

export interface FooterContent {
  description: string
  columns: { title: string; links: NavLink[] }[]
  newsletter: NewsletterContent
  socials: { label: string; href: string; icon: SocialIconName }[]
  legalLinks: NavLink[]
  credit: DevelopmentCreditContent
}

export const footerContent: FooterContent = {
  description:
    "Evolution conecta as ferramentas que sua equipe já usa e deixa agentes " +
    "de IA cuidarem do operacional repetitivo — sem depender da TI.",
  columns: [
    {
      title: "Produto",
      links: [
        { label: "Como funciona", href: "#produto" },
        { label: "Para quem é", href: "#solucoes" },
        { label: "Preços", href: "#precos" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre o Evolution", href: "#sobre" },
        {
          label: "Cron.Tech",
          href: "https://www.instagram.com/cron_tech",
          external: true,
        },
        { label: "Fale com vendas", href: "#fale-com-vendas" },
      ],
    },
    {
      title: "Recursos",
      links: [{ label: "Perguntas frequentes", href: "#faq" }],
    },
  ],
  newsletter: {
    label: "E-mail",
    placeholder: "seu@email.com",
    ctaLabel: "Assinar",
    confirmation:
      "Inscrição confirmada! Em breve você recebe novidades do Evolution.",
  },
  socials: [
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
  legalLinks: [
    { label: "Privacidade", href: "#privacidade" },
    { label: "Termos", href: "#termos" },
  ],
  credit: {
    prefix: "Desenvolvido pela ",
    label: "Cron.Tech",
    href: "https://www.instagram.com/cron_tech",
  },
}
