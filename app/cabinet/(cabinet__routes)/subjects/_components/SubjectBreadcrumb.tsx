"use client";

import { CustomBreadcrumb } from "@/components/shared/CustomBreadcrumb";
import useConst from "@/lib/hooks/useConst";
import paths from "@/lib/paths";
import { usePathname } from "next/navigation";

const SubjectBreadcrumb = () => {
  const pathname = usePathname();
  const { sideNavMenuItems, findMenuWithPath } = useConst();
  const target = findMenuWithPath(pathname, sideNavMenuItems);

  return (
    <CustomBreadcrumb
      items={[
        { label: "Dashboard", href: paths.private.dashboard, isCurrent: false },
        {
          label: "Fanlar",
          href: paths.private.subjects?.base,
          isCurrent: false,
        },

        ...(target && pathname !== paths.private.subjects.base
          ? [
              {
                label: target?.label,
                href: pathname,
                isCurrent: true,
              },
            ]
          : []),
      ]}
    />
  );
};

export default SubjectBreadcrumb;
