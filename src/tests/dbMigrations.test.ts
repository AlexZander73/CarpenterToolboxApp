import "fake-indexeddb/auto"
import { describe, expect, it } from "vitest"
import { db } from "../data/db"

describe("db migrations", () => {
  it("opens and creates tables", async () => {
    await db.open()
    const tables = db.tables.map((t) => t.name)
    expect(tables).toContain("jobs")
    expect(tables).toContain("calculations")
  })
})
