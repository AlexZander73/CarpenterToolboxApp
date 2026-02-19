import { describe, expect, it } from "vitest"
import { stairsRisersTreads } from "../calculators/stairsRisersTreads"

describe("stairsRisersTreads", () => {
  it("calculates risers and treads", () => {
    const result = stairsRisersTreads(2.7, 3.6, 0.175, "m", "m", "m")
    expect(result.risers).toBe(15)
    expect(result.treads).toBe(14)
  })
})
