"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { Button } from "@/components/ui/button";
import { ISubjectTopic } from "@/lib/services/subject/type";
import { MoreVertical } from "lucide-react";

const SubjectTopicsTable = (props: Partial<DataTableProps<ISubjectTopic>>) => {
  return (
    <DataTable
      rowKey={() => "id"}
      columns={[
        {
          title: "",
          dataIndex: "idx",
          className: "w-[40px]",
        },
        {
          title: "Fan nomi",
          dataIndex: "subject_name",
          render: (i) => (
            <b className="text-[var(--primary)] font-medium">{i}</b>
          ),
        },
        {
          title: "O’quv reja/Fakultet",
          render: (_, topic: ISubjectTopic) => (
            <div className="flex flex-col">
              <b className="font-medium text-[14px] text-[var(--card-foreground)]">
                {topic?.curriculum_name}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                -
              </span>
            </div>
          ),
        },
        {
          title: "O’quv yili/Semestr",
          render: (_, topic: ISubjectTopic) => (
            <div className="flex flex-col">
              <b className="font-medium text-[14px] text-[var(--card-foreground)]">
                -
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                {topic?.semester}
              </span>
            </div>
          ),
        },
        {
          title: "Ta’lim turi/Status",
          render: (_, topic: ISubjectTopic) => (
            <div className="flex flex-col">
              <b className="font-medium text-[14px] text-[var(--card-foreground)]">
                {topic?.education_type?.name}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                -
              </span>
            </div>
          ),
        },
        {
          title: "Kafedra",
          render: (_, topic: ISubjectTopic) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {topic?.department?.name}
            </span>
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
      {...props}
    />
  );
};

export default SubjectTopicsTable;
