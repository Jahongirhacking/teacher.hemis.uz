import {
  getSubjectInfoAction,
  getSubjectTasksAction,
} from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import { SubjectFilters } from "@/lib/services/subject/type";
import { FilterButton } from "../../../_components/filters/FilterDropdown";
import SubjectMainContainer from "../../../_components/MainContainer";
import EduInfoTable from "../../../_components/tables/EduInfoTable";
import TasksTable from "../../../_components/tables/TasksTable";

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
    getSubjectTasksAction({
      params: {
        subject_id: subjectId,
        page: Number(filterParams?.[SearchParams.PaginationPage]),
        per_page: Number(filterParams?.[SearchParams.PaginationSize]),
        ...filterParams,
      },
    }),
  ]);
  const total = (tasksInfo?.success && tasksInfo?.meta?.total) || 0;
  console.log(subjectInfo, "subject");

  return (
    <SubjectMainContainer
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
      <TasksTable
        dataSource={(tasksInfo?.success && tasksInfo?.data) || []}
        total={total}
      />
    </SubjectMainContainer>
  );
};

export default TasksAssessmentDetails;
