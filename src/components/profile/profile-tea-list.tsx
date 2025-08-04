"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TeaGrid from "@/components/tea/tea-grid";
import { useTeaStore } from "@/store/tea-store";

interface ProfileTeaListProps {
  profileId: string;
}

export const ProfileTeaList: React.FC<ProfileTeaListProps> = ({
  profileId,
}) => {
  const router = useRouter();
  const { teas, toggleFavorite } = useTeaStore();

  const favoriteTeas = teas.filter((tea) => tea.favorite);
  const previewTeas = favoriteTeas.slice(0, 3);

  const handleViewAll = () => {
    router.push("/closet?type=favorite");
  };

  const handleEditTea = (id: string) => {
    router.push(`/closet/tea/${id}/edit`);
  };

  if (favoriteTeas.length === 0) {
    return (
      <Card size="medium" className="text-center bg-white/80 backdrop-blur-sm">
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
            Go to Collection
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card size="medium" className="bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-title text-xl text-text-color">Favorite Teas</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewAll}
            className="text-text-color/70 hover:text-text-color"
          >
            View All ({favoriteTeas.length})
            <IconArrowRight size={16} />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <TeaGrid
            teas={previewTeas}
            size="compact"
            onFavoriteToggle={toggleFavorite}
            onEdit={handleEditTea}
            staggerDelay={0.1}
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
      </div>
    </Card>
  );
};
