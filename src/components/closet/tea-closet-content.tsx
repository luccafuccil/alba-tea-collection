"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";
import { Container } from "@/components/ui/container";
import { Button, FloatingActionButton } from "@/components/ui/button";
import { EmptyCard } from "@/components/ui/card";
import TeaFilters from "@/components/tea/tea-filters";
import TeaGrid from "@/components/tea/tea-grid";
import { useTeaStore } from "@/store/tea-store";
import { useTeaFilters } from "@/hooks/use-tea-filters";
import { useIsDesktop } from "@/hooks/use-responsive";
import { TeaFilterType } from "@/lib/types";

export const TeaClosetContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useIsDesktop();
  const [reverse, setReverse] = useState(true);

  const { teas, toggleFavorite } = useTeaStore();

  const initialFilter = (searchParams.get("type") as TeaFilterType) || "all";

  const { selectedFilter, filteredTeas, setFilter, filterCount } =
    useTeaFilters({
      teas,
      initialFilter,
    });

  const handleFilterChange = (filter: TeaFilterType) => {
    setFilter(filter);
    const url = new URL(window.location.href);
    if (filter === "all") {
      url.searchParams.delete("type");
    } else {
      url.searchParams.set("type", filter);
    }
    router.replace(url.pathname + url.search, { scroll: false });
  };

  const handleAddTea = () => {
    router.push("/closet/tea/new");
  };

  const handleTeaClick = (id: string) => {
    router.push(`/closet/tea/${id}`);
  };

  const handleEditTea = (id: string) => {
    router.push(`/closet/tea/${id}/edit`);
  };

  const handleDeleteTea = (id: string) => {
    router.push(`/closet/tea/${id}/delete`);
  };

  const renderAddTeaCard = () => {
    return (
      <button
        onClick={handleAddTea}
        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
      >
        <IconPlus size={24} className="text-(--primary-brown)" />

        <span className="font-title text-lg text-(--primary-brown) font-medium">
          Add New Tea
        </span>
      </button>
    );
  };

  const getTitle = () => {
    if (filteredTeas.length === 0) {
      return "Seems like your tea closet's empty.";
    }

    if (selectedFilter === "all") {
      return `Your Tea Collection (${filteredTeas.length})`;
    }

    const filterLabel =
      selectedFilter === "favorite"
        ? "Favorites"
        : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);

    return `${filterLabel} (${filteredTeas.length})`;
  };

  const getEmptyCardConfig = () => {
    if (selectedFilter === "favorite") {
      return {
        title: "No favorites yet!",
        description:
          "Mark some teas as favorites by clicking the heart icon to see them here.",
        icon: <div className="text-6xl">💚</div>,
        action: (
          <Button onClick={handleAddTea} size="lg">
            <IconPlus size={20} />
            Add More Teas
          </Button>
        ),
      };
    }

    return {
      title:
        selectedFilter === "all" ? "No teas yet!" : "No teas in this category",
      description:
        selectedFilter === "all"
          ? "Start building your collection by adding your first tea."
          : "Try a different filter or add some teas to see them here.",
      icon: <div className="text-6xl">🫖</div>,
      action: (
        <Button onClick={handleAddTea} size="lg">
          <IconPlus size={20} />
          Add Your First Tea
        </Button>
      ),
    };
  };

  return (
    <Container size="xl" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <motion.h1
            className="font-title text-3xl md:text-4xl text-(--primary-brown) text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {getTitle()}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:max-w-full"
          >
            <TeaFilters
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
              filterCounts={filterCount}
              showCounts
              variant="pills"
              reverse={reverse}
              onReverseChange={setReverse}
            />
          </motion.div>
        </div>

        {isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex justify-start"
          >
            {renderAddTeaCard()}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {filteredTeas.length === 0 ? (
            (() => {
              const emptyConfig = getEmptyCardConfig();
              return (
                <EmptyCard
                  title={emptyConfig.title}
                  description={emptyConfig.description}
                  icon={emptyConfig.icon}
                  action={emptyConfig.action}
                />
              );
            })()
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <TeaGrid
                teas={filteredTeas}
                size="medium"
                onFavoriteToggle={toggleFavorite}
                onEdit={handleEditTea}
                onDelete={handleDeleteTea}
                reverse={reverse}
              />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {!isDesktop && (
        <FloatingActionButton onClick={handleAddTea}>
          <IconPlus size={24} />
        </FloatingActionButton>
      )}
    </Container>
  );
};
