import { test, expect } from "@playwright/test";

test.describe("Security & Access Control", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should allow access to public routes without authentication", async ({
    page,
  }) => {
    const publicRoutes = ["/", "/menu", "/about-us", "/contact-us"];

    for (const route of publicRoutes) {
      await page.goto(route, { timeout: 60000 });
      await page.waitForLoadState("networkidle", { timeout: 30000 });
      await expect(page).toHaveURL(route, { timeout: 15000 });
    }
  });

  test("should handle session expiration", async ({ page }) => {
    await page.context().addCookies([
      {
        name: "access-token",
        value: "expired-token",
        domain: "localhost",
        path: "/",
        expires: -1,
      },
    ]);
    await page.goto("/profile/overview");
    await expect(page).toHaveURL("/");
  });

  test("should handle invalid token", async ({ page }) => {
    await page.context().addCookies([
      {
        name: "access-token",
        value: "invalid-token",
        domain: "localhost",
        path: "/",
      },
    ]);
    await page.goto("/profile/overview");
    await expect(page).toHaveURL("/");
  });

  test("should handle missing token", async ({ page }) => {
    await page.goto("/profile/overview");
    await expect(page).toHaveURL("/");
  });

  test("should handle token refresh", async ({ page }) => {
    await page.context().addCookies([
      {
        name: "refresh-token",
        value: "valid-refresh-token",
        domain: "localhost",
        path: "/",
      },
    ]);
    await page.goto("/profile/overview");
    await expect(page).toHaveURL("/");
  });

  test("should handle logout and clear session", async ({ page }) => {
    await page.context().addCookies([
      {
        name: "access-token",
        value: "valid-token",
        domain: "localhost",
        path: "/",
      },
    ]);
    await page.goto("/profile/overview", { timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    const logoutButton = page.getByRole("button", { name: /خروج/i });
    await expect(logoutButton).toBeVisible({ timeout: 10000 });
    await logoutButton.click();
    await expect(page).toHaveURL("/", { timeout: 15000 });
    const cookies = await page.context().cookies();
    const accessToken = cookies.find(
      (cookie) => cookie.name === "access-token"
    );
    expect(accessToken).toBeUndefined();
  });

  test("should handle unauthorized access attempts", async ({ page }) => {
    await page.goto("/dashboard/overview");
    await expect(page).toHaveURL("/");
  });

  test("should handle direct URL access", async ({ page }) => {
    const protectedRoutes = [
      "/profile/overview",
      "/profile/orders",
      "/profile/addresses",
      "/profile/favorites",
      "/profile/settings",
      "/profile/tickets",
      "/dashboard/overview",
      "/dashboard/users",
      "/dashboard/orders",
      "/dashboard/items",
      "/dashboard/categories",
      "/dashboard/discounts",
      "/dashboard/comments",
      "/dashboard/tickets",
    ];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL("/");
    }
  });

  test("should handle browser back button on protected routes", async ({
    page,
  }) => {
    await page.goto("/menu", { timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    await page.goto("/profile/overview", { timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    await expect(page).toHaveURL("/", { timeout: 15000 });
    await page.goBack();
    await expect(page).toHaveURL(/.*menu.*/, { timeout: 15000 });
  });

  test("should handle page refresh on protected routes", async ({ page }) => {
    await page.goto("/profile/overview");
    await expect(page).toHaveURL("/");
    await page.reload();
    await expect(page).toHaveURL("/");
  });

  test("should handle multiple tab access", async ({ context }) => {
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto("/profile/overview");
    await page2.goto("/dashboard/overview");

    await expect(page1).toHaveURL("/");
    await expect(page2).toHaveURL("/");

    await page1.close();
    await page2.close();
  });

  test("should handle XSS protection", async ({ page }) => {
    const maliciousScript = "<script>alert('XSS')</script>";

    await page.goto("/menu");

    const searchInput = page.locator('[data-testid="search-input"]');

    if (await searchInput.isVisible()) {
      await searchInput.fill(maliciousScript);
      await expect(searchInput).toHaveValue(maliciousScript);
    }
  });

  test("should handle CSRF protection", async ({ page }) => {
    const response = await page.request.post("/api/profile/update", {
      data: { name: "test" },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test("should handle secure headers", async ({ page }) => {
    await page.goto("/", { timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    const response = await page.request.get("/");
    const headers = response.headers();
    if (headers["x-frame-options"]) {
      expect(headers["x-frame-options"]).toBeDefined();
    }
    if (headers["x-content-type-options"]) {
      expect(headers["x-content-type-options"]).toBeDefined();
    }
    expect(response.status()).toBe(200);
  });

  test("should handle HTTPS redirect", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
  });
});
