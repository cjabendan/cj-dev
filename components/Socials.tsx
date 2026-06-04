import Image from "next/image";
import socialsData from "@/data/socials.json";



export default function Socials() {

    const sortedSocials = [...socialsData].sort((a, b) => b.id - a.id);

  return (
    <div className="flex items-center gap-2">
      {sortedSocials.map((social) => (
        <a
          key={social.id}
          href={social.link}
          className="opacity-90 border border-gray-100 dark:border-gray-900 rounded-xs p-2 hover:opacity-100 transition-opacity"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={social.svgPath}
            alt={social.platform}
            width={24}
            height={24}
            style={{ filter: social.platform === "GitHub" ? "invert(1)" : "none", width: "18px", height: "18px" }}
            className={`opacity-90 hover:opacity-100 object-contain `}
          />
        </a>
      ))}
    </div>
  );
}
