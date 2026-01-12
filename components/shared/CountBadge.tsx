import { Badge } from "@/components/ui/badge";
import React from "react";

interface CountBadgeProps {
  count?: number;
  size?: "small" | "default" | "large";
  children: React.ReactNode;
}

const getBadgeSize = (size: CountBadgeProps["size"]) => {
  switch (size) {
    case "small":
      return "h-4 min-w-4 text-[10px]";
    case "large":
      return "h-6 min-w-6 text-sm";
    default:
      return "h-5 min-w-5 text-xs";
  }
};

export function CountBadge({
  count,
  children,
  size = "default",
}: CountBadgeProps) {
  if (!count || count <= 0) return <>{children}</>;

  return (
    <div className="relative inline-flex">
      {children}

      <Badge
        className={`absolute -right-2 -top-2 px-1 ${getBadgeSize(
          size,
        )} flex items-center justify-center rounded-full`}
      >
        {count > 99 ? "99+" : count}
      </Badge>
    </div>
  );
}
