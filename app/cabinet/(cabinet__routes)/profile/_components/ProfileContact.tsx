import { SafeImage } from "@/components/shared/SafeImage";
import { Badge } from "@/components/ui/badge";
import { ITeacherInfo } from "@/lib/services/auth/type";
import Image from "next/image";
import ProfileGeneralCard from "./ProfileGeneralCard";

const ProfileContact = (
  props: Partial<
    Pick<ITeacherInfo, "full_name" | "id" | "email" | "telephone" | "image"> & {
      address?: string;
    }
  >,
) => {
  return (
    <ProfileGeneralCard>
      <div className="flex gap-6 flex-wrap">
        <SafeImage
          src={props?.image || "/images/avatar.jpg"}
          alt="Profil rasmi"
          width={129}
          height={156}
          className="rounded-[8px]"
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-x-6 gap-y-2 items-center flex-wrap">
            <b className="text-[var(--card-foreground)] font-semibold text-[18px]">
              {props?.full_name}
            </b>
            <Badge
              variant={"secondary"}
              className="rounded-[6px] text-[14px] font-medium"
            >
              ID: {props?.id}
            </Badge>
          </div>
          <div className="flex flex-col gap-1">
            <ContactInfo title="Email:" description={props?.email} />
            <ContactInfo title="Telefon:" description={props?.telephone} />
            <ContactInfo
              title="Yashash manzili:"
              description={props?.address}
            />
          </div>
        </div>
      </div>
      <Image
        src={"/images/background/card-bg-1.svg"}
        width={250}
        alt="card-bg"
        height={235}
        className="absolute right-[calc(25%-200px)] top-0 h-full rotate-[45deg] sm:rotate-0"
      />
    </ProfileGeneralCard>
  );
};

const ContactInfo = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="flex gap-2 flex-wrap">
    <b className="text-[var(--card-foreground)]">{title}</b>
    <span className="text-[var(--secondary-foreground)]">
      {description || "-"}
    </span>
  </div>
);

export default ProfileContact;
