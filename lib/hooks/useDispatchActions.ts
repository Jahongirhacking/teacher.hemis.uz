/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  return { isMounted: mounted };
};
