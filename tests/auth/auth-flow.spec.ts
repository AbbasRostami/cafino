import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should display login button for unauthenticated users", async ({
    page,
  }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await expect(loginButton).toBeVisible();
  });

  test("should open login modal when login button is clicked", async ({
    page,
  }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();

    const loginModal = page.locator('[data-testid="login-modal"]');
    await expect(loginModal).toBeVisible();

    const phoneInput = page.locator('[data-testid="phone-input"]');
    await expect(phoneInput).toBeVisible();

    const sendOTPButton = page.locator('[data-testid="send-otp-button"]');
    await expect(sendOTPButton).toBeVisible();
  });

  test("should validate phone number input", async ({ page }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();

    const sendOTPButton = page.locator('[data-testid="send-otp-button"]');
    await expect(sendOTPButton).toBeDisabled();

    const phoneInput = page.locator('[data-testid="phone-input"]');
    await phoneInput.fill("123");

    await expect(sendOTPButton).toBeDisabled();
  });

  test("should validate phone number format", async ({ page }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();

    const phoneInput = page.locator('[data-testid="phone-input"]');
    await phoneInput.fill("1234567890");

    const sendOTPButton = page.locator('[data-testid="send-otp-button"]');
    await expect(sendOTPButton).toBeDisabled();
  });

  test("should accept valid phone number format", async ({ page }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();

    const phoneInput = page.locator('[data-testid="phone-input"]');
    await phoneInput.fill("09123456789");

    const sendOTPButton = page.locator('[data-testid="send-otp-button"]');
    await expect(sendOTPButton).toBeEnabled();
  });

  test("should close login modal when close button is clicked", async ({
    page,
  }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();

    const loginModal = page.locator('[data-testid="login-modal"]');
    await expect(loginModal).toBeVisible();

    const closeButton = page.locator('button[aria-label="close"]');
    await closeButton.click();

    await expect(loginModal).not.toBeVisible();
  });

  test.only("should handle OTP step after sending phone", async ({ page }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();

    const phoneInput = page.locator('[data-testid="phone-input"]');
    await phoneInput.fill("09123456789");

    const sendOTPButton = page.locator('[data-testid="send-otp-button"]');
    await sendOTPButton.click();

    await page.waitForTimeout(1000);

    const otpTitle = page.locator('[data-testid="otp-title"]');
    await expect(otpTitle).toBeVisible({ timeout: 10000 });

    const verifyButton = page.locator('[data-testid="verify-otp-button"]');
    await expect(verifyButton).toBeVisible();
  });

  test("should handle resend OTP functionality", async ({ page }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();

    const phoneInput = page.locator('[data-testid="phone-input"]');
    await phoneInput.fill("09123456789");
    const sendOTPButton = page.locator('[data-testid="send-otp-button"]');
    await sendOTPButton.click();

    await page.waitForTimeout(1000);

    const resendButton = page.locator('[data-testid="resend-otp-button"]');
    await expect(resendButton).toBeVisible();
  });

  test("should handle back to phone step", async ({ page }) => {
    const loginButton = page.locator('[data-testid="login-button"]');
    await loginButton.click();

    const phoneInput = page.locator('[data-testid="phone-input"]');
    await phoneInput.fill("09123456789");
    const sendOTPButton = page.locator('[data-testid="send-otp-button"]');
    await sendOTPButton.click();

    await page.waitForTimeout(1000);

    const backButton = page.locator(
      '[data-testid="back-to-phone-input-button"]'
    );
    await backButton.click();

    const phoneInputAgain = page.locator('[data-testid="phone-input"]');
    await expect(phoneInputAgain).toBeVisible();
  });
});
