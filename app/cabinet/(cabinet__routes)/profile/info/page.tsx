import Flex from "@/components/shared/Flex";
import { getProfileAction } from "@/lib/actions/profile.action";
import { Settings } from "lucide-react";
import ProfileContactInfo from "../_components/ContactInfo";

const ProfileInfoPage = async () => {
  const profile = (await getProfileAction())?.data;
  const employee = profile?.teacher?.employee;

  return (
    <Flex vertical align="center" gap={5} className="w-full">
      <Flex justify="between" className="w-full">
        <h2 className="font-bold text-[18px] text-[var(--header-primary-foreground)] leading-[36px]">
          Profil
        </h2>
      </Flex>
      <Flex vertical className="w-full max-w-[783px]">
        <ProfileContactInfo
          full_name={employee?.full_name || profile?.teacher?.full_name}
          email={profile?.teacher?.email}
          telephone={profile?.teacher?.telephone}
          image={profile?.teacher?.image}
          id={profile?.teacher?.id}
        />
      </Flex>
      <Flex gap={3}>
        <Settings className="animate-spin" />
        Ma&apos;lumotlar ulanish jarayonida
      </Flex>
    </Flex>
  );
};

export default ProfileInfoPage;
