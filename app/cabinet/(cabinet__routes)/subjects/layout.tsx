import { Separator } from "@radix-ui/react-select";
import { ReactNode } from "react";
import SubjectBreadcrumb from "./_components/SubjectBreadcrumb";

const SubjectLayout = async ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between items-center">
        <SubjectBreadcrumb />
      </div>
      <Separator className="w-full h-[1px] bg-[var(--card-header)]" />
      {children}
    </div>
  );
};

export default SubjectLayout;
