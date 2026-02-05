"use client";

import { CustomBreadcrumb } from "@/components/shared/CustomBreadcrumb";
import useConst from "@/lib/hooks/useConst";
import paths from "@/lib/paths";
import { usePathname } from "next/navigation";

const SubjectBreadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { sideNavMenuItems, findMenuWithPath } = useConst();
  const items = [
    {
      label: "Dashboard",
      href: paths.private.dashboard,
      isCurrent: false,
    },
    {
      label: "Fanlar",
      href: paths.private.subjects.base,
      isCurrent: false,
    },
  ];

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // skip base paths (already added)
    if (
      currentPath === paths.private.subjects.base ||
      currentPath === paths.private.base
    )
      return;

    const target = findMenuWithPath(currentPath, sideNavMenuItems);

    const label = target?.label
      ? target.label
      : isId(segment)
        ? segment
        : humanize(segment);

    items.push({
      label,
      href: currentPath,
      isCurrent: index === segments.length - 1,
    });
  });

  return <CustomBreadcrumb items={items} />;
};

const isId = (segment: string) => /^\d+$/.test(segment);

const humanize = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export default SubjectBreadcrumb;
