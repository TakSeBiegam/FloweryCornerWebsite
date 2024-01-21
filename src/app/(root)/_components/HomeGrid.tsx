import { Paper } from "@/components/atoms";
import { FlowerIcon } from "lucide-react";
import React from "react";

export const HomeGrid = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-x-4 gap-y-10">
      <Paper className=" flex gap-4">
        <FlowerIcon />
        Specjalne oferty
      </Paper>
      <Paper className="">Trendy kwiatki łaaaaa</Paper>
      <Paper className="">Dziwne info</Paper>
      <div className=" grid grid-cols-3 gap-2">
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
        <div className="bg-slate-50 py-2"></div>
      </div>
    </div>
  );
};
