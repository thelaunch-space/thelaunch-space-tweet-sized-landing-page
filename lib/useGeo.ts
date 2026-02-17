"use client";

import { useState, useEffect } from "react";
import type { GeoRegion } from "./geo-savings";
import { GEO_COOKIE_NAME } from "./geo-savings";

export function useGeo(): GeoRegion {
  const [region, setRegion] = useState<GeoRegion>("INTL");

  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${GEO_COOKIE_NAME}=`));
    if (match) {
      const value = match.split("=")[1];
      if (value === "IN") {
        setRegion("IN");
      }
    }
  }, []);

  return region;
}
