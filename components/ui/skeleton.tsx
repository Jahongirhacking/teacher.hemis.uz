import { cn } from "@/lib/utils";

function Skeleton({
  className,
  active,
  ...props
}: React.ComponentProps<"div"> & { active?: boolean }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent animate-pulse rounded-md",
        active && "skeleton-shimmer",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
