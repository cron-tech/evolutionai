import Image from "next/image"
import { SectionTitle } from "@/components/common/section-title"
import { cn } from "@/lib/utils"
import type { DelegateContent, KanbanCardContent } from "@/lib/content/delegate"
import { DelegateAnnotation } from "./delegate-annotation"

interface DelegateProps {
  content: DelegateContent
}

function KanbanCard({ card, className }: { card: KanbanCardContent; className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-xl bg-surface-raised p-4 text-left shadow-[var(--shadow-card)]",
        className
      )}
    >
      <span className="text-caption text-text-muted">{card.label}</span>
      <p className="mt-1 text-body font-medium text-foreground">{card.taskTitle}</p>
      <div className="mt-3 flex items-center justify-between gap-2 text-caption text-text-muted">
        <span>{card.assignees.map((assignee) => assignee.name).join(", ")}</span>
        <span>{card.dateRange}</span>
      </div>
    </div>
  )
}

export function Delegate({ content }: DelegateProps) {
  return (
    <section className="bg-bg-page px-6 py-[var(--spacing-section)]">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-16 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-6 text-left">
          <SectionTitle as="h2" parts={content.titleParts} />
          <p className="max-w-md text-body-lg text-text-muted">{content.paragraph}</p>
        </div>

        <div className="relative pb-24">
          <div className="relative mx-auto aspect-3/4 w-full max-w-sm overflow-hidden rounded-2xl">
            <Image
              src={content.media.src}
              alt={content.media.alt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 mx-auto -mt-16 flex w-full max-w-sm flex-col gap-4">
            <KanbanCard card={content.kanban.backlog} className="mr-8" />
            <KanbanCard card={content.kanban.delegated} className="ml-8" />
          </div>

          <DelegateAnnotation text={content.annotation} />
        </div>
      </div>
    </section>
  )
}
