import Flex from "@/components/shared/Flex";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

const MainCabinetContainer = ({
  title,
  badgeText,
  extra,
  children,
}: {
  title?: string;
  badgeText?: string;
  extra?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Flex vertical gap={4} className="w-full items-center">
      <Flex
        align="center"
        gap={2}
        justify="between"
        className="w-full flex-wrap"
      >
        <Flex gap={2} align="center">
          {!!title && (
            <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
              {title}
            </h3>
          )}
          {!!badgeText && (
            <Badge variant={"secondary"} className="rounded-[6px]">
              {badgeText}
            </Badge>
          )}
        </Flex>
        {!!extra && (
          <Flex gap={2} justify="end" align="center" className="ml-auto">
            {extra}
          </Flex>
        )}
      </Flex>

      {children}
    </Flex>
  );
};

export default MainCabinetContainer;
