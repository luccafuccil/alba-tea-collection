"use client";

import React from "react";
import Tilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

interface TiltWrapperProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  perspective?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  glarePosition?: "top" | "right" | "bottom" | "left" | "all";
  glareBorderRadius?: string;
}

const TiltWrapper: React.FC<TiltWrapperProps> = ({
  children,
  disabled = false,
  className,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  perspective = 1000,
  glareEnable = true,
  glareMaxOpacity = 0.1,
  glareColor = "#ffffff",
  glarePosition = "all",
  glareBorderRadius = "24px",
}) => {
  if (disabled) {
    return <div className={cn("h-full", className)}>{children}</div>;
  }

  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      reset={true}
      perspective={perspective}
      glareEnable={glareEnable}
      glareMaxOpacity={glareMaxOpacity}
      glareColor={glareColor}
      glarePosition={glarePosition}
      glareBorderRadius={glareBorderRadius}
      className={cn("tilt-container h-full", className)}
    >
      {children}
    </Tilt>
  );
};

export default TiltWrapper;
