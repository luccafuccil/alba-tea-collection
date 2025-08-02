import React from "react";
import { cn } from "@/lib/utils";
import { ButtonVariant } from "@/lib/types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const buttonVariants = {
  primary:
    "bg-primary-green hover:bg-darker-green text-text-color shadow-sm hover:shadow-md",
  secondary:
    "bg-white hover:bg-gray-50 text-text-color border border-primary-green shadow-sm hover:shadow-md",
  danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md",
  ghost: "hover:bg-gray-100 text-text-color",
};

const buttonSizes = {
  sm: "px-3 py-2 text-sm h-8",
  md: "px-4 py-2 h-10",
  lg: "px-6 py-3 text-lg h-12",
};

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading,
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-body font-medium",
        "transition-all duration-200 transform active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",

        buttonVariants[variant],

        buttonSizes[size],

        fullWidth && "w-full",

        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export const IconButton = ({
  children,
  className,
  size = "md",
  ...props
}: Omit<ButtonProps, "children"> & {
  children: React.ReactNode;
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <Button
      className={cn("rounded-full p-0", iconSizes[size], className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export const FloatingActionButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <IconButton
      variant="primary"
      size="lg"
      className={cn(
        "fixed bottom-6 right-6 z-40 shadow-lg hover:shadow-xl",
        "w-14 h-14 text-2xl",
        className
      )}
      {...props}
    >
      {children}
    </IconButton>
  );
};

export const ButtonWithIcon = ({
  icon: Icon,
  iconPosition = "left",
  children,
  className,
  ...props
}: ButtonProps & {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  iconPosition?: "left" | "right";
}) => {
  return (
    <Button className={cn("flex items-center gap-2", className)} {...props}>
      {iconPosition === "left" && <Icon size={16} />}
      {children}
      {iconPosition === "right" && <Icon size={16} />}
    </Button>
  );
};

export const ButtonLink = ({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) => {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-body font-medium",
        "transition-all duration-200 transform active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2",
        "no-underline",

        buttonVariants[variant],

        buttonSizes[size],

        fullWidth && "w-full",

        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
