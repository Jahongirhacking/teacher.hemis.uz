import {
  getSubjectFilterByTypeAction,
  getSubjectTopicWithIdAction,
} from "@/lib/actions/subject.action";
import { SubjectFilters } from "@/lib/services/subject/type";
import SubjectActionContainer from "../../../../_components/ActionContainer";
import EduInfoTable from "../../../../_components/tables/info/EduInfoTable";
import CreateTopicForm from "../../_components/CreateTopicForm";

const CreateTopicItemPage = async ({ params }) => {
  const { topicContainerId } = await params;
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
    <SubjectActionContainer title="Mavzu yaratish">
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
      <CreateTopicForm
        trainingTypes={trainingTypes || []}
        id={topicContainerId}
      />
    </SubjectActionContainer>
  );
};

export default CreateTopicItemPage;
