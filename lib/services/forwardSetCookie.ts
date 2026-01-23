import { cookies } from "next/headers";

/**
 * Forward Set-Cookie headers from upstream API to browser.
 * Supports multiple cookies and preserves attributes like httpOnly, secure, sameSite, maxAge
 */
export const forwardSetCookie = async (setCookieHeader: string | null) => {
  if (!setCookieHeader) return;

  const cookieStore = await cookies();

  // Split multiple cookies (API may return comma-separated)
  const cookiesArray = setCookieHeader.split(",").map((c) => c.trim());

  cookiesArray.forEach((c) => {
    const [nameValue, ...attrs] = c.split(";");

    const [name, value] = nameValue.split("=");

    if (!name || value === undefined) return;

    cookieStore.set({
      name: name.trim(),
      value: value.trim(),
      path: "/", // default path
      httpOnly: attrs.some((a) => a.toLowerCase().includes("httponly")),
      secure: attrs.some((a) => a.toLowerCase().includes("secure")),
      sameSite:
        (attrs
          .find((a) => a.toLowerCase().includes("samesite"))
          ?.split("=")[1] as "strict" | "lax" | "none" | undefined) || "strict",
      maxAge: attrs.find((a) => a.toLowerCase().includes("max-age"))
        ? parseInt(attrs.find((a) => a.toLowerCase().includes("max-age"))![1])
        : undefined,
    });
  });
};
