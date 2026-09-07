import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { DelegateAnnotation } from "./delegate-annotation"

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe("DelegateAnnotation", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders the arrow in its final state with no stroke-dashoffset animation when prefers-reduced-motion is set (DELEGATE-04)", () => {
    mockMatchMedia(true)
    render(<DelegateAnnotation text="A IA assumiu" />)

    const path = screen.getByTestId("delegate-arrow-path")
    expect(path.style.strokeDashoffset).toBe("")
    expect(path.getAttribute("class") ?? "").not.toContain("transition-")
  })

  it("renders the arrow with animated stroke-dashoffset styling when reduced motion is not active (DELEGATE-03)", () => {
    mockMatchMedia(false)
    render(<DelegateAnnotation text="A IA assumiu" />)

    const path = screen.getByTestId("delegate-arrow-path")
    expect(path.style.strokeDashoffset).not.toBe("")
    expect(path.getAttribute("class") ?? "").toContain("transition-")
  })

  it("renders the handwritten annotation text", () => {
    mockMatchMedia(false)
    render(<DelegateAnnotation text="A IA assumiu" />)

    expect(screen.getByText("A IA assumiu")).toBeInTheDocument()
  })
})
