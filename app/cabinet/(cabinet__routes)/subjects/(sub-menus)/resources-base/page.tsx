import { Button } from "@/components/ui/button";
import { getTeacherResourcesAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { SubjectFilters } from "@/lib/services/subject/type";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { FilterButton } from "../../_components/filters/FilterDropdown";
import SubjectMainContainer from "../../_components/MainContainer";
import ResourcesBaseTable from "../../_components/tables/ResourcesBaseTable";
import DeleteResourceModal from "./_components/modals/DeleteResource";

const ResourcesBasePage = async ({ searchParams }) => {
  const params = await searchParams;
  const tasks = await getTeacherResourcesAction({
    params: {
      ...params,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });
  const total = (tasks?.success && tasks?.meta?.total) || 0;

  return (
    <SubjectMainContainer
      title="Resurslar ro’yxati"
      badgeText={`Jami resurslar: ${total}`}
      extra={
        <>
          <FilterButton types={[SubjectFilters.Subjects]} />
          <Link
            href={`${paths.private.subjects.resourcesBase}/${paths.reservedKeys.create}`}
          >
            <Button>
              <PlusSquare /> Yaratish
            </Button>
          </Link>
        </>
      }
    >
      <ResourcesBaseTable
        dataSource={(tasks?.success && tasks?.data) || []}
        total={total}
      />
      <DeleteResourceModal />
    </SubjectMainContainer>
  );
};

export default ResourcesBasePage;
