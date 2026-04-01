import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/index.js";
import type { Size } from "../../types/index.js";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: Size;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

const sizeMap: Record<Size, string> = {
  xs: "sui-input-xs", sm: "sui-input-sm", md: "sui-input-md", lg: "sui-input-lg", xl: "sui-input-xl",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, inputSize = "md", leftAddon, rightAddon, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s/g, "-")}` : undefined);
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint && !error ? `${inputId}-hint` : undefined;

    return (
      <div className={cn("sui-input-wrapper", className)}>
        {label && <label htmlFor={inputId} className="sui-input-label">{label}</label>}
        <div className={cn("sui-input-container", error && "sui-input-error")}>
          {leftAddon && <span className="sui-input-addon">{leftAddon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn("sui-input", sizeMap[inputSize])}
            aria-invalid={!!error}
            aria-describedby={errorId || hintId}
            {...props}
          />
          {rightAddon && <span className="sui-input-addon">{rightAddon}</span>}
        </div>
        {error && <p id={errorId} className="sui-input-error-text" role="alert">{error}</p>}
        {hint && !error && <p id={hintId} className="sui-input-hint">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
