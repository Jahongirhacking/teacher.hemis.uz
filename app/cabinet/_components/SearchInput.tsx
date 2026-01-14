"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchInput() {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-64 hidden [@media(min-width:400px)]:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Qidirish..."
        className="pl-9"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
