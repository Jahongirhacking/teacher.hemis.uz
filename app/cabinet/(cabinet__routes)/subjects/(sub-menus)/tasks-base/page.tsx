import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import { Button } from "@/components/ui/button";
import { getSubjectTasksAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { SubjectFilters } from "@/lib/services/subject/type";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { FilterButton } from "../../_components/filters/FilterDropdown";
import TasksBaseTable from "../../_components/tables/task/TasksBaseTable";

const CourseTasksPage = async ({ searchParams }) => {
  const params = await searchParams;
  const tasksFetch = getSubjectTasksAction({
    params: {
      ...params,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });
  const [tasks] = await Promise.all([tasksFetch]);
  const total = (tasks?.success && tasks.meta?.total) || 0;

  return (
    <MainCabinetContainer
      title="Topshiriqlar ro’yxati"
      badgeText={`Topshiriqlar soni: ${total}`}
      extra={
        <>
          <FilterButton
            types={[
              SubjectFilters.EducationYears,
              SubjectFilters.Semesters,
              SubjectFilters.Groups,
              SubjectFilters.Subjects,
            ]}
          />
          <Link
            href={`${paths.private.subjects.tasksBase}/${paths.reservedKeys.create}`}
          >
            <Button>
              <PlusSquare /> Yaratish
            </Button>
          </Link>
        </>
      }
    >
      <TasksBaseTable
        dataSource={(tasks?.success && tasks?.data) || []}
        total={(tasks?.success && tasks?.meta?.total) || 0}
      />
    </MainCabinetContainer>
  );
};

export default CourseTasksPage;
