"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FlexProps = {
  children: ReactNode;
  vertical?: boolean; // column if true
  gap?: number | string; // Tailwind gap (e.g., 2, 4, 6, or '1rem')
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  align?: "start" | "center" | "end" | "stretch";
  className?: string; // extra custom classes
};

const Flex = ({
  children,
  vertical = false,
  gap = 0,
  justify = "start",
  align = "start",
  className = "",
}: FlexProps) => {
  // Tailwind mapping
  const justifyMap: Record<typeof justify, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const alignMap: Record<typeof align, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  return (
    <div
      className={cn(`
        flex
        ${vertical ? "flex-col" : "flex-row"}
        ${justifyMap[justify]}
        ${alignMap[align]}
        gap-${gap}
      `, className)}
    >
      {children}
    </div>
  );
};

export default Flex;
