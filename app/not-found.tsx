import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-4xl font-bold mb-4 dark:text-sky-100">
        404 - Page Not Found
      </h1>
      <p className="text-xl mb-8 text-center dark:text-sky-200">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <img
        src="/placeholder.svg?height=200&width=200"
        alt="404 illustration"
        className="mb-8"
        width={200}
        height={200}
      />
      <Button
        asChild
        className="dark:bg-violet-600 dark:text-sky-100 dark:hover:bg-violet-700"
      >
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
