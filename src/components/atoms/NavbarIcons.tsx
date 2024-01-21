import { Search, ShoppingCart, UserRound } from "lucide-react";
import React from "react";

export const NavbarIcons = () => {
  return (
    <div className="flex gap-4">
      <Search />
      <ShoppingCart />
      <UserRound />
    </div>
  );
};
