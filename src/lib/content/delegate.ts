import type { TitlePart } from "./types"

export interface KanbanCardContent {
  label: string
  taskTitle: string
  assignees: { label: string; name: string }[]
  dateRange: string
}

export interface DelegateContent {
  titleParts: TitlePart[]
  paragraph: string
  media: { src: string; alt: string }
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
  media: {
    src: "/images/delegate/kanban-board.png",
    alt: "Quadro kanban vertical mostrando uma tarefa migrando do time humano para um agente de IA",
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
