"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SearchParams } from "@/lib/const";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useCallback } from "react";

type DrawerPlacement = "left" | "right" | "top" | "bottom";

interface CustomDrawerProps {
  drawerKey: string;
  placement?: DrawerPlacement;
  title?: string;
  description?: string;
  children: ReactNode;
  activeKey?: string;
}

export function CustomDrawer({
  drawerKey,
  placement = "right",
  title,
  description,
  children,
  activeKey,
}: CustomDrawerProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isOpen = searchParams.get(SearchParams.Drawer) === drawerKey;

  const onClose = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(SearchParams.Drawer);
    if (activeKey) {
      params.delete(activeKey);
    }

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false },
    );
  }, [searchParams, pathname, router, activeKey]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction={placement}
    >
      <DrawerContent className={`fixed z-50`}>
        {(title || description) && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}

        <div className="p-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
