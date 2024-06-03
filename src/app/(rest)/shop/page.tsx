"use client";

import { HeroSearch } from "@/app/(root)/_components/HeroSearch";
import { ShopTile } from "./_components/ShopTile";
import { shopFilters } from "@/data/mockData";
import { Filter } from "./_components/Filter";
import { useEffect, useState } from "react";
import { useBackend } from "@/external/client";
import { ModelTypes } from "@/types/zeus";

type Products = ModelTypes["Product"][];

export default function Shop() {
  const { getProducts } = useBackend();
  const [filteredProducts, setFilteredProducts] = useState<
    undefined | Products
  >();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const products = await getProducts();
        setFilteredProducts(products);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
            {filteredProducts?.map((p) => (
              <ShopTile {...p} key={p.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
