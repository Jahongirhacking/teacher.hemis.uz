import Flex from "@/components/shared/Flex";
import ProfileGeneralCard from "./GeneralCard";

const ProfilePrivateWorkPlan = () => {
  return (
    <ProfileGeneralCard title="Shaxsiy ish rejasi">
      <Flex vertical gap={4}>
        <WorkPlanItem title="Akademik yuklamasi" value="___" />
        <WorkPlanItem title="Uslubiy yuklamasi" value="___" />
      </Flex>
    </ProfileGeneralCard>
  );
};

const WorkPlanItem = (props: { title: string; value?: string }) => (
  <Flex gap={4} align="center">
    <span className="w-[10px] h-[10px] min-w-[10px] bg-[var(--card-foreground)] rounded-full relative" />
    <Flex vertical gap={2}>
      <b className="text-[var(--card-foreground)] text-[14px]">
        {props?.title}
      </b>
      <span className="text-[var(--secondary-foreground)] text-[14px] leading-[14px]">
        {props?.value || "-"}
      </span>
    </Flex>
  </Flex>
);

export default ProfilePrivateWorkPlan;
