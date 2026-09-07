import { render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { Delegate } from "./delegate"
import { delegateContent } from "@/lib/content/delegate"

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe("Delegate", () => {
  beforeEach(() => mockMatchMedia(false))
  afterEach(() => vi.restoreAllMocks())

  it("renders a coded UI mock instead of a missing background image (no 404 media)", () => {
    render(<Delegate content={delegateContent} />)
    expect(screen.getByRole("img", { name: delegateContent.mock.label })).toBeInTheDocument()
  })

  it("renders both kanban cards with their task content", () => {
    render(<Delegate content={delegateContent} />)
    expect(screen.getAllByText(delegateContent.kanban.backlog.taskTitle)).toHaveLength(2)
    expect(screen.getByText(delegateContent.kanban.backlog.label)).toBeInTheDocument()
    expect(screen.getByText(delegateContent.kanban.delegated.label)).toBeInTheDocument()
  })
})
