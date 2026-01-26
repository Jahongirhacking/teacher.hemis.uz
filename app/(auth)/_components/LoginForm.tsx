"use client";

import { signInAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import paths from "@/lib/paths";
import { Loader, LogIn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";
import { toast } from "sonner";

enum FormItems {
  Login = "login",
  Password = "password",
}

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const result = await signInAction(formData);
        toast.dismiss();
        if (result?.success) {
          toast.success("Muvaffaqiyatli kirildi!");
          router.replace(paths.private.dashboard); // non-urgent
        } else if (result?.error) {
          toast.error(String(result?.error));
        }
      } catch (err) {
        console.error(err);
        toast.error((err as { message: string })?.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <label htmlFor={FormItems.Login}>
            Login
            <Input id={FormItems.Login} name={FormItems.Login} />
          </label>
          <label htmlFor={FormItems.Password}>
            Parol
            <Input
              id={FormItems.Password}
              name={FormItems.Password}
              type="password"
              required
            />
          </label>
        </div>

        <div className="bg-[var(--background)] flex flex-wrap justify-center gap-5 p-4 rounded-[8px]">
          <Image
            src={"/images/text.png"}
            width={90}
            height={30}
            alt="recaptcha"
          />
          <Input
            placeholder="Tekshiruv kodini kiriting"
            className="flex-1 max-w-[250px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? <Loader className="animate-spin" /> : <LogIn />} Kirish
          </Button>
          <a href="#">
            <Button className="w-full">
              <Image
                src={"/icons/one-id.svg"}
                width={32}
                height={21}
                alt="One ID"
              />{" "}
              OneID orqali kirish
            </Button>
          </a>
        </div>
      </div>
    </form>
  );
}
