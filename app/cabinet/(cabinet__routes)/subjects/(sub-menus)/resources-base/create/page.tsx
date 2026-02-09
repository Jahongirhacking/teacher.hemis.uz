import Flex from "@/components/shared/Flex";
import { getSubjectFilterByTypeAction } from "@/lib/actions/subject.action";
import { SubjectFilters } from "@/lib/services/subject/type";
import SubjectActionContainer from "../../../_components/ActionContainer";
import CreateResourceForm from "../_components/forms/CreateResource";

const CreateResourcesPage = async () => {
  const subjectListFetch = getSubjectFilterByTypeAction({
    params: { filterType: SubjectFilters.Subjects },
  });
  const languageListFetch = getSubjectFilterByTypeAction({
    params: { filterType: SubjectFilters.Languages },
  });
  const [subjectList, languageList] = await Promise.all([
    subjectListFetch,
    languageListFetch,
  ]);

  return (
    <Flex vertical className="w-full">
      <SubjectActionContainer title="Resurslar yaratish">
        <CreateResourceForm
          subjectList={(subjectList?.success && subjectList?.data) || []}
          languageList={(languageList?.success && languageList?.data) || []}
        />
      </SubjectActionContainer>
    </Flex>
  );
};

export default CreateResourcesPage;
