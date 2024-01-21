import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

interface FlowerTileProps {
  name: string;
  imgSrc: string;
}

export const FlowerTile: React.FC<FlowerTileProps> = ({ name, imgSrc }) => {
  return (
    <div className="bg-slate-50 rounded-md shadow-md cursor-pointer">
      <div className="w-full h-56 rounded-md relative overflow-hidden">
        <Image fill src={imgSrc} alt="flower" className="object-cover" />
      </div>
      <div className="p-4 font-medium flex justify-between">
        <span>{name}</span>
        <Heart className="cursor-pointer" />
      </div>
    </div>
  );
};
