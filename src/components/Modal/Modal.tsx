"use client";
import { useEffect, useCallback, type ReactNode } from "react";
import { cn } from "../../utils/index.js";
import { useFocusTrap, useClickOutside } from "../../hooks/index.js";
import { KEYS } from "../../utils/index.js";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export function Modal({
  isOpen, onClose, title, description, children, size = "md",
  closeOnOverlay = true, closeOnEscape = true, className,
}: ModalProps) {
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);
  const contentRef = useClickOutside<HTMLDivElement>(() => {
    if (closeOnOverlay) onClose();
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === KEYS.ESCAPE && closeOnEscape) onClose();
    },
    [onClose, closeOnEscape],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="sui-modal-overlay" role="dialog" aria-modal="true" aria-labelledby={title ? "modal-title" : undefined} ref={trapRef as React.RefObject<HTMLDivElement>}>
      <div ref={contentRef as React.RefObject<HTMLDivElement>} className={cn("sui-modal", `sui-modal-${size}`, className)}>
        {title && (
          <div className="sui-modal-header">
            <h2 id="modal-title" className="sui-modal-title">{title}</h2>
            {description && <p className="sui-modal-description">{description}</p>}
            <button onClick={onClose} className="sui-modal-close" aria-label="Close">×</button>
          </div>
        )}
        <div className="sui-modal-body">{children}</div>
      </div>
    </div>
  );
}
