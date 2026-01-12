import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { JSX, ReactElement } from "react";

interface DropdownMenuProps {
  triggerButton: ReactElement;
  itemsRender: () => ReactElement | ReactElement[];
  extraRender?: () => ReactElement | ReactElement[];
  className?: string;
}

const CustomDropDownMenu = (props: DropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props?.triggerButton}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("min-w-[100px]", props?.className)}
        align="start"
      >
        <DropdownMenuGroup>{props?.itemsRender()}</DropdownMenuGroup>
        {props?.extraRender && (
          <>
            <Separator className="my-3" />
            {props?.extraRender()}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ItemLabel = ({
  label,
  icon,
}: {
  label: ReactElement | string;
  icon?: () => JSX.Element;
}) => (
  <div className="flex gap-2 items-center">
    {icon && icon()}
    <span>{label}</span>
  </div>
);

CustomDropDownMenu.ItemLabel = ItemLabel;

export default CustomDropDownMenu;
