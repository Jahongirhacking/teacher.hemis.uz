import { Card } from "@/components/ui/card";

const Page = async () => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-[18px] text-[var(--header-primary-foreground)]">
        Bosh sahifa
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Page;
