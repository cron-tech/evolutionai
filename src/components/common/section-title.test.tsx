import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { SectionTitle } from "./section-title"

describe("SectionTitle", () => {
  it("maps tone 'foreground' to the text-foreground class", () => {
    render(<SectionTitle parts={[{ text: "Palavra em destaque", tone: "foreground" }]} />)
    expect(screen.getByText("Palavra em destaque")).toHaveClass("text-foreground")
  })

  it("maps tone 'dimmed' to the text-text-dimmed class", () => {
    render(<SectionTitle parts={[{ text: "Texto contextual", tone: "dimmed" }]} />)
    expect(screen.getByText("Texto contextual")).toHaveClass("text-text-dimmed")
  })

  it("maps tone 'accent' to the text-accent-500 class", () => {
    render(<SectionTitle parts={[{ text: "Palavra-chave verde", tone: "accent" }]} />)
    expect(screen.getByText("Palavra-chave verde")).toHaveClass("text-accent-500")
  })

  it("renders an h1 with the --text-display size token when as='h1'", () => {
    render(<SectionTitle as="h1" parts={[{ text: "Título hero", tone: "foreground" }]} />)
    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading.tagName).toBe("H1")
    expect(heading).toHaveClass("text-display")
  })

  it("renders an h2 with the --text-h1 size token by default", () => {
    render(<SectionTitle parts={[{ text: "Título de seção", tone: "foreground" }]} />)
    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading.tagName).toBe("H2")
    expect(heading).toHaveClass("text-h1")
  })
})
