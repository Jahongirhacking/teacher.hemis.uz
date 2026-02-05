/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomSelect from "@/components/shared/CustomSelect";
import CustomDropDownMenu, {
  DropdownMenuProps,
} from "@/components/shared/DropdownMenu";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { batchSubjectFiltersAction } from "@/lib/actions/subject.action";
import { cachedQueryKeys } from "@/lib/const";
import {
  ALL_FILTER_KEYS,
  ALL_SUBJECT_FILTERS,
  FilterItem,
  ICurriculum,
  IEducationYear,
  IFiltersForm,
  IGroup,
  ISemester,
  SubjectFilters,
} from "@/lib/services/subject/type";
import { getSearchParamString } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

const FilterDropdown = ({
  children,
  types = ALL_SUBJECT_FILTERS,
}: {
  children: ReactElement;
  align?: DropdownMenuProps["align"];
  types?: SubjectFilters[];
}) => {
  const searchParams = useSearchParams();
  const { control, reset, handleSubmit, getValues } = useForm<IFiltersForm>();
  const values = useWatch({ control });
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: filterWrappedData, isFetching } = useQuery({
    queryKey: cachedQueryKeys.filters(values),
    queryFn: () => batchSubjectFiltersAction({ body: { ...values, types } }),
    placeholderData: (prev) => prev,
  });
  const filterData = filterWrappedData?.data;

  const handleFormSubmit = (data: IFiltersForm) => {
    router.replace(`${pathname}?${getSearchParamString(data)}`);
    setOpen(false);
  };

  const formValuesFromUrl = useMemo<IFiltersForm>(() => {
    const obj: Partial<IFiltersForm> = {};
    ALL_FILTER_KEYS.forEach((filterKey) => {
      obj[filterKey as string] = searchParams.get(filterKey) || "";
    });
    return obj as IFiltersForm;
  }, [searchParams]);

  useEffect(() => {
    reset(formValuesFromUrl);
  }, [formValuesFromUrl, reset]);

  return (
    <CustomDropDownMenu
      open={open}
      onOpenChange={setOpen}
      itemsRender={() => (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Flex vertical className="min-w-[min(95dvh,300px)]">
            <Flex justify="between" align="center" className="w-full py-3 px-4">
              <b>Filter</b>
              <Button
                variant={"link"}
                className="hover:text-[rgba(var(--destructive-rgba),0.6)] underline text-[var(--destructive)]"
                onClick={(e) => {
                  e.preventDefault();
                  router.replace(pathname);
                }}
              >
                Tozalash
              </Button>
            </Flex>
            <Separator />
            <Flex vertical gap={4} className="p-4 w-full">
              <Flex vertical gap={4} className="w-full">
                {types
                  ?.filter(
                    (e) => e in FilterMap && !!FilterMap?.[e]?.connected_key,
                  )
                  ?.map((key) => (
                    <Flex vertical gap={2} key={key} className="w-full">
                      <label className="text-[14px]">
                        {FilterMap?.[key]?.name}
                      </label>
                      <Controller
                        name={FilterMap?.[key]?.connected_key as FilterItem}
                        control={control}
                        defaultValue={""}
                        render={({ field }) => (
                          <CustomSelect
                            allowClear
                            showSearch
                            options={[...(filterData?.[key] || [])]
                              ?.sort(FilterMap?.[key]?.sortFn)
                              ?.map?.(FilterMap?.[key]?.render as any)}
                            placeholder={FilterMap?.[key]?.placeholder}
                            value={field?.value}
                            onValueChange={field?.onChange}
                            loading={isFetching}
                          />
                        )}
                      />
                    </Flex>
                  ))}
              </Flex>
              <Flex gap={2} align="center" justify="end" className="w-full">
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}
                >
                  Yopish
                </Button>
                <Button type="submit">Filtrlash</Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
      )}
      triggerButton={children}
    />
  );
};

const FilterMap: Partial<
  Record<
    SubjectFilters,
    {
      name: string;
      placeholder: string;
      connected_key: FilterItem;
      render: (obj: any) => { value: string | number; label: string };
      sortFn: (a?: any, b?: any) => number;
    }
  >
> = {
  [SubjectFilters.EducationYears]: {
    name: "O'quv yili",
    connected_key: FilterItem.EducationYear,
    placeholder: "O'quv yilini tanlang",
    sortFn: (a: IEducationYear, b: IEducationYear) =>
      Number(b?.code) - Number(a?.code),
    render: (obj: IEducationYear) => ({
      label: obj?.name,
      value: obj?.code,
    }),
  },
  [SubjectFilters.Semesters]: {
    name: "Semestr",
    connected_key: FilterItem.Semester,
    placeholder: "Semestrni tanlang",
    sortFn: () => 0,
    render: (obj: ISemester) => ({
      label: obj?.name,
      value: obj?.code,
    }),
  },
  [SubjectFilters.Groups]: {
    name: "Guruh",
    connected_key: FilterItem.Group,
    sortFn: () => 0,
    placeholder: "Guruhni tanlang",
    render: (obj: IGroup) => ({
      label: obj?.name,
      value: obj?.id,
    }),
  },
  [SubjectFilters.Curriculums]: {
    name: "O'quv reja",
    connected_key: FilterItem.Curriculum,
    sortFn: () => 0,
    placeholder: "O'quv rejani tanlang",
    render: (obj: ICurriculum) => ({
      label: obj?.name,
      value: obj?.id,
    }),
  },
  [SubjectFilters.Subjects]: {
    name: "Fan",
    connected_key: FilterItem.Subject,
    sortFn: () => 0,
    placeholder: "Fanni tanlang",
    render: (obj: ICurriculum) => ({
      label: obj?.name,
      value: obj?.id,
    }),
  },
};

export default FilterDropdown;
