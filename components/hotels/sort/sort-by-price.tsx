"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortByPrice() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h3 className="font-semibold mb-3 dark:text-sky-100">Sort By</h3>
      <div className="space-y-5">
        <RadioGroup defaultValue="desc" onValueChange={handleChange}>
          <div className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="asc" id="option-one" />
            <Label htmlFor="option-one" className="cursor-pointer">
              Price Low to High
            </Label>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem value="desc" id="option-two" />
            <Label htmlFor="option-two" className="cursor-pointer">
              Price High to Low
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
