"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import TiltWrapper from "@/components/ui/tilt-wrapper";
import { useIsDesktop } from "@/hooks/use-responsive";
import { cn } from "@/lib/utils";
import { CardSize } from "@/lib/types";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: CardSize;
  variant?: "default" | "elevated" | "outlined" | "gradient";
  interactive?: boolean;
  clickable?: boolean;
  disableTilt?: boolean;
  tiltConfig?: {
    tiltMaxAngleX?: number;
    tiltMaxAngleY?: number;
    glareMaxOpacity?: number;
    glareColor?: string;
  };
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  disableTilt = false,
  tiltConfig = {},
  className,
  size,
  variant,
  interactive,
  clickable,
  ...htmlProps
}) => {
  const isDesktop = useIsDesktop();
  const shouldUseTilt = isDesktop && !disableTilt;

  const {
    tiltMaxAngleX = 8,
    tiltMaxAngleY = 8,
    glareMaxOpacity = 0.05,
    glareColor = "#ffffff",
  } = tiltConfig;

  const cardElement = (
    <Card
      className={cn("transition-all duration-200", className)}
      size={size}
      variant={variant}
      interactive={interactive}
      clickable={clickable}
      {...htmlProps}
    >
      {children}
    </Card>
  );

  if (shouldUseTilt) {
    return (
      <TiltWrapper
        tiltMaxAngleX={tiltMaxAngleX}
        tiltMaxAngleY={tiltMaxAngleY}
        glareMaxOpacity={glareMaxOpacity}
        glareColor={glareColor}
      >
        {cardElement}
      </TiltWrapper>
    );
  }

  return cardElement;
};

export default TiltCard;
