import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ReactElement } from "react";

export interface TabsProps {
  label: string | ReactElement;
  value: string;
  children: ReactElement;
}

const CustomTabs = ({
  items,
  render,
}: {
  items: TabsProps[];
  render: () => ReactElement | ReactElement[];
}) => {
  return (
    <Tabs defaultValue="1" className="w-full">
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
              "text-muted-foreground hover:text-foreground",
              "data-[state=active]:text-foreground",
              "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px]",
              "after:scale-x-0 after:bg-primary after:transition-transform",
              "data-[state=active]:after:scale-x-100",
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
