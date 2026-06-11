import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "default";
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
    "inline-flex h-7 sm:h-8 items-center justify-center rounded-xs text-[8px] sm:text-xs font-semibold transition-all duration-200 gap-1 sm:gap-2 min-h-0 min-w-0 cursor-pointer text-left whitespace-nowrap select-none";

  const variantClasses = {
    primary:
      "px-2.5 md:px-4 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xs px-2 sm:px-4",
    secondary:
      "px-2.5 md:px-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-600/10 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800  px-2 sm:px-4",
    default:
      "px-0  bg-transparenttext-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors px-1 ",
  }[variant];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && variant !== "default" && (
        <span className="shrink-0 flex items-center justify-center">
          {icon}
        </span>
      )}

      <span className="block truncate min-w-0 get-full-width flex-1">
        {children}
      </span>
      {icon && variant === "default" && (
        <span className="shrink-0 flex items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
}
