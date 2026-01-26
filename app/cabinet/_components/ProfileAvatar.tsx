import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ComponentProps } from "react";

type AvatarProps = ComponentProps<typeof Avatar>;

const ProfileAvatar = ({
  src,
  name,
  ...props
}: AvatarProps & { src: string; name?: string }) => {
  return (
    <Avatar
      className={cn(
        "w-[36px] h-[36px] flex justify-center items-center bg-[#8769e6]",
        props?.className,
      )}
    >
      <AvatarImage
        className="object-cover"
        src={src || "/images/profile.jpg"}
        alt="Foydalanuvchi rasmi"
      />
      <AvatarFallback className="text-white">
        {name
          ?.split(" ")
          ?.map((e) => e?.[0]?.toUpperCase())
          ?.filter((e) => !!e)
          ?.slice(0, 2)
          ?.join("") || "AB"}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
