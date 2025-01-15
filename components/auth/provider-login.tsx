"use client";
import { signIn } from "next-auth/react";

import { Icons } from "../icons";
import { Button } from "../ui/button";

export default function ProviderLogin() {
  const handleGoogleLogin = () => {
    signIn("google", { redirect: true, callbackUrl: "/bookings" });
  };
  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/bookings" });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:hover:bg-sky-800"
        onClick={handleGoogleLogin}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        variant="outline"
        className="dark:bg-sky-900/50 dark:border-sky-800 dark:text-sky-100 dark:hover:bg-sky-800"
        onClick={handleFacebookLogin}
      >
        <Icons.facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
    </div>
  );
}
