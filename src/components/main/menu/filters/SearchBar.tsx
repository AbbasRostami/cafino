"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchBarProps } from "@/types/main";

export const SearchBar = ({ input, setInput }: SearchBarProps) => {
  return (
    <div className="relative max-w-xl mx-auto mb-12 animate-fade-in">
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-400 dark:text-white" />
      </div>
      <Input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        type="text"
        placeholder="چی میل دارید؟ مثلاً قهوه، پیتزا، دسر..."
        className="w-full pr-10 pl-5 py-6 rounded-full placeholder:text-gray-400 dark:placeholder:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-amber-400 bg-white/80 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 shadow-lg backdrop-blur-md"
      />
    </div>
  );
};
