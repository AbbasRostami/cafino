export const dynamic = "force-static";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-6xl mb-4">📱</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">آفلاین هستید</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          اتصال اینترنت شما قطع شده است. لطفاً اتصال خود را بررسی کنید و دوباره
          تلاش کنید.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          تلاش مجدد
        </button>

        <div className="mt-6 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span>✅</span>
            <span>منو و اطلاعات در دسترس</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span>✅</span>
            <span>تصاویر از کش لود می‌شوند</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>✅</span>
            <span>تجربه آفلاین بهینه</span>
          </div>
        </div>
      </div>
    </div>
  );
}
