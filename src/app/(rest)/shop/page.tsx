"use client";

import { HeroSearch } from "@/app/(root)/_components/HeroSearch";
import { ShopTile } from "./_components/ShopTile";
import { products } from "@/data/products";
import { shopFilters } from "@/data/mockData";
import { Filter } from "./_components/Filter";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Shop() {
  const { back } = useRouter();
  return (
    <>
      <div className="grid grid-cols-[1fr_3fr] gap-5 select-none">
        <div className="flex flex-col gap-6">
          <HeroSearch />
          {shopFilters.map((filter) => (
            <Filter key={filter.header} {...filter} />
          ))}
        </div>
        <div className=" gap-7 flex flex-col">
          <div className="grid grid-cols-3 gap-5">
            {products.map((p) => (
              <ShopTile {...p} key={p.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
