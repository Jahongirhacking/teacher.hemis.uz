import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ActivitiesCard = () => {
  return (
    <Card className="flex-1 gap-3">
      <CardHeader className="flex justify-between items-center gap-2">
        <h3>Mashg’ulotga qatnashish</h3>
        <Button variant={"ghost"}>Batafsil</Button>
      </CardHeader>
      <Separator />
      <CardContent className="flex items-center flex-wrap">
        <ActivityStatistics
          text={{
            primary: "Jami",
            secondary: "talabalar",
          }}
          value={60}
        />
        <Separator orientation="vertical" />
        <ActivityStatistics
          text={{
            primary: "Topshirgan",
            secondary: "talabalar",
          }}
          value={43}
        />
        <Separator orientation="vertical" />
        <ActivityStatistics
          text={{
            primary: "Topshirmagan",
            secondary: "talabalar",
          }}
          value={17}
        />
      </CardContent>
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

export default ActivitiesCard;
