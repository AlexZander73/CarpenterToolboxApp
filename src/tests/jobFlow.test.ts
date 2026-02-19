import "fake-indexeddb/auto"
import { describe, expect, it } from "vitest"
import { db } from "../data/db"

describe("job flow", () => {
  it("creates job and calculation", async () => {
    const jobId = "job-test"
    await db.jobs.put({
      id: jobId,
      name: "Test Job",
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    await db.calculations.put({
      id: "calc-test",
      jobId,
      calculatorId: "area-rectangle",
      calculatorName: "Area of a Rectangle",
      inputs: { length: 2, width: 3 },
      outputs: { area: 6 },
      rounding: {
        mode: "fixed",
        length: 2,
        angle: 2,
        area: 3,
        volume: 3,
      },
      timestamp: Date.now(),
    })
    const job = await db.jobs.get(jobId)
    const calcs = await db.calculations.where("jobId").equals(jobId).toArray()
    expect(job?.name).toBe("Test Job")
    expect(calcs.length).toBe(1)
  })
})
