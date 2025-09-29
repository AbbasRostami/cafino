import { test, expect } from "@playwright/test";

test.describe("Admin Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should redirect to home when accessing admin without authentication", async ({
    page,
  }) => {
    await page.goto("/dashboard/overview");

    await expect(page).toHaveURL("/");
  });

  test("should display admin login page", async ({ page }) => {
    await page.goto("/admin-login");

    await expect(page).toHaveURL(/.*admin-login.*/);

    const adminLoginForm = page.locator('[data-testid="admin-login-form"]');
    await expect(adminLoginForm).toBeVisible();
  });

  test("should handle admin login form", async ({ page }) => {
    await page.goto("/admin-login");

    const usernameField = page.locator('[data-testid="username-field"]');
    const passwordField = page.locator('[data-testid="password-field"]');
    const loginButton = page.getByRole("button", { name: /ورود/i });

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test("should validate admin login form", async ({ page }) => {
    await page.goto("/admin-login");
    await page.goto("/admin-login");

    const loginButton = page.getByRole("button", { name: /ورود/i });
    await loginButton.click();

    const validationErrors = page.locator('[data-testid="validation-error"]');
    await expect(validationErrors).toBeAttached();
  });

  test("should handle admin authentication", async ({ page }) => {
    await page.goto("/admin-login");

    const usernameField = page.locator('[data-testid="username-field"]');
    const passwordField = page.locator('[data-testid="password-field"]');
    const loginButton = page.getByRole("button", { name: /ورود/i });

    await usernameField.fill("admin");
    await passwordField.fill("password");
    await loginButton.click();

    await expect(page).toHaveURL(/.*dashboard\/overview.*/);
  });

  test("should display admin dashboard overview", async ({ page }) => {
    await page.goto("/dashboard/overview");

    await expect(page).toHaveURL(/.*dashboard\/overview.*/);

    const dashboardContent = page.locator('[data-testid="dashboard-content"]');
    await expect(dashboardContent).toBeVisible();
  });

  test("should display admin sidebar", async ({ page }) => {
    await page.goto("/dashboard/overview");

    const adminSidebar = page.locator('[data-testid="admin-sidebar"]');
    await expect(adminSidebar).toBeVisible();

    const sidebarItems = page.locator('[data-testid="sidebar-item"]');
    await expect(sidebarItems).toBeAttached();
  });

  test("should display dashboard statistics", async ({ page }) => {
    await page.goto("/dashboard/overview");

    const statisticsCards = page.locator('[data-testid="statistics-card"]');
    await expect(statisticsCards).toBeAttached();

    const totalUsers = page.locator('[data-testid="total-users"]');
    const totalOrders = page.locator('[data-testid="total-orders"]');
    const totalRevenue = page.locator('[data-testid="total-revenue"]');

    await expect(totalUsers).toBeAttached();
    await expect(totalOrders).toBeAttached();
    await expect(totalRevenue).toBeAttached();
  });

  test("should navigate to users management", async ({ page }) => {
    await page.goto("/dashboard/users");

    await expect(page).toHaveURL(/.*dashboard\/users.*/);

    const usersContent = page.locator('[data-testid="users-content"]');
    await expect(usersContent).toBeVisible();
  });

  test("should display users list", async ({ page }) => {
    await page.goto("/dashboard/users");

    const usersTable = page.locator('[data-testid="users-table"]');
    await expect(usersTable).toBeVisible();

    const userItems = page.locator('[data-testid="user-item"]');
    await expect(userItems).toBeAttached();
  });

  test("should handle user management actions", async ({ page }) => {
    await page.goto("/dashboard/users");

    const editUserButton = page.locator('[data-testid="edit-user-button"]');
    const deleteUserButton = page.locator('[data-testid="delete-user-button"]');
    const changePermissionButton = page.locator(
      '[data-testid="change-permission-button"]'
    );

    await expect(editUserButton).toBeAttached();
    await expect(deleteUserButton).toBeAttached();
    await expect(changePermissionButton).toBeAttached();
  });

  test("should navigate to orders management", async ({ page }) => {
    await page.goto("/dashboard/orders");

    await expect(page).toHaveURL(/.*dashboard\/orders.*/);

    const ordersContent = page.locator('[data-testid="orders-content"]');
    await expect(ordersContent).toBeVisible();
  });

  test("should display orders list", async ({ page }) => {
    await page.goto("/dashboard/orders");
    await page.goto("/dashboard/orders");

    const ordersTable = page.locator('[data-testid="orders-table"]');
    await expect(ordersTable).toBeVisible();

    const orderItems = page.locator('[data-testid="order-item"]');
    await expect(orderItems).toBeAttached();
  });

  test("should handle order status change", async ({ page }) => {
    await page.goto("/dashboard/orders");
    await page.goto("/dashboard/orders");

    const statusSelector = page.locator('[data-testid="status-selector"]');

    if (await statusSelector.isVisible()) {
      await statusSelector.click();

      const statusOptions = page.locator('[data-testid="status-option"]');
      await expect(statusOptions).toBeAttached();
    }
  });

  test("should navigate to items management", async ({ page }) => {
    await page.goto("/dashboard/items");
    await page.goto("/dashboard/items");

    await expect(page).toHaveURL(/.*dashboard\/items.*/);

    const itemsContent = page.locator('[data-testid="items-content"]');
    await expect(itemsContent).toBeVisible();
  });

  test("should display items list", async ({ page }) => {
    await page.goto("/dashboard/items");
    await page.goto("/dashboard/items");

    const itemsTable = page.locator('[data-testid="items-table"]');
    await expect(itemsTable).toBeVisible();

    const itemItems = page.locator('[data-testid="item-item"]');
    await expect(itemItems).toBeAttached();
  });

  test("should handle add new item", async ({ page }) => {
    await page.goto("/dashboard/items");
    await page.goto("/dashboard/items");

    const addItemButton = page.getByRole("button", {
      name: /اضافه کردن آیتم/i,
    });
    await expect(addItemButton).toBeVisible();

    await addItemButton.click();

    const itemForm = page.locator('[data-testid="item-form"]');
    await expect(itemForm).toBeVisible();
  });

  test("should handle edit item", async ({ page }) => {
    await page.goto("/dashboard/items");
    await page.goto("/dashboard/items");

    const editItemButton = page.locator('[data-testid="edit-item-button"]');

    if (await editItemButton.isVisible()) {
      await editItemButton.click();

      const itemForm = page.locator('[data-testid="item-form"]');
      await expect(itemForm).toBeVisible();
    }
  });

  test("should navigate to categories management", async ({ page }) => {
    await page.goto("/dashboard/categories");
    await page.goto("/dashboard/categories");

    await expect(page).toHaveURL(/.*dashboard\/categories.*/);

    const categoriesContent = page.locator(
      '[data-testid="categories-content"]'
    );
    await expect(categoriesContent).toBeVisible();
  });

  test("should display categories list", async ({ page }) => {
    await page.goto("/dashboard/categories");
    await page.goto("/dashboard/categories");

    const categoriesTable = page.locator('[data-testid="categories-table"]');
    await expect(categoriesTable).toBeVisible();

    const categoryItems = page.locator('[data-testid="category-item"]');
    await expect(categoryItems).toBeAttached();
  });

  test("should handle add new category", async ({ page }) => {
    await page.goto("/dashboard/categories");
    await page.goto("/dashboard/categories");

    const addCategoryButton = page.getByRole("button", {
      name: /اضافه کردن دسته‌بندی/i,
    });
    await expect(addCategoryButton).toBeVisible();

    await addCategoryButton.click();

    const categoryForm = page.locator('[data-testid="category-form"]');
    await expect(categoryForm).toBeVisible();
  });

  test("should navigate to discounts management", async ({ page }) => {
    await page.goto("/dashboard/discounts");
    await page.goto("/dashboard/discounts");

    await expect(page).toHaveURL(/.*dashboard\/discounts.*/);

    const discountsContent = page.locator('[data-testid="discounts-content"]');
    await expect(discountsContent).toBeVisible();
  });

  test("should display discounts list", async ({ page }) => {
    await page.goto("/dashboard/discounts");
    await page.goto("/dashboard/discounts");

    const discountsTable = page.locator('[data-testid="discounts-table"]');
    await expect(discountsTable).toBeVisible();

    const discountItems = page.locator('[data-testid="discount-item"]');
    await expect(discountItems).toBeAttached();
  });

  test("should handle add new discount", async ({ page }) => {
    await page.goto("/dashboard/discounts");
    await page.goto("/dashboard/discounts");

    const addDiscountButton = page.getByRole("button", {
      name: /اضافه کردن تخفیف/i,
    });
    await expect(addDiscountButton).toBeVisible();

    await addDiscountButton.click();

    const discountForm = page.locator('[data-testid="discount-form"]');
    await expect(discountForm).toBeVisible();
  });

  test("should navigate to comments management", async ({ page }) => {
    await page.goto("/dashboard/comments");
    await page.goto("/dashboard/comments");

    await expect(page).toHaveURL(/.*dashboard\/comments.*/);

    const commentsContent = page.locator('[data-testid="comments-content"]');
    await expect(commentsContent).toBeVisible();
  });

  test("should display comments list", async ({ page }) => {
    await page.goto("/dashboard/comments");
    await page.goto("/dashboard/comments");

    const commentsTable = page.locator('[data-testid="comments-table"]');
    await expect(commentsTable).toBeVisible();

    const commentItems = page.locator('[data-testid="comment-item"]');
    await expect(commentItems).toBeAttached();
  });

  test("should handle comment moderation", async ({ page }) => {
    await page.goto("/dashboard/comments");
    await page.goto("/dashboard/comments");

    const approveCommentButton = page.locator(
      '[data-testid="approve-comment-button"]'
    );
    const rejectCommentButton = page.locator(
      '[data-testid="reject-comment-button"]'
    );

    await expect(approveCommentButton).toBeAttached();
    await expect(rejectCommentButton).toBeAttached();
  });

  test("should navigate to tickets management", async ({ page }) => {
    await page.goto("/dashboard/tickets");
    await page.goto("/dashboard/tickets");

    await expect(page).toHaveURL(/.*dashboard\/tickets.*/);

    const ticketsContent = page.locator('[data-testid="tickets-content"]');
    await expect(ticketsContent).toBeVisible();
  });

  test("should display support tickets", async ({ page }) => {
    await page.goto("/dashboard/tickets");
    await page.goto("/dashboard/tickets");

    const ticketsTable = page.locator('[data-testid="tickets-table"]');
    await expect(ticketsTable).toBeVisible();

    const ticketItems = page.locator('[data-testid="ticket-item"]');
    await expect(ticketItems).toBeAttached();
  });

  test("should handle ticket response", async ({ page }) => {
    await page.goto("/dashboard/tickets");
    await page.goto("/dashboard/tickets");

    const respondButton = page.locator('[data-testid="respond-ticket-button"]');

    if (await respondButton.isVisible()) {
      await respondButton.click();

      const responseForm = page.locator('[data-testid="ticket-response-form"]');
      await expect(responseForm).toBeVisible();
    }
  });

  test("should handle admin logout", async ({ page }) => {
    await page.goto("/dashboard/overview");
    const adminDropdown = page.locator('[data-testid="admin-dropdown"]');
    await adminDropdown.click();

    const logoutButton = page.getByRole("button", { name: /خروج/i });
    await logoutButton.click();

    await expect(page).toHaveURL("/");
  });

  test("should handle mobile admin experience", async ({ page }) => {
    await page.goto("/dashboard/overview");
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/dashboard/overview");

    const dashboardContent = page.locator('[data-testid="dashboard-content"]');
    await expect(dashboardContent).toBeVisible();

    const mobileSidebar = page.locator('[data-testid="mobile-sidebar"]');
    await expect(mobileSidebar).toBeVisible();
  });
});
