"use client";

import { ComponentPropsWithoutRef } from "react";

interface FieldWrapperProps {
  id: string;
  label: string;
  isRequired?: boolean;
  hasValue?: boolean;
  errorMessage?: string;
}

function FieldWrapper({
  id,
  label,
  isRequired = true,
  hasValue = false,
  errorMessage,
  children,
}: FieldWrapperProps & { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-900 dark:text-gray-300 flex items-center select-none"
      >
        {label}

        {errorMessage ? (
          <span className="text-red-500 text-xs font-medium ml-2 tracking-wide transition-all animate-fade-in">
            ({errorMessage})
          </span>
        ) : (
          isRequired &&
          !hasValue && (
            <span className="text-red-500 ml-1 transition-opacity duration-150 animate-fade-in">
              *
            </span>
          )
        )}
      </label>
      {children}
    </div>
  );
}

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  isError?: boolean;
  errorMessage?: string;
}

export function InputField({
  id,
  label,
  isError,
  errorMessage,
  className = "",
  ...props
}: InputFieldProps) {
  const hasValue = !!props.value?.toString().trim();

  return (
    <FieldWrapper
      id={id!}
      label={label}
      hasValue={hasValue}
      errorMessage={errorMessage}
    >
      <input
        id={id}
        {...props}
        className={`w-full h-9 rounded border bg-transparent px-3 text-xs text-foreground focus:outline-none focus:ring-1 placeholder:text-gray-400 dark:placeholder:text-zinc-600 transition-all
          ${
            isError
              ? "border-red-500 dark:border-red-600/60 focus:ring-red-500 dark:focus:ring-red-500 animate-shake"
              : "border-zinc-400/30 dark:border-zinc-800/40 focus:ring-black dark:focus:ring-white"
          } ${className}`}
      />
    </FieldWrapper>
  );
}

interface TextareaFieldProps extends ComponentPropsWithoutRef<"textarea"> {
  label: string;
  isError?: boolean;
  errorMessage?: string;
}

export function TextareaField({
  id,
  label,
  isError,
  errorMessage,
  className = "",
  ...props
}: TextareaFieldProps) {
  const hasValue = !!props.value?.toString().trim();

  return (
    <FieldWrapper
      id={id!}
      label={label}
      hasValue={hasValue}
      errorMessage={errorMessage}
    >
      <textarea
        id={id}
        {...props}
        className={`w-full rounded border bg-transparent p-3 text-xs text-foreground resize-none focus:outline-none focus:ring-1 placeholder:text-gray-400 dark:placeholder:text-zinc-600 leading-relaxed transition-all
          ${
            isError
              ? "border-red-500 dark:border-red-600/60 focus:ring-red-500 dark:focus:ring-red-500 animate-shake"
              : "border-zinc-400/30 dark:border-zinc-800/40 focus:ring-black dark:focus:ring-white"
          } ${className}`}
      />
    </FieldWrapper>
  );
}
