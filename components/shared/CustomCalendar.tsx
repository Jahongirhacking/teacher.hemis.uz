"use client";

import { Calendar } from "@/components/ui/calendar";
import { SearchParams } from "@/lib/const";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function CustomCalendar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Calendar
      mode="single"
      selected={moment
        .unix(Number(searchParams.get(SearchParams.Date)) || moment().unix())
        .toDate()}
      onSelect={(value) => {
        const params = new URLSearchParams(searchParams);
        params.set(SearchParams.Date, String(moment(value).unix()));
        router.replace(`${pathname}?${params.toString()}`);
      }}
      className="rounded-md border shadow-sm bg-[var(--card)] flex-1 min-w-[min(100%,300px)]"
      captionLayout="dropdown"
      showOutsideDays={false}
    />
  );
}
