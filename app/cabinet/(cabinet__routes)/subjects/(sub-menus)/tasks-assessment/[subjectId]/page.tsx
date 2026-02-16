import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import {
  getSubjectInfoAction,
  getTaskAssessmentListAction,
} from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { SubjectFilters } from "@/lib/services/subject/type";
import { FilterButton } from "../../../_components/filters/FilterDropdown";
import EduInfoTable from "../../../_components/tables/info/EduInfoTable";
import TaskAssessmentTable from "../../../_components/tables/task/TaskAssessmentTable";

const TasksAssessmentDetails = async ({ params, searchParams }) => {
  const { subjectId } = await params;
  const filterParams = await searchParams;
  const [subjectInfo, tasksInfo] = await Promise.all([
    getSubjectInfoAction({
      params: {
        subject_id: subjectId,
        page: 1,
        per_page: 1,
      },
    }),
    getTaskAssessmentListAction({
      params: {
        subject_id: subjectId,
        page: Number(filterParams?.[SearchParams.PaginationPage]),
        per_page: Number(filterParams?.[SearchParams.PaginationSize]),
        ...filterParams,
      },
    }),
  ]);
  const total = (tasksInfo?.success && tasksInfo?.data?.pagination?.total) || 0;

  return (
    <MainCabinetContainer
      title="Topshiriqlar ro'yxati"
      badgeText={`Jami topshiriqlar: ${total}`}
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
      <EduInfoTable
        dataSource={[
          {
            educationYear:
              (subjectInfo?.success &&
                subjectInfo?.data?.[0]?.education_year?.name) ||
              "-",
            subject:
              (subjectInfo?.success && subjectInfo?.data?.[0]?.subject?.name) ||
              "-",
            semester:
              (subjectInfo?.success &&
                subjectInfo?.data?.[0]?.semester?.name) ||
              "-",
          },
        ]}
      />
      <TaskAssessmentTable
        postfixPath={paths.reservedKeys.result}
        dataSource={(tasksInfo?.success && tasksInfo?.data?.items) || []}
        total={total}
      />
    </MainCabinetContainer>
  );
};

export default TasksAssessmentDetails;
