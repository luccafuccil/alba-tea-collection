"use client";

import React, { useState } from "react";
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
import { Modal } from "@/components/ui/modal";
import TiltWrapper from "@/components/ui/tilt-wrapper";
import { useIsDesktop, useIsMobile } from "@/hooks/use-responsive";
import { Tea, CardSize } from "@/lib/types";
import { TEA_TYPE_IMAGES } from "@/lib/constants";
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
  const [showModal, setShowModal] = useState(false);
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
    } else if (isDesktop) {
      setShowModal(true);
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
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={getTeaImage(tea)}
                alt={`${tea.name} tea`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-title font-medium text-text-color truncate">
                {tea.name}
              </h3>
              <span
                className={cn(
                  "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
                  getTypeColor(tea.type)
                )}
              >
                {tea.type}
              </span>
            </div>
            {onFavoriteToggle && (
              <IconButton
                variant="ghost"
                size="sm"
                onClick={handleFavoriteToggle}
                className={cn(
                  "flex-shrink-0",
                  tea.favorite ? "text-red-500" : "text-gray-400"
                )}
              >
                <IconHeart
                  size={16}
                  fill={tea.favorite ? "currentColor" : "none"}
                />
              </IconButton>
            )}
          </div>
        );

      case "detailed":
        return (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-sm font-medium",
                    getTypeColor(tea.type)
                  )}
                >
                  {tea.type}
                </span>
                <h3 className="font-title text-xl font-medium text-text-color">
                  {tea.name}
                </h3>
              </div>
              {onFavoriteToggle && (
                <IconButton
                  variant="ghost"
                  onClick={handleFavoriteToggle}
                  className={cn(
                    tea.favorite ? "text-red-500" : "text-gray-400"
                  )}
                >
                  <IconHeart
                    size={20}
                    fill={tea.favorite ? "currentColor" : "none"}
                  />
                </IconButton>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {tea.description && (
                  <p className="font-body text-text-color/70 text-sm leading-relaxed">
                    {tea.description}
                  </p>
                )}

                {tea.brewTime && (
                  <div className="flex items-center gap-2 text-sm text-text-color/60">
                    <IconClock size={16} />
                    <span>{tea.brewTime} min brewing time</span>
                  </div>
                )}

                {tea.tastingNotes && (
                  <div>
                    <h4 className="font-medium text-text-color mb-1">
                      Tasting Notes
                    </h4>
                    <p className="font-body text-text-color/70 text-sm">
                      {tea.tastingNotes}
                    </p>
                  </div>
                )}
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={getTeaImage(tea)}
                  alt={`${tea.name} tea`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {showActions && (
              <CardActions>
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
        );

      default:
        return (
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "inline-block px-2 py-1 rounded-full text-xs font-medium",
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
                    tea.favorite ? "text-red-500" : "text-gray-400"
                  )}
                >
                  <IconHeart
                    size={16}
                    fill={tea.favorite ? "currentColor" : "none"}
                  />
                </IconButton>
              )}
            </div>

            <h3 className="font-title font-medium text-text-color">
              {tea.name}
            </h3>

            <div className="flex gap-3">
              <div className="flex-1 space-y-2">
                {tea.description && (
                  <p className="font-body text-text-color/70 text-sm line-clamp-2">
                    {tea.description}
                  </p>
                )}

                {tea.brewTime && (
                  <div className="flex items-center gap-1 text-xs text-text-color/60">
                    <IconClock size={12} />
                    <span>{tea.brewTime} min</span>
                  </div>
                )}
              </div>

              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={getTeaImage(tea)}
                  alt={`${tea.name} tea`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {tea.tastingNotes && (
              <p className="font-body text-text-color/60 text-xs">
                {tea.tastingNotes}
              </p>
            )}

            {showActions && (
              <CardActions className="pt-2">
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
      onClick={isClickable ? handleCardClick : undefined}
      className={cn(
        "transition-all duration-200",
        variant === "compact" && "p-4",
        className
      )}
    >
      <CardContent className="p-0">{renderCardContent()}</CardContent>
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
        >
          {cardElement}
        </TiltWrapper>
      ) : (
        cardElement
      )}

      {showModal && isDesktop && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          variant="form"
          title={tea.name}
        >
          <TeaCard
            tea={tea}
            variant="detailed"
            showActions={showActions}
            onFavoriteToggle={onFavoriteToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            disableInteractions
            className="border-0 shadow-none bg-transparent"
          />
        </Modal>
      )}
    </>
  );
};

export default TeaCard;
