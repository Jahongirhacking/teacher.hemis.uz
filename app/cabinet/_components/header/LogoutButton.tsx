"use client";

import { logoutAction } from "@/app/cabinet/_actions/profile.action";
import CustomDropDownMenu from "@/components/shared/DropdownMenu";
import { Button } from "@/components/ui/button";
import { LogoutIcon } from "@/public/icons";
import { useTransition } from "react";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      disabled={pending}
      onClick={() => startTransition(logoutAction)}
    >
      <CustomDropDownMenu.ItemLabel
        label={pending ? "Chiqilmoqda..." : "Chiqish"}
        icon={LogoutIcon}
      />
    </Button>
  );
}
