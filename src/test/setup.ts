import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

// jsdom has no IntersectionObserver. Motion's whileInView (used by
// src/components/common/reveal.tsx) needs the constructor to exist to mount
// at all — a minimal stub that never actually fires an entry is enough:
// components render in their initial (pre-reveal) state, which every test
// that doesn't specifically exercise scroll-reveal behavior treats as
// equivalent to "rendered".
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ""
  readonly thresholds: number[] = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver)

afterEach(() => {
  cleanup()
})
