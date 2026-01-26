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
            variant="secondary"
            disabled={pending}
            onClick={() => startTransition(logoutAction)}
            className="border-none w-full [&>div]:mr-auto !bg-transparent p-0"
        >
            <CustomDropDownMenu.ItemLabel
                label={<span className="text-[var(--destructive)]">{pending ? "Chiqilmoqda..." : "Chiqish"}</span>}
                icon={LogoutIcon}
            />
        </Button>
    );
}
