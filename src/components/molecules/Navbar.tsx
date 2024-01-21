import styles from "@/app/styles/navbar/navbar.module.css";
import { navbarRoutes } from "@/data/routes";
import { Flower2 } from "lucide-react";
import Link from "next/link";
import { NavbarIcons } from "../atoms";

export const Navbar = () => {
  return (
    <nav className="container mx-auto px-4">
      <div className=" flex justify-between border-b-4 items-center py-6 ">
        <div className="flex gap-16">
          <Flower2 />
          <div className="flex gap-4 font-semibold">
            {navbarRoutes.map(({ href, label }) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
        <NavbarIcons />
      </div>
    </nav>
  );
};
