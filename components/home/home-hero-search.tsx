"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeHeroSearch({
  isShowTitle,
}: {
  isShowTitle: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [checkIn, setCheckIn] = useState<Date | null>(
    searchParams?.get("checkIn")
      ? new Date(searchParams.get("checkIn") as string)
      : null
  );

  const [checkOut, setCheckOut] = useState<Date | null>(
    searchParams?.get("checkOut")
      ? new Date(searchParams?.get("checkOut") as string)
      : null
  );

  const [search, setSearch] = useState<string>(
    searchParams.get("destination") || ""
  );

  const doSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("destination", search);
    }
    if (checkIn) {
      params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    } else {
      params.set("checkIn", format(new Date(), "yyyy-MM-dd"));
    }
    if (checkOut) {
      params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    }

    if (pathname.includes("/hotels")) {
      router.push(`${pathname}?${params.toString()}`);
    } else {
      router.push(`/hotels?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (pathname === "/hotels" && !searchParams.get("checkIn")) {
      setCheckIn(new Date());
      router.push(`/hotels?checkIn=${format(new Date(), "yyyy-MM-dd")}`);
    }
  }, [router, searchParams, pathname]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative pb-12 md:pb-0">
      <div className="space-y-2">
        <label className="text-sm font-medium dark:text-sky-100">
          Destination
        </label>
        <Select
          onValueChange={(value) => setSearch(value)}
          value={searchParams.get("destination") || undefined}
        >
          <SelectTrigger className="dark:bg-sky-800 dark:text-sky-100 dark:border-sky-700 bg-white ">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent className="dark:bg-sky-800 dark:text-sky-100">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sylhet">Sylhet</SelectItem>
            <SelectItem value="dhaka">Dhaka</SelectItem>
            <SelectItem value="bali">Bali</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium dark:text-sky-100">
          Check in
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white dark:bg-sky-800 dark:text-sky-100 dark:border-sky-700"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkIn ? (
                format(checkIn, "yyyy-MM-dd")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 dark:bg-sky-800">
            <Calendar
              mode="single"
              selected={checkIn || undefined}
              onSelect={(day) => setCheckIn(day || null)}
              initialFocus
              disabled={(data) => data < new Date()}
              className="dark:bg-sky-800 dark:text-sky-100 bg-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium dark:text-sky-100">
          Check out
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white dark:bg-sky-800 dark:text-sky-100 dark:border-sky-700"
              disabled={
                !checkIn ||
                (checkIn &&
                  checkOut &&
                  checkIn.getTime() > checkOut.getTime()) ||
                false
              }
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkOut ? (
                format(checkOut, "yyyy-MM-dd")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 dark:bg-sky-800">
            <Calendar
              mode="single"
              selected={checkOut || undefined}
              onSelect={(day) => setCheckOut(day || null)}
              initialFocus
              disabled={(data) => (checkIn ? data < checkIn : false)}
              className="dark:bg-sky-800 dark:text-sky-100"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full md:relative absolute -bottom-[50px] md:bottom-0 left-0">
        <Button
          className="w-full h-[65px]  md:h-full  md:mt-0 bg-[#ff6a28] hover:bg-[#ff6a28]/85  dark:text-white "
          onClick={doSearch}
        >
          <Search className="mr-2 h-4 w-4" />
          {!isShowTitle ? "Modify Search" : "Search"}
        </Button>
      </div>
    </div>
  );
}
