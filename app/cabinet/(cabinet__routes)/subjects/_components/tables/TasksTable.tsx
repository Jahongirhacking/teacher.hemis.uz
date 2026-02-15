"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { TIME_FORMAT } from "@/lib/const";
import paths from "@/lib/paths";
import { ISubjectTask } from "@/lib/services/subject/type";
import moment from "moment";
import Link from "next/link";

const TasksTable = ({ ...props }: Partial<DataTableProps<ISubjectTask>>) => {
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
          title: "Topshiriq nomi",
          render: (_, record) => (
            <Link href={`${paths.reservedKeys.edit}/${record?.id}`}>
              <b className="text-[var(--primary)] font-medium">
                {record?.name}
              </b>
            </Link>
          ),
        },
        {
          title: "Topshiriq turi",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.task_type?.name || "-"}
            </span>
          ),
        },
        {
          title: "Nazorat turi",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.exam_type?.name || "-"}
            </span>
          ),
        },
        {
          title: "Ball",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.max_ball || "-"}
            </span>
          ),
        },
        {
          title: "Muddati",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {moment(record?.deadline, TIME_FORMAT.ServerWithTime).format(
                TIME_FORMAT.ClientWithTime,
              ) || "-"}
            </span>
          ),
        },
        {
          title: "Savollar soni",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.question_count ?? "-"}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default TasksTable;
