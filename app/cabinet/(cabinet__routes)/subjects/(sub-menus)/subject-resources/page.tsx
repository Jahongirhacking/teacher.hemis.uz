import Flex from "@/components/shared/Flex";
import { getSubjectResourcesAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import { ISubjectResources, SubjectFilters } from "@/lib/services/subject/type";
import { FilterButton } from "../../_components/filters/FilterDropdown";
import SubjectResourcesTable from "../../_components/tables/SubjectResourcesTable";

const SubjectListPage = async ({ searchParams }) => {
  const params = await searchParams;
  const subjectResource = await getSubjectResourcesAction({
    params: {
      ...params,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });

  return (
    <Flex vertical gap={4} className="w-full">
      <Flex gap={2} align="center" justify="between" className="w-full">
        <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
          Fanlar ro’yxati
        </h3>
        <Flex gap={2} align="center" className="flex-wrap">
          <FilterButton
            types={[
              SubjectFilters.EducationYears,
              SubjectFilters.Semesters,
              SubjectFilters.Subjects,
            ]}
          />
        </Flex>
      </Flex>

      <SubjectResourcesTable
        dataSource={
          ((subjectResource?.success && subjectResource?.data) ||
            []) as ISubjectResources[]
        }
        total={(subjectResource?.success && subjectResource?.meta?.total) || 0}
      />
    </Flex>
  );
};

export default SubjectListPage;
