"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"

// SPEC_DEVIATION: footerContent (src/lib/content/footer.ts, T15) has no
// dedicated newsletter copy field, so the label/placeholder/confirmation
// strings below are inline rather than sourced from src/lib/content/.
// Reason: T15 was already committed by an earlier batch without that field,
// and NewsletterForm() takes no props per design.md — adding one would
// modify T15's already-shipped content contract, which is out of this
// batch's scope.
export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim().length === 0) {
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p role="status" className="text-body text-accent-500">
        Inscrição confirmada! Em breve você recebe novidades do Evolution.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        E-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="seu@email.com"
        className="h-10 flex-1 rounded-lg border border-border bg-transparent px-3 text-body text-foreground placeholder:text-text-dimmed"
      />
      <Button type="submit">Assinar</Button>
    </form>
  )
}
