"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ModalKeys, SearchParams, TIME_FORMAT } from "@/lib/const";
import paths from "@/lib/paths";
import { ITeacherResource } from "@/lib/services/subject/type";
import { getSearchParamString } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ResourcesBaseTable = (
  props: Partial<DataTableProps<ITeacherResource>>,
) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

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
              onClick={() => {
                router.push(
                  `${pathname}?${getSearchParamString({ ...searchParams, [SearchParams.Modal]: ModalKeys.DeleteResource, [ModalKeys.ModalId]: record?.id })}`,
                );
              }}
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
