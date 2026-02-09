import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { getProfileAction } from "@/lib/actions/profile.action";
import { Settings } from "lucide-react";
import ProfileContactInfo from "../_components/ContactInfo";

const ProfileInfoPage = async () => {
  const profileData = await getProfileAction();
  const employee = profileData?.success && profileData?.data?.teacher?.employee;

  return (
    <Flex vertical align="center" gap={5} className="w-full">
      <Flex justify="between" className="w-full">
        <h2 className="font-bold text-[18px] text-[var(--header-primary-foreground)] leading-[36px]">
          Profil
        </h2>
      </Flex>
      <Flex vertical className="w-full max-w-[783px]">
        {profileData?.success && employee ? (
          <ProfileContactInfo
            full_name={
              employee?.full_name || profileData?.data?.teacher?.full_name
            }
            email={profileData?.data?.teacher?.email}
            telephone={profileData?.data?.teacher?.telephone}
            image={profileData?.data?.teacher?.image}
            id={profileData?.data?.teacher?.id}
          />
        ) : (
          <Empty />
        )}
      </Flex>
      <Flex gap={3}>
        <Settings className="animate-spin" />
        Ma&apos;lumotlar ulanish jarayonida
      </Flex>
    </Flex>
  );
};

export default ProfileInfoPage;
