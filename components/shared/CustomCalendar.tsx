"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import moment from "moment";
import { PropsSingle } from "react-day-picker";

export function CustomCalendar({
  className,
  handleSelect,
  selectedDate,
}: {
  className?: string;
  handleSelect: PropsSingle["onSelect"];
  selectedDate?: Date;
}) {
  return (
    <Calendar
      mode="single"
      selected={selectedDate || moment().toDate()}
      className={cn(
        "rounded-md border shadow-sm bg-[var(--card)] flex-1 min-w-[min(100%,300px)]",
        className,
      )}
      captionLayout="dropdown"
      showOutsideDays={false}
      onSelect={handleSelect}
    />
  );
}
