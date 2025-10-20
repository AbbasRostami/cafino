import { Badge } from "@/components/ui/badge";
import { StockStatus } from "@/types/main/menu";
import { OrderStatus } from "@/types/Profile";
import moment from "jalali-moment";
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

export const formatCurrency = (amount?: number | null) =>
  amount != null ? new Intl.NumberFormat("fa-IR").format(amount) : "-";

export const formatJalaliDate = (
  dateString: string | Date,
  format = "jYYYY/jMM/jDD - HH:mm"
) => {
  if (!dateString) return "-";
  return moment(dateString).locale("fa").format(format);
};

export const formatRelativeTime = (dateString: string | Date): string => {
  if (!dateString) return "-";

  const now = moment();
  const date = moment(dateString);
  const diff = now.diff(date);

  if (diff < 60000) {
    return "همین الان";
  }

  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} دقیقه پیش`;
  }

  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ساعت پیش`;
  }

  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days} روز پیش`;
  }

  if (diff < 2592000000) {
    const weeks = Math.floor(diff / 604800000);
    return `${weeks} هفته پیش`;
  }

  return moment(dateString).locale("fa").format("jYYYY/jMM/jDD");
};

export const formatRetryAfter = (retryAfter: number): string => {
  const hours = Math.floor(retryAfter / 3600);
  const minutes = Math.ceil((retryAfter % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours} ساعت و ${minutes} دقیقه` : `${hours} ساعت`;
  }

  return `${minutes} دقیقه`;
};

export const formatBlockType = (blockType: string): string => {
  switch (blockType?.toLowerCase()) {
    case "temporary":
      return "موقت";
    case "permanent":
      return "دائمی";
    default:
      return "نامشخص";
  }
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
    stockColor = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    progressColor = "bg-gradient-to-r from-red-400 to-red-600";
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
