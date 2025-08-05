"use client";

import React from "react";
import { motion } from "framer-motion";
import { GridContainer } from "@/components/ui/container";
import TeaCard from "./tea-card";
import { Tea, CardSize } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TeaGridProps {
  teas: Tea[];
  size?: CardSize;
  onFavoriteToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  showActions?: boolean;
  className?: string;
  staggerDelay?: number;
  reverse?: boolean;
  fixedCardHeight?: string;
}

export const TeaGrid: React.FC<TeaGridProps> = ({
  teas,
  size = "medium",
  onFavoriteToggle,
  onEdit,
  onDelete,
  onClick,
  showActions = false,
  className,
  staggerDelay = 0.05,
  reverse = true,
  fixedCardHeight,
}) => {
  if (teas.length === 0) {
    return null;
  }

  const getGridConfig = () => {
    switch (size) {
      case "small":
        return { cols: 4 as const, gap: "sm" as const };
      case "compact":
        return { cols: 1 as const, gap: "sm" as const };
      case "large":
        return { cols: 2 as const, gap: "lg" as const };
      default:
        return { cols: 3 as const, gap: "md" as const };
    }
  };

  const { cols, gap } = getGridConfig();

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const teaItems = reverse ? [...teas].reverse() : teas;

  return (
    <GridContainer cols={cols} gap={gap} className={cn("w-full", className)}>
      {teaItems.map((tea, index) => (
        <motion.div
          key={tea.id}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: index * staggerDelay,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="w-full"
          style={fixedCardHeight ? { height: fixedCardHeight } : undefined}
        >
          <TeaCard
            tea={tea}
            size={size}
            variant={size === "compact" ? "compact" : "default"}
            onFavoriteToggle={onFavoriteToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onClick={onClick}
            showActions={showActions}
            className={fixedCardHeight ? "h-full" : undefined}
          />
        </motion.div>
      ))}
    </GridContainer>
  );
};

export default TeaGrid;
