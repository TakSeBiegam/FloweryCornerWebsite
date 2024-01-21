import { Paper } from "@/components/atoms";
import Link from "next/link";
import React from "react";

interface CategoryTilesProps {
  href: string;
  label: string;
  imgSrc: string;
}

export const CategoryTile: React.FC<CategoryTilesProps> = ({
  href,
  imgSrc,
  label,
}) => {
  return (
    <Link href={href}>
      <Paper className=" flex items-center justify-center">{label}</Paper>
    </Link>
  );
};
