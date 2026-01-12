// components/UnderDevelopment.tsx
import { Construction } from "lucide-react";

export default function UnderDevelopment() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center gap-4">
      <Construction className="h-12 w-12 text-muted-foreground" />

      <h2 className="text-2xl font-semibold">
        Ushbu sahifa ishlab chiqilish bosqichida
      </h2>

      <p className="text-muted-foreground max-w-md">
        Hozir bu sahifada ishlar olib borilmoqda, birozdan so`ng tekshirib
        ko`ring
      </p>
    </div>
  );
}
