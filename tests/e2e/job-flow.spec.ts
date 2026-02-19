import { test, expect } from "@playwright/test"

test("create job and open report", async ({ page }) => {
  await page.goto("/#/jobs")
  await page.getByPlaceholder("Job name").fill("Site Visit A")
  await page.getByRole("button", { name: "Create Job" }).click()
  await page.getByText("Site Visit A").first().click()
  await page.getByText("Open job report").click()
  await expect(page.getByText("Site Visit A")).toBeVisible()
})
