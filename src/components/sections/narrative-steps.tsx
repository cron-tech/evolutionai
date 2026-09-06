"use client"

import Image from "next/image"
import { useRef, useState, useSyncExternalStore } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"
import { SectionTitle } from "@/components/common/section-title"
import { cn } from "@/lib/utils"
import type { NarrativeStepContent } from "@/lib/content/narrative"
import { getActiveStepIndex } from "./narrative-steps.utils"

interface NarrativeStepsProps {
  steps: NarrativeStepContent[]
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

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

export function NarrativeSteps({ steps }: NarrativeStepsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0)

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollActiveIndex(getActiveStepIndex(steps.length, latest))
  })

  // NARRATIVE-06: under reduced motion, always show the static final state
  // instead of the scroll-driven index — never derived from an animated position.
  const activeIndex = prefersReducedMotion ? steps.length - 1 : scrollActiveIndex

  return (
    <section
      ref={sectionRef}
      className="relative px-6"
      style={{ height: `${steps.length * 100}vh` }}
    >
      {/* Desktop: sticky two-column scrollytelling (NARRATIVE-01..04) */}
      <div className="sticky top-0 hidden h-screen items-center md:grid md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-16">
          {steps.map((step, index) => {
            const isActive = index === activeIndex
            return (
              <div
                key={step.id}
                data-active={isActive}
                className={cn(
                  "transition-opacity duration-300",
                  isActive ? "opacity-100" : "opacity-30"
                )}
              >
                <SectionTitle as="h2" parts={step.titleParts} />
                {isActive ? (
                  <p className="mt-4 text-body text-text-muted">{step.supportingText}</p>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          {steps.map((step, index) => (
            <Image
              key={step.id}
              src={step.media.src}
              alt={step.media.alt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className={cn(
                "object-cover transition-opacity duration-500",
                index === activeIndex ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </div>

      {/* Mobile: stacked text+media pairs, no sticky (NARRATIVE-05) */}
      <div className="flex flex-col gap-16 py-16 md:hidden">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col gap-4">
            <SectionTitle as="h2" parts={step.titleParts} />
            <p className="text-body text-text-muted">{step.supportingText}</p>
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
              <Image
                src={step.media.src}
                alt={step.media.alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
