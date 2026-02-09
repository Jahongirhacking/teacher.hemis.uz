"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import paths from "@/lib/paths";
import { ISubjectTopicItem } from "@/lib/services/subject/type";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";

const TopicDetailsTable = ({
  topicContainerId,
  ...props
}: Partial<DataTableProps<ISubjectTopicItem>> & {
  topicContainerId: number | string;
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
          title: "Mavzu nomi",
          dataIndex: "name",
          render: (i, topic) => (
            <Link
              href={`${paths.private.subjects.subjectTopics}/${topicContainerId}/edit/${topic?.id}`}
            >
              <b className="text-[var(--primary)] font-medium">{i}</b>
            </Link>
          ),
        },
        {
          title: "Mashg’ulot",
          render: (_, topic) => (
            <b className="font-medium text-[14px] text-[var(--card-foreground)]">
              {topic?.training_type}
            </b>
          ),
        },
        {
          title: "Yuklama",
          render: (_, topic) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {topic?.topic_load}
            </span>
          ),
        },
        {
          title: "Semestr",
          render: (_, topic) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {topic?.semester}
            </span>
          ),
        },
        {
          title: "Status",
          render: (_, topic) => <Switch checked={topic?.active} />,
        },
        {
          title: "Amallar",
          render: (_, topic) => (
            <Button
              variant={"secondary"}
              onClick={() => console.log(topic?.id)}
            >
              <MoreVerticalIcon />
            </Button>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default TopicDetailsTable;
