"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { orders as or } from "@/data/orders";

export default function Admin() {
  const router = useRouter();
  const [orders, setOrders] = useState(or);
  useEffect(() => {
    const authorizationObjectString = localStorage.getItem("Authorization");
    if (authorizationObjectString) {
      const authorizationObject = JSON.parse(authorizationObjectString);
      if (authorizationObject.logged) {
        setOrders(orders);
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-1/2 mx-auto ">
      <span className="font-semibold text-3xl">Lista zamówień</span>
      <div className="flex justify-between py-5 font-medium">
        <span>Pozycje w zamówieniach</span>
        <span>Suma zamówienia</span>
      </div>

      {orders &&
        orders.map(
          (o, index) =>
            o && (
              <div key={index}>
                <div className="bg-white h-0.5 rounded-2xl" />
                <div className="flex justify-between pt-4  items-start">
                  <div className="flex gap-4 items-start py-3 w-full">
                    <div className="flex flex-grow flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-4">
                          <p className="font-medium">{`id zamówienia: ${o.id}`}</p>
                        </div>
                        <div className="font-medium ">
                          <p>
                            {o.totalPrice.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {o.products.map((product) => {
                  return (
                    <div
                      key={product.name}
                      className="flex justify-between h-full pl-3"
                    >
                      <p className="font-medium">{` ${product.name}`}</p>

                      <p>{`sztuk: ${product.quantity}`}</p>
                    </div>
                  );
                })}
                <div className="flex justify-between py-5">
                  <div className="flex space-x-2">
                    <p>klient: </p>
                    <p className="font-medium">{`${o.firstName} ${o.lastName}`}</p>
                  </div>
                  <button
                    type="submit"
                    {...(o.completed
                      ? {
                          className:
                            "px-20 py-1.5 font-semibold rounded-2xl shadow-md",
                        }
                      : {
                          className:
                            "bg-primary-button px-20 py-1.5 font-semibold rounded-2xl shadow-md",
                        })}
                  >
                    Zrealizuj zamówienie
                  </button>
                </div>
              </div>
            )
        )}
      <div className="bg-white h-0.5 rounded-2xl" />
      <div className="flex justify-center py-36">
        <button
          type="submit"
          onClick={() => {
            localStorage.removeItem("Authorization");
            router.push("/");
          }}
          className="bg-primary-button px-20 py-1.5 font-semibold rounded-2xl shadow-md"
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
}
