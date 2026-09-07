import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { NewsletterForm } from "./newsletter-form"
import { footerContent } from "@/lib/content/footer"

const content = footerContent.newsletter

describe("NewsletterForm", () => {
  it("shows a simulated confirmation after submitting with a non-empty value (FOOTER-02)", async () => {
    const user = userEvent.setup()
    render(<NewsletterForm content={content} />)

    const input = screen.getByLabelText(content.label)
    await user.type(input, "visitante@example.com")
    await user.click(screen.getByRole("button", { name: content.ctaLabel }))

    expect(screen.getByRole("status")).toHaveTextContent(content.confirmation)
  })

  it("does not show a confirmation when submitting with an empty value (FOOTER-02)", async () => {
    const user = userEvent.setup()
    render(<NewsletterForm content={content} />)

    await user.click(screen.getByRole("button", { name: content.ctaLabel }))

    expect(screen.queryByRole("status")).not.toBeInTheDocument()
  })
})
