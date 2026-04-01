import { cn } from "../../utils/index.js";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  lines?: number;
  className?: string;
  animate?: boolean;
}

export function Skeleton({ width, height, variant = "text", lines = 1, className, animate = true }: SkeletonProps) {
  const style = { width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height };

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("sui-skeleton-group", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={cn("sui-skeleton sui-skeleton-text", animate && "sui-skeleton-animate")} style={i === lines - 1 ? { ...style, width: "75%" } : style} />
        ))}
      </div>
    );
  }

  return <div className={cn("sui-skeleton", `sui-skeleton-${variant}`, animate && "sui-skeleton-animate", className)} style={style} />;
}
