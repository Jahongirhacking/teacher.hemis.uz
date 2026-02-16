import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import { getAttendanceJournalAction } from "@/lib/actions/training.action";
import { SearchParams } from "@/lib/const";
import paths from "@/lib/paths";
import { SubjectFilters } from "@/lib/services/subject/type";
import { FilterButton } from "../../../subjects/_components/filters/FilterDropdown";
import AttendanceByGroupTable from "../../_components/tables/attendance/GroupTable";

const AttendanceJournal = async ({ searchParams }) => {
  const filterParams = await searchParams;
  const [attendanceJournal] = await Promise.all([
    getAttendanceJournalAction({
      params: {
        page: Number(filterParams?.[SearchParams.PaginationPage]),
        per_page: Number(filterParams?.[SearchParams.PaginationSize]),
        ...filterParams,
      },
    }),
  ]);
  const total =
    (attendanceJournal?.success && attendanceJournal?.data?.meta?.total) || 0;

  return (
    <MainCabinetContainer
      title="Davomat jurnali"
      badgeText={`Jami: ${total}`}
      extra={
        <FilterButton
          types={[SubjectFilters.EducationYears, SubjectFilters.Semesters]}
        />
      }
    >
      <AttendanceByGroupTable
        postfixPath={paths.reservedKeys.group}
        dataSource={
          (attendanceJournal?.success && attendanceJournal?.data?.items) || []
        }
        total={total}
      />
    </MainCabinetContainer>
  );
};

export default AttendanceJournal;
