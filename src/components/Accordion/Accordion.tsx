"use client";
import { useState, useCallback, type ReactNode } from "react";
import { cn } from "../../utils/index.js";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = useCallback((id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }, [multiple]);

  return (
    <div className={cn("sui-accordion", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className={cn("sui-accordion-item", isOpen && "sui-accordion-item-open")}>
            <button
              className="sui-accordion-trigger"
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
              disabled={item.disabled}
            >
              <span>{item.title}</span>
              <span className={cn("sui-accordion-chevron", isOpen && "sui-accordion-chevron-open")} aria-hidden="true">▸</span>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              role="region"
              aria-labelledby={`accordion-header-${item.id}`}
              className={cn("sui-accordion-content", isOpen ? "sui-accordion-content-open" : "sui-accordion-content-closed")}
              hidden={!isOpen}
            >
              <div className="sui-accordion-body">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
