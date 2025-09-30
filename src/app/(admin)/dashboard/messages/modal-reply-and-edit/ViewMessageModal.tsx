import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatJalaliDate } from "@/utils/formatters";
import { ViewMessageModalProps } from "@/types/admin";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Reply,
} from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MotionDiv } from "@/utils/MotionWrapper";

export default function ViewMessageModal({
  isOpen,
  onClose,
  contact,
  onReply,
}: ViewMessageModalProps) {
  const isMobile = useIsMobile();

  if (!contact) return null;

  const ModalContent = () => (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
          اطلاعات تماس
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">نام</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {contact?.name || ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">ایمیل</p>
              <p
                className="font-semibold text-gray-800 dark:text-white truncate max-w-[200px]"
                title={contact?.email || ""}
              >
                {contact?.email || ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                شماره تلفن
              </p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {contact?.phone || ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                تاریخ ارسال
              </p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {formatJalaliDate(contact?.created_at || "")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg dark:bg-gray-700 p-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-5 w-5 text-amber-600" />
          <h3 className="font-semibold text-gray-800 dark:text-white">
            متن پیام
          </h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {contact?.message || ""}
          </p>
        </div>
      </div>

      {contact?.replies && contact?.replies?.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            پاسخ‌های ارسالی ({contact?.replies?.length})
          </h3>
          {contact?.replies?.map((reply, index) => (
            <MotionDiv
              key={reply?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-800 dark:text-green-300">
                  {reply?.subject || ""}
                </h4>
                <Badge variant="success" className="text-xs">
                  پاسخ داده شده
                </Badge>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm mb-2">
                {reply?.message || ""}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                {formatJalaliDate(reply?.created_at || "")}
              </p>
            </MotionDiv>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
        <Button variant="outline" onClick={onClose}>
          بستن
        </Button>
        <Button
          onClick={onReply}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        >
          <Reply className="h-4 w-4 ml-2" />
          پاسخ به پیام
        </Button>
      </div>
    </MotionDiv>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="border-none max-h-[90vh]">
          <DrawerHeader>
            <VisuallyHidden>
              <DrawerTitle>مشاهده پیام</DrawerTitle>
              <DrawerDescription>مشاهده پیام</DrawerDescription>
            </VisuallyHidden>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto">
            <ModalContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl max-h-[90vh] scrollbar-hide overflow-y-auto"
      >
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>مشاهده پیام</DialogTitle>
            <DialogDescription>مشاهده پیام</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
}
