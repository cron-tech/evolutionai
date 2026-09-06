import { act } from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Header } from "./header"
import { headerContent } from "@/lib/content/header"

describe("Header", () => {
  it("renders wordmark, 4 nav links, and both CTAs (HDR-01)", () => {
    render(<Header nav={headerContent.nav} cta={headerContent.cta} />)

    expect(screen.getByRole("link", { name: "Evolution" })).toBeInTheDocument()

    const nav = screen.getByRole("navigation")
    const links = within(nav).getAllByRole("link")
    expect(links).toHaveLength(4)
    expect(links.map((link) => link.textContent)).toEqual(
      headerContent.nav.map((item) => item.label)
    )

    expect(screen.getByText(headerContent.cta.secondary.label)).toBeInTheDocument()
    expect(screen.getByText(headerContent.cta.primary.label)).toBeInTheDocument()
  })

  it("stays sticky at the top of the viewport throughout scroll (HDR-05)", () => {
    render(<Header nav={headerContent.nav} cta={headerContent.cta} />)
    const header = screen.getByRole("banner")
    expect(header).toHaveClass("sticky", "top-0")
  })

  it("is not marked as scrolled before any scroll happens (HDR-02)", () => {
    render(<Header nav={headerContent.nav} cta={headerContent.cta} />)
    const header = screen.getByRole("banner")
    expect(header).toHaveAttribute("data-scrolled", "false")
  })

  it("marks itself as scrolled once scrollY passes 8px (HDR-02)", () => {
    render(<Header nav={headerContent.nav} cta={headerContent.cta} />)
    const header = screen.getByRole("banner")

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 20, configurable: true })
      window.dispatchEvent(new Event("scroll"))
    })

    expect(header).toHaveAttribute("data-scrolled", "true")
  })

  it("moves focus to the first mobile menu item when opened (HDR-04)", async () => {
    const user = userEvent.setup()
    render(<Header nav={headerContent.nav} cta={headerContent.cta} />)

    const toggle = screen.getByRole("button", { name: "Menu" })
    await user.click(toggle)

    const firstLink = screen.getByRole("link", { name: headerContent.nav[0].label })
    expect(document.activeElement).toBe(firstLink)
  })

  it("returns focus to the menu toggle button when the menu closes (HDR-04)", async () => {
    const user = userEvent.setup()
    render(<Header nav={headerContent.nav} cta={headerContent.cta} />)

    const toggle = screen.getByRole("button", { name: "Menu" })
    await user.click(toggle)
    await user.click(toggle)

    expect(document.activeElement).toBe(toggle)
  })
})
