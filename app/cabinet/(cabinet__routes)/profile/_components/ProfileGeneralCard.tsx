import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const ProfileGeneralCard = ({
  className,
  children,
  title,
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-[var(--card)] w-full p-5 rounded-[8px] overflow-hidden relative",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        {title && (
          <h4 className="font-bold text-[18px] text-[var(--card-foreground)]">
            {title}
          </h4>
        )}
        {children}
      </div>
    </div>
  );
};

export default ProfileGeneralCard;
