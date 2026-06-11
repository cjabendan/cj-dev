"use client";

/**
 * TODO: FUTURE PHASE FEATURE
 * This form is currently benched during the startup launch phase to prevent spam.
 * Future integration plan: Secure this with Clerk OAuth (Google/GitHub) or
 * a single-use invitation token system before uncommenting.
 */

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { Camera, Upload, X } from "lucide-react";

interface AvatarUploadProps {
  preview: string | null;
  onImageChange: (url: string | null, file?: File | null) => void;
  isError?: boolean;
}

export default function AvatarUpload({
  preview,
  onImageChange,
  isError,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Clean up previous preview URL from memory if it exists before creating a new one
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      const previewUrl = URL.createObjectURL(file);
      // FIXED: Pass both the layout string preview and raw object binary data upstairs
      onImageChange(previewUrl, file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleClearPhoto = () => {
    // Clean up memory leaks by revoking the blob from browser tracking context
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    // Clear the HTML input element value entirely so a user can re-upload the exact same file if wanted
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Reset both state fields down inside form router
    onImageChange(null, null);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-300 select-none">
        Profile Photo {!preview && <span className="text-red-500 ml-1">*</span>}
      </span>

      <div className="relative w-fit">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleTriggerUpload}
          className={`group relative h-18 w-18 rounded-md overflow-hidden border bg-gray-50 dark:bg-zinc-800/40 flex items-center justify-center shrink-0 cursor-pointer focus:outline-none focus:ring-1 transition-all
            ${
              isError
                ? "border-red-500 dark:border-red-600/60 focus:ring-red-500"
                : "border-gray-200 dark:border-gray-800 focus:ring-black dark:focus:ring-white"
            }`}
        >
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Avatar upload preview profile"
                fill
                unoptimized={preview.startsWith("blob:")} // Speeds up Next.js loading logic for direct local blobs
                className="object-cover transition-opacity group-hover:opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 dark:bg-black/40">
                <Camera size={16} className="text-white" />
              </div>
            </>
          ) : (
            <Upload
              size={18}
              className={`${isError ? "text-red-400" : "text-gray-400"} transition-transform group-hover:scale-110`}
            />
          )}
        </button>

        {/* Absolute Floating Close Badge Action Button */}
        {preview && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering the file selector on layout event bubbling
              handleClearPhoto();
            }}
            className="absolute -top-1.5 -right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:scale-105 cursor-pointer transition-all focus:outline-none"
            aria-label="Remove photo"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
