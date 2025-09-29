import { describe, it, expect } from "vitest";
import { discountSchemaCheckout } from "../main/checkout";

describe("discountSchemaCheckout - Validation Discount Code", () => {
  it.each([
    "SAVE10",
    "DISCOUNT20",
    "WELCOME",
    "NEWUSER",
    "SUMMER2024",
    "CHRISTMAS",
    "HOLIDAY",
    "SPECIAL",
    "OFFER",
  ])("باید کد تخفیف معتبر '%s' را بپذیرد", (code) => {
    const result = discountSchemaCheckout.safeParse({ code });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.code).toBe(code);
    }
  });

  it.each(["", "   ", "  \t  ", "  \n  "])(
    "باید کد تخفیف خالی '%s' را رد کند",
    (code) => {
      const result = discountSchemaCheckout.safeParse({ code });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "کد تخفیف نمی‌تواند خالی باشد"
        );
      }
    }
  );

  it.each([
    "VERYLONGCODE123", // 15 Character
    "SUPERLONGCODE456", // 16 Character
    "EXTREMELONGCODE789", // 18 Character
  ])("باید کد تخفیف بلند '%s' را رد کند", (code) => {
    const result = discountSchemaCheckout.safeParse({ code });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "کد تخفیف باید حداکثر ۱۰ کاراکتر باشد"
      );
    }
  });

  it.each(["SAVE-10", "DISCOUNT_20", "WELCOME@", "NEW#USER", "SUMMER$2024"])(
    "باید کد تخفیف با کاراکتر غیرمجاز '%s' را رد کند",
    (code) => {
      const result = discountSchemaCheckout.safeParse({ code });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        expect(errorMessages).toContain(
          "کد تخفیف فقط می‌تواند شامل حروف و اعداد لاتین باشد"
        );
      }
    }
  );

  it.each(["کدتخفیف", "SAVEکد", "کدSAVE", "تخفیف10", "10تخفیف"])(
    "باید کد تخفیف با حروف فارسی '%s' را رد کند",
    (code) => {
      const result = discountSchemaCheckout.safeParse({ code });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        expect(errorMessages).toContain(
          "کد تخفیف فقط می‌تواند شامل حروف و اعداد لاتین باشد"
        );
      }
    }
  );

  it.each([
    "1234567890", // Just Numbers
    "0123456789", // Start with Zero
    "9876543210", // Reverse Numbers
    "1111111111", // Repeat
    "0000000000", // All Zero
  ])("باید کد تخفیف عددی '%s' را بپذیرد", (code) => {
    const result = discountSchemaCheckout.safeParse({ code });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.code).toBe(code);
    }
  });

  it.each(["save10", "discount20", "welcome", "newuser", "summer2024"])(
    "باید کد تخفیف با حروف کوچک '%s' را بپذیرد",
    (code) => {
      const result = discountSchemaCheckout.safeParse({ code });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.code).toBe(code);
      }
    }
  );

  it.each(["SAVE10", "DISCOUNT20", "WELCOME", "NEWUSER", "SUMMER2024"])(
    "باید کد تخفیف با حروف بزرگ '%s' را بپذیرد",
    (code) => {
      const result = discountSchemaCheckout.safeParse({ code });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.code).toBe(code);
      }
    }
  );

  it.each(["SAVE10", "DISCOUNT20", "WELCOME123", "NEWUSER456", "SUMMER2024"])(
    "باید کد تخفیف ترکیبی '%s' را بپذیرد",
    (code) => {
      const result = discountSchemaCheckout.safeParse({ code });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.code).toBe(code);
      }
    }
  );

  it.each([
    [" SAVE10 ", "SAVE10"],
    ["  DISCOUNT20  ", "DISCOUNT20"],
    ["\tWELCOME\t", "WELCOME"],
  ])("باید کد تخفیف '%s' را به '%s' تبدیل کند", (input, expected) => {
    const result = discountSchemaCheckout.safeParse({ code: input });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.code).toBe(expected);
    }
  });

  it("باید ورودی‌های null و undefined را رد کند", () => {
    const invalidInputs = [null, undefined, {}, [], 12345, true, false];

    invalidInputs.forEach((input) => {
      const result = discountSchemaCheckout.safeParse({ code: input });
      expect(result.success).toBe(false);
    });
  });
});
