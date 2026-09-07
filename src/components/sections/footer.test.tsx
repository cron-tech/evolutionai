import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { Footer } from "./footer"
import { footerContent } from "@/lib/content/footer"

describe("Footer", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("renders the copyright year computed from the system date, not hardcoded (FOOTER-04)", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2031, 5, 15))

    render(<Footer content={footerContent} />)

    expect(screen.getByText(/2031/)).toBeInTheDocument()
  })

  it("reflects a different system year on a subsequent render, proving the year is not a fixed literal (FOOTER-04)", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2045, 0, 1))

    render(<Footer content={footerContent} />)

    expect(screen.getByText(/2045/)).toBeInTheDocument()
  })

  it("opens the Empresa column's Cron.Tech link in a new tab with rel=noopener noreferrer", () => {
    render(<Footer content={footerContent} />)

    const [cronTechLink] = screen.getAllByRole("link", { name: "Cron.Tech" })
    expect(cronTechLink).toHaveAttribute("href", "https://www.instagram.com/cron_tech")
    expect(cronTechLink).toHaveAttribute("target", "_blank")
    expect(cronTechLink).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("renders a development credit linking to Cron.Tech, also opening in a new tab", () => {
    const { container } = render(<Footer content={footerContent} />)

    expect(container.textContent).toContain(
      `${footerContent.credit.prefix}${footerContent.credit.label}`
    )

    const creditLinks = screen.getAllByRole("link", { name: "Cron.Tech" })
    const creditLink = creditLinks[creditLinks.length - 1]
    expect(creditLink).toHaveAttribute("href", footerContent.credit.href)
    expect(creditLink).toHaveAttribute("target", "_blank")
    expect(creditLink).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("does not add target/rel to an internal (non-external) footer link", () => {
    render(<Footer content={footerContent} />)

    const internalLink = screen.getByRole("link", { name: "Preços" })
    expect(internalLink).not.toHaveAttribute("target")
    expect(internalLink).not.toHaveAttribute("rel")
  })
})
