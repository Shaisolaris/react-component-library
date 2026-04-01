import type { ReactNode } from "react";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant = "default" | "primary" | "secondary" | "destructive" | "outline" | "ghost";
export type Status = "default" | "success" | "warning" | "error" | "info";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}
