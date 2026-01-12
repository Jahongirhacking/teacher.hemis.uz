"use client";

import { SideNav } from "@/components/shared/SideNav";
import useConst from "@/lib/hooks/useConst";

const Menu = ({ className }: { className?: string }) => {
  const { sideNavMenus } = useConst();

  return <SideNav menu={sideNavMenus} {...{ className }} />;
};

export default Menu;
