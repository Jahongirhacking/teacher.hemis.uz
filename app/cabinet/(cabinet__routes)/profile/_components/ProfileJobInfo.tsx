import ProfileGeneralCard from "./ProfileGeneralCard";

const ProfileJobInfo = () => {
  return (
    <ProfileGeneralCard title="Mehnat ma’lumotlari">
      <div className="flex flex-col gap-4 job-info">
        <JobItem
          positionName="Tashkilot"
          companyName="Muhammad al-Xorazmiy nomidagi Toshkent Axborot Texnologiyalari Universiteti"
        />
        <JobItem
          positionName="Bo’linma"
          companyName="Axborot xavfsizligi kafedrasi"
        />
      </div>
    </ProfileGeneralCard>
  );
};

const JobItem = (props: { positionName?: string; companyName?: string }) => (
  <div className="flex items-center gap-5 job-info__job-item">
    <span className="w-[10px] h-[10px] min-w-[10px] bg-[var(--card-foreground)] rounded-full job-item__badge relative" />
    <div className="flex flex-col gap-2">
      <b className="text-[var(--card-foreground)]">
        {props?.positionName || "-"}
      </b>
      <span className="text-[var(--secondary-foreground)]">
        {props?.companyName || "-"}
      </span>
    </div>
  </div>
);

export default ProfileJobInfo;
