"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { useIsMobile } from "./use-responsive";

interface ScrollIndicatorState {
  showLeftArrow: boolean;
  showRightArrow: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export function useScrollIndicator<T extends HTMLElement>(
  containerRef?: RefObject<T | null>
): ScrollIndicatorState & {
  scrollLeft: () => void;
  scrollRight: () => void;
  scrollToStart: () => void;
  scrollToEnd: () => void;
} {
  const [state, setState] = useState<ScrollIndicatorState>({
    showLeftArrow: false,
    showRightArrow: false,
    canScrollLeft: false,
    canScrollRight: false,
  });

  const isMobile = useIsMobile();

  const checkScrollPosition = () => {
    if (!containerRef?.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const canScrollLeft = scrollLeft > 0;
    const canScrollRight = scrollLeft < scrollWidth - clientWidth - 5;

    setState({
      showLeftArrow: isMobile && canScrollLeft,
      showRightArrow: isMobile && canScrollRight,
      canScrollLeft,
      canScrollRight,
    });
  };

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    checkScrollPosition();

    container.addEventListener("scroll", checkScrollPosition, {
      passive: true,
    });
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [containerRef, isMobile]);

  const scrollLeft = () => {
    if (!containerRef?.current) return;
    containerRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!containerRef?.current) return;
    containerRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

  const scrollToStart = () => {
    if (!containerRef?.current) return;
    containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  const scrollToEnd = () => {
    if (!containerRef?.current) return;
    const { scrollWidth, clientWidth } = containerRef.current;
    containerRef.current.scrollTo({
      left: scrollWidth - clientWidth,
      behavior: "smooth",
    });
  };

  return {
    ...state,
    scrollLeft,
    scrollRight,
    scrollToStart,
    scrollToEnd,
  };
}

export default useScrollIndicator;
