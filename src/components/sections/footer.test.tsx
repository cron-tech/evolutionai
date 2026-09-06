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
})
