import Flex from "@/components/shared/Flex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import ProfileGeneralCard from "./ProfileGeneralCard";

const ProfileLangCertificates = () => {
  return (
    <ProfileGeneralCard title="Til sertifikatlari">
      <Flex justify="between" align="end" className="flex-wrap" gap={3}>
        <Flex vertical gap={6}>
          <LanguageItem
            id={"1234567890"}
            language="Ingliz tili"
            exam="IELTS"
            result="8"
            date="24.02.2025 ~ 24.02.2027"
          />
          <LanguageItem
            id={"1234567890"}
            language="Rus tili"
            exam="TORFL"
            result="C1"
            date="24.02.2025 ~ 24.02.2027"
          />
        </Flex>
        <Button>
          <RefreshCcw /> Sync UzBMB
        </Button>
      </Flex>
    </ProfileGeneralCard>
  );
};

const LanguageItem = (props: {
  language?: string;
  exam?: string;
  result?: string;
  date?: string;
  id: number | string;
}) => (
  <div className="flex items-center gap-5 language-item">
    <span className="w-[10px] h-[10px] min-w-[10px] bg-[var(--card-foreground)] rounded-full job-item__badge relative" />
    <div className="flex flex-col gap-2">
      <b className="text-[var(--card-foreground)]">
        {[props?.language, props?.exam, props?.result]?.join(" · ") || "-"}
      </b>
      <span className="text-[var(--secondary-foreground)]">
        {props?.date || "-"}
      </span>
    </div>
    <Badge variant={"success"}>№: {props?.id}</Badge>
  </div>
);

export default ProfileLangCertificates;
