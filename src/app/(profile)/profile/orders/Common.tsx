import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: string) => {
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
