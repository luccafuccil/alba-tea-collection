"use client";

import React, { useRef } from "react";
import {
  IconHeart,
  IconChevronLeft,
  IconChevronRight,
  IconArrowsSort,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import FilterButton from "./filter-button";
import { useScrollIndicator } from "@/hooks/use-scroll-indicator";
import { TeaFilterType } from "@/lib/types";
import { TEA_TYPES } from "@/lib/constants/tea";

interface TeaFiltersProps {
  selectedFilter: TeaFilterType;
  onFilterChange: (filter: TeaFilterType) => void;
  filterCounts?: Record<TeaFilterType, number>;
  showCounts?: boolean;
  variant?: "default" | "compact" | "pills";
  className?: string;
  reverse?: boolean;
  onReverseChange?: (reverse: boolean) => void;
}

const TeaFilters: React.FC<TeaFiltersProps> = ({
  selectedFilter,
  onFilterChange,
  filterCounts,
  showCounts = false,
  variant = "default",
  className,
  reverse = false,
  onReverseChange,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scrollLeft, scrollRight } =
    useScrollIndicator(scrollRef);

  const filters = [
    { value: "all" as TeaFilterType, label: "All", icon: null },
    { value: "favorite" as TeaFilterType, label: "Favorites", icon: IconHeart },
    ...TEA_TYPES.map((type) => ({
      value: type.value,
      label: type.label,
      icon: null,
    })),
  ];

  const containerClasses = {
    default: "flex gap-2 overflow-x-auto scrollbar-hide pb-2",
    compact: "flex gap-1 overflow-x-auto scrollbar-hide",
    pills: "flex gap-1 overflow-x-auto scrollbar-hide p-1 rounded-full",
  };

  const buttonClasses = {
    default: "",
    compact: "text-xs px-3 py-1.5",
    pills: "rounded-full text-sm",
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollRef}
        className={cn(containerClasses[variant], "scroll-smooth")}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filters.map((filter) => {
          const isActive = selectedFilter === filter.value;
          const count =
            showCounts && filterCounts ? filterCounts[filter.value] : undefined;

          return (
            <FilterButton
              key={filter.value}
              filter={filter.value}
              isActive={isActive}
              count={count}
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "flex-shrink-0 whitespace-nowrap",
                buttonClasses[variant]
              )}
            />
          );
        })}

        {onReverseChange && (
          <div className="p-1">
            <button
              onClick={() => onReverseChange(!reverse)}
              className={cn(
                "flex-shrink-0 ml-2 p-2 rounded-full border-2 transition-all duration-200",
                "hover:scale-105 active:scale-95 hover:border-(--primary-brown)",
                !reverse
                  ? "border-(--primary-brown) bg-(--primary-brown) text-white"
                  : "border-transparent bg-white text-(--primary-brown)"
              )}
              title={reverse ? "Sort oldest first" : "Sort newest first"}
            >
              <IconArrowsSort size={16} />
            </button>
          </div>
        )}
      </div>

      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
          aria-label="Scroll left"
        >
          <IconChevronLeft size={16} className="text-gray-600" />
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
          aria-label="Scroll right"
        >
          <IconChevronRight size={16} className="text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default TeaFilters;
