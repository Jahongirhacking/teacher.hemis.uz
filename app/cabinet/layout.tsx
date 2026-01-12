import React from "react";
import Logo from "./_components/aside/Logo";
import {} from "@heroicons/react/24/outline";
import {
  DarkThemeIcon,
  FolderRefreshIcon,
  MailIcon,
  NavbarSidePanelIcon,
} from "@/public/icons";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./_components/SearchInput";
import { CountBadge } from "@/components/shared/CountBadge";
import { SideNav } from "@/components/shared/SideNav";
import Menu from "./_components/aside/Menu";

const CabinetLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex items-stretch min-h-[100dvh] max-h-[100dvh]">
      <aside className="w-full !max-w-[243px] bg-[var(--sidebar-primary)] border-r">
        <div className="flex items-center justify-between h-[64px] w-full px-6 border-b">
          <Logo />
          <Button className="border-none" variant={"ghost"}>
            <NavbarSidePanelIcon />
          </Button>
        </div>
        <Menu className="mt-4 px-2" />
      </aside>
      <main className="flex flex-col flex-1">
        <header className="py-3 px-4 h-[64px] bg-[var(--header-primary)] border-b flex items-center justify-between">
          <SearchInput />
          <div className="flex gap-4">
            <Button className="rounded-full" variant={"ghost"}>
              <DarkThemeIcon />
            </Button>
            <Button className="rounded-full" variant={"ghost"}>
              <FolderRefreshIcon />
            </Button>
            <Button className="rounded-full" variant={"ghost"}>
              <CountBadge count={3} size="small">
                <MailIcon />
              </CountBadge>
            </Button>
          </div>
        </header>
        <section className="flex-1 py-5 px-4 pb-7 max-h-[calc(100dvh-64px)] overflow-y-auto">
          {children}
        </section>
      </main>
    </div>
  );
};

export default CabinetLayout;
