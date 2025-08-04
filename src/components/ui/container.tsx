import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  center?: boolean;
  className?: string;
}

const containerSizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

const containerPadding = {
  none: "",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "lg",
  padding = "md",
  center = true,
  className,
  ...props
}) => (
  <div
    className={cn(
      "w-full",
      containerSizes[size],
      containerPadding[padding],
      center && "mx-auto",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const PageContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen w-full", className)}>
      <div className="pt-20 pb-12">{children}</div>
    </div>
  );
};

export const GridContainer: React.FC<{
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: "sm" | "md" | "lg";
  className?: string;
}> = ({ children, cols = 3, gap = "md", className }) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const gridGaps = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <div className={cn("grid", gridCols[cols], gridGaps[gap], className)}>
      {children}
    </div>
  );
};

export const FlexContainer: React.FC<{
  children: React.ReactNode;
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: "sm" | "md" | "lg";
  wrap?: boolean;
  className?: string;
}> = ({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  gap = "md",
  wrap = false,
  className,
}) => {
  const directions = {
    row: "flex-row",
    col: "flex-col",
  };

  const alignments = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifications = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  };

  const gaps = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div
      className={cn(
        "flex",
        directions[direction],
        alignments[align],
        justifications[justify],
        gaps[gap],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Section: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  spacing?: "sm" | "md" | "lg";
  className?: string;
}> = ({ children, title, subtitle, spacing = "md", className }) => {
  const spacings = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
  };

  return (
    <section className={cn(spacings[spacing], className)}>
      <Container>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="font-title text-3xl md:text-4xl text-text-color mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-body text-lg text-text-color/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};

export const StickyContainer: React.FC<{
  children: React.ReactNode;
  top?: number;
  zIndex?: number;
  className?: string;
}> = ({ children, top = 0, zIndex = 50, className }) => (
  <div
    className={cn("sticky backdrop-blur-sm", className)}
    style={{
      top: `${top}px`,
      zIndex,
    }}
  >
    {children}
  </div>
);

export const CenteredContainer: React.FC<{
  children: React.ReactNode;
  minHeight?: string;
  className?: string;
}> = ({ children, minHeight = "min-h-[400px]", className }) => (
  <div className={cn("flex items-center justify-center", minHeight, className)}>
    {children}
  </div>
);
