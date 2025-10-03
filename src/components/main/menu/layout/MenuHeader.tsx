export const MenuHeader = () => {
  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-[20%] w-40 h-40 bg-amber-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-[15%] w-32 h-32 bg-pink-300 opacity-30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-orange-400 opacity-30 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="relative w-full flex flex-col items-center gap-4 mb-12 animate-fade-in">
        <h1 className="text-center text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-xl tracking-tight">
          منوی ویژه کافینو
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-200 max-w-md">
          لذیذترین طعم‌ها را در منوی ما تجربه کنید
        </p>
      </div>
    </>
  );
};
