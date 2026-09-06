import type { TitlePart } from "./types"
import type { UiMockContent } from "./ui-mock"

export interface KanbanCardContent {
  label: string
  taskTitle: string
  assignees: { label: string; name: string }[]
  dateRange: string
}

export interface DelegateContent {
  titleParts: TitlePart[]
  paragraph: string
  // Painel de fundo atrás do kanban, em código — ver
  // src/components/common/ui-mock.tsx e o plano de correção pós-QA (Bloco 1).
  mock: UiMockContent
  kanban: { backlog: KanbanCardContent; delegated: KanbanCardContent }
  annotation: string
}

export const delegateContent: DelegateContent = {
  titleParts: [
    { text: "A mesma tarefa,", tone: "dimmed" },
    { text: "sem a mesma equipe", tone: "foreground" },
    { text: "por trás dela", tone: "dimmed" },
  ],
  paragraph:
    "Arraste uma tarefa operacional para o Evolution e um agente assume a " +
    "execução do início ao fim — triagem, atualização de status e resposta — " +
    "em minutos, com o time acompanhando cada passo.",
  mock: {
    label: "Painel mostrando planilha, CRM e e-mail conectados a um agente ativo",
    windowLabel: "integrações",
    rows: [
      { label: "Planilha de pedidos", status: { label: "conectado", tone: "accent" } },
      { label: "CRM", status: { label: "conectado", tone: "accent" } },
      { label: "E-mail", status: { label: "conectado", tone: "accent" } },
    ],
    footer: "1 agente ativo",
  },
  kanban: {
    backlog: {
      label: "Backlog",
      taskTitle: "Triagem de chamados de suporte",
      assignees: [{ label: "Responsável", name: "Ana Ribeiro" }],
      dateRange: "12 – 16 ago",
    },
    delegated: {
      label: "Agente assumiu",
      taskTitle: "Triagem de chamados de suporte",
      assignees: [{ label: "Agente", name: "Agente de Triagem" }],
      dateRange: "12 ago",
    },
  },
  annotation: "A IA assumiu",
}
