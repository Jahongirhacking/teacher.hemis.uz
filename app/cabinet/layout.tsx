import { CountBadge } from "@/components/shared/CountBadge";
import HemisLogo from "@/components/shared/HemisLogo";
import { Loading } from "@/components/shared/Loading";
import { ThemeSwitchButton } from "@/components/shared/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/services/auth";
import {
  FolderRefreshIcon,
  MailIcon,
  NavbarSidePanelIcon,
} from "@/public/icons";
import {} from "@heroicons/react/24/outline";
import { ChevronDown } from "lucide-react";
import React, { Suspense } from "react";
import Menu from "./_components/aside/Menu";
import BottomNav from "./_components/footer/BottomNav";
import ProfileMenu from "./_components/header/ProfileMenu";
import ProfileAvatar from "./_components/ProfileAvatar";
import { SearchInput } from "./_components/SearchInput";

const CabinetLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const profile = await getProfile();
  const teacher =
    (profile?.success && profile?.data?.data?.teacher) || undefined;

  return (
    <div className="flex items-stretch h-[100dvh] max-h-[100dvh]">
      <aside className="hidden md:block w-[243px] shrink-0 bg-[var(--sidebar-primary)] border-r">
        <div className="flex items-center justify-between h-[64px] w-full px-6 border-b">
          <HemisLogo />
          <Button className="border-none" variant={"ghost"}>
            <NavbarSidePanelIcon />
          </Button>
        </div>
        <Menu className="mt-4 px-2" />
      </aside>
      <main className="flex flex-col flex-1 min-w-0 h-100dvh max-h-[100dvh] overflow-y-hidden">
        <header className="py-3 px-4 h-[64px] bg-[var(--header-primary)] border-b flex gap-4 items-center justify-between [@media(max-width:400px)]:justify-evenly">
          <SearchInput />
          <div className="flex gap-4">
            <ThemeSwitchButton />
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
                  <ProfileAvatar
                    src={teacher?.image || ""}
                    name={teacher?.full_name}
                    className="h-[32px] w-[32px]"
                  />
                  <ChevronDown />
                </div>
              </Button>
            </ProfileMenu>
          </div>
        </header>
        <section
          id="main-outlet"
          className="flex-1 py-5 px-4 pb-15 overflow-y-auto overflow-x-hidden"
        >
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
        <footer className="block md:hidden border-t-[1px]">
          <BottomNav />
        </footer>
      </main>
    </div>
  );
};

export default CabinetLayout;
