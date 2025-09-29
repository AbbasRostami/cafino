import { test, expect } from "@playwright/test";

test.describe("User Profile Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 30000 });

    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should redirect to home when accessing profile without authentication", async ({
    page,
  }) => {
    await page.goto("/profile/overview", { timeout: 60000 });

    await expect(page).toHaveURL("/", { timeout: 10000 });
  });

  test("should display login button when not authenticated", async ({
    page,
  }) => {
    const loginButton = page.locator(
      '[data-testid="user-dropdown-login-button"]'
    );
    await expect(loginButton).toBeVisible();
  });

  test.only("should handle authentication flow", async ({ page }) => {
    await page.route("**/api/v1/auth/send-otp", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          statusCode: 201,
          message: "Code sent successfully.",
          data: {
            otpCode: "12345",
          },
        }),
      });
    });

    await page.route("**/api/v1/auth/verfiy-otp", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          statusCode: 200,
          message: "OTP verified successfully.",
          data: {
            accessToken: "mock-access-token",
            refreshToken: "mock-refresh-token",
            user: {
              id: 1,
              first_name: "تست",
              last_name: "کاربر",
              phone: "09123456788",
              role: "user",
            },
          },
        }),
      });
    });

    let otpCode: string | null = null;
    let apiCallMade = false;

    page.on("response", async (response) => {
      console.log("API Response:", response.url(), response.status());
      if (
        response.url().includes("/api/v1/auth/send-otp") &&
        response.status() === 201
      ) {
        apiCallMade = true;
        try {
          const body = await response.json();
          console.log("Full API Response:", body);
          otpCode = body.data?.otpCode || body.otpCode || body.otp;
          console.log("OTP Code received:", otpCode);
        } catch (error) {
          console.error("Error parsing OTP response:", error);
        }
      }
    });

    const loginButton = page.locator(
      '[data-testid="user-dropdown-login-button"]'
    );
    await expect(loginButton).toBeVisible({ timeout: 10000 });
    await loginButton.click();

    const loginModal = page.getByRole("dialog");
    await expect(loginModal).toBeVisible({ timeout: 10000 });

    const phoneInput = page.locator('[data-testid="phone-input"]');
    await expect(phoneInput).toBeVisible({ timeout: 10000 });
    await phoneInput.fill("09173456788");

    const sendOTPButton = page.locator('[data-testid="send-otp-button"]');
    await expect(sendOTPButton).toBeVisible({ timeout: 10000 });
    await sendOTPButton.click();

    const otpInput = page.locator('[data-testid="otp-input"]');
    await expect(otpInput).toBeVisible({ timeout: 15000 });

    await otpInput.fill("12345");
    console.log("OTP filled with mocked code: 12345");

    await page.waitForTimeout(3000);

    await expect(loginModal).not.toBeVisible({ timeout: 10000 });
  });

  test("should display user dropdown when authenticated", async ({ page }) => {
    const userDropdown = page.locator('[data-testid="user-dropdown"]');

    await expect(userDropdown).toBeAttached();
  });

  test("should navigate to profile overview", async ({ page }) => {
    await page.goto("/profile/overview");

    await expect(page).toHaveURL(/.*profile\/overview.*/);

    const profileOverview = page.locator('[data-testid="profile-overview"]');
    await expect(profileOverview).toBeVisible();
  });

  test("should display user information", async ({ page }) => {
    await page.goto("/profile/overview");

    const userName = page.locator('[data-testid="user-name"]');
    const userEmail = page.locator('[data-testid="user-email"]');
    const userPhone = page.locator('[data-testid="user-phone"]');

    await expect(userName).toBeAttached();
    await expect(userEmail).toBeAttached();
    await expect(userPhone).toBeAttached();
  });

  test("should display user statistics", async ({ page }) => {
    await page.goto("/profile/overview");

    const totalOrders = page.locator('[data-testid="total-orders"]');
    const totalSpent = page.locator('[data-testid="total-spent"]');
    const favoriteItems = page.locator('[data-testid="favorite-items"]');

    await expect(totalOrders).toBeAttached();
    await expect(totalSpent).toBeAttached();
    await expect(favoriteItems).toBeAttached();
  });

  test("should navigate to orders page", async ({ page }) => {
    await page.goto("/profile/orders");

    await expect(page).toHaveURL(/.*profile\/orders.*/);

    const ordersContent = page.locator('[data-testid="orders-content"]');
    await expect(ordersContent).toBeVisible();
  });

  test("should display order history", async ({ page }) => {
    await page.goto("/profile/orders");

    const orderHistory = page.locator('[data-testid="order-history"]');
    await expect(orderHistory).toBeVisible();

    const orderItems = page.locator('[data-testid="order-item"]');
    await expect(orderItems).toBeAttached();
  });

  test("should handle order status", async ({ page }) => {
    await page.goto("/profile/orders");

    const orderStatus = page.locator('[data-testid="order-status"]');
    await expect(orderStatus).toBeAttached();

    const orderActions = page.locator('[data-testid="order-actions"]');
    await expect(orderActions).toBeAttached();
  });

  test("should navigate to addresses page", async ({ page }) => {
    await page.goto("/profile/addresses");

    await expect(page).toHaveURL(/.*profile\/addresses.*/);

    const addressesContent = page.locator('[data-testid="addresses-content"]');
    await expect(addressesContent).toBeVisible();
  });

  test("should display address list", async ({ page }) => {
    await page.goto("/profile/addresses");

    const addressList = page.locator('[data-testid="address-list"]');
    await expect(addressList).toBeVisible();

    const addressItems = page.locator('[data-testid="address-item"]');
    await expect(addressItems).toBeAttached();
  });

  test("should handle add new address", async ({ page }) => {
    await page.goto("/profile/addresses");

    const addAddressButton = page.getByRole("button", {
      name: /اضافه کردن آدرس/i,
    });
    await expect(addAddressButton).toBeVisible();

    await addAddressButton.click();

    const addressForm = page.locator('[data-testid="address-form"]');
    await expect(addressForm).toBeVisible();
  });

  test("should handle edit address", async ({ page }) => {
    await page.goto("/profile/addresses");

    const editAddressButton = page.locator(
      '[data-testid="edit-address-button"]'
    );

    if (await editAddressButton.isVisible()) {
      await editAddressButton.click();

      const addressForm = page.locator('[data-testid="address-form"]');
      await expect(addressForm).toBeVisible();
    }
  });

  test("should handle delete address", async ({ page }) => {
    await page.goto("/profile/addresses");

    const deleteAddressButton = page.locator(
      '[data-testid="delete-address-button"]'
    );

    if (await deleteAddressButton.isVisible()) {
      await deleteAddressButton.click();

      const confirmationModal = page.locator(
        '[data-testid="confirmation-modal"]'
      );
      await expect(confirmationModal).toBeVisible();
    }
  });

  test("should navigate to favorites page", async ({ page }) => {
    await page.goto("/profile/favorites");

    await expect(page).toHaveURL(/.*profile\/favorites.*/);

    const favoritesContent = page.locator('[data-testid="favorites-content"]');
    await expect(favoritesContent).toBeVisible();
  });

  test("should display favorite items", async ({ page }) => {
    await page.goto("/profile/favorites");

    const favoriteItems = page.locator('[data-testid="favorite-item"]');
    await expect(favoriteItems).toBeAttached();
  });

  test("should handle remove from favorites", async ({ page }) => {
    await page.goto("/profile/favorites");

    const removeFavoriteButton = page.locator(
      '[data-testid="remove-favorite-button"]'
    );

    if (await removeFavoriteButton.isVisible()) {
      await removeFavoriteButton.click();

      const confirmationModal = page.locator(
        '[data-testid="confirmation-modal"]'
      );
      await expect(confirmationModal).toBeVisible();
    }
  });

  test("should navigate to settings page", async ({ page }) => {
    await page.goto("/profile/settings");

    await expect(page).toHaveURL(/.*profile\/settings.*/);

    const settingsContent = page.locator('[data-testid="settings-content"]');
    await expect(settingsContent).toBeVisible();
  });

  test("should handle profile update", async ({ page }) => {
    await page.goto("/profile/settings");

    const profileForm = page.locator('[data-testid="profile-form"]');
    await expect(profileForm).toBeVisible();

    const firstNameField = page.locator('[data-testid="first-name-field"]');
    const lastNameField = page.locator('[data-testid="last-name-field"]');
    const emailField = page.locator('[data-testid="email-field"]');

    await expect(firstNameField).toBeAttached();
    await expect(lastNameField).toBeAttached();
    await expect(emailField).toBeAttached();
  });

  test("should handle password change", async ({ page }) => {
    await page.goto("/profile/settings");

    const passwordSection = page.locator('[data-testid="password-section"]');

    if (await passwordSection.isVisible()) {
      const passwordForm = page.locator('[data-testid="password-form"]');
      await expect(passwordForm).toBeVisible();

      const currentPasswordField = page.locator(
        '[data-testid="current-password-field"]'
      );
      const newPasswordField = page.locator(
        '[data-testid="new-password-field"]'
      );
      const confirmPasswordField = page.locator(
        '[data-testid="confirm-password-field"]'
      );

      await expect(currentPasswordField).toBeAttached();
      await expect(newPasswordField).toBeAttached();
      await expect(confirmPasswordField).toBeAttached();
    }
  });

  test("should navigate to tickets page", async ({ page }) => {
    await page.goto("/profile/tickets");

    await expect(page).toHaveURL(/.*profile\/tickets.*/);

    const ticketsContent = page.locator('[data-testid="tickets-content"]');
    await expect(ticketsContent).toBeVisible();
  });
});
