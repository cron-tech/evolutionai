"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import type { NewsletterContent } from "@/lib/content/footer"

interface NewsletterFormProps {
  content: NewsletterContent
}

export function NewsletterForm({ content }: NewsletterFormProps) {
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
        {content.confirmation}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        {content.label}
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={content.placeholder}
        className="h-10 flex-1 rounded-lg border border-border bg-transparent px-3 text-body text-foreground placeholder:text-text-dimmed"
      />
      <Button type="submit">{content.ctaLabel}</Button>
    </form>
  )
}
