import { Chain, ZeusScalars } from "@/types/zeus";

const apiUrl = "http://localhost:8080/graphql";

export const useBackend = () => {
  const chain = (opts: "query" | "mutation") => {
    return Chain(apiUrl)(opts, {
      scalars,
    });
  };
  const getProduct = async (name: string) => {
    const response = await chain("query")({
      getProduct: [
        { _id: name },
        {
          images: true,
          available: true,
          category: true,
          createdAt: true,
          rate: true,
          updatedAt: true,
          _id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
        },
      ],
    });

    if (!response) {
      throw new Error("Invalid response from backend ContactForm");
    }

    return response.getProduct;
  };
  const getProducts = async () => {
    const response = await chain("query")({
      getProducts: [
        { filter: {} },
        {
          products: {
            images: true,
            available: true,
            category: true,
            createdAt: true,
            rate: true,
            updatedAt: true,
            _id: true,
            name: true,
            description: true,
            price: true,
            quantity: true,
          },
        },
      ],
    });

    if (!response) {
      throw new Error("Invalid response from backend ContactForm");
    }

    return response.getProducts?.products;
  };
  const getBlogs = async () => {
    const response = await chain("query")({
      getBlogs: {
        _id: true,
        createdAt: true,
        text: true,
        image: true,
        title: true,
      },
    });

    if (!response) {
      throw new Error("Invalid response from backend ContactForm");
    }

    return response.getBlogs;
  };
  const getBlog = async (id: string) => {
    const response = await chain("query")({
      getBlog: [
        { id },
        {
          _id: true,
          text: true,
          createdAt: true,
          title: true,
          image: true,
        },
      ],
    });

    if (!response) {
      throw new Error("Invalid response from backend ContactForm");
    }

    return response.getBlog;
  };
  return {
    getProducts,
    getProduct,
    getBlog,
    getBlogs,
  };
};

export const scalars = ZeusScalars({
  Date: {
    decode: (e: unknown) => new Date(e as string),
    encode: (e: unknown) => (e as Date).toISOString(),
  },
});
