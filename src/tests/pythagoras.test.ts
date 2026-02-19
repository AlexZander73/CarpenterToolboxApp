import { describe, expect, it } from "vitest"
import { pythagorasRafter } from "../calculators/pythagorasRafter"

describe("pythagorasRafter", () => {
  it("returns hypotenuse length", () => {
    const { length } = pythagorasRafter(3, 4, "m", "m")
    expect(length).toBeCloseTo(5, 5)
  })
})
