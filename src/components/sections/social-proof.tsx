import Image from "next/image"
import type { SocialProofContent } from "@/lib/content/social-proof"

interface SocialProofProps {
  content: SocialProofContent
}

export function SocialProof({ content }: SocialProofProps) {
  return (
    <section className="px-6 py-[var(--spacing-section)] text-center">
      <p className="mx-auto max-w-2xl text-caption text-text-on-light-muted">{content.disclaimer}</p>

      <div className="mx-auto mt-10 flex max-w-[var(--container-max)] gap-10 overflow-x-auto pb-2 md:flex-wrap md:justify-center md:overflow-visible">
        {content.logos.map((logo) => (
          <div key={logo.name} className="flex shrink-0 items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.name}
              width={140}
              height={40}
              className="h-8 w-auto object-contain opacity-70"
            />
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-[var(--container-max)] gap-6 md:grid-cols-3">
        {content.testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col gap-4 rounded-2xl bg-background p-6 text-left shadow-[0_8px_24px_-8px_rgb(0_0_0_/_0.15)]"
          >
            <blockquote className="text-body text-text-on-light">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="text-caption text-text-on-light-muted">
              <span className="font-medium text-text-on-light">{testimonial.name}</span> —{" "}
              {testimonial.role}, {testimonial.company}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
