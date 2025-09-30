import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/ui/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ModalContentDiscount } from "./ModalContent";
import { DiscountFormType } from "@/schemas/admin";
import { useCreateDiscount } from "@/services";
import { PlusSquare } from "lucide-react";

export default function CreateDiscountModal() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutate: createDiscount, isPending } = useCreateDiscount();
  const onSubmit: SubmitHandler<DiscountFormType> = (data) => {
    const payload = {
      code: data?.code,
      [data?.discountType]:
        data?.discountType === "percent" ? data?.percent : data?.amount,
      expires_in: data?.expires_in,
      limit: data?.limit,
    };
    createDiscount(payload, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-lg flex items-center gap-2"
            >
              <PlusSquare size={16} />
              افزودن کد تخفیف
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-4 border-none">
            <ModalContentDiscount onSubmit={onSubmit} isPending={isPending} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-2 rounded-lg flex items-center gap-2"
            >
              <PlusSquare size={16} />
              افزودن کد تخفیف
            </Button>
          </DialogTrigger>

          <DialogContent
            showCloseButton={false}
            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-99999"
          >
            <ModalContentDiscount onSubmit={onSubmit} isPending={isPending} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
