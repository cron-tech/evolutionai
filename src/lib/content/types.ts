export interface CtaContent {
  label: string
  href: string
  variant: "primary" | "secondary"
}

export interface NavLink {
  label: string
  href: string
}

export type TextTone = "dimmed" | "accent" | "foreground"

export interface TitlePart {
  text: string
  tone: TextTone
}
