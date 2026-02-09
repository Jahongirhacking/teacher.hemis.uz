import Empty from "@/components/shared/Empty";
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
        <h2>{subjectDetail?.data?.[0]?.subject?.name}</h2>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default SubjectDetails;
