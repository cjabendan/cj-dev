"use client";

import { useState, useRef, useEffect } from "react";
import { SendIcon } from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi there! 👋 Thanks for checking out my portfolio. Feel free to ask me anything about web and mobile development, or my experiences in UI/UX designing. Let me know how I can help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const MAX_CHAR_LIMIT = 500;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || input.length > MAX_CHAR_LIMIT || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          chatHistory: messages.slice(1),
        }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "⚠️ You are sending messages too fast. Please wait a moment!",
          },
        ]);
      } else if (data.reply) {
        setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: "Something went wrong. Please try again!" },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Failed to connect to the assistant server." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-black text-white font-sans overflow-hidden">
      {/* Scrollable Message History Pane */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            {/* Show CJ avatar icon */}
            {msg.role === "model" && (
              <Image
                src="/images/gallery/cb.jpg"
                alt="CJ"
                width={36}
                height={36}
                priority
                className="w-7 h-7 rounded-sm object-cover bg-zinc-800 shrink-0"
              />
            )}
            <div
              className={`flex flex-col ${msg.role === "user" ? "w-full items-end" : "max-w-[85%]"}`}
            >
              {msg.role === "model" && (
                <span className="text-sm font-semibold text-black dark:text-white mb-1 pl-1">
                  Christian
                </span>
              )}
              <div
                className={`p-3 rounded-sm leading-relaxed text-[13px] ${
                  msg.role === "user"
                    ? "bg-black dark:bg-white max-w-[85%] text-white dark:text-black break-words"
                    : "bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 text-black dark:text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 pl-1">
            <Image
              src="/images/gallery/cb.jpg"
              alt="CJ"
              width={32}
              height={32}
              loading="lazy"
              className="w-7 h-7 rounded-sm object-cover shrink-0 opacity-50"
            />
            <span className="text-xs text-zinc-500 animate-pulse">
              Typing...
            </span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Styled Footer Input Action Block */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex flex-col gap-2"
      >
        <div className="flex gap-2 items-stretch">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={MAX_CHAR_LIMIT}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-black dark:text-white border border-zinc-800 text-sm px-3 py-2.5 focus:outline-hidden focus:border-zinc-600 transition-colors disabled:opacity-40 rounded-xs placeholder-zinc-600"
          />
          <button
            type="submit"
            disabled={
              isLoading || !input.trim() || input.length > MAX_CHAR_LIMIT
            }
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-600 flex items-center justify-center px-4 rounded-xs disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
            aria-label="Send message"
          >
            <SendIcon size={14} />
          </button>
        </div>

        {/* Dynamic subtext helper and metrics layout bar */}
        <div className="flex justify-between items-center text-[11px] tracking-wide text-zinc-500 px-0.5 mt-0.5 font-medium">
          <span>This chatbot is powered by Groq.</span>
          <span
            className={
              input.length >= MAX_CHAR_LIMIT ? "text-red-500 font-bold" : ""
            }
          >
            {input.length}/{MAX_CHAR_LIMIT}
          </span>
        </div>
      </form>
    </div>
  );
}
