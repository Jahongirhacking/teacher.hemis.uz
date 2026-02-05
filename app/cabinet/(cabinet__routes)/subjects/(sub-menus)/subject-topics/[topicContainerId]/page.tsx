import Flex from "@/components/shared/Flex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSubjectTopicWithIdAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import EduInfoTable from "../../../_components/tables/EduInfoTable";
import TopicDetailsTable from "../../../_components/tables/TopicDetailsTable";

const SubjectTopicsPage = async ({ searchParams, params: routeParams }) => {
  const { topicContainerId } = await routeParams;
  const params = await searchParams;
  const topicsData = await getSubjectTopicWithIdAction({
    params: {
      topicContainerId,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });

  return (
    <Flex vertical gap={4}>
      <Flex align="center" gap={2} justify="between" className="w-full">
        <Flex gap={2} align="center">
          <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
            Mavzular ro’yxati
          </h3>
          <Badge
            variant={"secondary"}
            className="rounded-[6px]"
          >{`Jami mavzular: ${topicsData?.data?.total}`}</Badge>
        </Flex>
        <Link
          href={`${paths.private.subjects.subjectTopics}/${topicContainerId}/${paths.reservedKeys.create}`}
        >
          <Button>
            <PlusSquare /> Yaratish
          </Button>
        </Link>
      </Flex>

      <EduInfoTable
        dataSource={[
          {
            eduType: topicsData?.data?.curriculum_subject?.education_type?.name,
            educationYear: "-",
            semester: topicsData?.data?.curriculum_subject?.semester,
            subject: topicsData?.data?.curriculum_subject?.subject_name,
          },
        ]}
        pagination={false}
      />

      <TopicDetailsTable
        dataSource={topicsData?.data?.items}
        total={topicsData?.data?.total}
      />
    </Flex>
  );
};

export default SubjectTopicsPage;
