import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputBlockProps } from "@/types/Profile";

export const InputBlock = ({
  label,
  name,
  register,
  errors,
  type = "text",
}: InputBlockProps) => {
  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </Label>
      <Input
        type={type}
        {...register(name)}
        className="w-full bg-gray-100 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-500"
        required
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
};
