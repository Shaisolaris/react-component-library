"use client";
import { useState, useRef, type ReactNode } from "react";
import { cn } from "../../utils/index.js";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function Tooltip({ content, children, position = "top", delay = 200, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const show = () => { timeoutRef.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { clearTimeout(timeoutRef.current); setVisible(false); };

  return (
    <div className="sui-tooltip-wrapper" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible && (
        <div className={cn("sui-tooltip", `sui-tooltip-${position}`, className)} role="tooltip">
          {content}
          <span className="sui-tooltip-arrow" />
        </div>
      )}
    </div>
  );
}
