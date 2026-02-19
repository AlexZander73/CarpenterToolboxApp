import { describe, expect, it } from "vitest"
import { wasteFactor } from "../calculators/wasteFactor"

describe("wasteFactor", () => {
  it("adds waste percentage", () => {
    const { total } = wasteFactor(100, 10)
    expect(total).toBeCloseTo(110, 5)
  })
})
