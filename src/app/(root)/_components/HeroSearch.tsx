"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const HeroSearch = () => {
  const [searchText, setSearchText] = useState("");
  const { push } = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/shop?title=${searchText}`);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex bg-slate-50 p-2 rounded-md shadow-md gap-4">
        <input
          className="focus:outline-none bg-slate-50"
          type="text"
          onChange={handleInputChange}
        />
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
