"use client";

import React, { useRef } from "react";
import {
  IconHeart,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useScrollIndicator } from "@/hooks/use-scroll-indicator";
import { TeaFilterType } from "@/lib/types";
import { TEA_TYPES } from "@/lib/constants";

interface TeaFiltersProps {
  selectedFilter: TeaFilterType;
  onFilterChange: (filter: TeaFilterType) => void;
  filterCounts?: Record<TeaFilterType, number>;
  showCounts?: boolean;
  variant?: "default" | "compact" | "pills";
  className?: string;
}

const TeaFilters: React.FC<TeaFiltersProps> = ({
  selectedFilter,
  onFilterChange,
  filterCounts,
  showCounts = false,
  variant = "default",
  className,
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

  const getButtonVariant = (filter: TeaFilterType) => {
    return selectedFilter === filter ? "primary" : "secondary";
  };

  const getFilterLabel = (filter: { value: TeaFilterType; label: string }) => {
    const baseLabel = filter.label;
    if (showCounts && filterCounts) {
      const count = filterCounts[filter.value] || 0;
      return `${baseLabel} (${count})`;
    }
    return baseLabel;
  };

  const containerClasses = {
    default: "flex gap-2 overflow-x-auto scrollbar-hide pb-2",
    compact: "flex gap-1 overflow-x-auto scrollbar-hide",
    pills:
      "flex gap-1 overflow-x-auto scrollbar-hide p-1 bg-gray-50 rounded-full",
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
          const Icon = filter.icon;
          const isActive = selectedFilter === filter.value;

          return (
            <Button
              key={filter.value}
              variant={getButtonVariant(filter.value)}
              size="sm"
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "flex-shrink-0 whitespace-nowrap transition-all duration-200",
                buttonClasses[variant],
                isActive && variant === "pills" && "bg-white shadow-sm",
                !isActive && variant === "pills" && "hover:bg-white/50"
              )}
            >
              {Icon && (
                <Icon
                  size={16}
                  className={cn(
                    "mr-1.5",
                    filter.value === "favorite" && isActive && "fill-current"
                  )}
                />
              )}
              {getFilterLabel(filter)}
            </Button>
          );
        })}
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
