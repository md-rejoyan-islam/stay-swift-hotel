import clsx from "clsx";
import Image from "next/image";
import HomeHeroSearch from "./home-hero-search";

export function HeroSearch({
  isShowTitle = true,
  isHome = false,
}: {
  isShowTitle?: boolean;
  isHome?: boolean;
}) {
  return (
    <div
      className={clsx(
        isHome ? "min-h-screen" : "min-h-[550px]",
        "relative  flex items-center justify-center overflow-hidden"
      )}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Hero background"
          width={1600}
          height={800}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      <div className=" relative z-10 mx-auto px-4 pb-16 md:pb-0 container pt-10 md:pt-0">
        <div
          className={clsx(
            isShowTitle ? "" : "hidden",
            "text-center text-black mb-8"
          )}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            Hotel for memorable moments rich in emotions
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            We have 459 rooms spread throughout Indonesia with room standards
            equivalent to 5 star hotels.
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-[2px] border border-sky-200 dark:border-sky-300/60  dark:bg-sky-900/40 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <HomeHeroSearch isShowTitle={isShowTitle} />
        </div>
      </div>
    </div>
  );
}
