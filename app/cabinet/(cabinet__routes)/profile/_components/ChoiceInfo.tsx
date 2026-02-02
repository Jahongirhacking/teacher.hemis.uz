import { DataTable, TABLE_INDEX_NAME } from "@/components/shared/DataTable";
import ProfileGeneralCard from "./GeneralCard";

const ProfileChoiceInfo = () => {
  return (
    <ProfileGeneralCard title="Tanlov ma’lumotlari">
      <DataTable
        rowKey={TABLE_INDEX_NAME}
        columns={[
          {
            title: "№",
            dataIndex: "idx",
          },
          {
            title: "Lavozim",
          },
          {
            title: "Bo’linma",
          },
          {
            title: "Muddati",
          },
          {
            title: "Kengash qarori",
          },
          {
            title: "Keyingi muddat",
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

export default ProfileChoiceInfo;
