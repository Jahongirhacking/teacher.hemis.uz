"use client";

import { DataTable } from "@/components/shared/DataTable";
import Flex from "@/components/shared/Flex";
import { DataTableProps } from "@/components/shared/types";
import { Switch } from "@/components/ui/switch";
import { TIME_FORMAT } from "@/lib/const";
import paths from "@/lib/paths";
import {
  ISubjectResources,
  ITeacherResource,
} from "@/lib/services/subject/type";
import moment from "moment";
import Link from "next/link";

const SubjectResourcesTable = (
  props: Partial<DataTableProps<ISubjectResources>>,
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
          dataIndex: "subject",
          render: (subject: ISubjectResources["subject"]) => (
            <Link
              href={`${paths.private.subjects.subjectResources}/${subject?.id}`}
            >
              <b className="text-[var(--primary)] font-medium">
                {subject?.name}
              </b>
            </Link>
          ),
        },
        {
          title: "O’quv reja/Fakultet",
          render: (_, record) => (
            <Flex vertical>
              <b className="text-[var(--card-foreground)]">
                {record?.curriculum?.name || "-"}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                {record?.faculty?.name || "-"}
              </span>
            </Flex>
          ),
        },
        {
          title: "O’quv yili/Semestr",
          render: (_, record) => (
            <Flex vertical gap={1}>
              <b className="text-[var(--card-foreground)]">
                {record?.education_year || "-"}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                {record?.semester?.name || "-"}
              </span>
            </Flex>
          ),
        },
        {
          title: "Ta’lim turi",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.education_type?.name || "-"}
            </span>
          ),
        },
        {
          title: "Mashg’ulot soni",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.lesson_count || 0}
            </span>
          ),
        },
        {
          title: "Resurslar soni",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.resources_count || 0}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
};

export const ResourceDetailsTable = ({
  subjectId,
  ...props
}: Partial<DataTableProps<ITeacherResource>> & {
  subjectId: number | string;
}) => {
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
          title: "Resurs nomi",
          dataIndex: "title",
          render: (resourceName, resource) => (
            <Link
              href={`${paths.private.subjects.subjectResources}/${subjectId}/${paths.reservedKeys.edit}/${resource?.id}`}
            >
              <b className="text-[var(--primary)] font-medium">
                {resourceName}
              </b>
            </Link>
          ),
        },
        {
          title: "Fan/Mashg’ulot turi/O’qituvchi",
          dataIndex: "subject",
          render: (_, record) => (
            <Flex vertical>
              <b className="text-[var(--card-foreground)]">
                {record?.subject?.name}
              </b>
              <span className="text-[14px] text-[var(--secondary-foreground)]">
                {`${record?.subject?._education_type}/${[
                  record?.employee?.second_name,
                  [record?.employee?.first_name, record?.employee?.third_name]
                    ?.filter((e) => !!e)
                    ?.map((e) => e?.[0])
                    ?.join("."),
                ]?.join(" ")}.`}
              </span>
            </Flex>
          ),
        },
        {
          title: "Til",
          dataIndex: "language",
          render: (lang: ITeacherResource["language"], record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {lang
                ?.map(
                  (l) =>
                    record?.language_details?.find((lang) => lang?.code === l)
                      ?.name,
                )
                ?.join(", ")}
            </span>
          ),
        },
        {
          title: "Fayllar soni",
          dataIndex: "files",
          render: (files: ITeacherResource["files"]) =>
            files?.length ? (
              <span className="text-[14px] text-[#2578E7]">
                {`${files?.length}ta fayl`}
              </span>
            ) : (
              "—"
            ),
        },
        {
          title: "Sana",
          dataIndex: "created_at",
          render: (created_at: ITeacherResource["created_at"]) => (
            <span className="text-[14px]">
              {`${moment(created_at, TIME_FORMAT.ServerWithTime).format(TIME_FORMAT.Client)}`}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "active",
          render: (active: ITeacherResource["active"]) => (
            <Switch checked={active} />
          ),
        },
      ]}
      {...props}
    />
  );
};

export default SubjectResourcesTable;
