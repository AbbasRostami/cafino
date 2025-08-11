# DataTable Components

کامپوننت‌های قابل استفاده مجدد برای جدول‌ها بر اساس ساختار فعلی پروژه.

## نحوه استفاده

### 1. Import کردن کامپوننت‌ها

```tsx
import { DataTable } from "@/components/common/DataTable";
```

### 2. تعریف ستون‌ها

```tsx
const columns: ColumnDef<YourDataType>[] = [
  {
    accessorKey: "id",
    header: "ردیف",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "نام",
    cell: (info) => info.getValue(),
  },
  // ... سایر ستون‌ها
];
```

### 3. استفاده ساده (بدون state management خارجی)

```tsx
function YourPage() {
  const { data, isLoading } = useYourData();

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      headerProps={{
        title: "لیست شما",
        icon: <YourIcon />,
        showColumnVisibility: true,
      }}
      emptyStateMessage="هیچ داده‌ای یافت نشد"
      emptyStateDescription="برای افزودن داده، روی دکمه افزودن کلیک کنید"
      // DataTable خودش pagination را مدیریت می‌کند
    />
  );
}
```

### 4. استفاده با server-side pagination

```tsx
function YourPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);

  const { data, isLoading, total } = useYourData({
    page: currentPage,
    limit: currentLimit,
  });

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      headerProps={{
        title: "لیست شما",
        icon: <YourIcon />,
        showColumnVisibility: true,
      }}
      emptyStateMessage="هیچ داده‌ای یافت نشد"
      emptyStateDescription="برای افزودن داده، روی دکمه افزودن کلیک کنید"
      // Server-side pagination
      page={currentPage}
      limit={currentLimit}
      totalCount={total}
      onPageChange={setCurrentPage}
      onLimitChange={(limit) => {
        setCurrentLimit(limit);
        setCurrentPage(1);
      }}
      pageSizeOptions={[5, 10, 25, 50]}
    />
  );
}
```

## ویژگی‌ها

- ✅ **مرتب‌سازی** ستون‌ها
- ✅ **نمایش/مخفی کردن ستون‌ها** با منوی کشویی
- ✅ **صفحه‌بندی داخلی** (بدون نیاز به state management خارجی)
- ✅ **صفحه‌بندی سمت سرور** (با props خارجی)
- ✅ **جستجو** در داده‌ها (اختیاری)
- ✅ **حالت بارگذاری** با اسکلتون
- ✅ **حالت خالی** قابل سفارشی
- ✅ **پشتیبانی از حالت تاریک/روشن**
- ✅ **استایل‌های یکسان** با پروژه فعلی

## Props

### DataTable

| Prop                    | Type                         | Default           | Description                    |
| ----------------------- | ---------------------------- | ----------------- | ------------------------------ |
| `data`                  | `TData[]`                    | -                 | داده‌های جدول                  |
| `columns`               | `ColumnDef<TData, TValue>[]` | -                 | تعریف ستون‌ها                  |
| `isLoading`             | `boolean`                    | `false`           | حالت بارگذاری                  |
| `headerProps`           | `TableHeaderProps`           | -                 | تنظیمات هدر                    |
| `emptyStateMessage`     | `string`                     | -                 | پیام حالت خالی                 |
| `emptyStateDescription` | `string`                     | -                 | توضیح حالت خالی                |
| `enablePagination`      | `boolean`                    | `true`            | فعال کردن صفحه‌بندی            |
| `page`                  | `number`                     | -                 | صفحه فعلی (server-side)        |
| `limit`                 | `number`                     | -                 | تعداد در هر صفحه (server-side) |
| `totalCount`            | `number`                     | -                 | تعداد کل (server-side)         |
| `onPageChange`          | `(page: number) => void`     | -                 | تغییر صفحه (server-side)       |
| `onLimitChange`         | `(limit: number) => void`    | -                 | تغییر تعداد (server-side)      |
| `pageSizeOptions`       | `number[]`                   | `[5, 10, 25, 50]` | گزینه‌های تعداد در صفحه        |
| `enableSearch`          | `boolean`                    | `false`           | فعال کردن جستجو                |
| `searchValue`           | `string`                     | -                 | مقدار جستجو                    |
| `onSearchChange`        | `(value: string) => void`    | -                 | تغییر جستجو                    |
| `searchPlaceholder`     | `string`                     | `"جستجو..."`      | متن placeholder جستجو          |
| `className`             | `string`                     | -                 | کلاس CSS اضافی                 |

### TableHeader

| Prop                   | Type        | Default | Description              |
| ---------------------- | ----------- | ------- | ------------------------ |
| `title`                | `string`    | -       | عنوان هدر                |
| `icon`                 | `ReactNode` | -       | آیکون هدر                |
| `actions`              | `ReactNode` | -       | دکمه‌های عملیات          |
| `showColumnVisibility` | `boolean`   | `true`  | نمایش دکمه کنترل ستون‌ها |

## مثال‌های استفاده

### استفاده ساده (Client-side pagination)

```tsx
import { DataTable } from "@/components/common/DataTable";

function SimpleExample() {
  const mockData = [
    { id: "1", name: "آیتم ۱" },
    { id: "2", name: "آیتم ۲" },
    // ...
  ];

  const columns = [
    {
      accessorKey: "id",
      header: "ردیف",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "name",
      header: "نام",
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <DataTable
      data={mockData}
      columns={columns}
      headerProps={{
        title: "لیست آیتم‌ها",
        icon: <YourIcon />,
        showColumnVisibility: true,
      }}
      emptyStateMessage="هیچ آیتمی یافت نشد"
      emptyStateDescription="برای افزودن آیتم، روی دکمه افزودن کلیک کنید"
    />
  );
}
```

### استفاده با Server-side pagination

```tsx
import { DataTable } from "@/components/common/DataTable";
import { useState } from "react";

function ServerPaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);

  const { data, isLoading, total } = useYourData({
    page: currentPage,
    limit: currentLimit,
  });

  const columns = [
    // تعریف ستون‌ها
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      headerProps={{
        title: "لیست آیتم‌ها",
        icon: <YourIcon />,
        showColumnVisibility: true,
      }}
      emptyStateMessage="هیچ آیتمی یافت نشد"
      emptyStateDescription="برای افزودن آیتم، روی دکمه افزودن کلیک کنید"
      page={currentPage}
      limit={currentLimit}
      totalCount={total}
      onPageChange={setCurrentPage}
      onLimitChange={(limit) => {
        setCurrentLimit(limit);
        setCurrentPage(1);
      }}
      pageSizeOptions={[5, 10, 25, 50]}
    />
  );
}
```

## مزایای جدید

1. **سادگی استفاده**: نیازی به نوشتن state management و handlers نیست
2. **انعطاف‌پذیری**: هم client-side و هم server-side pagination پشتیبانی می‌شود
3. **کاهش کد تکراری**: state management داخلی
4. **سازگاری**: با API قبلی سازگار است
