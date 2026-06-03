import Image from "next/image";

export default function Recommendations() {
  const avatars = ["/images/reviewer/Bacarisas.png", "/images/reviewer/Plameran.png", "/images/reviewer/Villondo.png"];

  return (
    <section className="flex flex-col mt-4 gap-6 p-4">
      <div className="flex pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold">Recommendations</h2>
      </div>

      <div className="flex flex-col gap-6">
      <div className="w-120">
          <p className="text-xl text-foreground/90 leading-relaxed">
          &quot;Working with Mr. Christian transformed our entire brand identity. The
          attention to detail was exceptional.&quot;
        </p>
      </div>

        <div className="flex items-center gap-5">
          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <div
                key={i}
                className="relative rounded-full border-1 border border-gray-200 dark:border-gray-700"
              >
                <Image
                  src={src}
                  alt="Reviewer"
                  width={36}
                  height={36}
                  style={{ width: "36px", height: "36px" }}
                  className="rounded-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Name and Title */}
          <div className="flex flex-col border-l border-gray-200 dark:border-gray-700 pl-4">
            <p className="text-base font-semibold text-foreground">Vince Michael Bacarisas</p>
            <p className="text-sm text-foreground/70">Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
