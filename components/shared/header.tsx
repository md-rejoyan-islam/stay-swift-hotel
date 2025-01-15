"use client";

import { Button } from "@/components/ui/button";
import { SessionType } from "@/lib/types";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import ThemeToggle from "../theme/theme-toggle";
import Navlink from "./navlink";

export default function Header({
  sidemenu = true,
  session,
}: {
  sidemenu?: boolean;
  session?: SessionType;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/" || pathname === "/hotels";

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/login");
  };

  return (
    <header
      className={clsx(
        " max-width top-0 z-50 w-full px-4",
        isHome
          ? "md:absolute inset-x-0 text-black dark:text-white dark:md:text-black"
          : "dark:text-white border-b border-sky-200/30 dark:border-sky-800/20"
      )}
    >
      <div className=" flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/icon.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full "
          />
          <span className="text-xl font-bold ">Stay Swift</span>
        </Link>

        <nav className={clsx("hidden md:flex items-center space-x-6 ")}>
          {sidemenu && (
            <>
              <Navlink href="/recommended">Recommended Places</Navlink>
              <Navlink href="/about">About Us</Navlink>
              <Navlink href="/contact">Contact us</Navlink>

              {session?.user?.name ? (
                <>
                  <Navlink href="/bookings">Bookings</Navlink>

                  <Button
                    onClick={handleLogout}
                    className=" bg-[#ff6a28] text-white py-2 px-3 rounded-md"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link
                  href={"/login"}
                  className=" bg-[#ff6a28] text-white py-2 px-3 rounded-md"
                >
                  Login
                </Link>
              )}
            </>
          )}
          <ThemeToggle isHome={isHome} />
        </nav>

        <div className="flex gap-2 md:hidden">
          <ThemeToggle isHome={isHome} />
          <Button
            variant="ghost"
            size="icon"
            className={clsx(
              "md:hidden bg-[#ff6a28]/10 hover:bg-[#ff6a28]/20",
              isHome
                ? "text-black  dark:text-sky-100"
                : "text-black dark:text-white "
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-background dark:bg-sky-900/5 rounded-md dark:text-white">
            <Navlink href="/recommended">Recommended Places</Navlink>
            <Navlink href="/about">About Us</Navlink>
            <Navlink href="/contact">Contact us</Navlink>
            <Navlink href="/bookings">Bookings</Navlink>

            <Button
              variant="default"
              className="w-full bg-[#ff6a28] dark:text-sky-100 hover:bg-[#ff6a28]/90"
            >
              Login
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
