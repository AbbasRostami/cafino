import { describe, it, expect } from "vitest";
import { phoneSchema, otpSchema } from "../main/auth";

describe("Validation Schemas - احراز هویت", () => {
  describe("phoneSchema - Validation Phone", () => {
    it("باید شماره موبایل معتبر را بپذیرد", () => {
      const validPhones = [
        "09123456789",
        "09987654321",
        "09111111111",
        "09000000000",
      ];

      validPhones.forEach((phone) => {
        const result = phoneSchema.safeParse({ phone });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.phone).toBe(phone);
        }
      });
    });

    it("باید شماره‌های با فاصله و کاراکترهای اضافی را پاک کند", () => {
      const dirtyPhones = [
        "0912 345 6789",
        "0912-345-6789",
        "0912.345.6789",
        " 09123456789 ",
      ];

      dirtyPhones.forEach((phone) => {
        const result = phoneSchema.safeParse({ phone });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.phone).toBe("09123456789");
        }
      });
    });

    it("باید شماره‌های کوتاه‌تر از 11 رقم را رد کند", () => {
      const shortPhones = ["0912345678", "091234567", "09123456", "0912345"];

      shortPhones.forEach((phone) => {
        const result = phoneSchema.safeParse({ phone });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("length-11");
        }
      });
    });

    it.each(["091234567890", "0912345678901", "09123456789012"])(
      "باید شماره بلند '%s' را رد کند",
      (phone) => {
        const result = phoneSchema.safeParse({ phone });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("length-11");
        }
      }
    );

    it.each([
      "08123456789", // Start with 08
      "07123456789",
      "06123456789",
      "05123456789",
      "04123456789",
    ])("باید شماره با شروع نامعتبر '%s' را رد کند", (phone) => {
      const result = phoneSchema.safeParse({ phone });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("starts-with-09");
      }
    });

    it.each([
      "0912345678a",
      "0912345678b",
      "0912345678c",
      "0912345678x",
      "0912345678y",
    ])("باید شماره با حرف '%s' را رد کند", (phone) => {
      const result = phoneSchema.safeParse({ phone });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.issues.map((issue) => issue.message);
        expect(errorMessages.length).toBeGreaterThan(0);
      }
    });

    it.each(["", "   ", "  \t  ", "  \n  "])(
      "باید شماره خالی '%s' را رد کند",
      (phone) => {
        const result = phoneSchema.safeParse({ phone });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("length-11");
        }
      }
    );

    it("باید شماره‌های null و undefined را رد کند", () => {
      const invalidInputs = [null, undefined, {}, [], 12345678901, true, false];

      invalidInputs.forEach((input) => {
        const result = phoneSchema.safeParse({ phone: input });
        expect(result.success).toBe(false);
      });
    });
  });

  describe("otpSchema - Validation OTP", () => {
    it.each(["12345", "00000", "99999", "54321", "11111"])(
      "باید کد تایید معتبر '%s' را بپذیرد",
      (otp) => {
        const result = otpSchema.safeParse({ otp });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.otp).toBe(otp);
        }
      }
    );

    it.each(["1234", "123", "12", "1", ""])(
      "باید کد کوتاه '%s' را رد کند",
      (otp) => {
        const result = otpSchema.safeParse({ otp });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("length-5");
        }
      }
    );

    it.each(["123456", "1234567", "12345678"])(
      "باید کد بلند '%s' را رد کند",
      (otp) => {
        const result = otpSchema.safeParse({ otp });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("length-5");
        }
      }
    );

    it.each(["1234a", "1234b", "1234c", "1234x", "1234y"])(
      "باید کد با حرف '%s' را رد کند",
      (otp) => {
        const result = otpSchema.safeParse({ otp });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("digits-only");
        }
      }
    );

    it.each(["1234@", "1234#", "1234$", "1234%", "1234^"])(
      "باید کد با کاراکتر خاص '%s' را رد کند",
      (otp) => {
        const result = otpSchema.safeParse({ otp });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe("digits-only");
        }
      }
    );

    it("باید ورودی‌های null و undefined را رد کند", () => {
      const invalidInputs = [null, undefined, {}, [], 12345, true, false];

      invalidInputs.forEach((input) => {
        const result = otpSchema.safeParse({ otp: input });
        expect(result.success).toBe(false);
      });
    });

    it.each(["1 2345", "12 345", "123 45", "1234 5", " 12345"])(
      "باید کد با فاصله '%s' را رد کند",
      (otp) => {
        const result = otpSchema.safeParse({ otp });
        expect(result.success).toBe(false);
        if (!result.success) {
          const errorMessages = result.error.issues.map(
            (issue) => issue.message
          );
          expect(errorMessages.length).toBeGreaterThan(0);
        }
      }
    );
  });
});
