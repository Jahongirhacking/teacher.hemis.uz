import CustomDropDownMenu, {
  DropdownMenuProps,
} from "@/components/shared/DropdownMenu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReactElement } from "react";

const FilterDropdown = ({
  children,
}: {
  children: ReactElement;
  align?: DropdownMenuProps["align"];
}) => {
  return (
    <CustomDropDownMenu
      itemsRender={() => (
        <div className="flex flex-col min-w-[min(95dvh,300px)]">
          <div className="flex justify-between items-center py-3 px-4">
            <b>Filter</b>
            <Button
              variant={"link"}
              className="hover:text-[rgba(var(--destructive-rgba),0.6)] underline text-[var(--destructive)]"
            >
              Tozalash
            </Button>
          </div>
          <Separator />
          <div className="flex flex-col p-4">Fakultet</div>
        </div>
      )}
      triggerButton={children}
    />
  );
};

export default FilterDropdown;
