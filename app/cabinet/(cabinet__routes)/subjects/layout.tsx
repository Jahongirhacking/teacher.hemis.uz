import { ReactNode } from "react";
import SubjectBreadcrumb from "./_components/SubjectBreadcrumb";

const SubjectLayout = async ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4 justify-between items-center">
        <SubjectBreadcrumb />
      </div>
      {children}
    </div>
  );
};

export default SubjectLayout;
