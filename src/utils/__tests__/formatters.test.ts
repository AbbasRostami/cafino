import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatJalaliDate,
  getStockStatus,
} from "../formatters";

describe("توابع فرمت کردن", () => {
  describe("formatCurrency - فرمت کردن پول", () => {
    it("باید اعداد مثبت را درست فرمت کند", () => {
      expect(formatCurrency(1000)).toBe("۱٬۰۰۰");
      expect(formatCurrency(1000000)).toBe("۱٬۰۰۰٬۰۰۰");
      expect(formatCurrency(50000)).toBe("۵۰٬۰۰۰");
    });

    it("باید صفر را درست فرمت کند", () => {
      expect(formatCurrency(0)).toBe("۰");
    });

    it("باید اعداد منفی را درست فرمت کند", () => {
      expect(formatCurrency(-1000)).toBe("‎−۱٬۰۰۰");
    });

    it("باید null و undefined را به - تبدیل کند", () => {
      expect(formatCurrency(null)).toBe("-");
      expect(formatCurrency(undefined)).toBe("-");
    });
  });

  describe("formatJalaliDate - فرمت کردن تاریخ شمسی", () => {
    it("باید تاریخ را درست فرمت کند", () => {
      const date = "2024-01-01T12:00:00Z";
      const result = formatJalaliDate(date);
      expect(result).toContain("۱۴۰۲");
    });

    it("باید فرمت پیش‌فرض را استفاده کند", () => {
      const date = "2024-01-01T12:00:00Z";
      const result = formatJalaliDate(date);
      expect(result).toMatch(/۱۴۰۲\/[۰-۹]{2}\/[۰-۹]{2} - [۰-۹]{2}:[۰-۹]{2}/);
    });

    it("باید فرمت سفارشی را بپذیرد", () => {
      const date = "2024-01-01T12:00:00Z";
      const result = formatJalaliDate(date, "jYYYY/jMM/jDD");
      expect(result).toMatch(/۱۴۰۲\/[۰-۹]{2}\/[۰-۹]{2}/);
    });

    it("باید برای تاریخ خالی - برگرداند", () => {
      expect(formatJalaliDate("")).toBe("-");
      expect(formatJalaliDate(null as any)).toBe("-");
    });
  });

  // getStockStatus
  describe("getStockStatus - وضعیت موجودی", () => {
    it("باید موجودی تمام شده را تشخیص دهد", () => {
      const result = getStockStatus(0);

      expect(result.isOutOfStock).toBe(true);
      expect(result.isLowStock).toBe(false);
      expect(result.isMediumStock).toBe(false);
      expect(result.stockMessage).toBe("این محصول فعلاً موجود نیست.");
      expect(result.progressWidth).toBe("0%");
    });

    it("باید موجودی کم را تشخیص دهد", () => {
      const result = getStockStatus(2);

      expect(result.isOutOfStock).toBe(false);
      expect(result.isLowStock).toBe(true);
      expect(result.isMediumStock).toBe(false);
      expect(result.stockMessage).toBe("فقط 2 عدد باقی مانده!");
    });

    it("باید موجودی متوسط را تشخیص دهد", () => {
      const result = getStockStatus(5);

      expect(result.isOutOfStock).toBe(false);
      expect(result.isLowStock).toBe(false);
      expect(result.isMediumStock).toBe(true);
      expect(result.stockMessage).toBe("موجودی محدود! فقط 5 عدد در انبار");
    });

    it("باید موجودی کافی را تشخیص دهد", () => {
      const result = getStockStatus(15);

      expect(result.isOutOfStock).toBe(false);
      expect(result.isLowStock).toBe(false);
      expect(result.isMediumStock).toBe(false);
      expect(result.stockMessage).toBe("موجودی کافی! 15 عدد آماده ارسال");
    });

    it("باید عرض پیشرفت را درست محاسبه کند", () => {
      const result1 = getStockStatus(0);
      expect(result1.progressWidth).toBe("0%");

      const result2 = getStockStatus(25);
      expect(result2.progressWidth).toBe("100%");

      const result3 = getStockStatus(50);
      expect(result3.progressWidth).toBe("100%");
    });
  });
});
