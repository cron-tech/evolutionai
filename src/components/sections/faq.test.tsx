import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Faq } from "./faq"
import type { FaqItem } from "@/lib/content/faq"

const items: FaqItem[] = [
  { question: "Pergunta um?", answer: "Resposta um." },
  { question: "Pergunta dois?", answer: "Resposta dois." },
]

describe("Faq", () => {
  it("expands the answer via click and sets aria-expanded to true (FAQ-02)", async () => {
    const user = userEvent.setup()
    render(<Faq items={items} />)

    const trigger = screen.getByRole("button", { name: "Pergunta um?" })
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    await user.click(trigger)

    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("expands the answer via keyboard activation (Enter) on a focused trigger (FAQ-03)", async () => {
    const user = userEvent.setup()
    render(<Faq items={items} />)

    const trigger = screen.getByRole("button", { name: "Pergunta dois?" })
    trigger.focus()
    expect(trigger).toHaveFocus()

    await user.keyboard("{Enter}")

    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("expands the answer via keyboard activation (Space) on a focused trigger (FAQ-03)", async () => {
    const user = userEvent.setup()
    render(<Faq items={items} />)

    const trigger = screen.getByRole("button", { name: "Pergunta um?" })
    trigger.focus()

    await user.keyboard(" ")

    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })

  it("sets aria-controls on the trigger pointing to the panel that contains the answer (FAQ-02)", async () => {
    const user = userEvent.setup()
    render(<Faq items={items} />)

    const trigger = screen.getByRole("button", { name: "Pergunta um?" })
    await user.click(trigger)

    const panelId = trigger.getAttribute("aria-controls")
    expect(panelId).toBeTruthy()

    const panel = document.getElementById(panelId as string)
    expect(panel).not.toBeNull()
    expect(panel).toHaveTextContent("Resposta um.")
  })
})
