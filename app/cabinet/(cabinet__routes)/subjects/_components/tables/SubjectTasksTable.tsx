"use client";

import { DataTable } from "@/components/shared/DataTable";
import Flex from "@/components/shared/Flex";
import { DataTableProps } from "@/components/shared/types";
import { ISubjectTaskItem } from "@/lib/services/subject/type";

const SubjectTasksTable = (
  props: Partial<DataTableProps<ISubjectTaskItem>>,
) => {
  return (
    <DataTable
      rowKey={() => "idx"}
      columns={[
        {
          title: "",
          dataIndex: "idx",
          className: "w-[40px]",
        },
        {
          title: "Fan nomi",
          render: (_, record) => (
            <b className="text-[var(--primary)] font-medium">
              {record?.subject?.name}
            </b>
          ),
        },
        {
          title: "Mashg'ulot",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.training_type?.name || "-"}
            </span>
          ),
        },
        {
          title: "Guruh/Talaba soni",
          render: (_, record) => (
            <Flex vertical>
              <b className="text-[var(--card-foreground)]">
                {record?.groups?.join(", ") || "-"}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                {record?.students_count ?? "-"}
              </span>
            </Flex>
          ),
        },
        {
          title: "Semestr/O’quv yili",
          render: (_, record) => (
            <Flex vertical>
              <b className="text-[var(--card-foreground)]">
                {record?.semester || "-"}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                {record?.education_year || "-"}
              </span>
            </Flex>
          ),
        },
        {
          title: "Til",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.education_lang?.name || "-"}
            </span>
          ),
        },
        {
          title: "Yuborilgan",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.sent_students_count ?? "-"}
            </span>
          ),
        },
        {
          title: "Yuborilmagan",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.not_sent_students_count ?? "-"}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default SubjectTasksTable;
