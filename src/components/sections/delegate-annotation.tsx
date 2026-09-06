"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

interface DelegateAnnotationProps {
  text: string
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"
const ARROW_PATH_LENGTH = 140

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener("change", onChange)
  return () => mediaQuery.removeEventListener("change", onChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export function DelegateAnnotation({ text }: DelegateAnnotationProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )
  const [drawn, setDrawn] = useState(false)
  const animated = !prefersReducedMotion

  useEffect(() => {
    if (!animated) return
    const frame = requestAnimationFrame(() => setDrawn(true))
    return () => cancelAnimationFrame(frame)
  }, [animated])

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 text-center">
      <svg viewBox="0 0 160 80" className="h-16 w-40" fill="none" aria-hidden="true">
        <path
          data-testid="delegate-arrow-path"
          d="M10 60 C 50 10, 110 10, 150 40"
          stroke="var(--color-accent-500)"
          strokeWidth={3}
          strokeLinecap="round"
          className={cn(animated && "transition-[stroke-dashoffset] duration-1000 ease-out")}
          style={
            animated
              ? { strokeDasharray: ARROW_PATH_LENGTH, strokeDashoffset: drawn ? 0 : ARROW_PATH_LENGTH }
              : undefined
          }
        />
      </svg>
      <p className="font-serif text-lg italic text-accent-500">{text}</p>
    </div>
  )
}
