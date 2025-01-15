"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SortByStar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category: number[] = searchParams.get("category")
    ? decodeURI(searchParams.get("category") as string)
        ?.split("|")
        ?.map((item) => Number(item)) ?? []
    : [];
  const [query, setQuery] = useState<number[]>(category);

  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleChange = (star: number) => {
    setQuery((prev) => {
      const updatedQuery = prev.includes(star)
        ? prev.filter((item) => item !== star)
        : [...prev, star];

      if (updatedQuery.length > 0) {
        params.set("category", encodeURI(updatedQuery.join("|")));
      } else {
        params.delete("category");
      }
      replace(`${pathname}?${params.toString()}`);

      return updatedQuery;
    });
  };

  return (
    <div>
      <h3 className="font-semibold mb-4 dark:text-sky-100">Star Category</h3>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center space-x-2">
            <Checkbox
              id={`${star}-star`}
              className="dark:border-sky-600"
              onClick={() => handleChange(star)}
              checked={query.includes(star)}
            />
            <label htmlFor={`${star}-star`} className="dark:text-sky-100">
              {star} Star
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
