import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { ListFilterIcon } from "lucide-react";
import FilterDropdown from "../_components/FilterDropdown";

const SubjectInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-end">
        <FilterDropdown>
          <Button variant={"secondary"}>
            <ListFilterIcon /> Filter
          </Button>
        </FilterDropdown>
      </div>

      <DataTable
        rowKey={() => "id"}
        columns={[
          {
            title: "",
            dataIndex: "idx",
            className: "w-[40px]",
          },
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
        dataSource={Array.from({ length: 100 })?.map((_, id) => ({
          id,
          subject: `Hello ${id + 1}`,
        }))}
      />
    </div>
  );
};

export default SubjectInfo;
