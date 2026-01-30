"use client";

import { CustomBreadcrumb } from "@/components/shared/CustomBreadcrumb";
import useConst from "@/lib/hooks/useConst";
import paths from "@/lib/paths";
import { usePathname } from "next/navigation";

const SubjectBreadcrumb = () => {
  const pathname = usePathname();
  const { sideNavMenuItems, navbarCodes } = useConst();
  return (
    <CustomBreadcrumb
      items={[
        { label: "Dashboard", href: paths.private.dashboard, isCurrent: false },
        {
          label: "Fanlar",
          href: paths.private.subjects?.base,
          isCurrent: false,
        },
        {
          label:
            sideNavMenuItems
              ?.find((i) => i?.code === navbarCodes.subjects)
              ?.children?.find((i) => i?.href === pathname)?.label || "Fan",
          href: pathname,
          isCurrent: true,
        },
      ]}
    />
  );
};

export default SubjectBreadcrumb;
