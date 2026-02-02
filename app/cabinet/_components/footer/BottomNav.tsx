"use client";

import useConst from "@/lib/hooks/useConst";
import paths from "@/lib/paths";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const { sideNavMenuItems, findMenuWithPath, profileMenuItems } = useConst();
  const pathname = usePathname();

  return (
    <div className="bottom-nav flex items-center gap-3 justify-evenly p-2 bg-[var(--footer-primary)] h-[70px] max-h-[70px] overflow-hidden">
      {[
        paths.private.subjects.base,
        paths.private.dashboard,
        paths.private.settings,
      ]
        ?.map((path) =>
          findMenuWithPath(path, [...sideNavMenuItems, ...profileMenuItems]),
        )
        ?.filter((path) => !!path)
        ?.map((path) => {
          const tempPath = path?.href || path?.code || paths.base;
          const isActive = tempPath && pathname?.includes(tempPath);
          return (
            <Link href={tempPath} key={tempPath}>
              <div
                className={cn(
                  "flex flex-col items-center gap-1 duration-300",
                  isActive && "active transform scale-130 gap-0",
                )}
              >
                <span
                  className={cn(
                    "rounded-full bg-[var(--background)] transition-all p-1",
                    isActive && "p-2",
                  )}
                >
                  {path?.icon?.()}
                </span>

                <span
                  className={cn(
                    "text-medium text-[13px] transition-all",
                    isActive && "opacity-0 h-0 overflow-hidden",
                  )}
                >
                  {path?.label}
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default BottomNav;
