import { test, expect } from "@playwright/test";

test.describe("Checkout & Payment Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.evaluate(() => {
      localStorage.removeItem("guest-cart");
      localStorage.removeItem("cart");
      localStorage.removeItem("pendingOrder");
    });
  });

  test("should navigate to checkout page", async ({ page }) => {
    await page.goto("/checkout-cart");
    await expect(page).toHaveURL(/.*checkout-cart.*/);
  });

  test("should display checkout page elements", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle", { timeout: 60000 });

    const checkoutHeader = page.locator(
      '[data-testid="checkout-header-title"]'
    );
    await expect(checkoutHeader).toBeVisible();
  });

  test("should display empty cart message when cart is empty", async ({
    page,
  }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle", { timeout: 60000 });

    const emptyMessage = page.getByText(/سبد خرید شما خالی است/i);
    await expect(emptyMessage).toBeVisible();
  });

  test("should handle address selection", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle", { timeout: 60000 });

    const addressSection = page.locator('[data-testid="address-section"]');

    if (await addressSection.isVisible()) {
      const addressSelector = page.locator('[data-testid="address-selector"]');
      await expect(addressSelector).toBeVisible();

      const addAddressButton = page.getByRole("button", {
        name: /اضافه کردن آدرس/i,
      });
      await expect(addAddressButton).toBeVisible();
    }
  });

  test("should handle discount code application", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle", { timeout: 60000 });

    const discountSection = page.locator('[data-testid="discount-section"]');

    if (await discountSection.isVisible()) {
      const discountInput = page.locator('[data-testid="discount-input"]');
      await expect(discountInput).toBeVisible();

      const applyDiscountButton = page.getByRole("button", {
        name: /اعمال تخفیف/i,
      });
      await expect(applyDiscountButton).toBeVisible();
    }
  });

  test("should display order summary details", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle", { timeout: 60000 });

    const totalAmount = page.locator('[data-testid="total-amount"]');
    const discountAmount = page.locator('[data-testid="discount-amount"]');
    const paymentAmount = page.locator('[data-testid="payment-amount"]');

    await expect(totalAmount).toBeVisible();
    await expect(discountAmount).toBeAttached();
    await expect(paymentAmount).toBeVisible();
  });

  test("should handle complete order button", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle", { timeout: 60000 });

    const completeOrderButton = page.getByRole("button", {
      name: /تایید و تکمیل سفارش/i,
    });
    await expect(completeOrderButton).toBeVisible();

    await expect(completeOrderButton).toBeDisabled();
  });

  test("should handle back to menu button", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle");

    const backButton = page.getByRole("button", { name: /بازگشت به منو/i });
    await expect(backButton).toBeVisible();

    await backButton.click();

    await expect(page).toHaveURL(/.*menu.*/);
  });

  test("should handle clear cart button", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle");

    const clearCartButton = page.getByRole("button", {
      name: /پاک کردن سبد خرید/i,
    });
    await expect(clearCartButton).toBeVisible();
  });

  test("should handle payment gateway redirect", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("networkidle");

    const completeOrderButton = page.getByRole("button", {
      name: /تایید و تکمیل سفارش/i,
    });

    if (await completeOrderButton.isVisible()) {
      await completeOrderButton.click();

      await expect(completeOrderButton).toBeVisible();
    }
  });

  test("should handle payment result page", async ({ page }) => {
    await page.goto("/payment");

    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("networkidle");

    const paymentResult = page.locator('[data-testid="payment-result"]');
    await expect(paymentResult).toBeVisible();

    const orderDetails = page.locator('[data-testid="order-details"]');
    await expect(orderDetails).toBeVisible();
  });

  test("should handle successful payment", async ({ page }) => {
    await page.goto("/payment?status=success");

    await page.waitForLoadState("networkidle");

    const successMessage = page.getByText(/پرداخت با موفقیت انجام شد/i);
    await expect(successMessage).toBeVisible();

    const orderConfirmation = page.locator(
      '[data-testid="order-confirmation"]'
    );
    await expect(orderConfirmation).toBeVisible();
  });

  test("should handle failed payment", async ({ page }) => {
    await page.goto("/payment?status=failed");

    await page.waitForLoadState("networkidle");

    const failureMessage = page.getByText(/پرداخت ناموفق/i);
    await expect(failureMessage).toBeVisible();

    const retryButton = page.getByRole("button", { name: /تلاش مجدد/i });
    await expect(retryButton).toBeVisible();
  });

  test("should handle mobile checkout experience", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle");

    const checkoutHeader = page.getByText(/تکمیل خرید/i);
    await expect(checkoutHeader).toBeVisible();

    const orderSummary = page.locator('[data-testid="order-summary"]');
    await expect(orderSummary).toBeVisible();
  });

  test("should handle checkout form validation", async ({ page }) => {
    await page.goto("/checkout-cart");

    await page.waitForLoadState("networkidle");

    const completeOrderButton = page.getByRole("button", {
      name: /تایید و تکمیل سفارش/i,
    });

    if (await completeOrderButton.isVisible()) {
      await completeOrderButton.click();

      const validationError = page.getByText(
        /لطفاً آدرس تحویل را انتخاب کنید/i
      );
      await expect(validationError).toBeVisible();
    }
  });

  test("should handle order confirmation", async ({ page }) => {
    await page.goto("/payment?status=success");

    await page.waitForLoadState("networkidle");

    const orderNumber = page.locator('[data-testid="order-number"]');
    const orderDate = page.locator('[data-testid="order-date"]');
    const orderTotal = page.locator('[data-testid="order-total"]');

    await expect(orderNumber).toBeVisible();
    await expect(orderDate).toBeVisible();
    await expect(orderTotal).toBeVisible();
  });
});
