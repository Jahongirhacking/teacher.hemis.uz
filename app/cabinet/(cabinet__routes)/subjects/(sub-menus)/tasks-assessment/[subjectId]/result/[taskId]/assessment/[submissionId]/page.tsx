import EduInfoTable from "@/app/cabinet/(cabinet__routes)/subjects/_components/tables/info/EduInfoTable";
import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import { getStudentTaskSubmissionDetailAction } from "@/lib/actions/subject.action";
import paths from "@/lib/paths";
import StudentTaskSubmissionForm from "../../../../../_components/forms/StudentTaskSubmission";

const StudentTaskAssessmentPage = async ({ params, searchParams }) => {
  const { submissionId, taskId, subjectId } = await params;
  const filterParams = await searchParams;
  const [submissionDetail] = await Promise.all([
    getStudentTaskSubmissionDetailAction({
      params: {
        submissionId,
        ...filterParams,
      },
    }),
  ]);
  const resultsPath = `${paths.private.subjects.tasksAssessment}/${subjectId}/${paths.reservedKeys.result}/${taskId}`;

  return (
    <MainCabinetContainer title="Topshiriqni baholash">
      <EduInfoTable
        dataSource={[
          {
            group:
              (submissionDetail?.success &&
                submissionDetail?.data?.group?.name) ||
              "-",
            student:
              (submissionDetail?.success &&
                submissionDetail?.data?.student?.name) ||
              "-",
            subject:
              (submissionDetail?.success &&
                submissionDetail?.data?.subject?.name) ||
              "-",
            trainingType:
              (submissionDetail?.success &&
                submissionDetail?.data?.training_type) ||
              "-",
          },
        ]}
      />

      <StudentTaskSubmissionForm
        submissionId={submissionId}
        taskName={
          (submissionDetail?.success && submissionDetail?.data?.task?.name) ||
          ""
        }
        answerComment={
          (submissionDetail?.success &&
            submissionDetail?.data?.answer?.comment) ||
          ""
        }
        files={
          (submissionDetail?.success &&
            submissionDetail?.data?.answer?.files) ||
          []
        }
        resultsPath={resultsPath}
      />
    </MainCabinetContainer>
  );
};

export default StudentTaskAssessmentPage;
