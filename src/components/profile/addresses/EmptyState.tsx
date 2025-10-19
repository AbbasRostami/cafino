import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";

interface EmptyStateProps {
  onAddAddress: () => void;
}

export const EmptyState = ({ onAddAddress }: EmptyStateProps) => {
  return (
    <div className="max-h-[calc(100vh-100px)] flex flex-col items-center justify-center py-4 px-4 text-center">
      <div className="relative mb-10">
        <div className="w-28 h-28 mx-auto bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-full flex items-center justify-center shadow-lg">
          <MapPin className="h-16 w-16 text-amber-500 dark:text-amber-400" />
        </div>

        <div className="absolute top-0 right-0 -mr-6 -mt-6">
          <div className="w-16 h-16 rounded-full bg-amber-200/50 dark:bg-amber-700/30 blur-xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6">
          <div className="w-16 h-16 rounded-full bg-amber-200/50 dark:bg-amber-700/30 blur-xl"></div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
        هنوز آدرسی ثبت نکرده‌اید!
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
        برای اینکه سفارشات خود را سریعتر دریافت کنید، اولین آدرس خود را اضافه
        کنید.
      </p>

      <Button
        size="lg"
        onClick={onAddAddress}
        className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 dark:from-amber-500 dark:to-yellow-600 text-white dark:text-gray-900 shadow-lg shadow-amber-500/30 hover:shadow-amber-600/40 px-8 py-6 rounded-xl font-bold text-lg group transition-all duration-300 transform hover:-translate-y-1"
      >
        <Plus className="h-6 w-6 mr-2 group-hover:rotate-90 transition-transform" />
        افزودن اولین آدرس
      </Button>
    </div>
  );
};
