import { getTaskSubjectListAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import { SubjectFilters } from "@/lib/services/subject/type";
import SubjectMainContainer from "../../_components/MainContainer";
import { FilterButton } from "../../_components/filters/FilterDropdown";
import SubjectTasksTable from "../../_components/tables/SubjectTasksTable";

const SubjectTasksPage = async ({ searchParams }) => {
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
      title="Fanlar ro’yxati"
      badgeText={`Jami topshiriqlar: ${(taskSubjects?.success && taskSubjects?.data?.pagination?.total) || 0}`}
      extra={
        <FilterButton
          types={[
            SubjectFilters.EducationYears,
            SubjectFilters.Semesters,
            SubjectFilters.Groups,
            SubjectFilters.Subjects,
          ]}
        />
      }
    >
      <SubjectTasksTable
        dataSource={(taskSubjects?.success && taskSubjects?.data?.items) || []}
        total={
          (taskSubjects?.success && taskSubjects?.data?.pagination?.total) || 0
        }
      />
    </SubjectMainContainer>
  );
};

export default SubjectTasksPage;
