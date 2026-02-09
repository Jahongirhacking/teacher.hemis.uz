import SubjectActionContainer from "@/app/cabinet/(cabinet__routes)/subjects/_components/ActionContainer";
import EduInfoTable from "@/app/cabinet/(cabinet__routes)/subjects/_components/tables/EduInfoTable";
import {
  getSubjectFilterByTypeAction,
  getSubjectTopicWithIdAction,
} from "@/lib/actions/subject.action";
import { SubjectFilters } from "@/lib/services/subject/type";
import EditTopicForm from "../../../_components/EditTopicForm";

const EditTopicPage = async ({ params }) => {
  const { topicContainerId, topicId } = await params;
  const trainingTypesDataFetch = getSubjectFilterByTypeAction({
    params: { filterType: SubjectFilters.TrainingTypes },
  });
  const subjectTopicFetch = getSubjectTopicWithIdAction({
    params: { topicContainerId, page: 1, per_page: 1 },
  });
  const [trainingTypesData, subjectTopic] = await Promise.all([
    trainingTypesDataFetch,
    subjectTopicFetch,
  ]);
  const trainingTypes = trainingTypesData?.success && trainingTypesData?.data;
  return (
    <SubjectActionContainer title="Mavzuni tahrirlash">
      <EduInfoTable
        dataSource={[
          {
            subject:
              (subjectTopic?.success &&
                subjectTopic?.data?.curriculum_subject?.subject_name) ||
              "-",
          },
        ]}
        pagination={false}
      />
      <EditTopicForm
        trainingTypes={trainingTypes || []}
        topicContainerId={topicContainerId}
        topicId={topicId}
      />
    </SubjectActionContainer>
  );
};

export default EditTopicPage;
