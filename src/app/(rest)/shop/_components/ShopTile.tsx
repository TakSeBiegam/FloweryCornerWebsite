import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const ShopTile = (product: Product) => {
  return (
    <div className="bg-white rounded-3xl flex flex-col p-5 gap-5">
      <div className="flex justify-between font-medium">
        <div className="cursor-pointer">
          {product.name}{" "}
          {product.isNew ? (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
              New
            </span>
          ) : null}
        </div>
        <div className="cursor-pointer">{product.category}</div>
      </div>

      <div className="w-full relative h-72 rounded-3xl overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 font-medium">
          <span>Cena</span>{" "}
          <span>{`${product.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} PLN`}</span>
        </div>
        <div className="flex flex-col justify-end">
          <span
            className={cn(
              "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ",
              product.available && "bg-green-100 text-green-800"
            )}
          >
            {product.available ? "Dostepny" : "Niedostępny"}
          </span>
        </div>
      </div>
    </div>
  );
};
