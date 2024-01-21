import { HomeCategories } from "./_components/HomeCategories";
import { HomeGrid } from "./_components/HomeGrid";
import { HomeHero } from "./_components/HomeHero";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-6">
      <HomeHero />
      <HomeCategories />
      <HomeGrid />
    </div>
  );
}
