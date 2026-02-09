import { Button } from "@/components/ui/button";
import { getTeacherResourcesAction } from "@/lib/actions/subject.action";
import { SearchParams } from "@/lib/const";
import { SubjectFilters } from "@/lib/services/subject/type";
import { ListFilterIcon } from "lucide-react";
import FilterDropdown from "../../_components/filters/FilterDropdown";
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
        <FilterDropdown types={[SubjectFilters.Subjects]}>
          <Button variant={"secondary"}>
            <ListFilterIcon /> Filtr
          </Button>
        </FilterDropdown>
      </div>

      <ResourcesBaseTable
        dataSource={(tasks?.success && tasks?.data) || []}
        total={(tasks?.success && tasks?.meta?.total) || 0}
      />
    </div>
  );
};

export default ResourcesBasePage;
