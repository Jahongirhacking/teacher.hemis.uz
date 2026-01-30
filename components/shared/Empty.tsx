import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

interface EmptyProps {
  description?: string;
  image?: ImageProps;
  className?: string;
}

const Empty = (props: EmptyProps) => {
  return (
    <div className={cn("flex flex-col gap-6 items-center", props?.className)}>
      <p className="font-medium text-[16px] text-[var(--secondary-foreground)]">
        {props?.description || "Ma'lumot bo'sh"}
      </p>
      <Image
        height={224}
        width={355}
        alt="Ma'lumot bo'sh"
        src="/images/empty.svg"
        {...props?.image}
      />
    </div>
  );
};

export default Empty;
