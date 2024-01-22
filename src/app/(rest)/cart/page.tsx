import { products } from "@/data/products";
import Image from "next/image";

export default function Cart() {
  const productsInCart = [products[0], products[1]];
  return (
    <div className="w-1/2 mx-auto ">
      <span className="font-semibold text-3xl">Koszyk</span>
      <div className="flex justify-between py-5 font-medium">
        <span>Pozycje w koszyku</span>
        <span>Suma</span>
      </div>

      {productsInCart.map((p, index) => (
        <div key={index}>
          <div className="bg-white h-0.5 rounded-2xl" />
          <div className="flex justify-between pt-4 items-start">
            <div className="flex gap-4 items-start p-5">
              <div className="h-32 w-32 overflow-hidden rounded-2xl relative">
                <Image
                  src={p.image}
                  fill
                  className="object-cover"
                  alt="kwiatek"
                />
              </div>
              <div className="flex flex-grow flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-4">
                    <p className="font-medium">{p.name}</p>
                    <p className="font-medium text-sm text-gray-600">
                      {index + 1} pozycja w koszyku
                    </p>
                  </div>
                  <div className="font-medium text-right">
                    <p>
                      {p.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="bg-white h-0.5 rounded-2xl" />
      <div className="flex justify-between font-semibold text-xl py-4">
        <div>Suma Całkowita</div>
        <div>
          {productsInCart
            .reduce((pv, cv) => (pv += cv.price), 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </div>
      </div>
      <div className="flex items-center">
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Zgadzam się z{" "}
          <a
            href="#"
            className="text-yellow-600 dark:text-blue-500 hover:underline"
          >
            terms and conditions
          </a>
          .
        </label>
      </div>
      <div className="flex justify-center py-5">
        <button
          type="submit"
          className="bg-primary-button px-20 py-1.5 font-semibold rounded-2xl shadow-md"
        >
          Przejdź do płatności
        </button>
      </div>
    </div>
  );
}
