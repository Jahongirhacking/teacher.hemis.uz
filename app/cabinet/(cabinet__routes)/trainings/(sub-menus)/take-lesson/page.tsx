import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import { getSchedulesByRangeAction } from "@/lib/actions/subject.action";
import { IClass, SubjectFilters } from "@/lib/services/subject/type";
import { FilterButton } from "../../../subjects/_components/filters/FilterDropdown";
import LessonTable from "../../_components/tables/lesson/LessonTable";

const TakeLessonPage = async () => {
  const schedules = await getSchedulesByRangeAction({
    params: {},
  });
  const scheduleItems =
    (schedules?.success &&
      schedules?.data?.reduce(
        (acc, curr) => [...acc, ...(curr?.classes || [])],
        [] as IClass[],
      )) ||
    [];
  const total = scheduleItems?.length || 0;

  return (
    <MainCabinetContainer
      title="Dars o’tish"
      badgeText={`Jami: ${total}`}
      extra={
        <FilterButton
          types={[
            SubjectFilters.EducationYears,
            SubjectFilters.Semesters,
            SubjectFilters.Groups,
            SubjectFilters.Subjects,
            SubjectFilters.TrainingTypes,
          ]}
        />
      }
    >
      <LessonTable
        dataSource={scheduleItems}
        total={total}
        isDataPaginatedBefore={false}
      />
    </MainCabinetContainer>
  );
};

export default TakeLessonPage;
