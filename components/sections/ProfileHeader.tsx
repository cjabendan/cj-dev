"use client";

import Image from "next/image";
import {
  Check,
  MapPin,
  Calendar,
  VerifiedIcon,
  ChevronRight,
  Mail,
} from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

export default function ProfileHeader() {
  const handleScheduleCall = () => {
    window.open("https://cal.com/your-profile", "_blank");
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/assets/Christian_Abendan_CV.pdf";
    link.download = "Christian_Abendan_Software_Developer_CV.pdf";
    link.click();
  };

  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Avatar */}
        <Image
          src="/images/gallery/Pfp.png"
          alt="Christian James Abendan"
          width={160}
          height={160}
          loading="eager"
          className="rounded-sm object-cover bg-gray-200 dark:bg-gray-800"
        />
        <div className="flex-1 min-w-0">
          {/* Content */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <p className="text-lg sm:text-xl font-bold truncate">
                <span className="min-[510px]:hidden">Dev. CJ</span>
                <span className="hidden min-[510px]:inline min-[580px]:hidden">
                  Dev. Christian Abendan
                </span>
                <span className="hidden min-[580px]:inline">
                  Dev. Christian James A. Abendan
                </span>
              </p>
              <div className="relative">
                <VerifiedIcon
                  className="w-5 h-5 text-blue-500 fill-blue-500"
                  strokeWidth={0}
                />
                <Check
                  className="absolute top-1 left-1 w-3 h-3 text-white"
                  strokeWidth={3}
                />
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="text-[11px] sm:text-sm text-zinc-800 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
              <MapPin size={12} className="mr-0 sm:mr-1 shrink-0" />
              <span className="block max-[510px]:hidden">Minglanilla, </span>
              Cebu, Philippines
            </p>
            <div className="flex items-center flex-wrap py-1 sm:py-2">
              <p className="text-xs sm:text-sm">
                <span>Software Engineer</span>
                <span className="text-gray-400 mx-1">\</span>
                <span>UI & UX Designer</span>
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Button
                variant="primary"
                icon={<Calendar size={12} />}
                onClick={handleScheduleCall}
              >
                Schedule a Call
              </Button>
              <div className="hidden sm:block">
                <Button variant="secondary" icon={<Mail size={12} />}>
                  Send Email
                </Button>
              </div>
              <Button
                variant="default"
                icon={<ChevronRight size={16} />}
                onClick={handleDownloadCV}
              >
              <span className="max-[430px]:hidden">View</span> Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
