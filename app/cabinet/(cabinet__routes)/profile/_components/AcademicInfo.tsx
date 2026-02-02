import Flex from "@/components/shared/Flex";
import ProfileGeneralCard from "./GeneralCard";

const ProfileAcademicInfo = () => {
  return (
    <ProfileGeneralCard title="Ilmiy ma’lumotlari">
      <Flex vertical gap={4}>
        <AcademicItem title="Ilmiy daraja" value="Professor" />
        <AcademicItem title="Ilmiy unvon" value="Texnika fanlar nomzodi" />
      </Flex>
    </ProfileGeneralCard>
  );
};

const AcademicItem = (props: { title: string; value?: string }) => (
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

export default ProfileAcademicInfo;
