import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  description: "HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot tizimi. Ushbu tizim Oliy ta’lim muassasalari uchun ma’muriy boshqaruv, o‘quv jarayoni, ilmiy faoliyat, va moliyaviy boshqaruv modullarini taqdim etadi. 226 dan ortiq OTM va 1 milliondan ortiq foydalanuvchilar (talabalar va o‘qituvchilar) tomonidan qo‘llaniladi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
