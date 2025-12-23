import { useEffect, useState } from "react";
import { CartContext } from "../context/CartContext.ts";
import type { CartItem } from "../model/CartItem.ts";
import { saveCart } from "../service/ProductService.ts";
import {getToken} from "../service/AuthService.ts";

interface Props {
    children: React.ReactNode;
}

export default function CartProvider({children}: Props) {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));

        const token = localStorage.getItem(getToken() as string);
        if (items.length > 0 && token) {
            saveCart(items, token)
                .then(() => console.log("Cart saved to backend"))
                .catch(err => console.error("Failed to save cart:", err));
        }
    }, [items]);

    const addItem = (item: CartItem) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);

            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                );
            }

            return [...prev, {...item, quantity: 1}];
        });
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const value = {
        items,
        addItem,
        removeItem,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}