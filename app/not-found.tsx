"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] text-center px-4">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Siz izlayotgan sahifa mavjud emas
      </p>
      <Link href="/" replace>
        <Button variant="default">Asosiy sahifaga qaytish</Button>
      </Link>
    </div>
  );
}
