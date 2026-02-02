import Flex from "@/components/shared/Flex";
import { TIME_FORMAT } from "@/lib/const";
import { PassportInfoIcons } from "@/public/icons";
import moment from "moment";
import { ReactNode } from "react";
import ProfileGeneralCard from "./GeneralCard";

const ProfilePassportInfo = (props: {
  birthDate?: string;
  gender?: string | number | null;
  nationality?: string | null;
  citizenship?: string;
  passportNumber?: string | number;
  passportGivenDate?: string;
  pinfl?: string | number;
}) => {
  return (
    <ProfileGeneralCard title="Passport ma’lumotlari">
      <Flex vertical gap={4}>
        <PassportItem
          icon={<PassportInfoIcons.BirthdateIcon />}
          title="Tug'ilgan sana"
          value={moment(props?.birthDate, TIME_FORMAT.Server).format(
            TIME_FORMAT.Client,
          )}
        />
        <PassportItem
          icon={<PassportInfoIcons.GenderIcon />}
          title="Jinsi"
          value={props?.gender}
        />
        <PassportItem
          icon={<PassportInfoIcons.NationIcon />}
          title="Millati"
          value={props?.nationality}
        />
        <PassportItem
          icon={<PassportInfoIcons.CitizenshipIcon />}
          title="Fuqaroligi"
          value={props?.citizenship}
        />
        <PassportItem
          icon={<PassportInfoIcons.PassportNumberIcon />}
          title="Passport raqami"
          value={props?.passportNumber}
        />
        <PassportItem
          icon={<PassportInfoIcons.PassportGivenDateIcon />}
          title="Passport berilgan sana"
          value={props?.passportGivenDate}
        />
        <PassportItem
          icon={<PassportInfoIcons.PinflIcon />}
          title="Passport JSHSHIR raqami"
          value={props?.pinfl}
        />
      </Flex>
    </ProfileGeneralCard>
  );
};

const PassportItem = ({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value?: string | number | null;
}) => (
  <Flex gap={4} align="center">
    <div className="w-[40px] h-[40px] min-w-[40px] rounded-full bg-[var(--background)] flex items-center justify-center">
      {icon}
    </div>
    <Flex vertical gap={2}>
      <b className="text-[var(--card-foreground)] text-[14px]">{title}</b>
      <span className="text-[var(--secondary-foreground)] text-[14px] leading-[14px]">
        {value || "-"}
      </span>
    </Flex>
  </Flex>
);

export default ProfilePassportInfo;
