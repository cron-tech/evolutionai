import { act } from "react"
import { render } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { narrativeSteps } from "@/lib/content/narrative"
import { NarrativeSteps } from "./narrative-steps"

let latestChangeHandler: ((value: number) => void) | null = null

vi.mock("motion/react", () => ({
  useScroll: () => ({ scrollYProgress: {} }),
  useMotionValueEvent: (
    _value: unknown,
    _event: string,
    callback: (value: number) => void
  ) => {
    latestChangeHandler = callback
  },
}))

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

function getActiveStepEls() {
  return Array.from(document.querySelectorAll('[data-active="true"]'))
}

describe("NarrativeSteps", () => {
  beforeEach(() => {
    latestChangeHandler = null
    mockMatchMedia(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("marks exactly the first step active on initial render (NARRATIVE-04)", () => {
    render(<NarrativeSteps steps={narrativeSteps} />)

    const activeEls = getActiveStepEls()
    expect(activeEls).toHaveLength(1)
    expect(activeEls[0].textContent).toContain(narrativeSteps[0].titleParts[0].text)
  })

  it("activates exactly one step when scroll progress changes (NARRATIVE-04)", () => {
    render(<NarrativeSteps steps={narrativeSteps} />)

    act(() => {
      latestChangeHandler?.(0.9)
    })

    const activeEls = getActiveStepEls()
    expect(activeEls).toHaveLength(1)
    const lastStep = narrativeSteps[narrativeSteps.length - 1]
    expect(activeEls[0].textContent).toContain(lastStep.titleParts[0].text)
  })

  it("renders the static final state and ignores scroll changes when prefers-reduced-motion is set (NARRATIVE-06)", () => {
    mockMatchMedia(true)
    render(<NarrativeSteps steps={narrativeSteps} />)

    const lastStep = narrativeSteps[narrativeSteps.length - 1]
    const activeEls = getActiveStepEls()
    expect(activeEls).toHaveLength(1)
    expect(activeEls[0].textContent).toContain(lastStep.titleParts[0].text)

    // Simulate a scroll-driven change attempt: it must be ignored under reduced motion.
    act(() => {
      latestChangeHandler?.(0)
    })

    const activeElsAfter = getActiveStepEls()
    expect(activeElsAfter).toHaveLength(1)
    expect(activeElsAfter[0].textContent).toContain(lastStep.titleParts[0].text)
  })
})
