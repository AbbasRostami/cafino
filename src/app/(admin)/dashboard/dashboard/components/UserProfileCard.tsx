"use client";
import Image from "next/image";
import introImg from "./../../../../../assets/Logo/2.webp";
import { BiIdCard, BiPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileCard() {
  if (true)
    return (
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-full items-center gap-6 w-full mx-auto dark:hover:bg-gray-700/80 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl hover:bg-gray-100 shadow-xl p-6 rtl dark:border-gray-800 dark:bg-gray-900 transition-all duration-300">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton
           
            className="w-24 h-24 rounded-full"
          />
          <Skeleton
           
            className="h-4 w-20 rounded-md"
          />
          <div className="w-16 h-1 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 mx-auto" />
        </div>
        <div className="space-y-5 max-h-64 md:max-h-none w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <Skeleton
                
                className="w-8 h-8 rounded-lg"
              />
              <Skeleton
                
                className="h-4 w-24 rounded-md flex-1"
              />
              <Skeleton
                
                className="h-3 w-32 rounded-md flex-1"
              />
            </div>
          ))}
        </div>
      </div>
    );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center  h-full gap-6 w-full  mx-auto dark:hover:bg-gray-700/80 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl hover:bg-gray-100 shadow-xl p-6 rtl dark:border-gray-800 dark:bg-gray-900 transition-all duration-300">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Image
            className="w-24 h-24 object-cover rounded-full border-4 border-color1 shadow-lg"
            width={100}
            height={100}
            src={introImg}
            alt="Profile Picture"
          />
          <span className="absolute -bottom-2 -right-2 bg-color2 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
            فعال
          </span>
        </div>

        <div className="text-center">
          <h2
            className="w-28 truncate text-2xl font-bold text-gray-900 dark:text-white"
            title={`کاربر`}
          >
            {"buyer"}
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full mt-2 mx-auto" />
        </div>
      </div>

      <div className="space-y-5 overflow-y-auto max-h-64 md:max-h-none">
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-600 text-indigo-600 dark:text-white rounded-lg">
            <MdEmail className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
              ایمیل
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-end text-gray-600 dark:text-gray-300 truncate">
              {"abbas@gmail.com"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-600 text-indigo-600 dark:text-white rounded-lg">
            <BiPhoneCall className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
              شماره تماس
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-end text-gray-600 dark:text-gray-300">
              {"09123456789"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-600 text-indigo-600 dark:text-white rounded-lg">
            <BiIdCard className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
              شناسه کاربری
            </p>
          </div>
          <div className="flex-1  min-w-0">
            <p className="text-xs text-end text-gray-600 dark:text-gray-300">
              {"1234567890"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
