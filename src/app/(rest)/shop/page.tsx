"use client";

import { HeroSearch } from "@/app/(root)/_components/HeroSearch";
import { ShopTile } from "./_components/ShopTile";
import { products } from "@/data/products";
import { shopFilters } from "@/data/mockData";
import { Filter } from "./_components/Filter";
import { useEffect, useState } from "react";

export default function Shop() {
  const productsOnPage = products;
  const [filteredProducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const titleParam = queryParams.get("title");
    if (!titleParam || titleParam === "") {
      setFilteredProducts(products);
    } else {
      const regex = new RegExp(titleParam, "i");
      const filteredProducts = productsOnPage.filter((product) =>
        regex.test(product.name)
      );
      if (filteredProducts.length === 0) {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(filteredProducts);
      }
    }
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
            {filteredProducts.map((p) => (
              <ShopTile {...p} key={p.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
