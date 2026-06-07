import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
}

export default function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  
  const baseClasses =
    "inline-flex h-9 items-center justify-center rounded max-[460px]:px-2.5 px-4 text-[10px] sm:text-xs font-semibold transition-all duration-200 gap-1 whitespace-nowrap min-h-0 cursor-pointer";

  const variantClasses =
    variant === "primary"
      ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
      : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0 mr-1 flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
