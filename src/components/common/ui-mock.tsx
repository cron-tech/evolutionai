import { cn } from "@/lib/utils"
import type { UiMockContent } from "@/lib/content/ui-mock"

interface UiMockProps {
  content: UiMockContent
  className?: string
}

/**
 * Mock de interface renderizado em código no lugar de fotografia — nenhuma
 * mídia foi gerada para Narrative/Delegate (ver plano de correção pós-QA,
 * Bloco 1). Server Component: só marcação + tokens, sem estado.
 *
 * A11y: o painel inteiro se anuncia como uma única imagem rotulada
 * (`content.label`, o equivalente ao antigo `alt`); o conteúdo interno fica
 * `aria-hidden` para não duplicar, linha a linha, o que o título e o
 * parágrafo de apoio da seção já dizem em texto real.
 */
export function UiMock({ content, className }: UiMockProps) {
  return (
    <div
      role="img"
      aria-label={content.label}
      className={cn(
        "surface-dark flex flex-col overflow-hidden rounded-2xl bg-surface",
        className
      )}
    >
      <div aria-hidden="true" className="flex flex-col h-full">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
          </span>
          <span className="text-caption text-text-subtle">{content.windowLabel}</span>
        </div>

        <ul className="flex flex-1 flex-col gap-px bg-white/5">
          {content.rows.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between gap-3 bg-surface px-4 py-3"
            >
              <span className="text-body text-text-muted">{row.label}</span>
              {row.status ? (
                <span
                  className={cn(
                    "text-caption whitespace-nowrap",
                    row.status.tone === "accent" ? "text-accent-500" : "text-text-subtle"
                  )}
                >
                  {row.status.label}
                </span>
              ) : null}
            </li>
          ))}
        </ul>

        {content.footer ? (
          <div className="border-t border-white/10 px-4 py-3 text-caption text-text-subtle">
            {content.footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
