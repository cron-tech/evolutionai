import { cn } from "@/lib/utils"
import type { TextTone, TitlePart } from "@/lib/content/types"

const toneClassName: Record<TextTone, string> = {
  dimmed: "text-text-dimmed",
  accent: "text-accent-500",
  foreground: "text-foreground",
}

interface SectionTitleProps {
  parts: TitlePart[]
  as?: "h1" | "h2"
}

export function SectionTitle({ parts, as = "h2" }: SectionTitleProps) {
  const Tag = as
  const sizeClassName = as === "h1" ? "text-display" : "text-h1"

  return (
    <Tag className={cn("font-medium", sizeClassName)}>
      {parts.map((part, index) => (
        <span key={`${part.text}-${index}`} className={toneClassName[part.tone]}>
          {part.text}
          {index < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  )
}
