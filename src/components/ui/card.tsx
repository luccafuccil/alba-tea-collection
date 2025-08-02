import React from "react";
import { cn } from "@/lib/utils";
import { CardSize } from "@/lib/types";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: CardSize;
  variant?: "default" | "elevated" | "outlined" | "gradient";
  interactive?: boolean;
  clickable?: boolean;
  className?: string;
}

const cardSizes = {
  small: "p-4",
  medium: "p-6",
  large: "p-8",
  compact: "p-3",
};

const cardVariants = {
  default: "bg-white border border-gray-100",
  elevated: "bg-white shadow-lg border border-gray-50",
  outlined: "bg-white border-2 border-primary-green",
  gradient:
    "bg-gradient-to-br from-primary-blue via-primary-green to-primary-orange",
};

export const Card: React.FC<CardProps> = ({
  children,
  size = "medium",
  variant = "default",
  interactive = false,
  clickable = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl transition-all duration-200",

        cardSizes[size],

        cardVariants[variant],

        interactive && [
          "hover:shadow-md hover:scale-[1.02]",
          "active:scale-[0.98]",
        ],

        clickable && [
          "cursor-pointer",
          "hover:shadow-lg hover:-translate-y-1",
          "active:translate-y-0",
        ],

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const InteractiveCard: React.FC<Omit<CardProps, "interactive">> = (
  props
) => <Card {...props} interactive />;

export const ClickableCard: React.FC<Omit<CardProps, "clickable">> = (
  props
) => <Card {...props} clickable />;

export const GradientCard: React.FC<Omit<CardProps, "variant">> = (props) => (
  <Card {...props} variant="gradient" />
);

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("mb-4 pb-4 border-b border-gray-100", className)}>
    {children}
  </div>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("flex-1", className)}>{children}</div>
);

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("mt-4 pt-4 border-t border-gray-100", className)}>
    {children}
  </div>
);

export const CardActions: React.FC<{
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}> = ({ children, align = "right", className }) => {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        alignmentClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardSkeleton: React.FC<{
  size?: CardSize;
  className?: string;
}> = ({ size = "medium", className }) => (
  <Card size={size} className={cn("animate-pulse", className)}>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
    </div>
  </Card>
);

export const EmptyCard: React.FC<{
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, description, icon, action, className }) => (
  <Card size="large" className={cn("text-center", className)}>
    <div className="flex flex-col items-center space-y-4">
      {icon && <div className="text-gray-400">{icon}</div>}
      <div className="space-y-2">
        <h3 className="font-title text-lg text-text-color">{title}</h3>
        {description && (
          <p className="font-body text-text-color/70">{description}</p>
        )}
      </div>
      {action && action}
    </div>
  </Card>
);
