"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { ISubjectTask } from "@/lib/services/subject/type";

const TasksBaseTable = (props: Partial<DataTableProps<ISubjectTask>>) => {
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
          title: "Topshiriq nomi",
          dataIndex: "name",
          render: (taskName) => (
            <b className="text-[var(--primary)] font-medium">{taskName}</b>
          ),
        },
        {
          title: "Topshiriq turi",
          dataIndex: "training_type",
          render: (trainingType: ISubjectTask["training_type"]) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {trainingType?.name}
            </span>
          ),
        },
        {
          title: "Fan nomi",
          dataIndex: "subject",
          render: (subject: ISubjectTask) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {subject?.name}
            </span>
          ),
        },
        {
          title: "Til",
          dataIndex: "language",
          render: (language: ISubjectTask["language"]) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {language?.name}
            </span>
          ),
        },
        {
          title: "Fayllar soni/Testlar soni",
          render: (_, task: ISubjectTask) => (
            <div className="flex flex-col gap-[2px]">
              {!!task?.file_count && (
                <span className="text-[14px] text-[#2578E7]">
                  {task?.file_count} ta fayl
                </span>
              )}
              {!!task?.test_questions_count && (
                <span className="text-[14px] text-[#2578E7]">
                  {task?.test_questions_count} ta test savoli
                </span>
              )}
            </div>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default TasksBaseTable;
