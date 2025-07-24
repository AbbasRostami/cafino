import image from "./../../../../../assets/Logo/2.webp";
import image2 from "./../../../../../assets/Logo/2.webp";
import image3 from "./../../../../../assets/Logo/2.webp";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const ProfileEditImage = ({
  setIsEditingAvatar,
  isEditingAvatar,
}: {
  isEditingAvatar: boolean;
  setIsEditingAvatar: (value: boolean) => void;
}) => {
  const data = {
    userImage: [
      { id: 1, puctureAddress: image },
      { id: 2, puctureAddress: image2 },
      { id: 3, puctureAddress: image3 },
    ],
  };
  const autoplay = Autoplay({ delay: 2000 });
  const emblaRef = useRef<any>(null);
  return (
    <div
      className={`transition-all duration-700 ease-in-out overflow-hidden ${
        isEditingAvatar
          ? "max-h-[3000px] opacity-100 mt-4 mb-4"
          : "max-h-0 opacity-0"
      }`}
    >
      <div className="w-full rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-6 items-start border border-dashed p-6 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/20 overflow-hidden">
        {data?.userImage && data.userImage.length > 0 ? (
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 z-10">
              <button className="swiper-button-prev dark:bg-gray-800 p-2 rounded-full shadow-lg dark:hover:bg-[#ffd81e] transition-all w-12 h-12 flex items-center justify-center">
                <svg
                  fill="#312f2f"
                  height="40"
                  width="40"
                  viewBox="-51.2 -51.2 614.40 614.40"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(180)"
                >
                  <rect
                    x="-51.2"
                    y="-51.2"
                    width="614.40"
                    height="614.40"
                    rx="307.2"
                    fill="#dae0e2"
                  />
                  <path
                    d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M346.899,280.959 
  l-85.594,85.594c-13.783,13.784-36.132,13.784-49.917,0c-13.784-13.784-13.784-36.133,0-49.917L272.023,256l-60.635-60.635 
  c-13.784-13.784-13.784-36.133,0-49.917s36.134-13.784,49.917,0l85.594,85.594C360.683,244.825,360.683,267.175,346.899,280.959z"
                  />
                </svg>
              </button>
            </div>

            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
              <button className="swiper-button-next dark:bg-gray-800 p-2 rounded-full shadow-lg dark:hover:bg-[#ffd81e] transition-all w-12 h-12 flex items-center justify-center">
                <svg
                  fill="#312f2f"
                  height="40"
                  width="40"
                  viewBox="-51.2 -51.2 614.40 614.40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="-51.2"
                    y="-51.2"
                    width="614.40"
                    height="614.40"
                    rx="307.2"
                    fill="#dae0e2"
                  />
                  <path
                    d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M346.899,280.959 
  l-85.594,85.594c-13.783,13.784-36.132,13.784-49.917,0c-13.784-13.784-13.784-36.133,0-49.917L272.023,256l-60.635-60.635 
  c-13.784-13.784-13.784-36.133,0-49.917s36.134-13.784,49.917,0l85.594,85.594C360.683,244.825,360.683,267.175,346.899,280.959z"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={emblaRef}
              className="shadow-xl rounded-xl dark:shadow-gray-800/30 w-full"
            >
              {data.userImage.map((img, index) => {
                return (
                  <div key={index}>
                    <div className="relative group">
                      <Image
                        src={img.puctureAddress}
                        alt={`avatar-${index}`}
                        className="rounded-xl w-full h-60 object-cover border dark:border-gray-700 transition-all duration-300 transform group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        <button className="flex items-center gap-2 px-3 sm:px-5 py-2 text-sm font-medium rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          انتخاب
                        </button>

                        <button className="flex items-center gap-2 px-3 sm:px-5 py-2 text-sm font-medium rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M3 6h18M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6M10 6V4h4v2" />
                          </svg>
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto p-6 border-2 border-dashed rounded-2xl text-center text-indigo-600 dark:text-indigo-300 dark:border-indigo-500 bg-indigo-50/50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center gap-4">
              <svg
                className="w-12 h-12 text-indigo-400 dark:text-indigo-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 5h18M3 19h18M5 5v14m14-14v14" />
              </svg>
              <p className="text-base font-medium">
                هیچ تصویری برای نمایش وجود ندارد
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-6">
          <label className="w-full max-w-md flex flex-col items-center justify-center border-2 border-dashed border-[#964d0a] dark:border-[#ffd81e] rounded-2xl px-8 py-12 bg-indigo-50/50 dark:bg-gray-900 transition-all hover:shadow-lg cursor-pointer">
            <span className="text-lg font-medium text-gray-700 dark:text-amber-100 mb-4">
              انتخاب تصویر جدید
            </span>
            <input type="file" className="hidden" />
            <div className="flex items-center justify-center gap-3 text-[#964d0a] dark:text-[#ffd81e] font-medium">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12v9m0-9l-3 3m3-3l3 3m0-6V4m0 0L9 7m6-3l3 3"
                />
              </svg>
              <span className="text-base">بارگذاری فایل</span>
            </div>
            {image && (
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                فایل انتخاب شده:{" "}
                <span className="font-semibold">{"تصویر پیش‌فرض"}</span>
              </p>
            )}
          </label>

          <button className="mt-2 px-6 py-3 rounded-xl bg-color1 text-white text-base font-semibold hover:bg-color2 transition-all duration-300 shadow-md hover:shadow-xl">
            ثبت تصویر
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditImage;
