"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchParams } from "@/lib/const";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement } from "react";

export interface TabsProps {
  label: string | ReactElement;
  value: string;
  children: ReactElement;
}

const CustomTabs = ({
  items,
  render,
  activeKeyParam = SearchParams.ActiveTab,
}: {
  items: TabsProps[];
  render: () => ReactElement | ReactElement[];
  activeKeyParam?: SearchParams;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      className="w-full"
      value={searchParams.get(activeKeyParam) || items?.[0]?.value}
      onValueChange={(key) => {
        const params = new URLSearchParams();
        params.set(SearchParams.ActiveTab, key);
        router.replace(`${pathname}?${params.toString()}`);
      }}
    >
      <TabsList
        className={cn(
          "h-auto justify-start rounded-none border-b bg-transparent p-0",
        )}
      >
        {items?.map((item) => (
          <TabsTrigger
            key={item?.value}
            value={item?.value}
            className={cn(
              "relative rounded-none px-4 py-2 text-sm font-normal",
              "text-muted-foreground hover:text-[var(--primary)]",
              "data-[state=active]:text-[var(--primary)]",
              "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]",
              "after:scale-x-0 after:bg-primary after:transition-transform after:duration-400",
              "data-[state=active]:after:scale-x-100 font-medium cursor-pointer",
            )}
          >
            {item?.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {render?.()}
    </Tabs>
  );
};

export default CustomTabs;
