import { test, expect } from "@playwright/test";

test.describe("Pages render", () => {
  test("home page shows hero, favourites, and events", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Your table",
    );
    await expect(
      page.getByRole("heading", { name: "What everyone orders" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Upcoming events" }),
    ).toBeVisible();
    await expect(page.getByText("Open Night")).toBeVisible();
    await expect(page.getByText("Coffee Tasting")).toBeVisible();
  });

  test("menu page lists all items and filters by category", async ({
    page,
  }) => {
    await page.goto("/menu");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "pouring",
    );
    await expect(page.getByRole("article")).toHaveCount(20);

    await page.getByRole("tab", { name: "Pastry" }).click();
    await expect(page.getByRole("article")).toHaveCount(4);
    await expect(page.getByText("Cinnamon Roll")).toBeVisible();
    await expect(page.getByText("Turkey & Swiss Panini")).not.toBeVisible();

    await page.getByRole("tab", { name: "All" }).click();
    await expect(page.getByRole("article")).toHaveCount(20);
  });

  test("menu item photos actually load", async ({ page }) => {
    await page.goto("/menu");

    const firstImage = page.getByRole("img").first();
    await expect(firstImage).toBeVisible();
    await expect(async () => {
      const naturalWidth = await firstImage.evaluate(
        (img: HTMLImageElement) => img.naturalWidth,
      );
      expect(naturalWidth).toBeGreaterThan(0);
    }).toPass();
  });

  test("about page tells the founders' story", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "small kitchen",
    );
    await expect(page.getByText("Priya Anand")).toBeVisible();
    await expect(page.getByText("Jonah Mercer")).toBeVisible();
  });
});
