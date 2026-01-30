"use client";

import { DataTable } from "@/components/shared/DataTable";
import { useQueryParams } from "@/components/shared/hooks/useQueryParams";
import { DataTableProps } from "@/components/shared/types";
import { SearchParams, SearchParamsKeys } from "@/lib/const";
import { ISubjectInfo } from "@/lib/services/subject/type";

const SubjectInfoTable = (props: Partial<DataTableProps<ISubjectInfo>>) => {
  const { setMany } = useQueryParams();

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
            <button
              className="border-none text-[var(--primary)] font-medium"
              onClick={() =>
                setMany({
                  [SearchParams.Drawer]: SearchParamsKeys.SubjectInfo,
                  [SearchParamsKeys.SubjectId]: subject?.id,
                })
              }
            >
              {subject?.name}
            </button>
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
