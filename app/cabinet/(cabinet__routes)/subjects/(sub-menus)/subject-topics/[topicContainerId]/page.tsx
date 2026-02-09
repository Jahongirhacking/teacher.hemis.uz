import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSubjectTopicWithIdAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { FilterItem, SubjectFilters } from "@/lib/services/subject/type";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { SelectFilterType } from "../../../_components/filters/FilterSelect";
import EduInfoTable from "../../../_components/tables/EduInfoTable";
import TopicDetailsTable from "../../../_components/tables/TopicDetailsTable";
import DeleteTopicModal from "../_components/modals/DeleteTopic";

const SubjectTopicsPage = async ({ searchParams, params: routeParams }) => {
  const { topicContainerId } = await routeParams;
  const params = await searchParams;
  const topicsData = await getSubjectTopicWithIdAction({
    params: {
      topicContainerId,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
      ...params,
    },
  });

  return (
    <Flex vertical gap={4} className="w-full items-center">
      <Flex
        align="center"
        gap={2}
        justify="between"
        className="w-full flex-wrap"
      >
        <Flex gap={2} align="center">
          <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
            Mavzular ro’yxati
          </h3>
          <Badge
            variant={"secondary"}
            className="rounded-[6px]"
          >{`Jami mavzular: ${(topicsData?.success && topicsData?.data?.total) || 0}`}</Badge>
        </Flex>
        <Flex gap={2} justify="end" align="center" className="ml-auto">
          <SelectFilterType
            filterType={SubjectFilters.TrainingTypes}
            paramKey={FilterItem.TrainingType}
            placeholder="Mashg'ulot turi"
          />
          <Link
            href={`${paths.private.subjects.subjectTopics}/${topicContainerId}/${paths.reservedKeys.create}`}
          >
            <Button>
              <PlusSquare /> Yaratish
            </Button>
          </Link>
        </Flex>
      </Flex>

      {topicsData?.success ? (
        <Flex vertical gap={4} className="w-full">
          <EduInfoTable
            dataSource={[
              {
                eduType:
                  topicsData?.data?.curriculum_subject?.education_type?.name,
                educationYear: "-",
                semester: topicsData?.data?.curriculum_subject?.semester,
                subject: topicsData?.data?.curriculum_subject?.subject_name,
              },
            ]}
            pagination={false}
          />

          <TopicDetailsTable
            topicContainerId={topicContainerId}
            dataSource={topicsData?.data?.items}
            total={topicsData?.data?.total}
          />
        </Flex>
      ) : (
        <Empty />
      )}
      <DeleteTopicModal />
    </Flex>
  );
};

export default SubjectTopicsPage;
