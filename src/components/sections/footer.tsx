import type { FooterContent } from "@/lib/content/footer"
import { NewsletterForm } from "./newsletter-form"

interface FooterProps {
  content: FooterContent
}

export function Footer({ content }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bg-page px-6 py-[var(--spacing-section)]">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-12">
        <div className="flex flex-col gap-4 md:max-w-sm">
          <a href="#" className="text-lg font-semibold text-foreground">
            Evolution
          </a>
          <p className="text-body text-text-muted">{content.description}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {content.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-caption font-medium tracking-wide text-text-subtle uppercase">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-body text-text-muted hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body text-text-muted">Receba novidades do Evolution</p>
          <NewsletterForm content={content.newsletter} />
        </div>

        <div className="flex gap-4">
          {content.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 text-text-muted hover:text-foreground"
            >
              <span aria-hidden="true" className="text-caption">
                {social.label[0]}
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-caption text-text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Evolution. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            {content.legalLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-text-muted">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
