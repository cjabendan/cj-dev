"use client";

/**
 * TODO: FUTURE PHASE FEATURE
 * This form is currently benched during the startup launch phase to prevent spam.
 * Future integration plan: Secure this with Clerk OAuth (Google/GitHub) or
 * a single-use invitation token system before uncommenting.
 */

import { useState, FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Button from "@/components/ui/Button";
import AvatarUpload from "@/components/ui/AvatarUpload";
import { InputField, TextareaField } from "@/components/ui/FormFields";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RecommendationForm() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    content: "",
  });
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // Track the raw file binary
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 1. INITIALIZE CONVEX MUTATION HOOKS
  const generateUploadUrl = useMutation(api.reviews.generateUploadUrl);
  const submitReview = useMutation(api.reviews.submitReview);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedEmail = formData.email.trim();
    const newErrors: { [key: string]: string } = {};

    // Form field validations
    if (!formData.name.trim()) newErrors.name = "*";
    if (!formData.title.trim()) newErrors.title = "*";
    if (!formData.content.trim()) newErrors.content = "*";
    if (!trimmedEmail) {
      newErrors.email = "*";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) return;

    if (!captchaToken) {
      alert("Please complete the security challenge verification.");
      return;
    }

    setIsSubmitting(true);
    let avatarStorageId: string | undefined = undefined;

    try {
      // 2. IF A USER UPLOADED AN AVATAR FILE, STREAM IT TO CONVEX STORAGE FIRST
      if (avatarFile) {
        // Step A: Request a unique single-use upload endpoint destination
        const postUrl = await generateUploadUrl();

        // Step B: Post the raw binary data packet directly to Convex
        const uploadResult = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": avatarFile.type },
          body: avatarFile,
        });

        if (!uploadResult.ok) throw new Error("Avatar upload failed");

        // Step C: Retrieve the saved file identifier token reference
        const { storageId } = await uploadResult.json();
        avatarStorageId = storageId;
      }

      // 3. SUBMIT THE COMPLETE PROFILE PACKAGE TO THE LIVE REVIEWS TABLE
      await submitReview({
        name: formData.name.trim(),
        title: formData.title.trim(),
        email: trimmedEmail,
        content: formData.content.trim(),
        avatarStorageId, // Pass along the storageId reference string
      });

      alert("Recommendation sent successfully! Thank you.");

      // Reset form states completely
      setFormData({ name: "", title: "", email: "", content: "" });
      setAvatarPreview(null);
      setAvatarFile(null);
      setCaptchaToken(null);
      setErrors({});
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong while saving your recommendation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 sm:gap-6 w-full dark:bg-zinc-900/10 p-4 sm:p-6 rounded-sm border border-zinc-400/30 dark:border-zinc-800/40"
    >
      {/* Ensure your AvatarUpload component exposes the raw file inside its callback hook argument list. 
        Example: onImageChange={(url, file) => { ... }}
      */}
      <AvatarUpload
        preview={avatarPreview}
        onImageChange={(url, file) => {
          setAvatarPreview(url);
          setAvatarFile(file || null);
          if (url) setErrors((prev) => ({ ...prev, avatar: "" }));
        }}
        isError={!!errors.avatar}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <InputField
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          isError={!!errors.name}
          errorMessage={errors.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (e.target.value) setErrors((prev) => ({ ...prev, name: "" }));
          }}
        />

        <InputField
          id="title"
          label="Professional Title / Company"
          type="text"
          placeholder="e.g. Client / Project Partner"
          value={formData.title}
          isError={!!errors.title}
          errorMessage={errors.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            if (e.target.value) setErrors((prev) => ({ ...prev, title: "" }));
          }}
        />
      </div>

      <InputField
        id="email"
        label="Email Address"
        type="email"
        placeholder="example@gmail.com"
        value={formData.email}
        isError={!!errors.email}
        errorMessage={errors.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
        }}
      />

      <TextareaField
        id="content"
        label="Recommendation Message"
        rows={4}
        placeholder="Working with Christian transformed our entire project workflow..."
        value={formData.content}
        isError={!!errors.content}
        errorMessage={errors.content}
        onChange={(e) => {
          setFormData({ ...formData, content: e.target.value });
          if (e.target.value) setErrors((prev) => ({ ...prev, content: "" }));
        }}
      />

      <div className="mt-1 min-h-[65px] w-full flex justify-start">
        <div className="block [@media(max-width:370px)]:block [@media(min-width:371px)]:hidden w-full">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
            options={{ theme: "dark", size: "normal" }}
            onSuccess={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
            onError={() => setCaptchaToken(null)}
          />
        </div>

        <div className="hidden [@media(min-width:371px)]:block w-full">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
            options={{ theme: "dark", size: "flexible" }}
            onSuccess={(token) => setCaptchaToken(token)}
            onExpire={() => setCaptchaToken(null)}
            onError={() => setCaptchaToken(null)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-1">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Submit Recommendation"}
        </Button>
      </div>
    </form>
  );
}