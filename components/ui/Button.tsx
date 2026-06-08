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
    "inline-flex h-7 sm:h-9 items-center justify-center rounded-xs  text-[10px] sm:text-xs font-semibold transition-all duration-200 gap-1 min-h-0 min-w-0 cursor-pointer text-center whitespace-nowrap select-none";

  const variantClasses = {
    primary:
      "bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xs px-2 sm:px-4",
    secondary:
      "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-600/10 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800  px-2 sm:px-4",
    default:
      "bg-transparent text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors px-1 ",
  }[variant];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Icon on Left */}
      {icon && variant !== "default" && (
        <span className="shrink-0 flex items-center justify-center">
          {icon}
        </span>
      )}

      <span className="block truncate min-w-0 get-full-width flex-1">
        {children}
      </span>

      {/* Icon on Right */}
      {icon && variant === "default" && (
        <span className="shrink-0 flex items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
}
