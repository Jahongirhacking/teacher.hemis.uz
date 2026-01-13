"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useState } from "react";

export interface NavItemType {
  label: string;
  href?: string;
  icon?: () => JSX.Element;
  children?: NavItemType[];
}

interface SideNavProps {
  menu: NavItemType[];
  className?: string;
}

export function SideNav({ menu, className }: SideNavProps) {
  return (
    <nav className={cn("w-full space-y-1", className)}>
      {menu.map((item, index) =>
        item.children ? (
          <SubMenu key={index} {...{ item }} />
        ) : (
          <NavItem key={index} {...{ item }} />
        ),
      )}
    </nav>
  );
}

const ItemLabel = ({ item }: { item: NavItemType }) => {
  return (
    <div className="flex gap-3 items-center">
      {item?.icon && item?.icon()} {/* call the function if it exists */}
      <span className="font-medium">{item?.label}</span>
    </div>
  );
};

function SubMenu({ item }: { item: NavItemType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors duration-200 ease-in-out",
        )}
      >
        <ItemLabel {...{ item }} />
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200 ease-in-out",
            isOpen ? "rotate-0" : "rotate-[-90deg]",
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent
        className={cn(
          "ml-4 overflow-hidden transition-[max-height] duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        {item?.children?.map((child, idx) => (
          <NavItem key={idx} item={child} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function NavItem({ item }: { item: NavItemType }) {
  const pathname = usePathname();

  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item?.href || "#"}
      className={cn(
        "block rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors duration-200 ease-in-out",
        isActive && "bg-[var(--background)] text-primary",
      )}
    >
      <ItemLabel {...{ item }} />
    </Link>
  );
}
