import { describe, expect, it } from "vitest"
import { getActiveStepIndex } from "./narrative-steps.utils"

describe("getActiveStepIndex", () => {
  it("clamps to 0 when progress is at or below 0", () => {
    expect(getActiveStepIndex(3, 0)).toBe(0)
    expect(getActiveStepIndex(3, -0.5)).toBe(0)
  })

  it("clamps to the last index when progress is at or above 1", () => {
    expect(getActiveStepIndex(3, 1)).toBe(2)
    expect(getActiveStepIndex(3, 1.5)).toBe(2)
  })

  it("returns the correct single index below the first threshold", () => {
    // stepCount=3 -> thresholds at 1/3 and 2/3; 0.1 is below the first
    expect(getActiveStepIndex(3, 0.1)).toBe(0)
  })

  it("returns the correct single index strictly between two thresholds", () => {
    // stepCount=3 -> thresholds at 1/3 (~0.333) and 2/3 (~0.667); 0.5 is between them
    expect(getActiveStepIndex(3, 0.5)).toBe(1)
  })

  it("returns a deterministic single index exactly at a threshold boundary", () => {
    // stepCount=4 -> exact threshold at 0.5 between step index 1 and 2
    expect(getActiveStepIndex(4, 0.5)).toBe(2)
  })

  it("returns the correct single index above the last threshold, before the extreme clamp", () => {
    // stepCount=3 -> thresholds at 1/3 and 2/3; 0.9 is above the last threshold but < 1
    expect(getActiveStepIndex(3, 0.9)).toBe(2)
  })
})
