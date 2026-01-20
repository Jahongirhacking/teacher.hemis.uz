import { SearchParams } from "@/lib/const";
import { DashboardCardIcons } from "@/public/icons";
import moment from "moment";
import ActivitiesCard from "./_components/ActivitiesCard";
import CalendarCard from "./_components/CalendarCard";
import StatisticsCard from "./_components/StatisticsCard";

const DEFAULT_IMAGE_PATH = "/images/background";

const Page = async ({ searchParams }) => {
  const params = await searchParams;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-[18px] text-[var(--header-primary-foreground)]">
        Bosh sahifa
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatisticsCard
          icon={<DashboardCardIcons.EduplanCalendar />}
          colors={{ dark: "#24349780", light: "#243497" }}
          status={{ percent: 95 }}
          title="O’quv ishlar rejasi"
          value={10}
          bgImage={`${DEFAULT_IMAGE_PATH}/bg-img-1.png`}
        />
        <StatisticsCard
          icon={<DashboardCardIcons.MethodicCalendar />}
          colors={{ dark: "#fca32e80", light: "#FCA32E" }}
          status={{ percent: 13 }}
          title="Uslubiy ishlar rejasi"
          value={19}
          bgImage={`${DEFAULT_IMAGE_PATH}/bg-img-2.png`}
        />
        <StatisticsCard
          icon={<DashboardCardIcons.AcademicCalendar />}
          colors={{ dark: "#1077F880", light: "#1077F8" }}
          status={{ percent: 20 }}
          title="Ilmiy ishlar rejasi"
          value={23}
          bgImage={`${DEFAULT_IMAGE_PATH}/bg-img-3.png`}
        />
        <StatisticsCard
          icon={<DashboardCardIcons.OrganizationalCalendar />}
          colors={{ dark: "#2FA45880", light: "#2FA458" }}
          status={{ percent: 25 }}
          title="Tashkiliy ishlar rejasi"
          value={7}
          bgImage={`${DEFAULT_IMAGE_PATH}/bg-img-4.png`}
        />
      </div>
      <div className="flex gap-4 flex-wrap">
        <ActivitiesCard />
        <CalendarCard
          activeDate={Number(params?.[SearchParams.Date]) || moment().unix()}
        />
      </div>
    </div>
  );
};

export default Page;
