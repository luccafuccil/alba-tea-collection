"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClientOnly } from "@/components/ui/client-only";
import TeaGrid from "@/components/tea/tea-grid";
import { useTeaStore } from "@/store/tea-store";
import { useTeaNavigation } from "@/hooks/use-tea-navigation";

interface ProfileTeaListProps {
  profileId: string;
}

export const ProfileTeaList: React.FC<ProfileTeaListProps> = () => {
  const router = useRouter();
  const { teas, toggleFavorite } = useTeaStore();
  const { navigateToTea, navigateToCloset } = useTeaNavigation();

  const favoriteTeas = teas.filter((tea) => tea.favorite);
  const previewTeas = favoriteTeas.slice(0, 3);

  const handleViewAll = () => {
    navigateToCloset("favorite");
  };

  const handleTeaClick = (teaId: string) => {
    navigateToTea(teaId);
  };

  if (favoriteTeas.length === 0) {
    return (
      <ClientOnly>
        <Card
          size="medium"
          className="text-center bg-white/80 backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div className="text-4xl">💚</div>
            <div>
              <h3 className="font-title text-lg text-text-color mb-2">
                No favorite teas yet!
              </h3>
              <p className="font-body text-text-color/70 text-sm">
                Mark some teas as favorites to see them here!
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push("/closet")}
            >
              Explore Teas
            </Button>
          </div>
        </Card>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Card size="large" className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-title text-xl font-semibold text-text-color">
            Favorite Teas
          </h3>
          <button
            onClick={handleViewAll}
            className="text-sm font-medium text-primary-green hover:text-primary-green/80 transition-colors"
          >
            View All
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <TeaGrid
            teas={previewTeas}
            size="small"
            onFavoriteToggle={toggleFavorite}
            onClick={handleTeaClick}
            staggerDelay={0.1}
            className="space-y-2"
          />
        </motion.div>

        {favoriteTeas.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="pt-4 border-t border-gray-100"
          >
            <Button variant="secondary" fullWidth onClick={handleViewAll}>
              View All {favoriteTeas.length} Favorite Teas
              <IconArrowRight size={16} />
            </Button>
          </motion.div>
        )}
      </Card>
    </ClientOnly>
  );
};
