"use client";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortByRange() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const priceRanges = [
    {
      min: 0,
      max: 10000,
      label: "All",
    },
    {
      min: 10,
      max: 100,
      label: "$ 10 - $ 100",
    },
    {
      min: 100,
      max: 150,
      label: "$ 100 - $ 150",
    },
    {
      min: 150,
      max: 250,
      label: "$ 150 - $ 250",
    },
    {
      min: 250,
      max: 320,
      label: "$ 250 - $ 320",
    },
    {
      min: 320,
      max: 400,
      label: "$ 320 - $ 400",
    },
    {
      min: 400,
      max: 10000,
      label: "$ 400+",
    },
  ];

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const range = priceRanges[parseInt(value)];

    if (range.min === 0 && range.max === 10000) {
      params.delete("minPrice");
      params.delete("maxPrice");
      replace(`${pathname}?${params.toString()}`);
      return;
    } else {
      params.set("minPrice", range.min.toString());
      params.set("maxPrice", range.max.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };
  return (
    <div>
      <h3 className="font-semibold mb-4 dark:text-sky-100">Price Range</h3>
      <div className="space-y-2">
        <RadioGroup
          defaultValue="0"
          onValueChange={handleChange}
          className="space-y-3"
        >
          {priceRanges.map((range, index) => (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              key={index}
            >
              <RadioGroupItem value={index.toString()} id={index.toString()} />
              <Label htmlFor={index.toString()} className="cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
