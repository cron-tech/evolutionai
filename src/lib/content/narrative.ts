import type { TitlePart } from "./types"

export interface NarrativeStepContent {
  id: string
  titleParts: TitlePart[]
  supportingText: string
  media: { src: string; alt: string }
}

export const narrativeSteps: NarrativeStepContent[] = [
  {
    id: "manual",
    titleParts: [
      { text: "Hoje, cada tarefa", tone: "dimmed" },
      { text: "passa por uma pessoa", tone: "foreground" },
    ],
    supportingText:
      "Pedidos chegam por e-mail, alguém copia para a planilha, outra pessoa " +
      "atualiza o CRM e uma terceira responde o cliente. Cada etapa depende de " +
      "alguém lembrar de fazer.",
    media: {
      src: "/images/narrative/manual-work.png",
      alt: "Time de operações alternando entre planilha, CRM e e-mail manualmente",
    },
  },
  {
    id: "agents-take-over",
    titleParts: [
      { text: "Agentes assumem", tone: "foreground" },
      { text: "a triagem e a resposta", tone: "dimmed" },
    ],
    supportingText:
      "O Evolution lê os mesmos sistemas, classifica cada pedido, atualiza o " +
      "status certo e dispara a resposta padrão — sem esperar alguém abrir a fila.",
    media: {
      src: "/images/narrative/agents-take-over.png",
      alt: "Agente de IA triando e respondendo chamados automaticamente entre sistemas",
    },
  },
  {
    id: "supervised",
    titleParts: [
      { text: "O time supervisiona,", tone: "dimmed" },
      { text: "não executa", tone: "foreground" },
    ],
    supportingText:
      "Exceções sobem para uma pessoa aprovar; o restante roda sozinho, todos os " +
      "dias, com histórico completo de cada decisão do agente.",
    media: {
      src: "/images/narrative/supervised.png",
      alt: "Painel mostrando operação rodando de forma autônoma com aprovação humana só em exceções",
    },
  },
]
