"use client";

import CustomDropDownMenu from "@/components/shared/DropdownMenu";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useConst from "@/lib/hooks/useConst";
import Link from "next/link";
import { ReactElement } from "react";
import ProfileAvatar from "../ProfileAvatar";
import { LogoutButton } from "./LogoutButton";

interface DropdownMenuProps {
  children: ReactElement;
}

const ProfileMenu = ({ children }: DropdownMenuProps) => {
  const { profileMenuItems } = useConst();

  return (
    <CustomDropDownMenu
      triggerButton={children}
      itemsRender={() => (
        <div className="flex flex-col">
          <Card className="my-2 py-4 px-2 bg-[var(--background)] shadow-none border-none">
            <CardContent className="p-0">
              <div className="flex gap-3 items-center">
                <ProfileAvatar />
                <div className="flex flex-col gap-1">
                  <h3 className="text-[14px] font-semibold">
                    Haydarov Karim Salimovich
                  </h3>
                  <span className="text-[12px] font-medium text-[var(--muted-foreground)]">
                    O’qituvchi
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {profileMenuItems?.map((item, idx) => (
            <DropdownMenuItem key={idx}>
              <Link href={item?.href || "#"}>
                <CustomDropDownMenu.ItemLabel
                  label={item?.label}
                  icon={item?.icon}
                />
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      )}
      extraRender={() => (
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      )}
      className="py-2 px-4 w-[300px]"
    />
  );
};

const ItemLabel = ({
  label,
  icon,
}: {
  label: ReactElement | string;
  icon: ReactElement;
}) => (
  <div className="flex gap-2 items-center">
    {icon}
    <span>{label}</span>
  </div>
);

ProfileMenu.ItemLabel = ItemLabel;

export default ProfileMenu;
