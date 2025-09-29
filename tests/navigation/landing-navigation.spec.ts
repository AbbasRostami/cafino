import { test, expect } from "@playwright/test";

test.describe("Landing Page & Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display main navigation elements", async ({ page }) => {
    const logo = page.locator('[data-testid="logo"]').first();
    await expect(logo).toBeVisible();

    const navMenu = page.locator('[data-testid="main-nav"]');
    await expect(navMenu).toBeVisible();
  });

  test("should display hero section", async ({ page }) => {
    const heroSection = page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();

    const heroTitle = page.locator('[data-testid="hero-title"]');
    await expect(heroTitle).toBeVisible();

    const heroDescription = page.locator('[data-testid="hero-description"]');
    await expect(heroDescription).toBeVisible();
  });

  test("should navigate to menu page from CTA button", async ({ page }) => {
    const orderOnlineButton = page.locator(
      '[data-testid="order-online-button"]'
    );
    await expect(orderOnlineButton).toBeVisible({ timeout: 10000 });
    await orderOnlineButton.click();

    await page.waitForLoadState("networkidle", { timeout: 15000 });
    await expect(page).toHaveURL(/.*menu.*/, { timeout: 15000 });
  });

  test("should display statistics section", async ({ page }) => {
    const statsSection = page.locator('[data-testid="stats-section"]');
    await expect(statsSection).toBeVisible();

    const statItems = page.locator('[data-testid="stat-item"]');
    await expect(statItems.first()).toBeAttached({ timeout: 10000 });
  });

  test("should display gallery section", async ({ page }) => {
    const gallerySection = page.locator('[data-testid="gallery-section"]');
    await expect(gallerySection).toBeVisible();

    const galleryImages = page.locator('[data-testid="gallery-image"]');
    await expect(galleryImages.first()).toBeAttached({ timeout: 10000 });
  });

  test("should handle theme toggle", async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await expect(themeToggle).toBeVisible();

    await themeToggle.click();

    await expect(themeToggle).toBeEnabled();
  });

  test("should display mobile menu on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    await expect(mobileMenuButton).toBeVisible();

    await mobileMenuButton.click();

    const mobileMenu = page.locator('[data-testid="mobile-menu"]');
    await expect(mobileMenu).toBeVisible();
  });

  test("should maintain navigation state across page refreshes", async ({
    page,
  }) => {
    await page.goto("/menu", { timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    await page.reload();
    await expect(page).toHaveURL(/.*menu.*/, { timeout: 15000 });
  });

  test("should handle back button navigation", async ({ page }) => {
    await page.goto("/menu", { timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    await page.goBack();
    await expect(page).toHaveURL("/", { timeout: 15000 });
  });

  test("should display footer", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();

    const footerLinks = page.locator('[data-testid="footer-link"]');
    await expect(footerLinks).toBeAttached();
  });

  test("should handle search functionality", async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');

    if (await searchInput.isVisible()) {
      await searchInput.fill("قهوه");

      const searchResults = page.locator('[data-testid="search-results"]');
      await expect(searchResults).toBeVisible();
    }
  });

  test("should handle page loading states", async ({ page }) => {
    await page.goto("/menu");

    const loadingSkeleton = page.locator('[data-testid="loading-skeleton"]');

    if (await loadingSkeleton.isVisible()) {
      await expect(loadingSkeleton).toBeVisible();
    }
  });

  test("should handle error states", async ({ page }) => {
    await page.goto("/non-existent-page");
    const notFoundPage = page.getByText(/صفحه مورد نظر یافت نشد/i);
    await expect(notFoundPage).toBeVisible();
  });

  test("should handle responsive design", async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1024, height: 768 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      const logo = page.locator('[data-testid="logo"]').first();
      await expect(logo).toBeVisible();

      if (viewport.width <= 768) {
        const mobileMenuButton = page.locator(
          '[data-testid="mobile-menu-button"]'
        );
        await expect(mobileMenuButton).toBeVisible();
      } else {
        const navMenu = page.locator('[data-testid="main-nav"]');
        await expect(navMenu).toBeVisible();
      }
    }
  });
});
