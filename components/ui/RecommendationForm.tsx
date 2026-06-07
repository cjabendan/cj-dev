"use client";

import { useState, FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedEmail = formData.email.trim();
    const newErrors: { [key: string]: string } = {};

    if (!trimmedEmail) {
      
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

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Data package ready for database entry:", {
        ...formData,
        avatar: avatarPreview,
        turnstileToken: captchaToken,
      });

      alert("Recommendation sent successfully! Thank you.");

      setFormData({ name: "", title: "", email: "", content: "" });
      setAvatarPreview(null);
      setCaptchaToken(null);
      setErrors({});
    } catch (err) {
      console.error("Submission failed:", err);
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
      <AvatarUpload
        preview={avatarPreview}
        onImageChange={(url) => {
          setAvatarPreview(url);
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
