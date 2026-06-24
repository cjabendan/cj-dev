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
    window.open("https://zcal.co/cjamesabendan", "_blank");
  };

  const handleViewResume = () => {
    window.open("/assets/resume.pdf", "_blank");
  };

  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex items-center gap-4 sm:gap-6">
        <Image
          src="/images/gallery/Pfp.png"
          alt="Christian James Abendan"
          width={160}
          height={160}
          priority
          className="rounded-sm object-cover bg-gray-200 dark:bg-gray-800"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold truncate">
                <span className="min-[360px]:hidden">CJ</span>
                <span className="hidden min-[360px]:inline min-[430px]:hidden">
                  Christian
                </span>
                <span className="hidden min-[430px]:inline min-[560px]:hidden">
                  Christian Abendan
                </span>
                <span className="hidden min-[560px]:inline">
                  Christian James A. Abendan
                </span>
              </h1>
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

          <div className="flex flex-col">
            <p className="text-[9px] sm:text-sm text-zinc-800 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
              <MapPin  className="w-2 h-2 sm:w-3 sm:h-3 mr-0 sm:mr-1 shrink-0" />
              <span className="block max-[490px]:hidden">Minglanilla, </span>
              Cebu, Philippines
            </p>
            <div className="flex items-center flex-wrap py-1 sm:py-2">
              <p className="text-[10px] sm:text-base font-medium">
                <span>Software Engineer</span>
                <span className="text-gray-400 mx-1">\</span>
                <span>Web & Mobile Developer</span>
              </p>
            </div>
            <div className="flex flex-col items-start min-[437px]:flex-row gap-1 sm:gap-2 mt-1 md:mt-2">
              <Button
                variant="primary"
                icon={<Calendar className="w-3 h-3 sm:w-4 sm:h-4" />}
                onClick={handleScheduleCall}
              >
                Schedule a Call
              </Button>
              <div className="hidden sm:block">
                <Button variant="secondary" icon={<Mail  className="w-4 h-4" />}>
                  Send Email
                </Button>
              </div>
              <Button
                variant="default"
                icon={<ChevronRight  className="w-3 h-3 sm:w-4 sm:h-4" />}
                onClick={handleViewResume}
              >
                View Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
