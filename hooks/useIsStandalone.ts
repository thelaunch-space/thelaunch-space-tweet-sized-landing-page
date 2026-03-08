"use client";
import { useState, useEffect } from "react";

export function useIsStandalone(): boolean {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(display-mode: standalone)");
    const ios = (navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(mq.matches || ios);

    const handler = (e: MediaQueryListEvent) => setIsStandalone(e.matches || ios);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isStandalone;
}
