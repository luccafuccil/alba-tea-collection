"use client";

import { useState, useMemo } from "react";
import { Tea, TeaFilterType } from "@/lib/types";

interface UseTeaFiltersProps {
  teas: Tea[];
  initialFilter?: TeaFilterType;
}

interface UseTeaFiltersReturn {
  selectedFilter: TeaFilterType;
  filteredTeas: Tea[];
  setFilter: (filter: TeaFilterType) => void;
  filterCount: Record<TeaFilterType, number>;
  totalCount: number;
}

export function useTeaFilters({
  teas,
  initialFilter = "all",
}: UseTeaFiltersProps): UseTeaFiltersReturn {
  const [selectedFilter, setSelectedFilter] =
    useState<TeaFilterType>(initialFilter);

  const filteredTeas = useMemo(() => {
    switch (selectedFilter) {
      case "favorite":
        return teas.filter((tea) => tea.favorite);
      case "all":
        return teas;
      default:
        return teas.filter((tea) => tea.type === selectedFilter);
    }
  }, [teas, selectedFilter]);

  const filterCount = useMemo(() => {
    const counts: Record<TeaFilterType, number> = {
      all: teas.length,
      favorite: teas.filter((tea) => tea.favorite).length,
      black: teas.filter((tea) => tea.type === "black").length,
      green: teas.filter((tea) => tea.type === "green").length,
      white: teas.filter((tea) => tea.type === "white").length,
      oolong: teas.filter((tea) => tea.type === "oolong").length,
      puerh: teas.filter((tea) => tea.type === "puerh").length,
    };
    return counts;
  }, [teas]);

  const setFilter = (filter: TeaFilterType) => {
    setSelectedFilter(filter);
  };

  return {
    selectedFilter,
    filteredTeas,
    setFilter,
    filterCount,
    totalCount: teas.length,
  };
}

export default useTeaFilters;
