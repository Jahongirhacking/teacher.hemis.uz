"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInAction } from "@/lib/actions/auth.action";
import paths from "@/lib/paths";
import { useMutation } from "@tanstack/react-query";
import { Loader, LogIn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

enum FormItems {
  Login = "login",
  Password = "password",
}

export default function LoginForm() {
  const router = useRouter();
  const { mutate: handleLoginMutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => signInAction(formData),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleLoginMutate(formData, {
      onSuccess: (result) => {
        toast.dismiss();
        if (result?.success) {
          toast.success("Muvaffaqiyatli kirildi!");
          router.replace(paths.private.dashboard);
        } else {
          toast.error(result?.error);
        }
      },
      onError: (err) => {
        toast.dismiss();
        console.error(err);
        toast.error(
          (err as { message: string })?.message || "Tizimga kirishda xatolik",
        );
      },
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
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader className="animate-spin" /> : <LogIn />} Kirish
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
