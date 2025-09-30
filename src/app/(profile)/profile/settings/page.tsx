"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUpdateProfile, useUserProfile } from "@/services";

import {
  SettingsHeader,
  AvatarSection,
  ProfileInfo,
  EditModal,
} from "@/components/profile/settings";

import { useAvatar } from "@/hooks/ui/useAvatar";
import { ProfileFormData } from "@/types/Profile";
import { ProfileSkeleton } from "@/components/skeleton";

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

      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 mt-4 px-4 py-6 rounded-2xl space-y-4">
        <AvatarSection
          user={user}
          avatarPreview={avatarPreview}
          isUpdatingImage={isUpdatingImage}
          isRemovingImage={isRemovingImage}
          onAvatarChange={handleAvatarChange}
          onRemoveImage={handleRemoveImage}
        />

        <ProfileInfo user={user} />
        <Button
          onClick={() => setIsEditing(true)}
          className="w-full mt-6  bg-gradient-to-r from-amber-500 to-orange-500 text-gray-700 hover:bg-amber-700"
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
