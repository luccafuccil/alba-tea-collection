"use client";

import React from "react";
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

interface MobileTeaDetailCardProps {
  tea: Tea;
  onFavoriteToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
  showActions?: boolean;
  className?: string;
}

const getHeaderGradient = (type: Tea["type"]) => {
  const gradients = {
    black: "from-gray-800 to-gray-700",
    green: "from-green-600 to-green-700",
    white: "from-gray-100 to-gray-200",
    oolong: "from-amber-600 to-amber-700",
    puerh: "from-red-900 to-red-800",
  };
  return gradients[type] || "from-gray-500 to-gray-600";
};

const getTextColor = (type: Tea["type"]) => {
  return type === "white" ? "text-gray-800" : "text-white";
};

const MobileTeaDetailCard: React.FC<MobileTeaDetailCardProps> = ({
  tea,
  onFavoriteToggle,
  onEdit,
  onDelete,
  onBack,
  showActions = true,
  className,
}) => {
  const { navigateToTeaEdit, navigateToTeaDelete } = useTeaNavigation();

  const getTeaImage = (tea: Tea): string => {
    return tea.image || TEA_TYPE_IMAGES[tea.type];
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
    <div
      className={cn(
        "fixed inset-0 z-50 bg-(--background-color) flex flex-col overflow-hidden",
        "animate-in slide-in-from-right duration-300 ease-out",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={cn(
          "relative bg-gradient-to-r",
          getHeaderGradient(tea.type),
          "px-4 py-4 pb-4"
        )}
      >
        <div className="absolute inset-0 bg-black/5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

        <div className="relative flex items-center justify-between">
          <IconButton
            variant="ghost"
            onClick={onBack}
            className={cn(
              "rounded-full transition-all duration-200",
              getTextColor(tea.type),
              "hover:bg-white/20 backdrop-blur-sm"
            )}
          >
            <IconArrowLeft size={24} />
          </IconButton>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span
              className={cn(
                "inline-block px-4 py-2 rounded-full text-sm font-medium shadow-lg",
                "backdrop-blur-sm border border-white/20",
                tea.type === "white"
                  ? "bg-white/90 text-gray-800"
                  : "bg-white/20 text-white"
              )}
            >
              {tea.type.charAt(0).toUpperCase() + tea.type.slice(1)}
            </span>
          </div>

          {onFavoriteToggle && (
            <IconButton
              variant="ghost"
              onClick={onFavoriteToggle}
              className={cn(
                "rounded-full transition-all duration-200",
                tea.favorite
                  ? "text-red-300 hover:bg-red-500/20"
                  : `${getTextColor(tea.type)} hover:bg-white/20`,
                "backdrop-blur-sm"
              )}
            >
              <IconHeart
                size={24}
                fill={tea.favorite ? "currentColor" : "none"}
              />
            </IconButton>
          )}
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="mt-4 mb-4">
              <h1
                className={cn(
                  "font-title text-2xl font-semibold text-center leading-tight"
                )}
              >
                {tea.name}
              </h1>
            </div>
            <div className="w-48 h-48 relative">
              <TeaImage
                src={getTeaImage(tea)}
                alt={`${tea.name} tea`}
                size="large"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {tea.brewTime && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl">
                <IconClock size={20} className="text-gray-600" />
                <span className="text-gray-700 font-medium">
                  {tea.brewTime} min brewing time
                </span>
              </div>
            </motion.div>
          )}

          {tea.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-lg text-text-color">
                Description
              </h3>
              <p className="font-body text-text-color/70 leading-relaxed">
                {tea.description}
              </p>
            </motion.div>
          )}

          {tea.tastingNotes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-lg text-text-color">
                Tasting Notes
              </h3>
              <p className="font-body text-text-color/70 leading-relaxed">
                {tea.tastingNotes}
              </p>
            </motion.div>
          )}

          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="space-y-3 pt-4"
            >
              <Button
                variant="secondary"
                onClick={handleEdit}
                className="w-full flex items-center justify-center gap-2 py-3 text-base"
              >
                <IconEdit size={20} />
                Edit Tea
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="w-full flex items-center justify-center gap-2 py-3 text-base"
              >
                <IconTrash size={20} />
                Delete Tea
              </Button>
            </motion.div>
          )}

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default MobileTeaDetailCard;
