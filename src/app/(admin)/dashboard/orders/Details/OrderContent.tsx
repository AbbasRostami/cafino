import { formatCurrency, formatJalaliDate } from "@/utils/formatters";
import {
  Banknote,
  Calendar,
  CheckCircle,
  CreditCard,
  HomeIcon,
  Hash,
  Mail,
  MapPin,
  PackageOpen,
  Phone,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  User,
  UserCircle,
  X,
  Tag,
  Package,
} from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { OrderContentProps } from "@/types/admin";
import { MotionButton, MotionDiv, MotionSpan } from "@/utils/MotionWrapper";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const OrderContent = ({ order, isMobile }: OrderContentProps) => (
  <MotionDiv
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="space-y-8"
  >
    {!isMobile && (
      <MotionDiv variants={itemVariants}>
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-700 dark:to-amber-800 p-6 rounded-t-2xl  -m-6 mb-6">
          <div className="text-white">
            <>
              <div className="text-2xl font-bold flex items-center gap-3">
                <MotionDiv
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <PackageOpen className="w-6 h-6" />
                </MotionDiv>
                جزئیات سفارش
              </div>
              <DialogClose asChild>
                <MotionButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  aria-label="بستن"
                >
                  <X className="h-6 w-6 " />
                </MotionButton>
              </DialogClose>
            </>
          </div>
        </div>
      </MotionDiv>
    )}

    <MotionDiv
      variants={itemVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <MotionDiv
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 p-5 rounded-2xl border border-amber-200/50 dark:border-amber-800/50 shadow-sm mt-2"
      >
        <div className="flex items-center gap-3 mb-4">
          <MotionDiv
            whileHover={{ rotate: 10 }}
            className="p-2 bg-amber-500/20 dark:bg-amber-700/30 rounded-lg"
          >
            <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </MotionDiv>
          <h3 className="font-bold text-lg text-amber-800 dark:text-amber-200">
            اطلاعات سفارش
          </h3>
        </div>
        <div className="space-y-3">
          <InfoItem
            label="مبلغ کل"
            value={`${formatCurrency(order?.total_amount)} تومان`}
            icon={<Banknote className="w-4 h-4" />}
          />
          <InfoItem
            label="تخفیف"
            value={`${formatCurrency(order?.discount_amount)} تومان`}
            icon={<Tag className="w-4 h-4" />}
          />
          <InfoItem
            label="مبلغ پرداختی"
            value={`${formatCurrency(order?.payment_amount)} تومان`}
            icon={<CreditCard className="w-4 h-4" />}
          />
        </div>
      </MotionDiv>

      <MotionDiv
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-5 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <MotionDiv
            whileHover={{ rotate: 10 }}
            className="p-2 bg-blue-500/20 dark:bg-blue-700/30 rounded-lg"
          >
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </MotionDiv>
          <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200">
            اطلاعات کاربر
          </h3>
        </div>
        <div className="space-y-3">
          <InfoItem
            label="نام"
            value={order?.user?.first_name}
            icon={<UserCircle className="w-4 h-4" />}
          />
          <InfoItem
            label="نام خانوادگی"
            value={order?.user?.last_name}
            icon={<Mail className="w-4 h-4" />}
          />
          <InfoItem
            label="تلفن"
            value={order?.user?.phone}
            icon={<Phone className="w-4 h-4" />}
          />
        </div>
      </MotionDiv>
    </MotionDiv>

    <MotionDiv variants={itemVariants}>
      <MotionDiv
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-5 rounded-2xl border border-green-200/50 dark:border-green-800/50 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <MotionDiv
            whileHover={{ rotate: 10 }}
            className="p-2 bg-green-500/20 dark:bg-green-700/30 rounded-lg"
          >
            <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
          </MotionDiv>
          <h3 className="font-bold text-lg text-green-800 dark:text-green-200">
            آدرس ارسال
          </h3>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-green-200/50 dark:border-green-800/50 shadow-sm">
          <div className="flex items-start gap-3">
            <MotionDiv
              whileHover={{ scale: 1.1 }}
              className="mt-1 p-1.5 bg-green-500/20 dark:bg-green-700/30 rounded-lg"
            >
              <HomeIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
            </MotionDiv>
            <div>
              <div className="font-medium text-green-800 dark:text-green-200">
                {order?.address?.province} - {order?.address?.city}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {order?.address?.address}
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>
    </MotionDiv>

    <MotionDiv variants={itemVariants}>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-5 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <MotionDiv
            whileHover={{ rotate: 10 }}
            className="p-2 flex bg-purple-500/20 dark:bg-purple-700/30 rounded-lg"
          >
            <ShoppingCart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </MotionDiv>
          <h3 className="font-bold text-lg text-purple-800 dark:text-purple-200">
            آیتم های سفارش
          </h3>
        </div>
        <div className="space-y-4">
          {order?.items?.map((item: any, index: number) => (
            <MotionDiv
              key={index}
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-purple-200/50 dark:border-purple-800/50 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <MotionDiv
                  whileHover={{ rotate: 10 }}
                  className="flex-shrink-0 hidden md:flex w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg items-center justify-center"
                >
                  <Package className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </MotionDiv>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    <div>
                      <h4 className="font-bold text-purple-800 dark:text-purple-200">
                        {item?.item?.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {item?.item?.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item?.item?.ingredients?.map(
                          (ingredient: string, idx: number) => (
                            <MotionSpan
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs"
                            >
                              {ingredient}
                            </MotionSpan>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex md:flex-col justify-between items-center gap-4">
                      <MotionDiv
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1 w-fit bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300"
                      >
                        <span>{item?.count}</span>
                        <span>عدد</span>
                      </MotionDiv>
                      <div className="font-bold text-lg text-purple-800 dark:text-purple-200">
                        {formatCurrency(item?.item?.price)} ت
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionDiv>

    <MotionDiv variants={itemVariants}>
      <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/30 p-5 rounded-2xl border border-cyan-200/50 dark:border-cyan-800/50 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <MotionDiv
            whileHover={{ rotate: 10 }}
            className="p-2 bg-cyan-500/20 dark:bg-cyan-700/30 rounded-lg"
          >
            <Receipt className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </MotionDiv>
          <h3 className="font-bold text-lg text-cyan-800 dark:text-cyan-200">
            اطلاعات پرداخت
          </h3>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-cyan-200/50 dark:border-cyan-800/50 shadow-sm">
          {order?.payments?.map((payment: any, index: number) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="space-y-3"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 hover:scale-105 transition-all duration-300 bg-cyan-500/20 dark:bg-cyan-700/30 rounded-lg">
                    <CreditCard className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <span className="text-sm font-medium text-cyan-800 dark:text-cyan-200">
                    شماره فاکتور:
                  </span>
                </div>
                <span className="font-mono text-cyan-800 dark:text-cyan-200">
                  {payment?.invoice_number}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 hover:scale-105 transition-all duration-300 bg-cyan-500/20 dark:bg-cyan-700/30 rounded-lg">
                    <Hash className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <span className="font-medium text-cyan-800 dark:text-cyan-200">
                    کد پیگیری:
                  </span>
                </div>
                <span className="font-mono text-cyan-800 dark:text-cyan-200">
                  {payment?.ref_id || "نامشخص"}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-cyan-500/20 hover:scale-105 transition-all duration-300 dark:bg-cyan-700/30 rounded-lg">
                    <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <span className="font-medium text-cyan-800 dark:text-cyan-200">
                    تاریخ پرداخت:
                  </span>
                </div>
                <span className="text-cyan-800 dark:text-cyan-200">
                  {formatJalaliDate(payment?.created_at || "نامشخص")}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 hover:scale-105 transition-all duration-300 bg-cyan-500/20 dark:bg-cyan-700/30 rounded-lg">
                    <CreditCard className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <span className="font-medium text-cyan-800 dark:text-cyan-200">
                    کارت پرداخت:
                  </span>
                </div>
                <span className="font-mono text-cyan-800 dark:text-cyan-200">
                  {payment?.card_pan || "نامشخص"}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 hover:scale-105 transition-all duration-300 bg-cyan-500/20 dark:bg-cyan-700/30 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <span className="font-medium text-cyan-800 dark:text-cyan-200">
                    وضعیت پرداخت:
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payment?.status
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {payment?.status ? "موفق" : "ناموفق"}
                </span>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </MotionDiv>
  </MotionDiv>
);

export const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <MotionDiv
    className="flex items-center gap-3"
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <MotionDiv
      whileHover={{ rotate: 10, scale: 1.1 }}
      className="p-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-lg"
    >
      {icon}
    </MotionDiv>
    <div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </MotionDiv>
);
