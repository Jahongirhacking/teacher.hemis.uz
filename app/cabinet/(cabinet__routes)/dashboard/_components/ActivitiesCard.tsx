import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const ActivitiesCard = () => {
  return (
    <Card className="flex-1 gap-3 py-4 max-w-[520px]">
      <CardHeader className="flex justify-between items-center gap-2 font-bold">
        <h3>Mashg’ulotga qatnashish</h3>
        <Button variant={"ghost"}>Batafsil</Button>
      </CardHeader>
      <Separator />
      <CardContent className="flex items-center flex-wrap gap-2">
        <ActivityStatistics
          text={{
            primary: "Jami",
            secondary: "talabalar",
          }}
          value={60}
        />
        <Separator orientation="vertical" className="hidden lg:block" />
        <ActivityStatistics
          text={{
            primary: "Topshirgan",
            secondary: "talabalar",
          }}
          value={43}
        />
        <Separator orientation="vertical" className="hidden lg:block" />
        <ActivityStatistics
          text={{
            primary: "Topshirmagan",
            secondary: "talabalar",
          }}
          value={17}
        />
      </CardContent>
      <div className="flex flex-col gap-2 p-4">
        <ActivityProfile name="Ilyosov Fatxulla" id="999241100035" />
        <ActivityProfile name="Sharipov Shohrux" id="999241100035" />
      </div>
    </Card>
  );
};

const ActivityStatistics = ({
  text,
  value,
}: {
  text: { primary: string; secondary?: string };
  value: number;
}) => {
  return (
    <div className="flex flex-col gap-3 flex-1 items-center">
      <div className="flex flex-col items-center">
        <span>{text?.primary}</span>
        <span className="text-[var(--secondary-text)]">{text?.secondary}</span>
      </div>
      <b className="text-[18px] font-bold">{value}</b>
    </div>
  );
};

const ActivityProfile = ({
  img = "",
  name,
  id,
}: {
  img?: string;
  name: string;
  id: string;
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-2">
      <div className="flex gap-4 items-center">
        <Image
          width={40}
          height={40}
          src={img || "/images/avatar.jpg"}
          alt={name || "profile"}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <b className="font-medium text-[16px] text-[var(--primary-text)]">
            {name}
          </b>
          <span className="text-[14px] text-[var(--secondary-text)]">{id}</span>
        </div>
      </div>

      <Button className="ml-auto">O’tish</Button>
    </div>
  );
};

export default ActivitiesCard;
