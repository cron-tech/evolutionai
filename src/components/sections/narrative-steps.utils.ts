/**
 * Derives which narrative step is "active" from the scroll progress (0..1)
 * through the section. Pure function, extracted so it is testable without
 * simulating real scroll behavior in jsdom.
 */
export function getActiveStepIndex(stepCount: number, progress: number): number {
  if (stepCount <= 1) return 0
  if (progress <= 0) return 0
  if (progress >= 1) return stepCount - 1

  const index = Math.floor(progress * stepCount)
  return Math.min(index, stepCount - 1)
}
