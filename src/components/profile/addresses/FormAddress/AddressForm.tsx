import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { X, MapPinHouse } from "lucide-react";
import { AddressFormProps } from "@/types/Profile";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { FormContent } from "./FormContent";

export const AddressForm = ({
  open,
  onOpenChange,
  onSubmit,
  editingId,
  provinces,
  filteredCities,
  formData,
  onFormDataChange,
}: AddressFormProps) => {
  const isMobile = useIsMobile();

  const handleCancel = () => {
    onFormDataChange({ address: "", province: "", city: "" });
    onOpenChange(false);
  };

  const FormContentComponent = (
    <FormContent
      onSubmit={onSubmit}
      editingId={editingId}
      provinces={provinces}
      filteredCities={filteredCities}
      formData={formData}
      onFormDataChange={onFormDataChange}
      onCancel={handleCancel}
    />
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="p-0 border-none">
          <div className="flex flex-col max-h-[100dvh]">
            <DrawerHeader className="p-4">
              <DrawerTitle className="flex justify-center items-center gap-2">
                <MapPinHouse size={20} />
                {editingId ? "ویرایش آدرس" : "افزودن آدرس"}
              </DrawerTitle>
              <DrawerDescription>
                لطفاً اطلاعات آدرس خود را وارد کنید
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              {FormContentComponent}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        dir="rtl"
        className="sm:max-w-md text-right rtl:text-right rtl:items-end backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-muted shadow-xl rounded-2xl"
      >
        <DialogHeader>
          <DialogClose asChild>
            <button
              className="absolute left-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
              aria-label="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogClose>
          <DialogTitle className="text-right flex items-center gap-2 text-lg font-bold">
            <MapPinHouse size={20} />
            {editingId ? "ویرایش آدرس" : "افزودن آدرس"}
          </DialogTitle>
        </DialogHeader>
        {FormContentComponent}
      </DialogContent>
    </Dialog>
  );
};
