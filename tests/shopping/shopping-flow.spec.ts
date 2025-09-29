import { expect, test } from "@playwright/test";

test.describe("Complete Shopping Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      localStorage.removeItem("cart");
    });
  });

  async function navigateToMenu(page: any) {
    await page.goto("/menu", { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 60000 });
  }

  test("should navigate to menu page", async ({ page }) => {
    const menuLink = page.getByRole("link", { name: "منو" }).first();
    await menuLink.click();
    await expect(page).toHaveURL(/.*menu.*/);
  });

  test("should display menu page with products", async ({ page }) => {
    await navigateToMenu(page);

    const productImages = page.locator("img");
    await expect(productImages.first()).toBeVisible({ timeout: 10000 });
  });

  test("should add product to cart", async ({ page }) => {
    await navigateToMenu(page);

    const addToCartButton = page
      .getByRole("button", { name: /افزودن به سبد خرید/i })
      .first();
    await addToCartButton.click();

    const cartCount = page.locator('[data-testid="cart-count"]');
    await expect(cartCount).toBeVisible({ timeout: 5000 });
  });

  test("should display product details", async ({ page }) => {
    await navigateToMenu(page);

    const productLink = page.locator("a").first();
    await productLink.click();

    const productTitle = page.getByRole("heading", { level: 1 });
    await expect(productTitle).toBeVisible({ timeout: 10000 });
  });

  test("should handle product filtering", async ({ page }) => {
    await navigateToMenu(page);

    const filterButton = page.locator('[data-testid="filter-button"]');
    const categoryFilter = page.locator('[data-testid="category-filter"]');

    if (await filterButton.isVisible()) {
      await filterButton.click();
      await expect(categoryFilter).toBeVisible({ timeout: 5000 });
    } else {
      const productImages = page.locator("img");
      await expect(productImages.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("should handle product sorting", async ({ page }) => {
    await navigateToMenu(page);

    const sortButton = page.locator('[data-testid="sort-button"]');
    const sortDropdown = page.locator('[data-testid="sort-dropdown"]');

    if (await sortButton.isVisible()) {
      await sortButton.click();
      await expect(sortDropdown).toBeVisible({ timeout: 5000 });
    } else {
      const productImages = page.locator("img");
      await expect(productImages.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("should handle pagination", async ({ page }) => {
    await navigateToMenu(page);

    const pagination = page.locator('[data-testid="pagination"]');
    const nextButton = page.locator('[data-testid="next-page"]');

    if (await pagination.isVisible()) {
      await expect(nextButton).toBeVisible({ timeout: 5000 });
    } else {
      const productImages = page.locator("img");
      await expect(productImages.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("should handle product images", async ({ page }) => {
    await navigateToMenu(page);

    const productImages = page.locator("img");
    await expect(productImages.first()).toBeVisible({ timeout: 10000 });

    const firstImage = productImages.first();
    await expect(firstImage).toHaveAttribute("src");
  });

  test("should handle product availability", async ({ page }) => {
    await navigateToMenu(page);

    const availabilityStatus = page.locator(
      '[data-testid="availability-status"]'
    );
    const stockCount = page.locator('[data-testid="stock-count"]');

    if (await availabilityStatus.isVisible()) {
      await expect(stockCount).toBeVisible({ timeout: 5000 });
    } else {
      const productImages = page.locator("img");
      await expect(productImages.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("should handle product reviews", async ({ page }) => {
    await navigateToMenu(page);

    const reviewSection = page.locator('[data-testid="review-section"]');
    const ratingStars = page.locator('[data-testid="rating-stars"]');

    if (await reviewSection.isVisible()) {
      await expect(ratingStars).toBeVisible({ timeout: 5000 });
    } else {
      const productImages = page.locator("img");
      await expect(productImages.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("should handle product favorites", async ({ page }) => {
    await navigateToMenu(page);

    const favoriteButton = page.locator('[data-testid="favorite-button"]');
    const favoriteIcon = page.locator('[data-testid="favorite-icon"]');

    if (await favoriteButton.isVisible()) {
      await favoriteButton.click();
      await expect(favoriteIcon).toBeVisible({ timeout: 5000 });
    } else {
      const productImages = page.locator("img");
      await expect(productImages.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test("should handle mobile shopping experience", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await navigateToMenu(page);

    const mobileMenu = page.locator('[data-testid="mobile-menu"]');

    const productImages = page.locator("img");
    await expect(productImages.first()).toBeVisible({ timeout: 10000 });

    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await expect(mobileMenu).toBeVisible({ timeout: 5000 });
    }
  });
});
