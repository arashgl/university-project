import { useMemo } from "react";

export const useIsMobile = () => {
  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;

    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }, []);

  const isMobileDevice = useMemo(() => {
    if (typeof window === "undefined") return false;

    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase(),
    );
  }, []);

  return isTouchDevice || isMobileDevice;
};
