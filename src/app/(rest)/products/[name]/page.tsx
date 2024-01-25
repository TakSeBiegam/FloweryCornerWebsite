"use client";

import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { StarRating } from "../_components/StarRating";
import Image from "next/image";
import { useState } from "react";
import { useCartContainer } from "@/logic/cart";
import { useRouter } from "next/navigation";
import { ProductQuantity } from "../ProductQuantity";

export default function Product({ params }: { params: { name: string } }) {
  const FlowerId = Number.parseInt(params.name);
  const { push } = useRouter();
  const p = products.find((p) => FlowerId === p.id) || products[0];
  const { saveCart } = useCartContainer();
  const [quantity, setQuantity] = useState(0);
  const handleSubtrackQuantity = () =>
    setQuantity((p) => (p - 1 < 0 ? p : p - 1));
  const handleAddQuantity = () => setQuantity((p) => (p + 1 > 99 ? p : p + 1));

  if (!p) {
    //Handle it somehow
    return <></>;
  }
  return (
    <div className="grid grid-cols-[2fr_2fr] p-5 gap-20">
      <div>
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <Image
            className="object-cover"
            fill
            src={p.image}
            alt="image description"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="font-medium text-5xl">{p.name}</span>
        <div className="text-ellipsis font-light">{p.description}</div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span>Ocena</span>
            <span>{StarRating(p.rate)}</span>
          </div>

          <div className="flex flex-col justify-end">
            <span
              className={cn(
                "bg-red-100 text-red-800 text-xs font-semibold me-2 px-5 py-1 rounded-full ",
                p.available && "bg-green-100 text-green-800"
              )}
            >
              {p.available ? "Dostepny" : "Niedostępny"}
            </span>
          </div>
        </div>
        <div>
          <ProductQuantity
            addQuantity={handleAddQuantity}
            subtractQuantity={handleSubtrackQuantity}
            quantity={quantity}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-button px-6 py-2 font-semibold rounded-2xl shadow-md"
        >
          Złóż ofertę
        </button>
        <button
          type="button"
          onClick={() => {
            if (quantity > 0 && p.available) {
              saveCart([{ ...p, quantity }]);
              push("/cart");
            }
          }}
          className="py-2 px-6  font-semibold shadow-md text-gray-900 bg-white rounded-2xl  hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}
