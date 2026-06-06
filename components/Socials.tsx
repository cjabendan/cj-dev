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
          className="border border-gray-100 dark:border-gray-900 rounded-xs p-2"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={social.svgPath}
            alt={social.platform}
            width={24}
            height={24}
            style={{ width: "16px", height: "16px" }}
            className={`opacity-80 hover:opacity-100 object-contain ${
              social.platform === "GitHub" ? "dark:invert" : ""
            }`}
          />
        </a>
      ))}
    </div>
  );
}
