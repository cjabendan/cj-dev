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
    "inline-flex h-7 sm:h-8 items-center rounded-sm text-[10px] sm:text-xs font-semibold transition-all duration-200 min-h-0 min-w-0 cursor-pointer text-left whitespace-nowrap select-none";

  const variantClasses = {
    primary:
      "px-2 sm:px-4 gap-1 sm:gap-2 items-center bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xs",
    secondary:
      "px-4 gap-1 sm:gap-2 items-center border border-gray-200 dark:border-gray-700/80 bg-transparent text-black dark:text-white dark:hover:bg-zinc-100/12",
    default:
      "max-[437px]:px-0 px-2 gap-2 items-center bg-transparent text-black dark:text-white hover:text-black dark:hover:text-white transition-colors dark:hover:bg-zinc-100/10",
  }[variant];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && variant !== "default" && (
        <span className="shrink-0 flex items-center">
          {icon}
        </span>
      )}

      <span className="block truncate items-center">
        {children}
      </span>
      {icon && variant === "default" && (
        <span className="shrink-0 flexWS">
          {icon}
        </span>
      )}
    </button>
  );
}
