"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeaImageProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large" | "compact";
  className?: string;
}

const sizeConfig = {
  compact: {
    container: "w-14 h-14",
    padding: "p-2",
  },
  small: {
    container: "w-16 h-16",
    padding: "p-2",
  },
  medium: {
    container: "w-20 h-20",
    padding: "p-2.5",
  },
  large: {
    container: "w-full aspect-square",
    padding: "p-6",
  },
};

export const TeaImage: React.FC<TeaImageProps> = ({
  src,
  alt,
  size = "medium",
  className,
}) => {
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden flex-shrink-0",
        config.container,
        className
      )}
    >
      <div className={cn("relative w-full h-full", config.padding)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain mix-blend-multiply"
          sizes={
            size === "large"
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              : "80px"
          }
        />
      </div>
    </div>
  );
};

export default TeaImage;
