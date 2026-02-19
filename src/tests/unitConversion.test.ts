import { describe, expect, it } from "vitest"
import { normalizeLengthToMeters } from "../engine/unit"

describe("unit conversion", () => {
  it("converts mm to meters", () => {
    expect(normalizeLengthToMeters(1200, "mm")).toBeCloseTo(1.2, 5)
  })
})
