"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Container } from "@/components/ui/container";
import { Button, FloatingActionButton } from "@/components/ui/button";
import { EmptyCard } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-overlay";
import { ClientOnly } from "@/components/ui/client-only";
import { Modal } from "@/components/ui/modal";
import TeaFilters from "@/components/tea/tea-filters";
import TeaGrid from "@/components/tea/tea-grid";
import { useTeaStore } from "@/store/tea-store";
import { useTeaFilters } from "@/hooks/use-tea-filters";
import { useTeaNavigation } from "@/hooks/use-tea-navigation";
import { useIsDesktop } from "@/hooks/use-responsive";
import { TeaFilterType } from "@/lib/types";

export const TeaClosetContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useIsDesktop();
  const [reverse, setReverse] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const { teas, toggleFavorite, clearAllTeas } = useTeaStore();
  const { navigateToTea } = useTeaNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasHydrated(true);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasHydrated && isLoading) {
      setIsLoading(false);
    }
  }, [teas, hasHydrated, isLoading]);

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
    router.push("/tea/new");
  };

  const handleClearAllTeas = () => {
    setShowClearModal(true);
  };

  const handleClearConfirm = () => {
    clearAllTeas();
    setShowClearModal(false);
  };

  const handleClearCancel = () => {
    setShowClearModal(false);
  };

  const handleTeaClick = (teaId: string) => {
    navigateToTea(teaId);
  };

  const renderAddTeaCard = () => {
    return (
      <div className="flex justify-center lg:justify-start items-center gap-4">
        <button
          onClick={handleAddTea}
          className="group flex items-center gap-1 px-6 py-3 rounded-full bg-(--primary-green) shadow-md hover:shadow-lg transition-all duration-300 border-none hover:border-(--primary-green) hover:bg-(--primary-green)/90"
        >
          <IconPlus size={20} className="text-(--primary-brown)" />
          <span className="font-title text-lg text-(--primary-brown) font-medium">
            Add New Tea
          </span>
        </button>

        {teas.length > 0 && (
          <button
            onClick={handleClearAllTeas}
            className="group flex items-center gap-1 px-4 py-2 rounded-full bg-gray-100 hover:bg-red-50 transition-all duration-300 border border-gray-200 hover:border-red-200"
            title="Clear all teas"
          >
            <IconTrash
              size={16}
              className="text-gray-500 group-hover:text-red-500"
            />
            <span className="font-body text-sm text-gray-500 group-hover:text-red-500 font-medium">
              Clear All
            </span>
          </button>
        )}
      </div>
    );
  };

  const renderEmptyState = () => {
    if (selectedFilter === "all") {
      return (
        <div className="flex flex-col items-center gap-6 py-16">
          <EmptyCard
            icon={<div className="text-6xl">🫖</div>}
            title="Your Tea Collection Awaits"
            description="Start building your personal tea library by adding your first tea."
            action={
              <Button onClick={handleAddTea} size="lg">
                Add Your First Tea
              </Button>
            }
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-6 py-16">
        <EmptyCard
          icon={<div className="text-6xl">💚</div>}
          title={`No ${selectedFilter} teas found`}
          description="Try adjusting your filter or add a new tea to your collection."
          action={
            <Button onClick={handleAddTea} size="lg">
              Add New Tea
            </Button>
          }
        />
      </div>
    );
  };

  return (
    <ClientOnly
      fallback={
        <Container className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </Container>
      }
    >
      <Container className="space-y-8 mt-20">
        <div className="flex items-center justify-between animate-in fade-in duration-300">
          <div className="space-y-2">
            <h1 className="text-3xl font-title font-bold text-(--primary-brown)">
              My Tea Collection
            </h1>
            <p className="text-(--primary-brown)/60 font-body">
              {filterCount[selectedFilter]}{" "}
              {filterCount[selectedFilter] === 1 ? "tea" : "teas"} in this
              collection
            </p>
          </div>
        </div>

        {teas.length > 0 && (
          <div className="animate-in slide-in-from-top duration-300 delay-100 overflow-visible">
            <TeaFilters
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
              filterCounts={filterCount}
              reverse={reverse}
              onReverseChange={setReverse}
            />
          </div>
        )}

        {isDesktop && teas.length > 0 && (
          <div className="animate-in slide-in-from-top duration-300 delay-150">
            {renderAddTeaCard()}
          </div>
        )}

        <div className="animate-in fade-in duration-300 delay-200">
          {filteredTeas.length === 0 ? (
            renderEmptyState()
          ) : (
            <TeaGrid
              teas={filteredTeas}
              size="medium"
              onFavoriteToggle={toggleFavorite}
              onClick={handleTeaClick}
              reverse={reverse}
              fixedCardHeight="200px"
            />
          )}
        </div>

        {!isDesktop && (
          <FloatingActionButton onClick={handleAddTea}>
            <IconPlus size={24} />
          </FloatingActionButton>
        )}

        <Modal
          isOpen={showClearModal}
          onClose={handleClearCancel}
          variant="confirm"
          title="Clear All Teas"
        >
          <div className="text-center space-y-4">
            <div className="mx-auto w-14 h-14 bg-red-50 rounded-full flex items-center justify-center ring-4 ring-red-100">
              <IconTrash size={24} className="text-red-500" />
            </div>

            <div className="space-y-2">
              <p className="text-(--primary-brown)/70 font-body text-sm leading-relaxed">
                Are you sure you want to delete all teas?
                <br />
                <span className="text-xs text-(--primary-brown)/60">
                  This action cannot be undone.
                </span>
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={handleClearCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleClearConfirm}
                className="flex-1"
              >
                Clear All
              </Button>
            </div>
          </div>
        </Modal>
      </Container>
    </ClientOnly>
  );
};
