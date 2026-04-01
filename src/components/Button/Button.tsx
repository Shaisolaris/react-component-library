import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/index.js";
import type { Size, Variant } from "../../types/index.js";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  default: "sui-btn-default",
  primary: "sui-btn-primary",
  secondary: "sui-btn-secondary",
  destructive: "sui-btn-destructive",
  outline: "sui-btn-outline",
  ghost: "sui-btn-ghost",
};

const sizeStyles: Record<Size, string> = {
  xs: "sui-btn-xs",
  sm: "sui-btn-sm",
  md: "sui-btn-md",
  lg: "sui-btn-lg",
  xl: "sui-btn-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", isLoading, leftIcon, rightIcon, fullWidth, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn("sui-btn", variantStyles[variant], sizeStyles[size], fullWidth && "sui-btn-full", className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <span className="sui-btn-spinner" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="sui-btn-icon" aria-hidden="true">{leftIcon}</span>
      ) : null}
      {children && <span>{children}</span>}
      {rightIcon && !isLoading && (
        <span className="sui-btn-icon" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  ),
);
Button.displayName = "Button";
