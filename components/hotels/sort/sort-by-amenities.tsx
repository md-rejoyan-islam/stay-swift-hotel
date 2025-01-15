import { Checkbox } from "@/components/ui/checkbox";

export default function SortByAmenities() {



  return (
    <div>
      <h3 className="font-semibold mb-4 dark:text-sky-100">Amenities</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="wifi" className="dark:border-sky-600" />
          <label htmlFor="wifi" className="dark:text-sky-100">
            Wi-fi
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="pool" className="dark:border-sky-600" />
          <label htmlFor="pool" className="dark:text-sky-100">
            Swimming Pool
          </label>
        </div>
      </div>
    </div>
  );
}
