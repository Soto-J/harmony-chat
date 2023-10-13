import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  if (!isHydrated) {
    return null;
  }

  return origin;
};
