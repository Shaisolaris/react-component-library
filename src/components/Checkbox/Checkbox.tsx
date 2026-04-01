import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/index.js";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, indeterminate, ...props }, ref) => {
    const checkId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s/g, "-")}` : undefined);

    return (
      <div className={cn("sui-checkbox-wrapper", className)}>
        <label htmlFor={checkId} className="sui-checkbox-label">
          <input ref={ref} id={checkId} type="checkbox" className="sui-checkbox-input" aria-invalid={!!error} {...props} />
          <span className={cn("sui-checkbox-indicator", indeterminate && "sui-checkbox-indeterminate")} aria-hidden="true" />
          <div>
            {label && <span className="sui-checkbox-text">{label}</span>}
            {description && <span className="sui-checkbox-description">{description}</span>}
          </div>
        </label>
        {error && <p className="sui-input-error-text" role="alert">{error}</p>}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
