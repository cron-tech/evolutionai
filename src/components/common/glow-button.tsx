import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlowButtonProps {
  href: string
  children: ReactNode
}

export function GlowButton({ href, children }: GlowButtonProps) {
  return (
    <Button
      asChild
      variant="default"
      className={cn(
        "[--shadow-cta-glow:0_0_24px_4px_color-mix(in_oklch,var(--color-accent-cta)_45%,transparent),0_0_64px_16px_color-mix(in_oklch,var(--color-accent-cta)_25%,transparent)]",
        "shadow-[var(--shadow-cta-glow)]"
      )}
    >
      <a href={href}>{children}</a>
    </Button>
  )
}
