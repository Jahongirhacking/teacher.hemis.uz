"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { ISubjectInfo } from "@/lib/services/subject/type";

const SubjectInfoTable = (props: Partial<DataTableProps<ISubjectInfo>>) => {
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
          dataIndex: "subject",
          render: (subject: ISubjectInfo["subject"]) => (
            <b className="text-[var(--primary)] font-medium">{subject?.name}</b>
          ),
        },
        {
          title: "O’quv reja/Fakultet",
          render: (_, topic: ISubjectInfo) => (
            <div className="flex flex-col">
              <b className="font-medium text-[14px] text-[var(--card-foreground)]">
                {topic?.curriculum?.name}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                -
              </span>
            </div>
          ),
        },
        {
          title: "Ta’lim turi",
          render: () => (
            <div className="flex flex-col">
              <b className="font-medium text-[14px] text-[var(--card-foreground)]">
                -
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                -
              </span>
            </div>
          ),
        },
        {
          title: "Semestr/O’quv yili",
          render: (_, topic: ISubjectInfo) => (
            <div className="flex flex-col">
              <b className="font-medium text-[14px] text-[var(--card-foreground)]">
                {topic?.semester?.name}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                {topic?.education_year?.name}
              </span>
            </div>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default SubjectInfoTable;
