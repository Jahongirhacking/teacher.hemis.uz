import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface AvatarProps {
  className?: string;
}

const ProfileAvatar = (props: AvatarProps) => {
  return (
    <Avatar className={cn("w-[36px] h-[36px]", props?.className)}>
      <AvatarImage
        className="object-cover"
        src={"/images/profile.jpg"}
        alt="Foydalanuvchi rasmi"
      />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
