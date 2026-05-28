import { FaCode, FaReact } from "react-icons/fa";

export default function AccessCard() {
  return (
    <div className="group relative flex min-h-[360px] cursor-pointer flex-col justify-between overflow-hidden rounded-[16px] border border-white/10 bg-gradient-to-br from-[#636466] via-[#3c3d3f] via-[#222325] to-[#121212] p-10 text-white transition-transform duration-300 [perspective:1000px] [transform-style:preserve-3d]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_120px_84px,_rgba(255,255,255,0.15),_transparent_80%)]" />

      <div className="z-10 flex h-full flex-col justify-between [transform:translateZ(30px)] [transform-style:preserve-3d]">
        <div className="text-[3rem] text-gray-200 opacity-80">
          <FaCode />
        </div>

        {/* Bottom Section */}
        <div className="mt-auto flex items-end justify-between gap-6">
          <div className="min-w-0">
            {" "}
            {/* min-w-0 allows truncation if the name gets too long */}
            <div className="truncate text-base font-black uppercase tracking-[2px] text-white">
              Cj Abendan
            </div>
            <div className="mt-1 flex items-center whitespace-nowrap text-[10px] uppercase text-gray-300 opacity-80">
              SOFTWARE ENGINEER
            </div>
          </div>

          {/* Large React Icon positioned on the right */}
          <div className="flex-shrink-0 text-[3rem] text-gray-300 opacity-20 [transform:translateZ(20px)]">
            <FaReact />
          </div>
        </div>
      </div>
    </div>
  );
}
