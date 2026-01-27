"use client";

import { Button } from "@/components/ui/button";
import { HomeIcon, LoaderIcon } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1>Xatolik yuzaga keldi, iltimos sahifani yangilab ko&apos;ring!</h1>
      <Button variant={"outline"} onClick={() => window.location.reload()}>
        <LoaderIcon /> Yangilash
      </Button>
      <Button
        variant={"default"}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <HomeIcon /> Bosh sahifa
      </Button>
    </div>
  );
};

export default ErrorPage;
