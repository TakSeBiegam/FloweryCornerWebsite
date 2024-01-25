import { Paper } from "@/components/atoms";
import { FlowerTile } from "@/components/atoms/FlowerTile";
import { homePageGridMockData } from "@/data/mockData";
import { ChevronLeft, ChevronRight, FlowerIcon } from "lucide-react";
import React from "react";

export const HomeGrid = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-x-4 gap-y-10">
      <Paper className=" flex gap-4">
        <FlowerIcon />
        <p className="font-medium">Specjalne oferty</p>
      </Paper>
      <Paper className="flex justify-between">
        <p className="font-medium">Trendy florystyczne</p>
        <div className="flex">
          <ChevronLeft className="cursor-pointer" />
          <ChevronRight className="cursor-pointer" />
        </div>
      </Paper>
      <Paper className="max-h-96">REKLAMA</Paper>
      <div className=" grid grid-cols-3 gap-6">
        {homePageGridMockData.map((data) => (
          <FlowerTile {...data} key={data.name} />
        ))}
      </div>
    </div>
  );
};
