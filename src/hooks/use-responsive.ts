"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants/ui";

export function useResponsive(
  breakpoint: keyof typeof BREAKPOINTS = "desktop"
) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsAboveBreakpoint(window.innerWidth >= BREAKPOINTS[breakpoint]);
    };

    checkBreakpoint();

    window.addEventListener("resize", checkBreakpoint);

    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoint]);

  return isAboveBreakpoint;
}

export const useIsMobile = () => !useResponsive("tablet");
export const useIsTablet = () =>
  useResponsive("tablet") && !useResponsive("desktop");
export const useIsDesktop = () => useResponsive("desktop");

export function useCurrentBreakpoint() {
  const [breakpoint, setBreakpoint] =
    useState<keyof typeof BREAKPOINTS>("mobile");

  useEffect(() => {
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
