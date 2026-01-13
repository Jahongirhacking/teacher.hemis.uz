import { CountBadge } from "@/components/shared/CountBadge";
import { Loading } from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import {
  DarkThemeIcon,
  FolderRefreshIcon,
  MailIcon,
  NavbarSidePanelIcon,
} from "@/public/icons";
import {} from "@heroicons/react/24/outline";
import { ChevronDown } from "lucide-react";
import React, { Suspense } from "react";
import Logo from "./_components/aside/Logo";
import Menu from "./_components/aside/Menu";
import ProfileMenu from "./_components/header/ProfileMenu";
import ProfileAvatar from "./_components/ProfileAvatar";
import { SearchInput } from "./_components/SearchInput";

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
            <Button className="rounded-full h-[40px]" variant={"ghost"}>
              <DarkThemeIcon />
            </Button>
            <Button className="rounded-full h-[40px]" variant={"ghost"}>
              <FolderRefreshIcon />
            </Button>
            <Button className="rounded-full h-[40px]" variant={"ghost"}>
              <CountBadge count={3} size="small">
                <MailIcon />
              </CountBadge>
            </Button>
            <ProfileMenu>
              <Button variant={"ghost"} className="h-[40px] p-1 rounded-full">
                <div className="flex gap-1 items-center">
                  <ProfileAvatar className="h-[32px] w-[32px]" />
                  <ChevronDown />
                </div>
              </Button>
            </ProfileMenu>
          </div>
        </header>
        <section className="flex-1 py-5 px-4 pb-7 max-h-[calc(100dvh-64px)] overflow-y-auto">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
      </main>
    </div>
  );
};

export default CabinetLayout;
