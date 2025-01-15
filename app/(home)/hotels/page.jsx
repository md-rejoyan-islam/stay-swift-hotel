import { HeroSearch } from "@/components/home/hero-search";
import { SearchResults } from "@/components/hotels/search-results";

export default async function Hotels({ searchParams }) {
  return (
    <>
      <HeroSearch isShowTitle={false} />
      <SearchResults searchParams={await searchParams} />
    </>
  );
}
