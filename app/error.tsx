"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold mb-4 dark:text-sky-100">
        Oops! Something went wrong
      </h1>
      <p className="text-xl mb-8 text-center dark:text-sky-200">
        We apologize for the inconvenience. An error has occurred.
      </p>
      <img
        src="/placeholder.svg?height=200&width=200"
        alt="Error illustration"
        className="mb-8"
        width={200}
        height={200}
      />
      <Button
        onClick={reset}
        className="dark:bg-violet-600 dark:text-sky-100 dark:hover:bg-violet-700"
      >
        Try again
      </Button>
    </div>
  );
}
