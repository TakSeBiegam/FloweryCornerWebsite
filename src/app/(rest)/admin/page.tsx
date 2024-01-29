"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { orders } from "@/data/orders";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const authorizationObjectString = localStorage.getItem("Authorization");
    if (authorizationObjectString) {
      const authorizationObject = JSON.parse(authorizationObjectString);
      if (authorizationObject.logged) {
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-1/2 mx-auto ">
      <span className="font-semibold text-3xl">Koszyk</span>
      <div className="flex justify-between py-5 font-medium">
        <span>Pozycje w koszyku</span>
        <span>Suma</span>
      </div>

      {orders.map(
        (p, index) =>
          p && (
            <div key={index}>
              <div className="bg-white h-0.5 rounded-2xl" />
              <div className="flex justify-between pt-4  items-start">
                <div className="flex gap-4 items-start py-5 w-full">
                  <div className="flex flex-grow flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col  gap-4">
                        <p className="font-medium">{`id zamówienia: ${p.id}`}</p>
                      </div>
                      <div className="font-medium ">
                        <p>
                          {p.totalPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {p.products.map((product) => {
                return (
                  <div
                    key={product.name}
                    className="flex justify-between h-full"
                  >
                    <p className="font-medium">{`produkt: ${product.name}`}</p>
                    <p>{`sztuk: ${product.quantity}`}</p>
                  </div>
                );
              })}
              <div className="flex justify-end py-5">
                <button
                  type="submit"
                  className="bg-primary-button px-20 py-1.5 font-semibold rounded-2xl shadow-md"
                >
                  Zrealizuj zamówienie
                </button>
              </div>
            </div>
          )
      )}
      <div className="bg-white h-0.5 rounded-2xl" />
    </div>
  );
}
