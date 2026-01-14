import { Card, CardHeader } from "@/components/ui/card";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type StatisticsCardProps = ComponentPropsWithoutRef<typeof Card>;

const StatisticsCard = ({
  icon,
  colors,
  ...props
}: StatisticsCardProps & {
  icon: ReactNode;
  colors?: { light?: string; dark?: string };
}) => {
  return (
    <Card {...props}>
      <CardHeader>
        <div className="flex gap-3 justify-between items-center">
          <div
            className={`rounded-full aspect-square bg-[${colors?.light}] dark:bg-[${colors?.dark}]`}
          >
            {icon}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default StatisticsCard;
