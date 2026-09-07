import type { TitlePart } from "./types"
import type { UiMockContent } from "./ui-mock"

export interface NarrativeStepContent {
  id: string
  titleParts: TitlePart[]
  supportingText: string
  // Mock de interface em código no lugar de fotografia — ver
  // src/components/common/ui-mock.tsx e o plano de correção pós-QA (Bloco 1).
  mock: UiMockContent
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
    mock: {
      label: "Fila de pedidos parada aguardando alguém processar manualmente",
      windowLabel: "fila-de-pedidos",
      rows: [
        { label: "Pedido #4820", status: { label: "aguardando", tone: "muted" } },
        { label: "Pedido #4821", status: { label: "aguardando", tone: "muted" } },
        { label: "Pedido #4822", status: { label: "aguardando", tone: "muted" } },
      ],
      footer: "planilha → CRM → e-mail (manual)",
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
    mock: {
      label: "Agente de triagem classificando chamados automaticamente, uma exceção sinalizada para revisão humana",
      windowLabel: "agente-triagem",
      rows: [
        { label: "Chamado #4821", status: { label: "auto", tone: "accent" } },
        { label: "Chamado #4822", status: { label: "auto", tone: "accent" } },
        { label: "Chamado #4823", status: { label: "humano", tone: "muted" } },
      ],
      footer: "planilha → CRM → e-mail",
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
    mock: {
      label: "Painel de supervisão mostrando a maior parte do trabalho concluída automaticamente e poucas exceções aguardando aprovação humana",
      windowLabel: "painel-de-aprovacao",
      rows: [
        { label: "142 tarefas concluídas hoje", status: { label: "auto", tone: "accent" } },
        { label: "3 exceções aguardando revisão", status: { label: "revisar", tone: "muted" } },
        { label: "Histórico completo por agente", status: { label: "auditoria", tone: "muted" } },
      ],
      footer: "o time supervisiona, o agente executa",
    },
  },
]
