import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { getProfileAction } from "@/lib/actions/profile.action";
import { ArrowDownToLineIcon } from "lucide-react";
import ProfileContactCard from "../_components/ProfileContact";
import ProfileJobInfo from "../_components/ProfileJobInfo";
import ProfileLangCertificates from "../_components/ProfileLangCertificates";

const ProfilePassportPage = async () => {
  const profile = (await getProfileAction())?.data;
  console.log(profile);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h2 className="font-bold text-[18px] text-[var(--header-primary-foreground)] leading-[36px]">
          O’qituvchi passporti
        </h2>
        <Button>
          <ArrowDownToLineIcon /> Yuklab olish
        </Button>
      </div>
      <ProfileContactCard
        full_name={profile?.teacher?.full_name}
        email={profile?.teacher?.email}
        telephone={profile?.teacher?.telephone}
        image={profile?.teacher?.image}
        id={profile?.teacher?.id}
      />
      <div className="flex gap-4">
        <Flex vertical gap={4} className="flex-1">
          <ProfileJobInfo />
          <ProfileLangCertificates />
        </Flex>

        <div className="flex flex-col gap-4 w-[336px]"></div>
      </div>
    </div>
  );
};

export default ProfilePassportPage;
