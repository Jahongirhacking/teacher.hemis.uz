"use client";

import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getSchedulesByDateAction,
  getSchedulesByRangeAction,
} from "@/lib/actions/subject.action";
import { cachedQueryKeys, TIME_FORMAT } from "@/lib/const";
import { cn } from "@/lib/utils";
import { dayNames, getTranslatedName, monthNames } from "@/lib/utils/date.util";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

enum ViewType {
  Day = "day",
  Month = "month",
}

const Timetable = () => {
  const searchParams = useSearchParams();
  const [viewType, setViewType] = useState<ViewType>(ViewType.Month);
  const currentTime = moment();
  const [activeTime, setActiveTime] = useState(currentTime?.clone());
  const [visibleTime, setVisibleTime] = useState(activeTime?.clone());

  const { data: activeDaySchedule, isFetching: isActiveDayScheduleFetching } =
    useQuery({
      queryKey: cachedQueryKeys.schedule({
        date: activeTime?.format(TIME_FORMAT.Server),
        ...searchParams,
      }),
      queryFn: () =>
        getSchedulesByDateAction({
          params: {
            date: activeTime?.format(TIME_FORMAT.Server),
            ...searchParams,
          },
        }),
      enabled: !!activeTime,
    });

  const { data: monthlySchedule, isFetching: isMonthlyScheduleFetching } =
    useQuery({
      queryKey: cachedQueryKeys.schedule({
        startDate: visibleTime
          ?.clone()
          ?.startOf("month")
          ?.format(TIME_FORMAT.Server),
        endDate: visibleTime
          ?.clone()
          ?.endOf("month")
          ?.format(TIME_FORMAT.Server),
        ...searchParams,
      }),
      queryFn: () =>
        getSchedulesByRangeAction({
          params: {
            start_date: visibleTime
              ?.clone()
              ?.startOf("month")
              ?.format(TIME_FORMAT.Server),
            end_date: visibleTime
              ?.clone()
              ?.endOf("month")
              ?.format(TIME_FORMAT.Server),
            ...searchParams,
          },
        }),
      enabled: viewType === ViewType.Month,
    });

  return (
    <Flex vertical gap={4} className="w-full">
      <Flex gap={4} justify="between" className="flex-wrap w-full">
        <Flex gap={4} align="center">
          <Button
            variant={"secondary"}
            onClick={() =>
              setVisibleTime(visibleTime.clone().subtract(1, "month"))
            }
          >
            <ChevronLeftIcon />
          </Button>
          <span className="font-bold text-[18px]">{`${getTranslatedName(monthNames, visibleTime.month(), "long")?.toUpperCase()} ${visibleTime?.year()}`}</span>
          <Button
            variant={"secondary"}
            onClick={() => setVisibleTime(visibleTime.clone().add(1, "month"))}
          >
            <ChevronRightIcon />
          </Button>
        </Flex>
        <Flex gap={2}>
          <Button
            variant={viewType === ViewType.Month ? "secondary" : "outline"}
            onClick={() => setViewType(ViewType.Month)}
          >
            Oy
          </Button>
          <Button
            variant={viewType === ViewType.Day ? "secondary" : "outline"}
            onClick={() => setViewType(ViewType.Day)}
          >
            Kun
          </Button>
        </Flex>
      </Flex>
      {viewType === ViewType.Month && (
        <Flex gap={4} align="stretch" className="overflow-x-auto !max-w-full">
          {Array.from({ length: visibleTime.daysInMonth() })?.map((_, idx) => {
            const tempDate = visibleTime
              ?.clone()
              ?.startOf("month")
              .clone()
              .add(idx, "days");
            return (
              <Button
                className={cn(
                  "h-auto min-w-[85px] block flex flex-col justify-start",
                  currentTime.isSame(tempDate, "day") &&
                    "border-[var(--primary)]",
                )}
                type="button"
                key={tempDate?.unix() || idx}
                variant={
                  activeTime.isSame(tempDate, "day") ? "default" : "outline"
                }
                onClick={() => setActiveTime(tempDate)}
              >
                <Flex vertical gap={3} align="center" justify="start">
                  <span
                    className={cn(
                      "text-[14px] font-normal",
                      !tempDate.isSame(activeTime, "day") &&
                        "text-[var(--secondary-foreground)]",
                    )}
                  >
                    {getTranslatedName(dayNames, tempDate.day(), "short")}
                  </span>
                  <h3 className="text-[18px] font-bold">
                    {String(idx + 1).padStart(2, "0")}
                  </h3>
                  {isMonthlyScheduleFetching ? (
                    <Skeleton
                      className="w-[10px] h-[10px] rounded-full"
                      active
                    />
                  ) : (
                    monthlySchedule?.success &&
                    !!monthlySchedule?.data?.find(
                      (schedule) =>
                        schedule?.date === tempDate?.format(TIME_FORMAT.Server),
                    )?.classes?.length && (
                      <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
                        <span
                          className={cn(
                            "bg-[#2FA458] size-2 rounded-full",
                            currentTime.isAfter(tempDate) && "bg-[#A6ACB6]",
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    )
                  )}
                </Flex>
              </Button>
            );
          })}
        </Flex>
      )}
      <Flex vertical className="mt-2 w-full">
        {isActiveDayScheduleFetching ? (
          <Flex
            gap={2}
            vertical
            className="bg-[var(--background)] overflow-hidden border-[1px] border-[var(--card-header)] rounded-md w-full p-4 schedule__class-item-card"
          >
            <Skeleton active className="w-full h-5" />
            <Skeleton active className="w-[90%] h-5" />
            <Skeleton active className="w-[95%] h-5" />
          </Flex>
        ) : activeDaySchedule?.success && activeDaySchedule?.data?.length ? (
          <Flex vertical gap={4} className="w-full">
            {activeDaySchedule?.data?.[0]?.classes?.map((classItem) => (
              <Flex
                key={classItem?.id}
                align="stretch"
                className="bg-[var(--background)] overflow-hidden border-[1px] border-[var(--card-header)] rounded-md w-full flex-col md:flex-row schedule__class-item-card"
              >
                <Flex
                  vertical
                  gap={2}
                  align="center"
                  className="border-r-none md:border-r border-b md:border-b-none py-8 px-22"
                >
                  <b>{classItem?.time?.start ?? "-"}</b>
                  <Separator
                    orientation="vertical"
                    className="!h-6 w-[1px] block"
                  />
                  <b>{classItem?.time?.end ?? "-"}</b>
                </Flex>
                <Flex vertical gap={4} justify="between" className="p-6 flex-1">
                  <Flex
                    gap={6}
                    justify="between"
                    align="center"
                    className="w-full"
                  >
                    <b className="text-[20px] font-semibold">
                      {classItem?.subject?.name}
                    </b>
                    <Badge variant={"secondary"}>
                      {classItem?.training_type}
                    </Badge>
                  </Flex>
                  <Flex className="gap-x-40 gap-y-4 flex-wrap">
                    <Flex vertical gap={2}>
                      <span>Xona</span>
                      <b>{classItem?.auditorium}</b>
                    </Flex>
                    <Flex vertical gap={2}>
                      <span>Guruh</span>
                      <b>{classItem?.group?.name}</b>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        ) : (
          <Empty className="m-auto" />
        )}
      </Flex>
    </Flex>
  );
};

export default Timetable;
