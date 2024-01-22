import { HeroSearch } from "@/app/(root)/_components/HeroSearch";
import { ShopTile } from "./_components/ShopTile";
import { products } from "@/data/products";

export default function Shop() {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-5">
      <div className="bg-cyan-900">FILTERS</div>
      <div className=" gap-7 flex flex-col">
        <HeroSearch />
        <div className="grid grid-cols-3 gap-5">
          {products.map((p) => (
            <ShopTile {...p} key={p.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
