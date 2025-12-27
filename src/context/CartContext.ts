import type {CartItem} from "../model/CartItem.ts";
import {createContext} from "react";

export interface CartContext {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

export const CartContext = createContext<CartContext>({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
    increaseQuantity: () => {},
    decreaseQuantity: () => {}
});