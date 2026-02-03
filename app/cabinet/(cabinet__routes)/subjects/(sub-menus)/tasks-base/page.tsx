import { Button } from "@/components/ui/button";
import { getSubjectTasksAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import { SubjectFilters } from "@/lib/services/subject/type";
import { ListFilterIcon } from "lucide-react";
import FilterDropdown from "../../_components/FilterDropdown";
import TasksBaseTable from "../../_components/tables/TasksBaseTable";

const CourseTasksPage = async ({ searchParams }) => {
  const params = await searchParams;
  const tasks = await getSubjectTasksAction({
    params: {
      ...params,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
          Topshiriqlar ro’yxati
        </h3>
        <FilterDropdown
          types={[SubjectFilters.EducationYears, SubjectFilters.Semesters, SubjectFilters.Groups, SubjectFilters.Subjects]}
        >
          <Button variant={"secondary"}>
            <ListFilterIcon /> Filter
          </Button>
        </FilterDropdown>
      </div>

      <TasksBaseTable dataSource={tasks?.data} total={tasks?.meta?.total} />
    </div>
  );
};

export default CourseTasksPage;
