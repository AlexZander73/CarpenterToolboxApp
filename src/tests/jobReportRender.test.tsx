import "fake-indexeddb/auto"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { db } from "../data/db"
import JobReport from "../routes/JobReport"

describe("job report", () => {
  it("renders job report view", async () => {
    await db.jobs.put({
      id: "job-report",
      name: "Report Job",
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    render(
      <MemoryRouter initialEntries={["/jobs/job-report/report"]}>
        <Routes>
          <Route path="/jobs/:id/report" element={<JobReport />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(await screen.findByText("Report Job")).toBeTruthy()
  })
})
