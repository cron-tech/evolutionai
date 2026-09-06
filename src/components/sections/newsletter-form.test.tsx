import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { NewsletterForm } from "./newsletter-form"

describe("NewsletterForm", () => {
  it("shows a simulated confirmation after submitting with a non-empty value (FOOTER-02)", async () => {
    const user = userEvent.setup()
    render(<NewsletterForm />)

    const input = screen.getByLabelText("E-mail")
    await user.type(input, "visitante@example.com")
    await user.click(screen.getByRole("button", { name: "Assinar" }))

    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("does not show a confirmation when submitting with an empty value (FOOTER-02)", async () => {
    const user = userEvent.setup()
    render(<NewsletterForm />)

    await user.click(screen.getByRole("button", { name: "Assinar" }))

    expect(screen.queryByRole("status")).not.toBeInTheDocument()
  })
})
