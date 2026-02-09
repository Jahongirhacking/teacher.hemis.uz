"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TIME_FORMAT } from "@/lib/const";
import paths from "@/lib/paths";
import { ITeacherResource } from "@/lib/services/subject/type";
import { Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const ResourcesBaseTable = (
  props: Partial<DataTableProps<ITeacherResource>>,
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
          title: "Resurs nomi",
          dataIndex: "title",
          render: (resourceName, resource) => (
            <Link
              href={`${paths.private.subjects.resourcesBase}/${paths.reservedKeys.edit}/${resource?.id}`}
            >
              <b className="text-[var(--primary)] font-medium">
                {resourceName}
              </b>
            </Link>
          ),
        },
        {
          title: "Fan",
          dataIndex: "subject",
          render: (subject: ITeacherResource["subject"]) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {subject?.name}
            </span>
          ),
        },
        {
          title: "Til",
          dataIndex: "language",
          render: (lang: ITeacherResource["language"]) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {lang?.map((l) => l)?.join(", ")}
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
          title: "URL soni",
          render: () => "—",
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
        {
          title: "O’chirish",
          render: (_, record: ITeacherResource) => (
            <Button
              variant={"secondary"}
              onClick={() => console.log(record?.id)}
            >
              <Trash2 />
            </Button>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default ResourcesBaseTable;
