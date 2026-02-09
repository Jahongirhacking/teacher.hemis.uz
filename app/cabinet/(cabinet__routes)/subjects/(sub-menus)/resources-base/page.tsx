import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { getTeacherResourcesAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { SubjectFilters } from "@/lib/services/subject/type";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { FilterButton } from "../../_components/filters/FilterDropdown";
import ResourcesBaseTable from "../../_components/tables/ResourcesBaseTable";

const ResourcesBasePage = async ({ searchParams }) => {
  const params = await searchParams;
  const tasks = await getTeacherResourcesAction({
    params: {
      ...params,
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
          Resurslar ro’yxati
        </h3>
        <Flex gap={2} align="center" className="flex-wrap">
          <FilterButton types={[SubjectFilters.Subjects]} />
          <Link
            href={`${paths.private.subjects.resourcesBase}/${paths.reservedKeys.create}`}
          >
            <Button>
              <PlusSquare /> Yaratish
            </Button>
          </Link>
        </Flex>
      </div>

      <ResourcesBaseTable
        dataSource={(tasks?.success && tasks?.data) || []}
        total={(tasks?.success && tasks?.meta?.total) || 0}
      />
    </div>
  );
};

export default ResourcesBasePage;
