import { Badge } from "@/components/ui/badge";
import { StockStatus } from "@/types/main/menu/menu";
import { OrderStatus } from "@/types/Profile";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
export const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-gray-100 text-gray-800">در انتظار تایید</Badge>
      );
    case "processing":
      return (
        <Badge className="bg-yellow-100 text-yellow-800">در حال پردازش</Badge>
      );
    case "shipped":
      return <Badge className="bg-blue-100 text-blue-800">ارسال شده</Badge>;
    case "delivered":
      return (
        <Badge className="bg-green-100 text-green-800">تحویل داده‌شده</Badge>
      );
    case "refunded":
      return (
        <Badge className="bg-purple-100 text-purple-800">بازگشت وجه</Badge>
      );
    case "done":
      return <Badge className="bg-green-100 text-green-800">تکمیل‌شده</Badge>;
    case "failed":
      return <Badge className="bg-red-100 text-red-800">ناموفق</Badge>;
    case "canceled":
      return <Badge variant="destructive">لغوشده</Badge>;
    default:
      return <Badge className="bg-muted text-muted-foreground">نامشخص</Badge>;
  }
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("fa-IR").format(amount);

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatJalaliDate = (dateString: string | Date, format = "jYYYY/jMM/jDD - HH:mm") => {
  if (!dateString) return "-";
  return moment(dateString).format(format);
};

export const getStockStatus = (quantity: number): StockStatus => {
  const isOutOfStock = quantity === 0;
  const isLowStock = quantity > 0 && quantity <= 3;
  const isMediumStock = quantity > 3 && quantity <= 10;

  let stockMessage = "";
  let stockColor = "";
  let progressColor = "";

  if (isOutOfStock) {
    stockMessage = "این محصول فعلاً موجود نیست.";
    stockColor = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    progressColor = "bg-red-300";
  } else if (isLowStock) {
    stockMessage = `فقط ${quantity} عدد باقی مانده!`;
    stockColor =
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    progressColor = "bg-gradient-to-r from-amber-400 to-amber-600";
  } else if (isMediumStock) {
    stockMessage = `موجودی محدود! فقط ${quantity} عدد در انبار`;
    stockColor =
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    progressColor = "bg-gradient-to-r from-yellow-400 to-amber-400";
  } else {
    stockMessage = `موجودی کافی! ${quantity} عدد آماده ارسال`;
    stockColor =
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    progressColor = "bg-gradient-to-r from-green-400 to-teal-400";
  }

  const progressWidth = isOutOfStock
    ? "0%"
    : `${Math.min(100, (quantity / 25) * 100)}%`;

  return {
    isOutOfStock,
    isLowStock,
    isMediumStock,
    stockMessage,
    stockColor,
    progressColor,
    progressWidth,
  };
};
