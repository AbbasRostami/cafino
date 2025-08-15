"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import moment from "moment-jalaali";
import "moment-timezone";
import "moment/locale/fa";
import { useUpdateProfile, useUserProfile } from "@/services";
import ProfileSkeleton from "@/components/skeleton/Profile/settings/ProfileSkeleton";

import {
  SettingsHeader,
  AvatarSection,
  ProfileInfo,
  EditModal,
} from "@/components/profile/settings";

import { useAvatar } from "@/hooks/useAvatar";
import { ProfileFormData } from "@/types/Profile";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function SettingsPage() {
  const { data: user, isLoading } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);

  const {
    avatarPreview,
    isUpdatingImage,
    isRemovingImage,
    handleAvatarChange,
    handleRemoveImage,
  } = useAvatar();

  const createdAt = user?.created_at
    ? moment(user.created_at).tz("Asia/Tehran").format("jYYYY/jMM/jDD - HH:mm")
    : "---";

  const updatedAt = user?.updated_at
    ? moment(user.updated_at).tz("Asia/Tehran").format("jYYYY/jMM/jDD - HH:mm")
    : "---";

  const { updateProfile, isPending } = useUpdateProfile();

  const handleSubmit = (data: ProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="py-8">
      <SettingsHeader />

      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 mt-4 px-4 py-6 rounded-2xl space-y-4 pb-16">
        <AvatarSection
          user={user}
          avatarPreview={avatarPreview}
          isUpdatingImage={isUpdatingImage}
          isRemovingImage={isRemovingImage}
          onAvatarChange={handleAvatarChange}
          onRemoveImage={handleRemoveImage}
        />

        <ProfileInfo user={user} createdAt={createdAt} updatedAt={updatedAt} />
        <Button
          onClick={() => setIsEditing(true)}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-gray-700 hover:bg-amber-700"
        >
          ویرایش
        </Button>
      </div>

      <EditModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSubmit={handleSubmit}
        isPending={isPending}
        user={user}
      />
    </div>
  );
}
