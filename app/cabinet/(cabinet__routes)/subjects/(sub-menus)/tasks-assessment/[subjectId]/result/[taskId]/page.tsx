import { FilterButton } from "@/app/cabinet/(cabinet__routes)/subjects/_components/filters/FilterDropdown";
import EduInfoTable from "@/app/cabinet/(cabinet__routes)/subjects/_components/tables/info/EduInfoTable";
import StudentSubmissionTable from "@/app/cabinet/(cabinet__routes)/subjects/_components/tables/task/StudentSubmissionTable";
import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import {
  getSubjectInfoAction,
  getTaskSubmissionsAction,
} from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { ISubjectInfo, SubjectFilters } from "@/lib/services/subject/type";

const ResultPage = async ({ searchParams, params }) => {
  const { taskId, subjectId } = await params;
  const filterParams = await searchParams;
  const [taskSubmissions, subjectInfo] = await Promise.all([
    getTaskSubmissionsAction({
      params: {
        ...filterParams,
        page: Number(filterParams?.[SearchParams.PaginationPage]),
        per_page: Number(filterParams?.[SearchParams.PaginationSize]),
        taskId,
      },
    }),
    getSubjectInfoAction({
      params: {
        subject_id: subjectId,
        page: 1,
        per_page: 1,
      },
    }),
  ]);
  const total =
    (taskSubmissions?.success && taskSubmissions?.data?.pagination?.total) || 0;
  const currentSubject =
    (subjectInfo?.success && subjectInfo?.data?.[0]) || ({} as ISubjectInfo);

  return (
    <MainCabinetContainer
      title="Topshiriqlar javoblari"
      badgeText={`Jami topshiriqlar: ${total}`}
      extra={<FilterButton types={[SubjectFilters.TrainingTypes]} />}
    >
      <EduInfoTable
        dataSource={[
          {
            semester: currentSubject?.semester?.name,
            subject: currentSubject?.subject?.name,
            educationYear: currentSubject?.education_year?.name,
          },
        ]}
      />

      <StudentSubmissionTable
        postfixPath={paths.reservedKeys.assessment}
        dataSource={
          (taskSubmissions?.success && taskSubmissions?.data?.items) || []
        }
        total={total}
      />
    </MainCabinetContainer>
  );
};

export default ResultPage;
