import { Loading } from "@/components/shared/Loading";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import ReactQueryProvider from "./_providers/ReactQueryProvider";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEACHER.HEMIS.UZ - o'quv jarayonlarini nazorat qilish",
  description:
    "HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <div id="root" className="flex-1 flex flex-col">
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
            <ReactQueryProvider>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </ReactQueryProvider>
            <Toaster position="top-center" richColors />
            <Suspense>
              <ScrollToTop />
            </Suspense>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
