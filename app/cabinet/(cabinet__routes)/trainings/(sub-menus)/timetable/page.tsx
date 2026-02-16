import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import Flex from "@/components/shared/Flex";
import { SubjectFilters } from "@/lib/services/subject/type";
import { FilterButton } from "../../../subjects/_components/filters/FilterDropdown";
import Timetable from "../../_components/Timetable";

const TimeTablePage = () => {
  return (
    <MainCabinetContainer
      title="Dars jadvali"
      extra={
        <FilterButton
          types={[SubjectFilters.EducationYears, SubjectFilters.Semesters]}
        />
      }
    >
      <Flex
        vertical
        gap={4}
        className="w-full bg-[var(--card)] px-4 py-3 rounded-[8px]"
      >
        <Timetable />
      </Flex>
    </MainCabinetContainer>
  );
};

export default TimeTablePage;
