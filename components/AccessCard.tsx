"use client";
import { useRef } from "react";
import { FaCode, FaReact } from "react-icons/fa";

export default function AccessCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();

    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    cardRef.current.style.setProperty("--rx", `${y * -25}deg`);
    cardRef.current.style.setProperty("--ry", `${x * 25}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", "0deg");
    cardRef.current.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="flex justify-center mb-2">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex min-h-[340px] w-full max-w-[250px] cursor-pointer flex-col justify-between overflow-hidden rounded-[16px] border border-white/10 bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] px-8 pt-12 pb-8 text-white transition-transform duration-150 ease-out [perspective:1000px] [transform-style:preserve-3d] shadow-2xl shadow-black/60 will-change-transform"
        style={{
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        }}
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-80" />
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_120px_84px,_rgba(255,255,255,0.08),_transparent_60%)]" />

        <div className="relative z-10 flex h-full flex-col justify-between [transform:translateZ(30px)]">
          <div className="text-[2.3rem] text-gray-200 opacity-80">
            <FaCode />
          </div>

          <div className="mt-auto flex items-end justify-between gap-6">
            <div className="min-w-0">
              <div className="truncate text-xs font-black uppercase tracking-[2px] text-white">
                Cj Abendan
              </div>
              <div className="my-1.5 flex items-center whitespace-nowrap text-[8px] uppercase text-gray-300 opacity-80">
                ASPIRING SOFTWARE ENGINEER
              </div>
            </div>
            <div className="flex-shrink-0 text-[3.2rem] text-gray-300 opacity-20 [transform:translateZ(20px)]">
              <FaReact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
