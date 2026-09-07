export interface CtaContent {
  label: string
  href: string
  variant: "primary" | "secondary"
}

export interface NavLink {
  label: string
  href: string
  /** True for a link that leaves the page (e.g. an external social profile). */
  external?: boolean
}

export type TextTone = "dimmed" | "accent" | "foreground"

export interface TitlePart {
  text: string
  tone: TextTone
}
