"use client";

import { SideNav } from "@/components/shared/SideNav";
import useConst from "@/lib/hooks/useConst";

const Menu = ({ className }: { className?: string }) => {
  const { sideNavMenuItems } = useConst();

  return <SideNav menu={sideNavMenuItems} {...{ className }} />;
};

export default Menu;
