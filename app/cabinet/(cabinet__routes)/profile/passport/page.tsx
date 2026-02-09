import Empty from "@/components/shared/Empty";
import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { getProfileAction } from "@/lib/actions/profile.action";
import { ArrowDownToLineIcon } from "lucide-react";
import {
  ProfileAcademicInfo,
  ProfileAcademicWorks,
  ProfileChoice,
  ProfileContactInfo,
  ProfileInternshipInfo,
  ProfileJobInfo,
  ProfileLangCertificates,
  ProfilePassportInfo,
  ProfilePrivateWorkPlan,
  ProfileSkillImprovement,
} from "../_components";

const ProfilePassportPage = async () => {
  const profile = await getProfileAction();
  const employee = profile?.success && profile?.data?.teacher?.employee;

  return (
    <Flex vertical gap={5} className="w-full">
      <Flex justify="between" className="w-full">
        <h2 className="font-bold text-[18px] text-[var(--header-primary-foreground)] leading-[36px]">
          O’qituvchi passporti
        </h2>
        <Button>
          <ArrowDownToLineIcon /> Yuklab olish
        </Button>
      </Flex>
      {profile?.success && employee ? (
        <>
          <ProfileContactInfo
            full_name={employee?.full_name || profile?.data?.teacher?.full_name}
            email={profile?.data?.teacher?.email}
            telephone={profile?.data?.teacher?.telephone}
            image={profile?.data?.teacher?.image}
            id={profile?.data?.teacher?.id}
          />
          <Flex gap={4} className="w-full">
            <Flex vertical gap={4} className="flex-1 w-full">
              <div className="w-full [@media(max-width:1150px)]:block hidden">
                <ProfilePassportInfo
                  birthDate={employee?.birth_date}
                  gender={employee?.gender?.name}
                  nationality={employee?.nationality?.name}
                  passportNumber={employee?.passport_number}
                  pinfl={employee?.passport_pin}
                />
              </div>
              <ProfileJobInfo />
              <ProfileLangCertificates />
              <Flex
                vertical
                gap={4}
                className="w-full [@media(max-width:1150px)]:flex hidden"
              >
                <ProfileAcademicInfo />
                <ProfilePrivateWorkPlan />
              </Flex>
              <ProfileChoice />
              <ProfileSkillImprovement />
              <ProfileInternshipInfo />
              <ProfileAcademicWorks />
            </Flex>

            <Flex
              vertical
              gap={4}
              className="w-[336px] [@media(max-width:1150px)]:hidden"
            >
              <ProfilePassportInfo
                birthDate={employee?.birth_date}
                gender={employee?.gender?.name}
                nationality={employee?.nationality?.name}
                passportNumber={employee?.passport_number}
                pinfl={employee?.passport_pin}
              />
              <ProfileAcademicInfo />
              <ProfilePrivateWorkPlan />
            </Flex>
          </Flex>
        </>
      ) : (
        <Empty />
      )}
    </Flex>
  );
};

export default ProfilePassportPage;
