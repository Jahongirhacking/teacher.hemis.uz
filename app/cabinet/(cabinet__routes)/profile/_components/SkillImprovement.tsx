import { DataTable, TABLE_INDEX_NAME } from "@/components/shared/DataTable";
import ProfileGeneralCard from "./GeneralCard";

const ProfileSkillImprovement = () => {
  return (
    <ProfileGeneralCard title="Malaka oshirish">
      <DataTable
        rowKey={TABLE_INDEX_NAME}
        columns={[
          {
            title: "№",
            dataIndex: "idx",
          },
          {
            title: "Yo’nalish",
          },
          {
            title: "Joyi",
          },
          {
            title: "Muassasa",
          },
          {
            title: "Muddat/Keyingi",
          },
          {
            title: "Hujjat",
          },
        ]}
        dataSource={[]}
        emptyProps={{
          className: "p-10",
          image: {
            className: "w-[min(100%,250px)]",
          },
        }}
      />
    </ProfileGeneralCard>
  );
};

export default ProfileSkillImprovement;
