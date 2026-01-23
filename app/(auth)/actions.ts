"use server";

import { login } from "@/lib/services/auth";
import { forwardSetCookie } from "@/lib/services/forwardSetCookie";
import { AuthLoginSchema } from "./schema";

export const signInAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData) as Record<string, string>;

  const parsed = AuthLoginSchema.safeParse(data);

  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message).join(", ");
    return { success: false, error: messages };
  }

  const { login: loginValue, password } = parsed.data;

  const { data: resData, headers } = await login({
    login: loginValue,
    password,
  });

  if (!resData?.success) {
    return {
      success: false,
      error: resData?.message || "Tizimga kirishda xatolik",
    };
  }

  forwardSetCookie(headers.get("set-cookie"));

  return { success: true };
};
