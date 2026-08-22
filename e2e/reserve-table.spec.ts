import { test, expect } from "@playwright/test";

function futureDateString(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().slice(0, 10);
}

test.describe("Reserve a Table", () => {
  test("opens from the nav, submits, and shows a confirmation", async ({
    page,
  }) => {
    await page.goto("/");

    await page
      .locator("header")
      .getByRole("button", { name: "Reserve a Table" })
      .click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Reserve a Table" }),
    ).toBeVisible();

    const date = futureDateString(14);

    await dialog.getByLabel("Name").fill("Alex Rivera");
    await dialog.getByLabel("Number of people").fill("4");
    await dialog.getByLabel("Date").fill(date);
    await dialog.getByLabel("Time").fill("18:30");
    await dialog.getByRole("button", { name: "Confirm reservation" }).click();

    await expect(dialog.getByRole("heading", { name: /on the list/i })).toBeVisible();
    await expect(dialog).toContainText("Alex Rivera");
    await expect(dialog).toContainText("4");
    await expect(dialog).toContainText(date);
    await expect(dialog).toContainText("18:30");

    await dialog.getByRole("button", { name: "Done" }).click();
    await expect(dialog).toBeHidden();
  });

  test("blocks submission when the name is missing", async ({ page }) => {
    await page.goto("/");

    await page
      .locator("header")
      .getByRole("button", { name: "Reserve a Table" })
      .click();

    const dialog = page.getByRole("dialog");
    await dialog.getByLabel("Date").fill(futureDateString(7));
    await dialog.getByLabel("Time").fill("09:00");
    await dialog.getByRole("button", { name: "Confirm reservation" }).click();

    // Native required-field validation should keep the form open rather
    // than advancing to the confirmation state.
    await expect(
      dialog.getByRole("heading", { name: "Reserve a Table" }),
    ).toBeVisible();
  });

  test("can also be opened from an event card", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Reserve a spot" }).first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Reserve a Table" }),
    ).toBeVisible();
  });
});
