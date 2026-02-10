import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { getTeacherResourceWithIdAction } from "@/lib/actions/subject.action";
import { ITeacherResource } from "@/lib/services/subject/type";
import SubjectActionContainer from "../../../../_components/ActionContainer";
import EditResourceForm from "../../_components/forms/EditResource";

const EditResourcePage = async ({ params }) => {
  const routeParams = await params;
  const { resourceId } = routeParams;
  const resourceItemFetch = getTeacherResourceWithIdAction({
    params: { id: resourceId },
  });
  const [resourceItem] = await Promise.all([resourceItemFetch]);

  return (
    <SubjectActionContainer title="Resurslarni yuklash va tahrirlash">
      <Flex vertical gap={2} className="w-full">
        {resourceItem?.success ? (
          <EditResourceForm
            resourceItem={resourceItem?.data as ITeacherResource}
          />
        ) : (
          <Empty />
        )}
      </Flex>
    </SubjectActionContainer>
  );
};

export default EditResourcePage;
