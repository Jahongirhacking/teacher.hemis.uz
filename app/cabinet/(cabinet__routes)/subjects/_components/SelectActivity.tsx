"use client";

import CustomSelect from "@/components/shared/CustomSelect";
import { FilterParams } from "@/lib/const";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SelectActivity = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activities = [
    { label: "Ma'ruza", value: "lecture" },
    { label: "Amaliy", value: "practice" },
  ];

  return (
    <CustomSelect
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams);
        params.set(FilterParams.Activity, String(value));
        router.replace(`${pathname}?${params.toString()}`);
      }}
      options={activities}
      placeholder="Mashg'ulotni tanlang"
      allowClear
      className="w-[230px]"
    />
  );
};

export default SelectActivity;
