import type { CtaContent } from "./types"

export interface PersonaCardContent {
  id: "operations" | "it"
  title: string
  description: string
  bullets: string[]
  cta: CtaContent
}

export const personaCards: PersonaCardContent[] = [
  {
    id: "operations",
    title: "Para o time de operações",
    description:
      "Tire tarefas repetitivas das mãos da equipe e ganhe tempo para o que exige julgamento humano.",
    bullets: [
      "Triagem automática de chamados, pedidos e leads",
      "Respostas e atualizações de status geradas sem esperar fila de TI",
      "Configuração em minutos, direto pelas ferramentas que já usa",
    ],
    cta: {
      label: "Comece a automatizar",
      href: "#personas-operacoes",
      variant: "primary",
    },
  },
  {
    id: "it",
    title: "Para o time de TI",
    description:
      "Dê autonomia ao negócio sem abrir mão de controle, segurança e visibilidade sobre o que roda em produção.",
    bullets: [
      "Conexão com CRM, ERP, planilhas e e-mail sem integração customizada",
      "Permissões e trilha de auditoria para cada agente em execução",
      "Nenhum time de engenharia dedicado para manter em funcionamento",
    ],
    cta: {
      label: "Fale com o time técnico",
      href: "#personas-ti",
      variant: "secondary",
    },
  },
]
