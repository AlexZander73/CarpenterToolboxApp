import { describe, expect, it } from "vitest"
import { areaRectangle } from "../calculators/areaRectangle"

describe("areaRectangle", () => {
  it("calculates rectangle area in meters", () => {
    const { area } = areaRectangle(2, 3, "m", "m")
    expect(area).toBeCloseTo(6, 5)
  })
})
