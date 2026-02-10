import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { getTeacherResourcesAction } from "@/lib/actions/subject.action";
import { SubjectFilters } from "@/lib/services/subject/type";
import SubjectMainContainer from "../../../_components/MainContainer";
import { FilterButton } from "../../../_components/filters/FilterDropdown";
import { ResourceDetailsTable } from "../../../_components/tables/SubjectResourcesTable";
import DeleteTopicModal from "../../subject-topics/_components/modals/DeleteTopic";

const SubjectResourcesListPage = async ({ params }) => {
  const routeParams = await params;
  const { subjectId } = routeParams;

  const subjectResources = await getTeacherResourcesAction({
    params: {
      subject_id: subjectId,
      page: 1,
      per_page: 1,
    },
  });

  return (
    <SubjectMainContainer
      title="Resurslar ro’yxati"
      badgeText={`Jami mavzular: ${(subjectResources?.success && subjectResources?.meta?.total) || 0}`}
      extra={
        <>
          <FilterButton
            types={[
              SubjectFilters.EducationYears,
              SubjectFilters.Subjects,
              SubjectFilters.TrainingTypes,
              SubjectFilters.Languages,
            ]}
          />
        </>
      }
    >
      {subjectResources?.success ? (
        <Flex vertical gap={4} className="w-full">
          {/* <EduInfoTable
                        dataSource={[
                            {
                                eduType:
                                    subjectResource?.education_type?.name,
                                educationYear: "-",
                                semester: subjectResource?.semester,
                                subject: subjectResource?.subject_name,
                            },
                        ]}
                        pagination={false}
                    /> */}

          <ResourceDetailsTable
            dataSource={subjectResources?.data}
            total={subjectResources?.meta?.total}
          />
        </Flex>
      ) : (
        <Empty />
      )}
      <DeleteTopicModal />
    </SubjectMainContainer>
  );
};

export default SubjectResourcesListPage;
