"use client";

import { DataTable } from "@/components/shared/DataTable";
import CustomDropDownMenu from "@/components/shared/DropdownMenu";
import Flex from "@/components/shared/Flex";
import { DataTableProps } from "@/components/shared/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ModalKeys, SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { ISubjectTopicItem } from "@/lib/services/subject/type";
import { getSearchParamString } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TopicDetailsTable = ({
  topicContainerId,
  ...props
}: Partial<DataTableProps<ISubjectTopicItem>> & {
  topicContainerId: number | string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
            <CustomDropDownMenu
              triggerButton={
                <Button
                  variant={"secondary"}
                  onClick={() => console.log(topic?.id)}
                >
                  <MoreVerticalIcon />
                </Button>
              }
              itemsRender={() => (
                <Flex vertical gap={2} className="p-2 min-w-[150px]">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`${paths.private.subjects.subjectTopics}/${topicContainerId}/edit/${topic?.id}`}
                      className="w-full block hover:bg-[var(--background)]"
                    >
                      <CustomDropDownMenu.ItemLabel
                        label={
                          <span className="!text-[var(--secondary-foreground)] font-normal text-[14px] py-[10px] px-3 block">
                            Tahrirlash
                          </span>
                        }
                      />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      onClick={() => {
                        router.push(
                          `${pathname}?${getSearchParamString({ ...searchParams, [SearchParams.Modal]: ModalKeys.DeleteTopic, [ModalKeys.ModalId]: topic?.id })}`,
                        );
                      }}
                      variant="secondary"
                      className="w-full p-0 text-left flex justify-start border-none hover:bg-[var(--background)]"
                    >
                      <CustomDropDownMenu.ItemLabel
                        label={
                          <span className="!text-[var(--secondary-foreground)] font-normal text-[14px] py-[10px] px-3">
                            O’chirish
                          </span>
                        }
                      />
                    </Button>
                  </DropdownMenuItem>
                </Flex>
              )}
            />
          ),
        },
      ]}
      {...props}
    />
  );
};

export default TopicDetailsTable;
