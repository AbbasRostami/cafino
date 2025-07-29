import DatePicker from "react-multi-date-picker";
import type { DatePickerProps, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// @ts-ignore
import transition from "react-element-popper/animations/transition";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { cn } from "@/lib/utils";

interface PersianDatePickerProps extends Omit<DatePickerProps, "value" | "onChange"> {
  value?: DateObject;
  onChange?: (date: DateObject | null) => void;
  disablePortal?: boolean;
}

export default function PersianDatePicker(props: PersianDatePickerProps) {
  const { disablePortal = false, value, onChange, ...restProps } = props;

  return (
    <DatePicker
      id={props.id}
      data-slot="input"
      name={props.name}
      value={value}
      onChange={onChange}
      placeholder={props.placeholder}
      required={props.required}
      calendar={persian}
      locale={persian_fa}
      format="YYYY/MM/DD"
      calendarPosition="bottom-right"
      portal={!disablePortal}
      containerStyle={{ zIndex: 9999 }}
      animations={[transition({ duration: 800, from: 35 })]}
      inputClass={
        props.inputClass
          ? props.inputClass
          : cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            )
      }
      {...restProps}
    />
  );
}
