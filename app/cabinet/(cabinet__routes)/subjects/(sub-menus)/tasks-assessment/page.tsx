import { getTaskSubjectListAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { SubjectFilters } from "@/lib/services/subject/type";
import { FilterButton } from "../../_components/filters/FilterDropdown";
import SubjectMainContainer from "../../_components/MainContainer";
import { SubjectListTable } from "../../_components/tables/SubjectTasksTable";

const TasksAssessmentPage = async ({ searchParams }) => {
  const params = await searchParams;
  const taskSubjects = await getTaskSubjectListAction({
    params: {
      ...params,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });
  return (
    <SubjectMainContainer
      title="Fanlar ro'yxati"
      badgeText={`Jami fanlar: ${(taskSubjects?.success && taskSubjects?.data?.pagination?.total) || 0}`}
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
        </>
      }
    >
      <SubjectListTable
        path={`${paths.private.subjects.tasksAssessment}`}
        dataSource={(taskSubjects?.success && taskSubjects?.data?.items) || []}
      />
    </SubjectMainContainer>
  );
};

export default TasksAssessmentPage;
