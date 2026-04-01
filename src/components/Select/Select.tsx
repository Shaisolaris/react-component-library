import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../../utils/index.js";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s/g, "-")}` : undefined);

    return (
      <div className={cn("sui-select-wrapper", className)}>
        {label && <label htmlFor={selectId} className="sui-input-label">{label}</label>}
        <select
          ref={ref}
          id={selectId}
          className={cn("sui-select", error && "sui-input-error")}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="sui-input-error-text" role="alert">{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";
