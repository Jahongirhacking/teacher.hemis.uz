import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import { getProfileAction } from "@/lib/actions/profile.action";
import { ArrowDownToLineIcon } from "lucide-react";
import ProfileAcademicInfo from "../_components/AcademicInfo";
import ProfileAcademicWorks from "../_components/AcademicWorks";
import ProfileChoice from "../_components/ChoiceInfo";
import ProfileContactInfo from "../_components/ContactInfo";
import ProfileInternshipInfo from "../_components/InternshipInfo";
import ProfileJobInfo from "../_components/JobInfo";
import ProfileLangCertificates from "../_components/LangCertificates";
import ProfilePassportInfo from "../_components/PassportInfo";
import ProfilePrivateWorkPlan from "../_components/PrivateWorkPlan";
import ProfileSkillImprovement from "../_components/SkillImprovement";

const ProfilePassportPage = async () => {
  const profile = (await getProfileAction())?.data;
  const employee = profile?.teacher?.employee;

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
      <ProfileContactInfo
        full_name={
          profile?.teacher?.employee?.full_name || profile?.teacher?.full_name
        }
        email={profile?.teacher?.email}
        telephone={profile?.teacher?.telephone}
        image={profile?.teacher?.image}
        id={profile?.teacher?.id}
      />
      <Flex gap={4} className="w-full">
        <Flex vertical gap={4} className="flex-1 w-full">
          <div className="w-full [@media(max-width:1150px)]:block hidden">
            <ProfilePassportInfo
              birthDate={employee?.birth_date}
              gender={employee?.gender}
              nationality={employee?.nationality}
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
            gender={employee?.gender}
            nationality={employee?.nationality}
            passportNumber={employee?.passport_number}
            pinfl={employee?.passport_pin}
          />
          <ProfileAcademicInfo />
          <ProfilePrivateWorkPlan />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfilePassportPage;
