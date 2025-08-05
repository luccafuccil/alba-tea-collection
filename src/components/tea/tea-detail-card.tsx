"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconHeart,
  IconClock,
} from "@tabler/icons-react";
import { Button, IconButton } from "@/components/ui/button";
import TeaImage from "@/components/tea/tea-image";
import { useTeaNavigation } from "@/hooks/use-tea-navigation";
import { TEA_TYPE_IMAGES } from "@/lib/constants/tea";
import { cn } from "@/lib/utils";
import { Tea } from "@/lib/types";

interface TeaDetailCardProps {
  tea: Tea;
  onFavoriteToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
  showActions?: boolean;
  className?: string;
}

const getTypeColor = (type: Tea["type"]) => {
  const colors = {
    black: "bg-gray-800 text-white",
    green: "bg-green-600 text-white",
    white: "bg-gray-100 text-gray-800",
    oolong: "bg-amber-600 text-white",
    puerh: "bg-red-900 text-white",
  };
  return colors[type] || "bg-gray-500 text-white";
};

const TeaDetailCard: React.FC<TeaDetailCardProps> = ({
  tea,
  onFavoriteToggle,
  onEdit,
  onDelete,
  onBack,
  showActions = true,
  className,
}) => {
  const router = useRouter();
  const { navigateToTeaEdit, navigateToTeaDelete } = useTeaNavigation();

  const getTeaImage = (tea: Tea): string => {
    return tea.image || TEA_TYPE_IMAGES[tea.type];
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      navigateToTeaEdit(tea.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      navigateToTeaDelete(tea.id);
    }
  };

  return (
    <div className={cn("p-8 space-y-6", className)}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <IconButton
          variant="ghost"
          onClick={handleBack}
          className="bg-gray-50 hover:bg-gray-100 text-(--primary-brown) transition-all duration-200 flex items-center gap-2"
        >
          <IconArrowLeft height={24} width={48} title="Go Back" />
        </IconButton>

        {onFavoriteToggle && (
          <IconButton
            variant="ghost"
            size="lg"
            onClick={onFavoriteToggle}
            className={cn(
              "rounded-full transition-all duration-200",
              tea.favorite
                ? "text-red-500 bg-red-50 hover:bg-red-100"
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            )}
          >
            <IconHeart
              size={28}
              fill={tea.favorite ? "currentColor" : "none"}
            />
          </IconButton>
        )}
      </motion.div>

      <div className="flex items-start justify-between">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "inline-block px-5 py-2 rounded-full text-base font-medium shadow-sm",
                getTypeColor(tea.type)
              )}
            >
              {tea.type}
            </span>
            {tea.brewTime && (
              <div className="flex items-center gap-2 text-base text-text-color/60 bg-gray-50 px-4 py-2 rounded-full">
                <IconClock size={18} />
                <span>{tea.brewTime} min</span>
              </div>
            )}
          </div>
          <h1 className="font-title text-4xl font-medium text-text-color leading-tight">
            {tea.name}
          </h1>
        </div>
      </div>

      <div className="flex items-start gap-8 lg:pr-80">
        <div className="space-y-6 flex-1">
          {tea.description && (
            <div>
              <h3 className="font-medium text-text-color mb-4 text-lg">
                Description
              </h3>
              <p className="font-body text-text-color/70 leading-relaxed text-base">
                {tea.description}
              </p>
            </div>
          )}

          {tea.tastingNotes && (
            <div>
              <h3 className="font-medium text-text-color mb-4 text-lg">
                Tasting Notes
              </h3>
              <p className="font-body text-text-color/70 leading-relaxed text-base">
                {tea.tastingNotes}
              </p>
            </div>
          )}

          {showActions && (
            <div className="flex items-center gap-4 pt-4">
              <Button
                variant="secondary"
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3"
              >
                <IconEdit size={18} />
                Edit Tea
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-3"
              >
                <IconTrash size={18} />
                Delete Tea
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden lg:block w-72">
        <TeaImage
          src={getTeaImage(tea)}
          alt={`${tea.name} tea`}
          size="large"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TeaDetailCard;
