import { describe, expect, it } from "vitest"
import { roofPitchToDegrees } from "../calculators/roofPitch"

describe("roofPitchToDegrees", () => {
  it("converts rise/run to degrees", () => {
    const { degrees } = roofPitchToDegrees(1, 4, "m", "m")
    expect(degrees).toBeCloseTo(14.036, 3)
  })
})
