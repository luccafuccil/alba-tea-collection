"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants/ui";

export function useResponsive(
  breakpoint: keyof typeof BREAKPOINTS = "desktop"
) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const checkBreakpoint = () => {
      setIsAboveBreakpoint(window.innerWidth >= BREAKPOINTS[breakpoint]);
    };

    checkBreakpoint();

    window.addEventListener("resize", checkBreakpoint);

    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoint]);

  return isAboveBreakpoint;
}

export const useIsMobile = () => {
  const isTabletOrAbove = useResponsive("tablet");
  return !isTabletOrAbove;
};

export const useIsTablet = () => {
  const isTablet = useResponsive("tablet");
  const isDesktop = useResponsive("desktop");
  return isTablet && !isDesktop;
};

export const useIsDesktop = () => {
  return useResponsive("desktop");
};

export function useCurrentBreakpoint() {
  const [breakpoint, setBreakpoint] =
    useState<keyof typeof BREAKPOINTS>("mobile");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width >= BREAKPOINTS.wide) setBreakpoint("wide");
      else if (width >= BREAKPOINTS.desktop) setBreakpoint("desktop");
      else if (width >= BREAKPOINTS.tablet) setBreakpoint("tablet");
      else setBreakpoint("mobile");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
