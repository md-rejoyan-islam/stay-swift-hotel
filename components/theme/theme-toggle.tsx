"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function ThemeToggle({ isHome }: { isHome: boolean }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }

          // theme === "light" ? setTheme("dark") : setTheme("light");
        }}
        aria-label="Toggle theme"
        className={clsx(
          "border-gray-100 bg-sky-50 dark:bg-transparent  md:border-[#ff6a28]/30 border dark:border-white/5 md:dark:border-gray-300 dark:hover:bg-[#ff6a28] dark:hover:text-white",
          isHome
            ? "dark:text-white md:dark:text-black  dark:hover:text-white  "
            : "dark:text-white dark:hover:text-white"
        )}
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </>
  );
}

export default ThemeToggle;
