"use client";

export default function CTA() {
  return (
    <section className="bg-black text-white mt-12 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold">Let&apos;s work together</h2>
            <p className="text-lg text-gray-400 dark:text-gray-300 mt-4">
              I&apos;m always looking for new opportunities and collaborations.
              <br />
              <br />
              Feel free to reach out if you need help with consulting, web
              development, mobile apps, or custom software solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <a
                href="mailto:cjamesabendan@gmail.com"
                className="text-white font-medium underline"
              >
                cjamesabendan@gmail.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Availability</h3>
              <p className="text-gray-400 text-sm">
                Currently accepting new projects.
              </p>
            </div>
          </div>
        </div>
        <form className="px-4 py-6 rounded-xs flex flex-col gap-4 border border-gray-500 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">First name *</label>
              <input
                type="text"
                className="bg-black border border-gray-700 p-2 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Last name *</label>
              <input
                type="text"
                className="bg-black border border-gray-700 p-2 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email"
              className="bg-black border border-gray-700 p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Message *</label>
            <textarea
              className="bg-black border border-gray-700 p-2 rounded-md h-32"
              required
            ></textarea>
          </div>
          <button
            className="inline-flex max-[445px]:h-7 h-9 items-center justify-center rounded bg-black dark:bg-white text-white dark:text-black 
        px-4 text-xs font-semibold gap-1 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
