import { FilterButton } from "@/app/cabinet/(cabinet__routes)/subjects/_components/filters/FilterDropdown";
import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { Badge } from "@/components/ui/badge";
import { getSubjectTopicAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import { SubjectFilters } from "@/lib/services/subject/type";
import SubjectTopicsTable from "../../_components/tables/topic/SubjectTopicsTable";

const SubjectTopicsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const topicsData = await getSubjectTopicAction({
    params: {
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
      ...params,
    },
  });

  return (
    <Flex vertical gap={4}>
      <Flex
        align="center"
        gap={2}
        justify="between"
        className="w-full flex-wrap"
      >
        <Flex gap={2} align="center" className="flex-wrap">
          <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
            Fanlar ro’yxati
          </h3>
          <Badge variant={"secondary"} className="rounded-[6px]">
            Jami fanlar: {(topicsData?.success && topicsData?.meta?.total) || 0}
          </Badge>
        </Flex>
        <Flex gap={2} className="ml-auto">
          <FilterButton
            types={[
              SubjectFilters.Curriculums,
              SubjectFilters.Semesters,
              SubjectFilters.Subjects,
            ]}
          />
        </Flex>
      </Flex>

      {topicsData?.success ? (
        <SubjectTopicsTable
          dataSource={topicsData?.data}
          total={topicsData?.meta?.total}
        />
      ) : (
        <Empty />
      )}
    </Flex>
  );
};

export default SubjectTopicsPage;
