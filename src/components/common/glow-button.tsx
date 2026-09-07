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
      className="shadow-[var(--shadow-cta-glow)] transition-[transform,box-shadow] duration-[var(--duration-hover)] ease-[var(--ease-hover)] hover:scale-[1.02] hover:shadow-[var(--shadow-cta-glow-hover)]"
    >
      <a href={href}>{children}</a>
    </Button>
  )
}
