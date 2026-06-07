"use client";

import Image from "next/image";
import { Check, MapPin, Calendar, Download, VerifiedIcon } from "lucide-react";
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
              <p className="max-[460px]:text-base text-xl font-bold truncate">
                <span className="inline min-[470px]:hidden">Dev. CJ</span>
                <span className="hidden min-[470px]:inline min-[530px]:hidden">
                  Dev. CJ Abendan
                </span>
                <span className="hidden min-[530px]:inline sm:hidden">
                  Dev. Christian Abendan
                </span>
                <span className="hidden sm:inline">
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

          <div className="flex gap-x-4 text-sm">
            <p className="max-[460px]:text-[11px] text-sm text-foreground/70 mt-0.5 flex items-center gap-1 font-medium">
              <MapPin size={12} className="mr-0 sm:mr-1 shrink-0" />
              <span className="block max-[470px]:hidden">Minglanilla, </span>
              Cebu, Philippines
            </p>
          </div>
          <div className="flex items-center flex-wrap mt-1.5 sm:mt-3">
            <p className="max-[470px]:text-xs text-sm">
              <span>Software Engineer</span>
              <span className="text-gray-400 mx-2">\</span>
              <span>Full-Stack Developer</span>
            </p>
          </div>

          <div className="mt-3 max-[460px]:mt-2">
            <div className="flex max-[460px]:flex-col flex-row gap-2">
              <Button
                variant="primary"
                icon={<Calendar size={12} />}
                onClick={handleScheduleCall}
                className="max-[445px]:w-full"
              >
                Schedule<span>a Call</span>
              </Button>

              <Button
                variant="secondary"
                icon={<Download size={12} />}
                onClick={handleDownloadCV}
                className="max-[445px]:w-full"
              >
                <span>Download </span>CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
