"use client";

import { Search } from "lucide-react";
import React from "react";

export const HeroSearch = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex bg-slate-50 p-2 rounded-md shadow-md gap-4">
        <input className="focus:outline-none bg-slate-50" type="text" />
        <Search />
      </div>
      <button
        type="submit"
        className="bg-primary-button px-6 py-2 font-semibold rounded-md shadow-md"
      >
        Szukaj
      </button>
    </form>
  );
};
