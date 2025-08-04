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

  const { filteredTeas, filterCount } = useMemo(() => {
    const favoriteTeas = teas.filter((tea) => tea.favorite);

    let filteredTeas: Tea[];
    switch (selectedFilter) {
      case "favorite":
        filteredTeas = favoriteTeas;
        break;
      case "all":
        filteredTeas = teas;
        break;
      default:
        filteredTeas = teas.filter((tea) => tea.type === selectedFilter);
    }

    const counts: Record<TeaFilterType, number> = {
      all: teas.length,
      favorite: favoriteTeas.length,
      black: teas.filter((tea) => tea.type === "black").length,
      green: teas.filter((tea) => tea.type === "green").length,
      white: teas.filter((tea) => tea.type === "white").length,
      oolong: teas.filter((tea) => tea.type === "oolong").length,
      puerh: teas.filter((tea) => tea.type === "puerh").length,
    };

    return { filteredTeas, filterCount: counts };
  }, [teas, selectedFilter]);

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
