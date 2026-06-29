"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageSquareMoreIcon, XIcon } from "lucide-react";
import ChatUI from "./ChatUI";

export default function BotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed z-[100] bottom-4 right-4 bg-black dark:bg-white text-white dark:text-black px-4 sm:px-6 py-3 rounded-sm 
        shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:opacity-90 transition-all flex items-center gap-2 group cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MessageSquareMoreIcon
          size={16}
          className="font-medium animate-wiggle"
        />
        <span className="text-sm sm:text-base font-medium">
          Chat with Christian
        </span>
      </button>
      {/* Chat UI Container */}
      <div
        className={`fixed z-[100] bg-white dark:bg-black bottom-20 right-4 w-[calc(100vw-32px)] sm:w-96 h-[620px] max-h-[70vh] border border-gray-200 dark:border-gray-800 rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto block"
            : "opacity-0 scale-95 pointer-events-none hidden"
        }`}
      >
        <div className="flex justify-between gap-3 p-4 items-center bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 text-zinc-800 dark:text-zinc-200">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/gallery/cb.jpg"
              alt="Christian James Abendan"
              width={42}
              height={42}
              priority
              className="h-9 w-9 rounded-sm object-cover bg-gray-200 dark:bg-gray-800"
            />
            <div className="flex flex-col">
              <h3 className="font-bold tracking-wide">Chat with Christian</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-xs tracking-wider text-green-500">
                  Active Now
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 p-1 transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <XIcon size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatUI />
        </div>
      </div>
    </>
  );
}
