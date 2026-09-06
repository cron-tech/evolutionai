"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { CtaContent, NavLink } from "@/lib/content/types"

interface HeaderProps {
  nav: NavLink[]
  cta: { secondary: CtaContent; primary: CtaContent }
}

export function Header({ nav, cta }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (mobileMenuOpen) {
      firstMenuItemRef.current?.focus()
    } else {
      menuButtonRef.current?.focus()
    }
  }, [mobileMenuOpen])

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200",
        scrolled ? "bg-bg-page/80 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between py-4 pr-header-x-right pl-header-x-left">
        <a href="#" className="text-lg font-semibold text-foreground">
          Evolution
        </a>

        <nav
          id="mobile-menu"
          aria-label="Principal"
          className={cn(
            "md:flex md:items-center md:gap-6",
            mobileMenuOpen
              ? "fixed inset-x-0 top-[3.75rem] z-40 flex flex-col gap-4 bg-bg-page px-header-x-left py-6"
              : "hidden"
          )}
        >
          {nav.map((link, index) => (
            <a
              key={link.href}
              ref={index === 0 ? firstMenuItemRef : undefined}
              href={link.href}
              className="text-sm text-text-dimmed hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline">
            <a href={cta.secondary.href}>{cta.secondary.label}</a>
          </Button>
          <Button asChild variant="default">
            <a href={cta.primary.href}>{cta.primary.label}</a>
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          className="flex h-8 w-8 items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-px bg-foreground transition-transform",
                mobileMenuOpen && "translate-y-1.5 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-px bg-foreground transition-transform",
                mobileMenuOpen && "-translate-y-1.5 -rotate-45"
              )}
            />
          </span>
        </button>
      </div>
    </header>
  )
}
