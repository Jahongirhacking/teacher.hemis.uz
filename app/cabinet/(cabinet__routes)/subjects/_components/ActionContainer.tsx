import Flex from "@/components/shared/Flex";
import { ReactNode } from "react";

const SubjectActionContainer = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <Flex vertical gap={5} align="center" className="w-full">
      <Flex className="w-full">
        {title && (
          <h3 className="text-[var(--header-primary-foreground)] font-bold text-[18px]">
            {title}
          </h3>
        )}
      </Flex>
      <Flex vertical align="center" gap={4} className="max-w-[688px] w-full">
        {children}
      </Flex>
    </Flex>
  );
};

export default SubjectActionContainer;
