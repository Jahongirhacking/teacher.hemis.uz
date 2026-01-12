import { DataTable } from "@/components/shared/DataTable";

const SubjectInfo = () => {
  return (
    <div>
      <DataTable
        rowKey={() => "id"}
        columns={[
          {
            title: "Fanlar",
            dataIndex: "subject",
          },
          {
            title: "O'quv reja",
            render: () => (
              <div className="flex flex-col">
                <b>{"Madaniy meroz_o'quv reja"}</b>
                <span>{"IT-Park test"}</span>
              </div>
            ),
          },
          {
            title: "Ta’lim turi",
            render: () => (
              <div className="flex flex-col">
                <b>{"Bakalavr / Kunduzgi"}</b>
                <span>{"Kredit baholash tizimi"}</span>
              </div>
            ),
          },
          {
            title: "Semestr",
            render: () => (
              <div className="flex flex-col">
                <b>{"1-semestr"}</b>
                <span>{"2023-2024"}</span>
              </div>
            ),
          },
        ]}
        dataSource={[{ id: "1", subject: "Dasturlash asoslari" }]}
      />
    </div>
  );
};

export default SubjectInfo;
