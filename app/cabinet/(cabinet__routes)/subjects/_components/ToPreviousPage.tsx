"use client";

import LoadingPage from "@/app/loading";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ToPreviousPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    router.replace(pathname.split("/")?.slice(0, -1)?.join("/"));
  }, [pathname, router]);

  return <LoadingPage />;
};

export default ToPreviousPage;
