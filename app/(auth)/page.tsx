import HemisLogo from "@/components/shared/HemisLogo";
import { CookieItems } from "@/lib/const";
import paths from "@/lib/paths";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import LoginForm from "./_components/LoginForm";

export default async function Home() {
  const cookieStore = await cookies();
  if (cookieStore.get(CookieItems.AccessToken)) {
    redirect(paths.private.dashboard);
  }

  return (
    <div className="h-screen !w-[100dvw] flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-center p-3 max-h-[187px] md:!max-h-full">
        <Image
          src={"/images/auth.svg"}
          width={616}
          height={454}
          alt="Hemis kirish"
          className="h-full object-contain"
          priority
        />
      </div>
      <main className="flex-1 bg-[var(--card)] h-full w-full flex flex-col justify-center items-center p-4">
        <div className="flex flex-col gap-8 w-full max-w-[500px]">
          <HemisLogo width={170} height={44} />

          <div className="flex flex-col gap-2">
            <h1 className="text-[var(--header-primary-foreground)] text-[22px] font-bold">
              Kirish
            </h1>
            <p className="text-[var(--secondary-foreground)] text-[16px]">
              Hemis OTM Axborot Tizimi
            </p>
          </div>

          <LoginForm />
        </div>
      </main>
    </div>
  );
}
