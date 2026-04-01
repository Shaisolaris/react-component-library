import type { ImgHTMLAttributes } from "react";
import { cn } from "../../utils/index.js";
import type { Size } from "../../types/index.js";

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  name?: string;
  size?: Size;
  shape?: "circle" | "square";
}

const sizeMap: Record<Size, string> = { xs: "sui-avatar-xs", sm: "sui-avatar-sm", md: "sui-avatar-md", lg: "sui-avatar-lg", xl: "sui-avatar-xl" };

function getInitials(name?: string): string {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function Avatar({ name, size = "md", shape = "circle", src, alt, className, ...props }: AvatarProps) {
  if (src) {
    return <img src={src} alt={alt || name || "Avatar"} className={cn("sui-avatar", sizeMap[size], shape === "square" && "sui-avatar-square", className)} {...props} />;
  }
  return (
    <div className={cn("sui-avatar sui-avatar-fallback", sizeMap[size], shape === "square" && "sui-avatar-square", className)} aria-label={name || "Avatar"}>
      {getInitials(name)}
    </div>
  );
}
