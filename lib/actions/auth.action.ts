"use server";

import { AuthLoginSchema } from "@/lib/schemas/auth.schema";
import { login } from "@/lib/services/auth";
import { forwardSetCookie } from "@/lib/services/cookieUtils";

export const signInAction = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData) as Record<string, string>;
    const parsed = AuthLoginSchema.safeParse(data);
    if (!parsed.success) {
      const messages = parsed.error.issues.map((i) => i.message).join(", ");
      return { success: false, error: messages };
    }
    const { login: loginValue, password } = parsed.data;
    const res = await login({
      login: loginValue,
      password,
    });
    if (!res?.success) {
      return {
        success: false,
        error: res?.error?.message || "Tizimga kirishda xatolik",
      };
    }
    forwardSetCookie(res?.headers?.get("set-cookie"));
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: (err as { message: string })?.message || "Login yoki parol xato",
    };
  }
};
