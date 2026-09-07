"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Staggers entrance across a list — pass the item's index. */
  index?: number
  /** Wrapper element — use "li" inside a <ul>/<ol> to keep list semantics. */
  as?: "div" | "li"
}

const STAGGER_STEP_SECONDS = 0.08

/**
 * Fade + subtle translateY on scroll-into-view, transform/opacity only
 * (Core Web Vitals requirement — never width/height/top/left). Wraps
 * Server Component output: only this boundary is a Client Component
 * (AD-001 — the sections it wraps stay server-rendered).
 *
 * Under prefers-reduced-motion, skips straight to the final state instead
 * of animating — Motion's own transitions aren't covered by the global CSS
 * transition-duration guard in globals.css, so this is handled explicitly.
 */
export function Reveal({ children, className, index = 0, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (shouldReduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * STAGGER_STEP_SECONDS,
      }}
    >
      {children}
    </MotionTag>
  )
}
