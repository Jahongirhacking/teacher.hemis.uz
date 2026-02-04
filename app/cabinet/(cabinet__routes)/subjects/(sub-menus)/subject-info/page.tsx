import { CustomDrawer } from "@/components/shared/CustomDrawer";
import { Button } from "@/components/ui/button";
import { getSubjectInfoAction } from "@/lib/actions/subject.action";
import { SearchParams, SearchParamsKeys } from "@/lib/const";
import { SubjectFilters } from "@/lib/services/subject/type";
import { ListFilterIcon } from "lucide-react";
import FilterDropdown from "../../_components/FilterDropdown";
import SubjectInfoTable from "../../_components/tables/SubjectInfoTable";
import SubjectDetails from "./_components/SubjectDetails";

const SubjectInfoPage = async ({ searchParams }) => {
  const params = await searchParams;
  const subjects = await getSubjectInfoAction({
    params: {
      page: Number(params?.[SearchParams.PaginationPage]),
      per_page: Number(params?.[SearchParams.PaginationSize]),
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
          Fanlar ro’yxati
        </h3>
        <FilterDropdown
          types={[
            SubjectFilters.EducationYears,
            SubjectFilters.Semesters,
            SubjectFilters.Groups,
            SubjectFilters.Subjects,
          ]}
        >
          <Button variant={"secondary"}>
            <ListFilterIcon /> Filter
          </Button>
        </FilterDropdown>
      </div>

      <SubjectInfoTable
        dataSource={subjects?.data}
        total={subjects?.meta?.total}
      />

      <CustomDrawer
        drawerKey={SearchParamsKeys.SubjectInfo}
        activeKey={SearchParamsKeys.SubjectId}
      >
        <SubjectDetails subject_id={params?.[SearchParamsKeys.SubjectId]} />
      </CustomDrawer>
    </div>
  );
};

export default SubjectInfoPage;
