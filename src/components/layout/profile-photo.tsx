"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfilePhotoProps {
  src: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  src,
  size = "md",
  className,
  onClick,
}) => {
  const [imageSrc, setImageSrc] = React.useState(src);

  const handleError = () => {
    setImageSrc("/images/profile/generic-profile.png");
  };

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden flex-shrink-0",
        "ring-2 ring-transparent hover:ring-primary-green/50 transition-all duration-200",
        sizes[size],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <Image
        src={imageSrc}
        alt="Profile Photo"
        fill
        className="object-cover"
        onError={handleError}
      />
    </div>
  );
};
