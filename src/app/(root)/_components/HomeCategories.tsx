import { categoryRoutes } from "@/data/routes";
import React from "react";
import { CategoryTile } from "./CategoryTile";

export const HomeCategories = () => {
  return (
    <div className="flex flex-col gap-8 items-center pb-72">
      <h2 className="text-2xl font-semibold">Kategorie</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 w-full gap-4">
        {categoryRoutes.map((route) => (
          <CategoryTile key={route.label} {...route} imgSrc="" />
        ))}
      </div>
    </div>
  );
};
