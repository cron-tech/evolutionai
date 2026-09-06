import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface GlowButtonProps {
  href: string
  children: ReactNode
}

export function GlowButton({ href, children }: GlowButtonProps) {
  return (
    <Button
      asChild
      variant="default"
      className="shadow-[var(--shadow-cta-glow)]"
    >
      <a href={href}>{children}</a>
    </Button>
  )
}
