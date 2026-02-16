import MainCabinetContainer from "@/app/cabinet/_components/MainContainer";
import { Button } from "@/components/ui/button";
import { getSubjectTaskOptionsAction } from "@/lib/actions/subject.action";
import paths from "@/lib/paths";
import {
  getSubjectFilterByType,
  SubjectTaskOptions,
} from "@/lib/services/subject";
import { SubjectFilters } from "@/lib/services/subject/type";
import { SquarePlus } from "lucide-react";
import Link from "next/link";
import CreateTaskForm from "../_components/forms/CreateTask";

const CreateTaskPage = async () => {
  const [taskOptions, languages, subjects] = await Promise.all([
    getSubjectTaskOptionsAction({
      params: { optionType: SubjectTaskOptions.TaskTypes },
    }),
    getSubjectFilterByType({
      params: {
        filterType: SubjectFilters.Languages,
      },
    }),
    getSubjectFilterByType({
      params: {
        filterType: SubjectFilters.Subjects,
      },
    }),
  ]);

  return (
    <MainCabinetContainer
      title="Topshiriq yaratish"
      extra={
        <>
          <Link
            href={`${paths.private.subjects.tests}/${paths.reservedKeys.create}`}
          >
            <Button>
              <SquarePlus /> Test yaratish
            </Button>
          </Link>
        </>
      }
    >
      <CreateTaskForm
        taskTypes={
          (taskOptions?.success &&
            Object.keys(taskOptions?.data ?? {})?.map((key) => ({
              name: taskOptions?.data?.[key] || "-",
              code: key,
            }))) ||
          []
        }
        languageList={(languages?.success && languages?.data?.data) || []}
        subjectList={(subjects?.success && subjects?.data?.data) || []}
      />
    </MainCabinetContainer>
  );
};

export default CreateTaskPage;
