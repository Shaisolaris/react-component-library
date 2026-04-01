import type { HTMLAttributes } from "react";
import { cn } from "../../utils/index.js";
import type { Variant, Size } from "../../types/index.js";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

export function Badge({ variant = "default", size = "md", dot, removable, onRemove, children, className, ...props }: BadgeProps) {
  return (
    <span className={cn("sui-badge", `sui-badge-${variant}`, `sui-badge-${size}`, className)} {...props}>
      {dot && <span className="sui-badge-dot" aria-hidden="true" />}
      {children}
      {removable && <button className="sui-badge-remove" onClick={onRemove} aria-label="Remove">×</button>}
    </span>
  );
}
