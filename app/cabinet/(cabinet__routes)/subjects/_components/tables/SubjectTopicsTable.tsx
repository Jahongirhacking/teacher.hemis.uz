"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import paths from "@/lib/paths";
import { ICurriculumSubject } from "@/lib/services/subject/type";
import Link from "next/link";

const SubjectTopicsTable = (
  props: Partial<DataTableProps<ICurriculumSubject>>,
) => {
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
          render: (i, topic) => (
            <Link
              href={`${paths.private.subjects.subjectTopics}/${topic?.id}`}
              className="text-[var(--primary)] font-medium"
            >
              {i}
            </Link>
          ),
        },
        {
          title: "O’quv reja/Fakultet",
          render: (_, topic: ICurriculumSubject) => (
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
          render: (_, topic: ICurriculumSubject) => (
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
          render: (_, topic: ICurriculumSubject) => (
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
          render: (_, topic: ICurriculumSubject) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {topic?.department?.name}
            </span>
          ),
        },
        {
          title: "Yuklama",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.trainings?.reduce(
                (acc, curr) => acc + curr?.academic_load,
                0,
              )}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default SubjectTopicsTable;
