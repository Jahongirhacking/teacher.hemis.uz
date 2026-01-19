import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type StatisticsCardProps = ComponentPropsWithoutRef<typeof Card>;

const StatisticsCard = async ({
  icon,
  colors,
  status,
  title,
  value,
  bgImage = "/images/background/bg-img-1.png",
  className,
  ...props
}: StatisticsCardProps & {
  icon: ReactNode;
  colors?: { light?: string; dark?: string };
  status?: { percent?: number; text?: string };
  title: string;
  value: number;
  bgImage?: string;
}) => {
  return (
    <Card
      className={cn("!gap-2", className)}
      {...props}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top left",
      }}
    >
      <CardHeader className="flex gap-3 justify-between items-center flex-wrap">
        <div
          className={cn(
            `rounded-full aspect-square w-11 h-11 flex justify-center items-center bg-[var(--icon-bg)] dark:bg-[var(--icon-bg-dark)]`,
          )}
          style={
            {
              "--icon-bg": colors?.light,
              "--icon-bg-dark": colors?.dark,
            } as React.CSSProperties
          }
        >
          {icon}
        </div>
        <div className="flex flex-col gap-2 items-end ml-auto">
          <span
            className={`rounded-[4px] text-white text-[14px] block py-[1px] px-3 bg-[var(--percent-bg)]`}
            style={
              {
                "--percent-bg": "#2FA458",
              } as React.CSSProperties
            }
          >
            {status?.percent || 0}%
          </span>
          <span className="text-[var(--secondary-text)]">
            {status?.text || "Bajarilgan"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <h4 className="font-medium text-[16px] text-[var(--secondary-text)] m-0">
          {title}
        </h4>
        <b className="font-bold text-[20px] text-[var(--primary-text)]">
          {value}
        </b>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
