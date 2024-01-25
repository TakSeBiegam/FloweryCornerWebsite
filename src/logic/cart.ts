'use client'

import { Product } from "@/data/products";
import { useState } from "react";
import { createContainer } from "unstated-next";

const CartContainer = createContainer(() => {
    const [cart, setCart] = useState<Product[]>(() => {
        if (typeof localStorage !== "undefined") {
            const savedCart = JSON.parse(localStorage.getItem("Cart") || "[]");
            return savedCart;
        }
        return [];
    });

    const saveCart = (items: Product[]) => {
        if (cart[0] === null) {
            setCart(items);
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("Cart", JSON.stringify(items));
            }
            return;
        }
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            items.forEach((product) => {
                const indexItemInInventory = updatedCart.findIndex((p) => p.id === product.id);
                if (indexItemInInventory === -1) {
                    updatedCart.push(product);
                } else {
                    updatedCart[indexItemInInventory].quantity += items[0].quantity;
                }
            });
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("Cart", JSON.stringify(updatedCart));
            }
            return updatedCart;
        });
    };

    const changeItemQuantity = (itemId: number, increase: boolean) => {
        setCart((prevCart) => {
            if (!prevCart) {
                return [];
            }

            const updatedCart = [...prevCart];
            const indexItemInInventory = updatedCart.findIndex((p) => p && p.id === itemId);

            if (indexItemInInventory !== -1) {
                updatedCart[indexItemInInventory].quantity = increase
                    ? updatedCart[indexItemInInventory].quantity + 1
                    : updatedCart[indexItemInInventory].quantity - 1;

                if (updatedCart[indexItemInInventory].quantity === 0) {
                    updatedCart.splice(indexItemInInventory, 1);
                }

                if (typeof localStorage !== "undefined") {
                    localStorage.setItem("Cart", JSON.stringify(updatedCart));
                }
            }

            return updatedCart;
        });
    };


    return { cart, setCart, saveCart, changeItemQuantity };
});

export const useCartContainer = CartContainer.useContainer;
export const CartProvider = CartContainer.Provider;
