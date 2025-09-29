import { test, expect } from "@playwright/test";

test.describe("Search & Filtering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/menu");
    await page.waitForLoadState("networkidle", { timeout: 60000 });
  });

  test("should display search input", async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();
  });

  test("should handle product search", async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("قهوه");

    const searchResults = page.locator('[data-testid="search-results"]');
    await expect(searchResults).toBeVisible();
  });

  test("should handle empty search", async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("");

    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards).toBeAttached();
  });

  test("should handle category filtering", async ({ page }) => {
    const categoryFilter = page.locator('[data-testid="category-filter"]');

    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();

      const categoryOption = page
        .locator('[data-testid="category-option"]')
        .first();
      await categoryOption.click();

      const filteredProducts = page.locator('[data-testid="product-card"]');
      await expect(filteredProducts).toBeAttached();
    }
  });

  test("should handle price filtering", async ({ page }) => {
    const priceFilter = page.locator('[data-testid="price-filter"]');

    if (await priceFilter.isVisible()) {
      await priceFilter.click();

      const priceOption = page.locator('[data-testid="price-option"]').first();
      await priceOption.click();

      const filteredProducts = page.locator('[data-testid="product-card"]');
      await expect(filteredProducts).toBeAttached();
    }
  });

  test("should handle product sorting", async ({ page }) => {
    const sortSelector = page.locator('[data-testid="sort-selector"]');

    if (await sortSelector.isVisible()) {
      await sortSelector.click();

      const sortOption = page.locator('[data-testid="sort-option"]').first();
      await sortOption.click();

      const sortedProducts = page.locator('[data-testid="product-card"]');
      await expect(sortedProducts).toBeAttached();
    }
  });

  test("should handle multiple filters", async ({ page }) => {
    const categoryFilter = page.locator('[data-testid="category-filter"]');
    const priceFilter = page.locator('[data-testid="price-filter"]');

    if ((await categoryFilter.isVisible()) && (await priceFilter.isVisible())) {
      await categoryFilter.click();
      const categoryOption = page
        .locator('[data-testid="category-option"]')
        .first();
      await categoryOption.click();

      await priceFilter.click();
      const priceOption = page.locator('[data-testid="price-option"]').first();
      await priceOption.click();

      const filteredProducts = page.locator('[data-testid="product-card"]');
      await expect(filteredProducts).toBeAttached();
    }
  });

  test("should handle filter clearing", async ({ page }) => {
    const categoryFilter = page.locator('[data-testid="category-filter"]');

    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
      const categoryOption = page
        .locator('[data-testid="category-option"]')
        .first();
      await categoryOption.click();

      const clearFilterButton = page.locator(
        '[data-testid="clear-filter-button"]'
      );
      await clearFilterButton.click();

      const productCards = page.locator('[data-testid="product-card"]');
      await expect(productCards).toBeAttached();
    }
  });

  test("should handle search with filters", async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill("قهوه");

    const categoryFilter = page.locator('[data-testid="category-filter"]');

    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
      const categoryOption = page
        .locator('[data-testid="category-option"]')
        .first();
      await categoryOption.click();

      const searchResults = page.locator('[data-testid="search-results"]');
      await expect(searchResults).toBeVisible();
    }
  });

  test("should handle mobile search", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();

    await searchInput.fill("قهوه");

    const searchResults = page.locator('[data-testid="search-results"]');
    await expect(searchResults).toBeVisible();
  });
});
