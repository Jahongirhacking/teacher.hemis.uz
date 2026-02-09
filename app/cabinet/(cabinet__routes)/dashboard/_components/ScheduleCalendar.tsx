"use client";

import { CustomCalendar } from "@/components/shared/CustomCalendar";
import Empty from "@/components/shared/Empty";
import { Repeat } from "@/components/shared/Repeat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSchedulesByDateAction } from "@/lib/actions/subject.action";
import { cachedQueryKeys, TIME_FORMAT } from "@/lib/const";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { ReactNode, useState } from "react";

const ScheduleCalendar = () => {
  const [activeDate, setActiveDate] = useState(
    moment()?.format(TIME_FORMAT.Server),
  );
  const { data: schedulesData, isFetching } = useQuery({
    queryKey: cachedQueryKeys.scheduleDate(activeDate),
    queryFn: () => getSchedulesByDateAction({ params: { date: activeDate } }),
    enabled: !!activeDate,
  });

  const handleScheduleChange = (date?: Date) => {
    if (!date) return;
    setActiveDate(moment(date).format(TIME_FORMAT.Server));
  };

  return (
    <Card className="flex-1 p-4">
      <div className="flex flex-wrap justify-center items-start [@media(min-width:1440px)]:flex-nowrap gap-4">
        <div className="flex flex-col gap-6 w-full max-w-[650px]">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-[var(--primay-text)] font-bold">
              Dars jadvali
            </h3>
            <Button variant={"ghost"}>Batafsil</Button>
          </div>

          <div className="flex flex-col gap-2">
            {isFetching ? (
              <Repeat count={3}>
                <Skeleton active className="w-full h-15 !rounded-md" />
              </Repeat>
            ) : schedulesData?.success &&
              schedulesData?.data?.[0]?.classes?.length ? (
              <>
                {schedulesData?.data?.[0]?.classes?.map((subjectClass) => (
                  <DayStatistics
                    key={subjectClass?.id}
                    title={subjectClass?.subject?.name}
                    description={subjectClass?.group?.name}
                    value={subjectClass?.time?.start}
                  />
                ))}
              </>
            ) : (
              <Empty
                className="[&>img]:max-w-[180px]"
                description="Ushbu sanada darslar mavjud emas"
                image={{ src: "/images/empty-schedule.svg" }}
              />
            )}
          </div>
        </div>
        <CustomCalendar
          handleSelect={handleScheduleChange}
          selectedDate={moment(activeDate, TIME_FORMAT.Server).toDate()}
        />
      </div>
    </Card>
  );
};

const DayStatistics = ({
  title,
  description,
  value,
}: {
  title: string;
  description: string;
  value: number | string | ReactNode;
}) => {
  return (
    <div className="flex gap-2 flex-wrap items-center justify-between py-6 px-5 bg-[var(--background)] rounded-[8px]">
      <div className="flex flex-col gap-1">
        <span className="text-[16px]">{title}</span>
        <span className="text-[var(--secondary-text)] text-[14px]">
          {description}
        </span>
      </div>
      <b className="text-[18px] font-bold">{value}</b>
    </div>
  );
};

export default ScheduleCalendar;
