import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { StarRating } from "../_components/StarRating";
import Image from "next/image";

const ProductQuantity = () => {
  return (
    <form className="max-w-xs">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Wybierz ilość:
      </label>
      <div className="relative flex items-start max-w-[10rem]">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Wybierz"
          required
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      <p
        id="helper-text-explanation"
        className="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Proszę wybrać ilość
      </p>
    </form>
  );
};

export default function Product({ params }: { params: { name: string } }) {
  const FlowerId = Number.parseInt(params.name);
  const p = products.find((p) => FlowerId === p.id);
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
          <ProductQuantity />
        </div>
        <button
          type="submit"
          className="bg-primary-button px-6 py-2 font-semibold rounded-2xl shadow-md"
        >
          Złóż ofertę
        </button>
        <button
          type="button"
          className="py-2 px-6  font-semibold shadow-md text-gray-900 bg-white rounded-2xl  hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}
