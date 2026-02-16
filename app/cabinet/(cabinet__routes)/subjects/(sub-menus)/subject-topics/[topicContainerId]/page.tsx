import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { getSubjectTopicWithIdAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { FilterItem, SubjectFilters } from "@/lib/services/subject/type";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { SelectFilterType } from "../../../_components/filters/FilterSelect";
import EduInfoTable from "../../../_components/tables/info/EduInfoTable";
import TopicDetailsTable from "../../../_components/tables/topic/TopicDetailsTable";
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
    <MainCabinetContainer
      title="Mavzular ro’yxati"
      badgeText={`Jami mavzular: ${(topicsData?.success && topicsData?.data?.total) || 0}`}
      extra={
        <>
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
        </>
      }
    >
      {topicsData?.success ? (
        <Flex vertical gap={4} className="w-full">
          <EduInfoTable
            dataSource={[
              {
                eduType:
                  topicsData?.data?.curriculum_subject?.education_type?.name,
                educationYear: "-",
                semester: topicsData?.data?.curriculum_subject?.semester?.name,
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
    </MainCabinetContainer>
  );
};

export default SubjectTopicsPage;
