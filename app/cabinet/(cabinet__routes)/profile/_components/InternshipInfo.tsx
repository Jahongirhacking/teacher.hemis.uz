import { DataTable, TABLE_INDEX_NAME } from "@/components/shared/DataTable";
import ProfileGeneralCard from "./GeneralCard";

const ProfileInternshipInfo = () => {
  return (
    <ProfileGeneralCard title="Stajirovka">
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
            title: "Davlat",
          },
          {
            title: "Tashkilot",
          },
          {
            title: "Muddati",
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

export default ProfileInternshipInfo;
