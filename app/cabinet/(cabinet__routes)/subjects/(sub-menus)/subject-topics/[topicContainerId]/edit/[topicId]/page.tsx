/* eslint-disable @typescript-eslint/no-explicit-any */
import SubjectActionContainer from "@/app/cabinet/(cabinet__routes)/subjects/_components/ActionContainer";
import EduInfoTable from "@/app/cabinet/(cabinet__routes)/subjects/_components/tables/info/EduInfoTable";
import {
  getSubjectFilterByTypeAction,
  getSubjectTopicItemAction,
} from "@/lib/actions/subject.action";
import { FetchResultWithError } from "@/lib/services/api";
import {
  ISubjectTopicItemRes,
  SubjectFilters,
} from "@/lib/services/subject/type";
import { IBaseDataRes } from "@/lib/services/type";
import EditTopicForm from "../../../_components/EditTopicForm";

const EditTopicPage = async ({ params }) => {
  const { topicContainerId, topicId } = await params;
  const trainingTypesDataFetch = getSubjectFilterByTypeAction({
    params: { filterType: SubjectFilters.TrainingTypes },
  });
  const subjectTopicItemFetch: Promise<
    IBaseDataRes<ISubjectTopicItemRes> | FetchResultWithError
  > = getSubjectTopicItemAction({
    params: { topicId },
  }) as any;

  const [trainingTypes, subjectTopicItem] = await Promise.all([
    trainingTypesDataFetch,
    subjectTopicItemFetch,
  ]);

  return (
    <SubjectActionContainer title="Mavzuni tahrirlash">
      <EduInfoTable
        dataSource={[
          {
            subject:
              (subjectTopicItem?.success &&
                subjectTopicItem?.data?.curriculum_subject?.subject_name) ||
              "-",
          },
        ]}
        pagination={false}
      />
      <EditTopicForm
        trainingTypes={(trainingTypes?.success && trainingTypes?.data) || []}
        topicContainerId={topicContainerId}
        topicId={topicId}
        subjectTopicItem={
          (subjectTopicItem?.success && subjectTopicItem?.data?.topic) || null
        }
      />
    </SubjectActionContainer>
  );
};

export default EditTopicPage;
