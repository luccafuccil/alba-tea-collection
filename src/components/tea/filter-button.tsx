"use client";

import React from "react";
import { IconHeart } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { TeaFilterType } from "@/lib/types";

interface FilterButtonProps {
  filter: TeaFilterType;
  isActive: boolean;
  count?: number;
  onClick: () => void;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  filter,
  isActive,
  count,
  onClick,
  className,
}) => {
  const getFilterLabel = (filter: TeaFilterType) => {
    const labels: Record<TeaFilterType, string> = {
      all: "All",
      favorite: "Favorites",
      black: "Black",
      green: "Green",
      white: "White",
      oolong: "Oolong",
      puerh: "Pu-erh",
    };
    return labels[filter];
  };

  const label = getFilterLabel(filter);
  const displayLabel = count !== undefined ? `${label} (${count})` : label;

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-(--primary-green) text-(--primary-brown)"
          : "bg-white text-(--primary-brown) hover:bg-gray-50 hover:border-(--primary-green)",
        "focus:outline-none focus:ring-2 focus:ring-(--primary-green) focus:ring-offset-2",
        className
      )}
    >
      {filter === "favorite" && (
        <IconHeart
          size={14}
          className={cn(
            "transition-all duration-200",
            isActive && "fill-current"
          )}
        />
      )}
      {displayLabel}
    </button>
  );
};

export default FilterButton;
