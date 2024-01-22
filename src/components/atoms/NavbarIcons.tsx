import { Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

export const NavbarIcons = () => {
  return (
    <div className="flex gap-4">
      <Link href="/shop">
        <Search />
      </Link>
      <Link href="/cart">
        <ShoppingCart />
      </Link>

      <div>
        <UserRound />
      </div>
    </div>
  );
};
