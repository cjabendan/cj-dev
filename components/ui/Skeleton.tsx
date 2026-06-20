import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "rectangle" | "circle";
}

export default function Skeleton({ 
  variant = "rectangle", 
  className = "", 
  ...props 
}: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse 
        bg-zinc-100 
        dark:bg-zinc-900 
        ${variant === "circle" ? "rounded-full" : "rounded-sm"} 
        ${className}
      `}
      {...props}
    />
  );
}