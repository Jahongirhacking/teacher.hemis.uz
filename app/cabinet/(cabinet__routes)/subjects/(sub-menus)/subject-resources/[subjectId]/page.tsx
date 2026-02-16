import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { getTeacherResourcesAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import { SubjectFilters } from "@/lib/services/subject/type";
import { FilterButton } from "../../../_components/filters/FilterDropdown";
import { ResourceDetailsTable } from "../../../_components/tables/resource/SubjectResourcesTable";
import DeleteTopicModal from "../../subject-topics/_components/modals/DeleteTopic";

const SubjectResourcesListPage = async ({ params, searchParams }) => {
  const routeParams = await params;
  const searchedParams = await searchParams;
  const { subjectId } = routeParams;

  const subjectResources = await getTeacherResourcesAction({
    params: {
      ...searchedParams,
      subject_id: subjectId,
      page: Number(searchedParams?.[SearchParams.PaginationPage]),
      per_page: Number(searchedParams?.[SearchParams.PaginationSize]),
    },
  });

  return (
    <MainCabinetContainer
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
            subjectId={subjectId}
          />
        </Flex>
      ) : (
        <Empty />
      )}
      <DeleteTopicModal />
    </MainCabinetContainer>
  );
};

export default SubjectResourcesListPage;
