"use client";

import CustomTabs, { TabsProps } from "@/components/shared/CustomTabs";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { ListFilterIcon } from "lucide-react";
import {
  CourseTasks,
  SubjectInfo,
  SubjectResources,
  SubjectTasks,
  SubjectTopics,
} from "../_tabs";

const SubjectTabs = () => {
  const tabItems: TabsProps[] = [
    {
      label: "Fan ma’lumotlari",
      value: "subject-info",
      children: <SubjectInfo />,
    },
    {
      label: "Fan mavzulari",
      value: "subject-topics",
      children: <SubjectTopics />,
    },
    {
      label: "Fan resurslari",
      value: "subject-resources",
      children: <SubjectResources />,
    },
    {
      label: "Fan topshiriqlari",
      value: "subject-tasks",
      children: <SubjectTasks />,
    },
    {
      label: "Kurs topshiriqlari",
      value: "course-tasks",
      children: <CourseTasks />,
    },
  ];

  return (
    <CustomTabs
      items={tabItems}
      render={() => (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2 justify-end">
            <Button variant={"secondary"}>
              <ListFilterIcon /> Filter
            </Button>
          </div>
          {tabItems?.map((item) => (
            <TabsContent key={item?.value} value={item?.value}>
              {item?.children}
            </TabsContent>
          ))}
        </div>
      )}
    />
  );
};

export default SubjectTabs;
