// Conteúdo tipado para o mock de interface reutilizado por Narrative e
// Delegate no lugar de fotografia (não gerada — ver plano de correção
// pós-QA, Bloco 1). "accent" marca uma linha resolvida automaticamente pelo
// agente; "muted" marca uma linha ainda manual/aguardando ou apenas
// informativa. Sem tom de "warning": a paleta do Evolution não define uma
// cor de alerta (DESIGN-REFERENCE.md — accent é pontuação, nunca área).
export interface UiMockRow {
  label: string
  status?: { label: string; tone: "accent" | "muted" }
}

export interface UiMockContent {
  /** Nome acessível do painel inteiro (equivalente ao alt de uma imagem). */
  label: string
  windowLabel: string
  rows: UiMockRow[]
  footer?: string
}
