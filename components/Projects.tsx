"use client";

import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  return (
    <section className="flex flex-col mt-4 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Projects</h2>
        <Link
          href="/certifications"
          className="text-xs text-foreground/70 hover:text-foreground transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="max-w-[260px] min-h-[160px] border border-gray-100 dark:border-gray-900 rounded-xs">
          <div>
            <Image
              src="/images/thesis.png"
              alt="School Guidance Record Management System"
              width={260}
              height={260}
              loading="eager"
              style={{ width: "auto", height: "160px" }}
              className="rounded-t-xs object-cover bg-gray-200 dark:bg-gray-800"
            />
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-muted-foreground">
                School Guidance Record Management System
              </h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
                exercitationem?
              </p>
            </div>
            <div>
              <h3>Tech Stack</h3>
            </div>
          </div>
        </div>
       <div className="max-w-[260px] border border-gray-100 dark:border-gray-900 rounded-xs">
          <div>
            <Image
              src="/images/tmi.png"
              alt="School Guidance Record Management System"
              width={260}
              height={260}
              loading="eager"
              style={{ width: "auto", height: "160px" }}
              className="rounded-t-xs object-cover bg-gray-200 dark:bg-gray-800"
            />
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-muted-foreground">
                School Guidance Record Management System
              </h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
                exercitationem?
              </p>
            </div>
            <div>
              <h3>Tech Stack</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
