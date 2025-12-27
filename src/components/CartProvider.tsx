import { useEffect, useState } from "react";
import { CartContext } from "../context/CartContext.ts";
import type { CartItem } from "../model/CartItem.ts";

interface Props {
    children: React.ReactNode;
}

export const CartProvider = ({ children }: Props) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("cartItems");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    }, [items]);

    const addItem = (item: CartItem) => {
        setItems(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                // Increase by 1 instead of item.quantity
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            // When adding new item, default quantity to 1
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const increaseQuantity = (id: number) => {
        setItems(prev =>
            prev.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
        );
    };

    const decreaseQuantity = (id: number) => {
        setItems(prev =>
            prev
                .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
                .filter(i => i.quantity > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};
