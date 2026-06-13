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
    "inline-flex h-7 sm:h-8 items-center rounded-xs text-[9px] sm:text-xs font-semibold transition-all duration-200 gap-2 min-h-0 min-w-0 cursor-pointer text-left whitespace-nowrap select-none";

  const variantClasses = {
    primary:
      "px-4 items-center bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xs",
    secondary:
      "px-4 items-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-600/10 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
    default:
      "max-[437px]:px-0 px-2 items-center bg-transparenttext-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors",
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
