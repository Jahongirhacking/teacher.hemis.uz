"use client";

import { signInAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import paths from "@/lib/paths";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

enum FormItems {
  Login = "login",
  Password = "password",
}

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    try {
      const result = await signInAction(formData);
      if (result?.success) {
        toast.success("Muvaffaqiyatli kirildi!");
        router.replace(paths.private.dashboard);
      } else if (result?.error) {
        toast.error(result.error);
      }
    } catch (err) {
      console.error(err);
      toast.error((err as { message: string })?.message);
    }
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
        <Button type="submit">Kirish</Button>
      </div>
    </form>
  );
}
