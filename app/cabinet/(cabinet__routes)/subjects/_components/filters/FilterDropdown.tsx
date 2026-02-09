"use client";

import CustomDropDownMenu, {
  DropdownMenuProps,
} from "@/components/shared/DropdownMenu";
import { Button } from "@/components/ui/button";
import {
  ALL_SUBJECT_FILTERS,
  SubjectFilters,
} from "@/lib/services/subject/type";
import { ListFilterIcon } from "lucide-react";
import { ReactElement, useState } from "react";
import FilterForm from "./FilterForm";

const FilterDropdown = ({
  children,
  types = ALL_SUBJECT_FILTERS,
}: {
  children: ReactElement;
  align?: DropdownMenuProps["align"];
  types?: SubjectFilters[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <CustomDropDownMenu
      open={open}
      onOpenChange={setOpen}
      itemsRender={() => (
        <FilterForm
          types={types}
          onAfterSubmit={() => {
            setOpen(false);
          }}
        />
      )}
      triggerButton={children}
    />
  );
};

export const FilterButton = ({
  types,
  filtersCount,
}: {
  types: SubjectFilters[];
  filtersCount: number;
}) => {
  return (
    <FilterDropdown types={types}>
      <Button variant={"secondary"}>
        <ListFilterIcon /> Filtr {!!filtersCount && `(${filtersCount})`}
      </Button>
    </FilterDropdown>
  );
};

export default FilterDropdown;
