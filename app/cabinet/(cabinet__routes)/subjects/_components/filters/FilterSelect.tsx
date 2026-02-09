"use client";

import CustomSelect from "@/components/shared/CustomSelect";
import { getSubjectFilterByTypeAction } from "@/lib/actions/subject.action";
import { cachedQueryKeys } from "@/lib/const";
import { FilterItem, SubjectFilters } from "@/lib/services/subject/type";
import { getSearchParamString } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps } from "react";

export const SelectFilterType = ({
  filterType,
  paramKey,
  ...props
}: { filterType: SubjectFilters; paramKey: FilterItem } & ComponentProps<
  typeof CustomSelect
>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data: trainingTypes } = useQuery({
    queryKey: cachedQueryKeys.selectFilters(filterType),
    queryFn: () => getSubjectFilterByTypeAction({ params: { filterType } }),
  });

  const handleValueChange = (value?: string | number) => {
    router.replace(
      `${pathname}?${getSearchParamString({ ...searchParams, [paramKey]: value })}`,
    );
  };

  return (
    <CustomSelect
      showSearch
      allowClear
      options={
        (trainingTypes?.success &&
          trainingTypes?.data?.map((t) => ({
            label: t?.name,
            value: t?.code,
          }))) ||
        []
      }
      value={searchParams.get(paramKey) || undefined}
      onValueChange={handleValueChange}
      className="bg-[var(--card)] min-w-[150px]  md:min-w-[230px]"
      {...props}
    />
  );
};
