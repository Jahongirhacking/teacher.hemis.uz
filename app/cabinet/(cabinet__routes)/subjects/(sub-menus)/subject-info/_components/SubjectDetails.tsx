import { DataTable } from "@/components/shared/DataTable";
import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { getSubjectInfoAction } from "@/lib/actions/subject.action";
import { ISubject } from "@/lib/services/subject/type";

const SubjectDetails = async ({
  subject_id,
}: {
  subject_id: ISubject["id"];
}) => {
  const subjectDetail = await getSubjectInfoAction({
    params: { subject_id, page: 1, per_page: 1 },
  });

  return (
    <div className="flex flex-col">
      {subjectDetail?.success ? (
        <Flex vertical gap={5}>
          <DataTable
            rowKey={'id'}
            columns={[
              {
                title: "O'quv reja ma'lumotlari",
                dataIndex: 'key',
              },
              {
                title: "",
                dataIndex: 'value',
              },
            ]}
            dataSource={[
              {
                id: 1,
                key: "Fan nomi",
                value: subjectDetail?.data?.[0]?.subject?.name
              },
              {
                id: 2,
                key: "Fakultet",
                value: subjectDetail?.data?.[0]?.faculty?.name
              },
              {
                id: 2,
                key: "Semestr",
                value: subjectDetail?.data?.[0]?.semester?.name
              },
            ]}
          />

          <DataTable
            rowKey={'id'}
            columns={[
              {
                title: "Mashg'ulot",
                dataIndex: 'trainingType',
              },
              {
                title: "Yuklama",
                dataIndex: 'acload',
              },
            ]}
            dataSource={subjectDetail?.data?.[0]?.trainings?.map(training => ({
              id: training?.training_type,
              trainingType: training?.training_type_name,
              acload: `${training?.academic_load} soat`
            }))}
          />
        </Flex>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default SubjectDetails;
