"use client";

import SelectActivity from "@/app/cabinet/(cabinet__routes)/subjects/_components/SelectActivity";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { MoreVertical, PlusSquare } from "lucide-react";

const SubjectTopicsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <SelectActivity />
        <Button>
          <PlusSquare /> Yaratish
        </Button>
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
            title: "Nomi",
            dataIndex: "topic",
            render: (i) => (
              <b className="text-[var(--primary)] font-medium">{i}</b>
            ),
          },
          {
            title: "Mashg’ulot",
            dataIndex: "activity",
            render: (i) => (
              <b className="text-[var(--card-foreground)] font-medium">{i}</b>
            ),
          },
          {
            title: "Yuklama",
            dataIndex: "acload",
            render: (i) => (
              <span className="text-[var(--secondary-foreground)]">{i}</span>
            ),
          },
          {
            title: "Semestr",
            dataIndex: "semester",
            render: (i) => (
              <span className="text-[var(--secondary-foreground)]">{i}</span>
            ),
          },
          {
            title: "Amallar",
            className: "w-[120px]",
            render: (_, record) => (
              <Button variant={"ghost"} onClick={() => console.log(record?.id)}>
                <MoreVertical />
              </Button>
            ),
          },
        ]}
        dataSource={Array.from({ length: 100 })?.map((_, id) => ({
          id,
          topic: `Mavzu ${id + 1}`,
          activity: "Ma'ruza",
          acload: 2,
          semester: "1-semestr",
          status: true,
        }))}
      />
    </div>
  );
};

export default SubjectTopicsPage;
