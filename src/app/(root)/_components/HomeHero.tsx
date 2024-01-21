import Image from "next/image";
import React from "react";
import { HeroSearch } from "./HeroSearch";

export const HomeHero = () => {
  return (
    <section className="pt-20 flex justify-between">
      <div>
        <h1 className="text-6xl font-semibold">
          Znajdź idealne kwiaty na
          <br /> każdą okazję
        </h1>
        <p className="text-2xl py-8">Szukaj według typu, koloru, okazji</p>
        <HeroSearch />
      </div>
      <div className="relative">
        <Image
          src="/images/hero.jpeg"
          width={600}
          height={600}
          alt="Picture of the author"
        />
      </div>
    </section>
  );
};
