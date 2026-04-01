"use client";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/index.js";
import type { Size } from "../../types/index.js";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  size?: Size;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, size = "md", className, id, checked, onChange, disabled, ...props }, ref) => {
    const switchId = id || (label ? `switch-${label.toLowerCase().replace(/\s/g, "-")}` : undefined);

    return (
      <label htmlFor={switchId} className={cn("sui-switch-wrapper", disabled && "sui-switch-disabled", className)}>
        <div className="sui-switch-content">
          {label && <span className="sui-switch-label">{label}</span>}
          {description && <span className="sui-switch-description">{description}</span>}
        </div>
        <div className={cn("sui-switch-track", `sui-switch-${size}`, checked && "sui-switch-checked")}>
          <input ref={ref} id={switchId} type="checkbox" className="sui-switch-input" role="switch" aria-checked={!!checked} checked={checked} onChange={onChange} disabled={disabled} {...props} />
          <span className="sui-switch-thumb" />
        </div>
      </label>
    );
  },
);
Switch.displayName = "Switch";
