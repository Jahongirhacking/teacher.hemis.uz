import paths from "@/lib/paths";
import { redirect } from "next/navigation";

const EditRedirectPage = async () => {
  redirect(`${paths.private.subjects.resourcesBase}`);
};

export default EditRedirectPage;
