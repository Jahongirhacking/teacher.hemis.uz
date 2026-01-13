import paths from "@/lib/paths";
import { redirect } from "next/navigation";

const Page = async () => {
  redirect(paths.private.dashboard);
};

export default Page;
