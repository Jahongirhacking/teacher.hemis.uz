import Flex from "@/components/shared/Flex";
import ProfileGeneralCard from "./GeneralCard";

const ProfileAcademicWorks = () => {
  return (
    <ProfileGeneralCard title="Ilmiy-metodik ishlar">
      <Flex vertical gap={4}>
        <AcademicWorkItem
          title="Darslik va o’quv qo’llanmalar"
          value={["___", "____"]}
        />
        <AcademicWorkItem
          title="Uslubiy qo’llanmalar"
          value={["___", "____"]}
        />
      </Flex>
    </ProfileGeneralCard>
  );
};

const AcademicWorkItem = (props: { title: string; value?: string[] }) => (
  <Flex gap={4} className="card__list-item">
    <span className="w-[10px] h-[10px] min-w-[10px] bg-[var(--card-foreground)] rounded-full item__badge relative mt-[5px]" />
    <Flex vertical>
      <b className="text-[var(--card-foreground)]">{props?.title}</b>
      <ol type="1">
        {(props?.value || [])?.map((e, idx) => (
          <li key={idx} className="text-[var(--secondary-foreground)]">
            {idx + 1}. {e}
          </li>
        ))}
      </ol>
    </Flex>
  </Flex>
);

export default ProfileAcademicWorks;
