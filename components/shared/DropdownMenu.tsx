import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { JSX, ReactElement } from "react";

export interface DropdownMenuProps {
  triggerButton: ReactElement;
  itemsRender: () => ReactElement | ReactElement[];
  extraRender?: () => ReactElement | ReactElement[];
  className?: string;
  align?: "start" | "center" | "end";
}

const CustomDropDownMenu = (props: DropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="select-none">
        {props?.triggerButton}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("min-w-[100px]", props?.className)}
        align={props?.align || "end"}
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
