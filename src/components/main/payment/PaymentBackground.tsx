"use client";

export const PaymentBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-1/3 right-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')] opacity-[0.03] dark:opacity-[0.05]"></div>
    </div>
  );
};
