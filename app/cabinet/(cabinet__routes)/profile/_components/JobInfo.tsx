import Flex from "@/components/shared/Flex";
import ProfileGeneralCard from "./GeneralCard";

const ProfileJobInfo = () => {
  return (
    <ProfileGeneralCard title="Mehnat ma’lumotlari">
      <Flex vertical gap={4} className="job-info">
        <JobItem
          positionName="Tashkilot"
          companyName="Muhammad al-Xorazmiy nomidagi Toshkent Axborot Texnologiyalari Universiteti"
        />
        <JobItem
          positionName="Bo’linma"
          companyName="Axborot xavfsizligi kafedrasi"
        />
      </Flex>
    </ProfileGeneralCard>
  );
};

const JobItem = (props: { positionName?: string; companyName?: string }) => (
  <Flex align="center" gap={5} className="card__list-item">
    <span className="w-[10px] h-[10px] min-w-[10px] bg-[var(--card-foreground)] rounded-full item__badge relative" />
    <Flex vertical gap={2}>
      <b className="text-[var(--card-foreground)]">
        {props?.positionName || "-"}
      </b>
      <span className="text-[var(--secondary-foreground)]">
        {props?.companyName || "-"}
      </span>
    </Flex>
  </Flex>
);

export default ProfileJobInfo;
