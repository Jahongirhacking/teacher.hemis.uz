import SubjectActionContainer from "@/app/cabinet/(cabinet__routes)/subjects/_components/ActionContainer";
import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import {
  getSubjectFilterByTypeAction,
  getTeacherResourceWithIdAction,
} from "@/lib/actions/subject.action";
import { ITeacherResource, SubjectFilters } from "@/lib/services/subject/type";
import EditSubjectResourceForm from "../../../_components/forms/EditSubjectResource";

const EditSubjectResourcePage = async ({ params }) => {
  const routeParams = await params;
  const { resourceId } = routeParams;
  const resourceItemFetch = getTeacherResourceWithIdAction({
    params: { id: resourceId },
  });
  const subjectListFetch = getSubjectFilterByTypeAction({
    params: { filterType: SubjectFilters.Subjects },
  });
  const languageListFetch = getSubjectFilterByTypeAction({
    params: { filterType: SubjectFilters.Languages },
  });
  const [resourceItem, subjectList, languageList] = await Promise.all([
    resourceItemFetch,
    subjectListFetch,
    languageListFetch,
  ]);

  return (
    <SubjectActionContainer title="Resursni tahrirlash">
      <Flex vertical gap={2} className="w-full">
        {resourceItem?.success ? (
          <EditSubjectResourceForm
            resourceItem={resourceItem?.data as ITeacherResource}
            subjectList={(subjectList?.success && subjectList?.data) || []}
            languageList={(languageList?.success && languageList?.data) || []}
          />
        ) : (
          <Empty />
        )}
      </Flex>
    </SubjectActionContainer>
  );
};

export default EditSubjectResourcePage;
