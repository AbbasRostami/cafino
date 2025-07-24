"use client";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { GiImperialCrown, GiPhotoCamera } from "react-icons/gi";
import ProfileEditForm from "./ProfileEditForm";
import ProfileEditImage from "./ProfileEditImage";
import ProfileInfo from "./ProfileInfo";

export default function UserInfoCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  return (
    <div className="p-5 border border-gray-200 rtl rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6">
        <div className="w-full">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl bg-gradient-to-r from-amber-300/60 to-amber-200/40 px-4 sm:px-6 py-4 backdrop-blur-lg dark:from-amber-900/20 dark:to-amber-900/60 border border-white/20 dark:border-gray-700/30 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-200/30 blur-[60px] dark:bg-indigo-900/20" />

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e89300] to-[#ffe848] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-amber-300/40 dark:hover:shadow-amber-900/30">
                <GiImperialCrown size={25} className="dark:text-gray-800" />
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <div>
                <h4 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  پروفایل کاربری
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsEditingAvatar((prev) => !prev)}
                className="relative w-full sm:w-auto overflow-hidden rounded-xl bg-gradient-to-br from-[#e89300] to-[#ffe848] px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white shadow-xl shadow-indigo-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-300/50 dark:from-amber-400 dark:to-amber-500  dark:shadow-indigo-900/30"
              >
                <div className="absolute -inset-8 -rotate-45 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-40" />

                <div className="flex items-center justify-center gap-1.5 sm:gap-2 relative text-gray-800 dark:text-gray-800">
                  <GiPhotoCamera size={25} />
                  {isEditingAvatar ? "بستن فرم" : "ویرایش تصویر"}
                </div>
              </button>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="relative w-full sm:w-auto overflow-hidden rounded-xl bg-gradient-to-br from-[#e89300] to-[#ffe848] px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white shadow-xl shadow-indigo-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-300/50 dark:from-amber-400 dark:to-amber-500   dark:shadow-indigo-900/30"
              >
                <div className="absolute -inset-8 -rotate-45 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-40" />

                <div className="flex items-center justify-center gap-1.5 sm:gap-2 relative text-gray-800 dark:text-gray-800">
                  <BiEdit size={25} />
                  {isEditing ? "بستن فرم" : "ویرایش پروفایل"}
                </div>
              </button>
            </div>
          </div>

          <ProfileEditImage
            isEditingAvatar={isEditingAvatar}
            setIsEditingAvatar={setIsEditingAvatar}
          />
          <ProfileEditForm isEditing={isEditing} setIsEditing={setIsEditing} />

          <ProfileInfo />
        </div>
      </div>
    </div>
  );
}
