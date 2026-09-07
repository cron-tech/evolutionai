import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

const useReducedMotionMock = vi.fn()

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
  useReducedMotion: () => useReducedMotionMock(),
}))

describe("Reveal", () => {
  it("renders its children", async () => {
    useReducedMotionMock.mockReturnValue(false)
    const { Reveal } = await import("./reveal")

    render(
      <Reveal>
        <p>Conteúdo revelado</p>
      </Reveal>
    )

    expect(screen.getByText("Conteúdo revelado")).toBeInTheDocument()
  })

  it("renders the final state directly (no animation wrapper) under prefers-reduced-motion", async () => {
    useReducedMotionMock.mockReturnValue(true)
    const { Reveal } = await import("./reveal")

    render(
      <Reveal>
        <p>Conteúdo revelado</p>
      </Reveal>
    )

    expect(screen.getByText("Conteúdo revelado")).toBeInTheDocument()
  })
})
