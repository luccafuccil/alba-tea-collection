"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconHeart, IconEdit, IconTrash, IconClock } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardActions,
  ClickableCard,
  InteractiveCard,
} from "@/components/ui/card";
import { Button, IconButton } from "@/components/ui/button";
import TiltWrapper from "@/components/ui/tilt-wrapper";
import TeaImage from "./tea-image";
import { useIsDesktop, useIsMobile } from "@/hooks/use-responsive";
import { Tea, CardSize } from "@/lib/types";
import { TEA_TYPE_IMAGES } from "@/lib/constants/tea";
import { cn } from "@/lib/utils";

interface TeaCardProps {
  tea: Tea;
  size?: CardSize;
  variant?: "default" | "compact" | "detailed";
  onFavoriteToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  showActions?: boolean;
  disableInteractions?: boolean;
  disableTilt?: boolean;
  className?: string;
}

const TeaCard: React.FC<TeaCardProps> = ({
  tea,
  size = "medium",
  variant = "default",
  onFavoriteToggle,
  onEdit,
  onDelete,
  onClick,
  showActions = false,
  disableInteractions = false,
  disableTilt = false,
  className,
}) => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();

  const isClickable = !disableInteractions && onClick;
  const isInteractive = !disableInteractions && !isClickable;

  const getTeaImage = (tea: Tea): string => {
    return tea.image || TEA_TYPE_IMAGES[tea.type];
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(tea.id);
    } else {
      router.push(`/closet/tea/${tea.id}`);
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(tea.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(tea.id);
    } else {
      router.push(`/closet/tea/${tea.id}/edit`);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(tea.id);
    } else {
      router.push(`/closet/tea/${tea.id}/delete`);
    }
  };

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

  const renderCardContent = () => {
    switch (variant) {
      case "compact":
        return (
          <div className="flex items-center gap-4 p-1">
            <TeaImage
              src={getTeaImage(tea)}
              alt={`${tea.name} tea`}
              size="compact"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-title font-medium text-text-color truncate text-sm">
                  {tea.name}
                </h3>
                {onFavoriteToggle && (
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={handleFavoriteToggle}
                    className={cn(
                      "flex-shrink-0 ml-2",
                      tea.favorite ? "text-red-500" : "text-gray-400"
                    )}
                  >
                    <IconHeart
                      size={14}
                      fill={tea.favorite ? "currentColor" : "none"}
                    />
                  </IconButton>
                )}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={cn(
                    "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
                    getTypeColor(tea.type)
                  )}
                >
                  {tea.type}
                </span>
                {tea.brewTime && (
                  <div className="flex items-center gap-1 text-xs text-text-color/60">
                    <IconClock size={10} />
                    <span>{tea.brewTime}min</span>
                  </div>
                )}
              </div>
              {tea.description && (
                <p className="font-body text-text-color/70 text-xs line-clamp-1">
                  {tea.description}
                </p>
              )}
            </div>
          </div>
        );

      case "detailed":
        return (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-block px-4 py-2 rounded-full text-sm font-medium shadow-sm",
                      getTypeColor(tea.type)
                    )}
                  >
                    {tea.type}
                  </span>
                  {tea.brewTime && (
                    <div className="flex items-center gap-2 text-sm text-text-color/60 bg-gray-50 px-3 py-1 rounded-full">
                      <IconClock size={16} />
                      <span>{tea.brewTime} min brewing</span>
                    </div>
                  )}
                </div>
                <h3 className="font-title text-2xl font-medium text-text-color leading-tight">
                  {tea.name}
                </h3>
              </div>
              {onFavoriteToggle && (
                <IconButton
                  variant="ghost"
                  onClick={handleFavoriteToggle}
                  className={cn(
                    "p-3 rounded-full transition-colors",
                    tea.favorite
                      ? "text-red-500 bg-red-50"
                      : "text-gray-400 hover:bg-gray-50"
                  )}
                >
                  <IconHeart
                    size={24}
                    fill={tea.favorite ? "currentColor" : "none"}
                  />
                </IconButton>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {tea.description && (
                  <div>
                    <h4 className="font-medium text-text-color mb-2">
                      Description
                    </h4>
                    <p className="font-body text-text-color/70 text-sm leading-relaxed">
                      {tea.description}
                    </p>
                  </div>
                )}

                {tea.tastingNotes && (
                  <div>
                    <h4 className="font-medium text-text-color mb-2">
                      Tasting Notes
                    </h4>
                    <p className="font-body text-text-color/70 text-sm leading-relaxed">
                      {tea.tastingNotes}
                    </p>
                  </div>
                )}

                {showActions && (
                  <CardActions className="pt-4">
                    <Button variant="danger" size="sm" onClick={handleDelete}>
                      <IconTrash size={16} />
                      Delete
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleEdit}>
                      <IconEdit size={16} />
                      Edit
                    </Button>
                  </CardActions>
                )}
              </div>

              <TeaImage
                src={getTeaImage(tea)}
                alt={`${tea.name} tea`}
                size="large"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-3">
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-medium shadow-sm",
                  getTypeColor(tea.type)
                )}
              >
                {tea.type}
              </span>
              {onFavoriteToggle && (
                <IconButton
                  variant="ghost"
                  size="sm"
                  onClick={handleFavoriteToggle}
                  className={cn(
                    "transition-colors rounded-full",
                    tea.favorite
                      ? "text-red-500 bg-red-50"
                      : "text-gray-400 hover:bg-gray-50"
                  )}
                >
                  <IconHeart
                    size={18}
                    fill={tea.favorite ? "currentColor" : "none"}
                  />
                </IconButton>
              )}
            </div>

            <h3 className="font-title font-medium text-text-color text-lg leading-tight mb-3">
              {tea.name}
            </h3>

            <div className="flex gap-3 flex-1">
              <div className="flex-1 space-y-2 flex flex-col min-w-0">
                <div className="flex-1">
                  {tea.description && (
                    <p className="font-body text-text-color/70 text-sm line-clamp-2 leading-relaxed">
                      {tea.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-auto">
                  {tea.brewTime && (
                    <div className="flex items-center gap-1 text-xs text-text-color/60 bg-gray-50 px-2 py-1 rounded-full">
                      <IconClock size={10} />
                      <span>{tea.brewTime}min</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 w-16">
                <TeaImage
                  src={getTeaImage(tea)}
                  alt={`${tea.name} tea`}
                  size="small"
                />
              </div>
            </div>

            {showActions && (
              <CardActions className="pt-2 border-t border-gray-100 mt-3">
                <Button variant="ghost" size="sm" onClick={handleDelete}>
                  <IconTrash size={14} />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleEdit}>
                  <IconEdit size={14} />
                </Button>
              </CardActions>
            )}
          </div>
        );
    }
  };

  const CardComponent = isClickable
    ? ClickableCard
    : isInteractive
    ? InteractiveCard
    : Card;

  const shouldUseTilt = isDesktop && !disableTilt && !disableInteractions;

  const cardElement = (
    <CardComponent
      size={size}
      onClick={!disableInteractions ? handleCardClick : undefined}
      className={cn(
        "transition-all duration-200 hover:shadow-lg flex flex-col",
        variant === "compact" && "p-3 hover:bg-gray-50",
        variant === "default" && "hover:-translate-y-0.5",
        variant === "detailed" && "p-0",
        !disableInteractions && "cursor-pointer",
        className
      )}
    >
      <CardContent className="p-0 flex-1">{renderCardContent()}</CardContent>
    </CardComponent>
  );

  return (
    <>
      {shouldUseTilt ? (
        <TiltWrapper
          disabled={false}
          glareMaxOpacity={0.05}
          glareColor="#ffffff"
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          className={className}
        >
          {cardElement}
        </TiltWrapper>
      ) : (
        cardElement
      )}
    </>
  );
};

export default TeaCard;
