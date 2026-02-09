import paths from "@/lib/paths";
import { redirect } from "next/navigation";

const EditRedirectPage = async ({ params }) => {
  const routeParams = await params;
  redirect(
    `${paths.private.subjects.subjectTopics}/${routeParams?.topicContainerId}`,
  );
};

export default EditRedirectPage;
