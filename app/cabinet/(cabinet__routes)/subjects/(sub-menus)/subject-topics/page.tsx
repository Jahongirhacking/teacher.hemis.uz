import SelectActivity from "@/app/cabinet/(cabinet__routes)/subjects/_components/SelectActivity";
import { Button } from "@/components/ui/button";
import { getSubjectTopicAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import { PlusSquare } from "lucide-react";
import SubjectTopicsTable from "../../_components/tables/SubjectTopicsTable";

const SubjectTopicsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const topicsData = await getSubjectTopicAction({
    params: {
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <SelectActivity />
        <Button>
          <PlusSquare /> Yaratish
        </Button>
      </div>

      <SubjectTopicsTable
        dataSource={topicsData?.data}
        total={topicsData?.meta?.total}
      />
    </div>
  );
};

export default SubjectTopicsPage;
