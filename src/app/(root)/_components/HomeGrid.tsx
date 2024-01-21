import React from "react";

export const HomeGrid = () => {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-x-4 gap-y-10">
      <div className="py-2 bg-slate-50">Specjalne oferty</div>
      <div className="py-2 bg-slate-50">Trendy kwiatki łaaaaa</div>
      <div className="py-2 bg-slate-50">Dziwne info</div>
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
