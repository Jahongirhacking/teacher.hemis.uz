import { CustomCalendar } from "@/components/shared/CustomCalendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import moment from "moment";

const CalendarCard = ({ activeDate }: { activeDate: number }) => {
  console.log(moment.unix(activeDate)?.format("DD.MM.YYYY"));

  return (
    <Card className="flex-1 p-4">
      <div className="flex flex-wrap justify-center items-center [@media(min-width:1440px)]:flex-nowrap gap-4">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-[var(--primay-text)] font-bold">
              Fanlar kalendar rejasi
            </h3>
            <Button variant={"ghost"}>Batafsil</Button>
          </div>

          <div className="flex flex-col gap-2">
            <DayStatistics
              title="Jami fanlar soati"
              description="joriy semestrda(4-semestr)"
              value={400}
            />
            <DayStatistics
              title="O’tilgan mavzular soati"
              description="joriy semestrda(4-semestr)"
              value={250}
            />
            <DayStatistics
              title="Qolgan mavzular soati"
              description="joriy semestrda(4-semestr)"
              value={150}
            />
          </div>
        </div>
        <CustomCalendar />
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
  value: number;
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

export default CalendarCard;
