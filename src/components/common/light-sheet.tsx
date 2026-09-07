import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LightSheetProps {
  children: ReactNode
}

export function LightSheet({ children }: LightSheetProps) {
  return (
    <div
      className={cn(
        "surface-light mx-[var(--container-sheet-gutter)] rounded-xl bg-surface-sheet md:rounded-sheet"
      )}
    >
      {children}
    </div>
  )
}
