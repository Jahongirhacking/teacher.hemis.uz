import useConst from "@/lib/hooks/useConst";
import paths from "@/lib/paths";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const SubjectPage = () => {
  const { sideNavMenuItems, navbarCodes } = useConst();
  const subjectMenus = sideNavMenuItems?.find(
    (e) => e?.code === navbarCodes.subjects,
  )?.children;

  console.log(sideNavMenuItems, subjectMenus);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subjectMenus?.map((menu) => (
        <Link href={menu?.href || paths.base} key={menu?.href || menu?.code}>
          <div className="flex justify-between items-center gap-3 px-3 py-4 rounded-md bg-[var(--card)]">
            <div className="flex items-center gap-2">
              {menu?.icon?.()}
              <span className="line-clamp-2 font-medium">{menu?.label}</span>
            </div>
            <ChevronRight />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SubjectPage;
