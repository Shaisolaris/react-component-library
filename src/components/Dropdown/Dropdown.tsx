"use client";
import { useState, useCallback, useRef, type ReactNode, type KeyboardEvent } from "react";
import { cn, KEYS } from "../../utils/index.js";
import { useClickOutside } from "../../hooks/index.js";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (id: string) => void;
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({ trigger, items, onSelect, align = "left", className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const enabled = items.filter((i) => !i.disabled && !i.separator);
    if (e.key === KEYS.ARROW_DOWN) { e.preventDefault(); setActiveIndex((prev) => Math.min(prev + 1, enabled.length - 1)); }
    else if (e.key === KEYS.ARROW_UP) { e.preventDefault(); setActiveIndex((prev) => Math.max(prev - 1, 0)); }
    else if (e.key === KEYS.ENTER && activeIndex >= 0) { e.preventDefault(); const item = enabled[activeIndex]; if (item) { onSelect(item.id); setIsOpen(false); } }
    else if (e.key === KEYS.ESCAPE) { setIsOpen(false); }
  }, [items, activeIndex, onSelect]);

  return (
    <div ref={menuRef as React.RefObject<HTMLDivElement>} className={cn("sui-dropdown", className)} onKeyDown={handleKeyDown}>
      <div onClick={() => setIsOpen(!isOpen)} role="button" aria-haspopup="menu" aria-expanded={isOpen}>{trigger}</div>
      {isOpen && (
        <div className={cn("sui-dropdown-menu", `sui-dropdown-${align}`)} role="menu">
          {items.map((item, i) => {
            if (item.separator) return <div key={item.id} className="sui-dropdown-separator" role="separator" />;
            return (
              <button
                key={item.id}
                role="menuitem"
                className={cn("sui-dropdown-item", item.danger && "sui-dropdown-item-danger", i === activeIndex && "sui-dropdown-item-active")}
                disabled={item.disabled}
                onClick={() => { onSelect(item.id); setIsOpen(false); }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {item.icon && <span className="sui-dropdown-icon">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
