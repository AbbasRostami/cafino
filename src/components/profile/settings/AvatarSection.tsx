import { CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2 } from "lucide-react";
import { AvatarProps } from "@/types/Profile"
import { MotionButton, MotionDiv } from "@/utils/MotionWrapper";

export const AvatarSection = ({
  user,
  avatarPreview,
  isUpdatingImage,
  isRemovingImage,
  onAvatarChange,
  onRemoveImage,
}: AvatarProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="h-full p-4">
        <div className="flex flex-col items-center ">
          <div className="relative">
            <Avatar className="w-32 h-32 border-2 border-amber-400 shadow-lg">
              <AvatarImage
                src={avatarPreview || user?.imageUrl || ""}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-white text-3xl">
                {user?.username?.[0] || "U"}
              </AvatarFallback>
            </Avatar>

            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isUpdatingImage}
              className={`absolute -bottom-2 -right-2 p-2 rounded-full shadow-md ${
                isUpdatingImage
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              } text-white`}
            >
              <label
                htmlFor="avatar-upload"
                className={`cursor-pointer ${
                  isUpdatingImage ? "cursor-not-allowed" : ""
                }`}
              >
                {isUpdatingImage ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Edit size={20} />
                )}
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onAvatarChange}
                disabled={isUpdatingImage}
              />
            </MotionButton>
          </div>

          {user?.imageUrl && (
            <MotionButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              disabled={isRemovingImage}
              className={`mt-4 flex items-center gap-1 text-sm ${
                isRemovingImage
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-500 hover:text-red-600"
              }`}
              onClick={onRemoveImage}
            >
              {isRemovingImage ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
              ) : (
                <Trash2 size={16} />
              )}
              {isRemovingImage ? "در حال حذف..." : "حذف تصویر"}
            </MotionButton>
          )}
        </div>
        <CardFooter className="text-xs text-gray-500 dark:text-gray-400 justify-center mt-4">
          فرمت‌های مجاز: JPG, PNG حداکثر 2MB
        </CardFooter>
      </div>
    </MotionDiv>
  );
};
